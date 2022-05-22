from datetime import timedelta
import os
from rest_framework.response import Response
from urllib3.exceptions import MaxRetryError, ResponseError
from minio import Minio
from minio.error import S3Error
from minio.helpers import BaseURL

class FileNotFoundInStorage(Exception):
    ...


class external_url(object):
    def __init__(self, client: Minio):
        self.client = client
        self._base_url = client._base_url

    def __enter__(self):
        self._set_url_to_external()
        return self.client

    def __exit__(self, type, value, traceback):
        self._restore_default_url()

    def _set_url_to_external(self):
        temp_base = BaseURL("http://" + os.environ.get("MINIO_EXTERNAL_ENDPOINT"), None)
        self.client._base_url = temp_base

    def _restore_default_url(self):
        self.client._base_url = self._base_url


class MinioService:
    def __init__(self, endpoint, bucket, access_key, secret_key):
        self.endpoint = endpoint
        self._access_key = access_key
        self._secret_key = secret_key
        self.bucket = bucket
        self.secure = False
        self._client = Minio(
            endpoint, access_key=access_key, secret_key=secret_key, secure=self.secure
        )
        self.test_connection()

    def test_connection(self):
        try:
            self._client.list_buckets()
        except MaxRetryError:
            raise RuntimeError(f"Minio client cannot connect to {self.endpoint}")

    def get_url(self, object_name):
        if not self._check_object_exists(object_name):
            return None

        url = self._client.presigned_get_object(
            self.bucket, object_name, expires=timedelta(days=7))

        return url

    def get_external_url(self, object_name): 
        if not self._check_object_exists(object_name):
            return None
       
        with external_url(self._client) as client:
            url = client.presigned_get_object(
                self.bucket, object_name, expires=timedelta(days=7))

        return url

    def _check_object_exists(self, object):
        try:
            self._client.stat_object(self.bucket, object)
            return True
        except S3Error as err:
            return False

    def get_object(self, object_name):
        try:
            file_response = self._client.get_object(
                bucket_name="results-bucket", object_name=object_name
            )
        except Exception:
            raise FileNotFoundInStorage
        else:
            return Response(
                data=file_response.data,
                status=file_response.status,
                content_type=file_response.headers["Content-Type"],
            )
        finally:
            file_response.close()
            file_response.release_conn()

    def delete_object(self, object_name):
        try:
            self._client.remove_object("results-bucket", object_name=object_name)
        except ResponseError as err:
            print(err)

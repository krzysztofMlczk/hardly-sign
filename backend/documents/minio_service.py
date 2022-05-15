from datetime import timedelta
from rest_framework.response import Response
from urllib3.exceptions import MaxRetryError, ResponseError
from minio import Minio
from minio.error import S3Error

class FileNotFoundInStorage(Exception):
    ...


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
        if self._check_object_exists(object_name):
            return self._client.presigned_get_object(
                self.bucket, object_name, expires=timedelta(days=7), response_headers={"server": "localhost"}
            )
        return None

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

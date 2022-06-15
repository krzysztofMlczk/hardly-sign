import mimetypes

from django.core.files.uploadedfile import InMemoryUploadedFile


def bytes_to_file(file_object, name):
    def getsize(f):
        f.seek(0)
        f.read()
        s = f.tell()
        f.seek(0)
        return s

    name = name.strip()
    content_type, charset = mimetypes.guess_type(name)
    size = getsize(file_object)
    return InMemoryUploadedFile(file=file_object, name=name,
                                field_name=None, content_type=content_type,
                                charset=charset, size=size)

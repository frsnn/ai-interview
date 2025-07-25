import uuid
from datetime import datetime

import boto3
from botocore.client import Config

from src.core.config import settings


region = settings.aws_region or None

_client = boto3.client(
    "s3",
    region_name=region,
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    config=Config(signature_version="s3v4"),
)


def generate_presigned_put_url(file_name: str, content_type: str, expires: int = 600) -> dict:
    """Generate a presigned PUT URL for uploading to S3."""
    if not settings.s3_bucket:
        raise RuntimeError("S3_BUCKET not configured")
    key = f"uploads/{datetime.utcnow().strftime('%Y%m%d')}/{uuid.uuid4()}_{file_name}"
    url = _client.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": settings.s3_bucket,
            "Key": key,
            "ContentType": content_type,
        },
        ExpiresIn=expires,
        HttpMethod="PUT",
    )
    return {"url": url, "key": key} 
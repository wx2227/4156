import json
import base64
import boto3
import uuid

BUCKET_NAME = 'coms4156'
def lambda_handler(event, context):
    file_content = base64.b64decode(event['content'])
    print("FILE", file_content)
    filename = str(uuid.uuid4()) + ".pdf"
    file_path = filename 
    s3 = boto3.client('s3')
    try:
        s3_response = s3.put_object(Bucket=BUCKET_NAME, Key=file_path, Body=file_content)
    except Exception as e:
        raise IOError(e)
    return {
        'statusCode': 200,
        'body': {
            'file_path': file_path,
            'file_url': "https://coms4156.s3-us-west-1.amazonaws.com/" + file_path
        }
    }
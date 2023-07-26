import sys
import logging
import pymysql
import json

rds_host  = ""
user_name = ""
password = ""
db_name = ""

logger = logging.getLogger()
logger.setLevel(logging.INFO)
try:
    conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def lambda_handler(event, context):
    """
    This function publishes a user's note to the database
    """
    # This works when im testing the api gateway in the api gateway test functionality - post method with username=test as query string parameters
    # username = event['params']['querystring']['username']
    #return f"{event.keys()}"
    username = event['queryStringParameters']['username']
    event = json.loads(event['body'])
    noteID=event['noteID']
    date_time_created = event['date_time_created']
    body = event['body']
    mood = event['mood']
    sql_string = f'update notes set body="{body}", mood="{mood}" where noteID="{noteID}"'
    with conn.cursor() as cur:
        cur.execute(sql_string)
        conn.commit()
    conn.commit()
    payload = "Successfully updated note {noteID}"
    # return payload
    return {
        'statusCode': 200,
        'body': payload # returning the data sent to backend lambda function as API response.
    }
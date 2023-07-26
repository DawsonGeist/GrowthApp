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
    This function cretrieves all the notes for a specific user
    """
    
    notes = {
        'noteList': []
    }
    # This works when im testing the api gateway in the api gateway test functionality - post method with username=test as query string parameters
    # username = event['params']['querystring']['username']
    #return f"{event.keys()}"
    username = event['queryStringParameters']['username']
    sql_string = f"SELECT * FROM ExampleDB.notes WHERE username='{username}' ORDER BY date_time_created ASC"
    with conn.cursor() as cur:
        cur.execute(sql_string)
        conn.commit()
        logger.info("The following items have been retrieved from the database:")
        for row in cur:
            notes['noteList'].append(
            {
                'noteID': row[0],
                'username': row[1],
                'date_time_created': row[2],
                'body': row[3],
                'mood': row[4] 
            })
    conn.commit()
    payload = json.dumps(notes, default=str)
    # return payload
    return {
        'statusCode': 200,
        'body': payload # returning the data sent to backend lambda function as API response.
    }
import mysql.connector
from mysql.connector import Error

def create_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

def create_database(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

def execute_query(connection, query):
     cursor = connection.cursor()
     try:
         cursor.execute(query)
         connection.commit()
         print("Query executed successfully")
     except Error as e:
         print(f"The error '{e}' occurred")

def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as e:
        print(f"The error '{e}' occurred")


# Create connection to DB
connection = create_connection("lanhelen.asuscomm.com", "daniel", "Daniel123!", "finno_bd")


## Add new comments to DB
#create_comments = """
#INSERT INTO 
#    `comments` (`user_id`, `text`, `toxic`) 
#VALUES 
#    ('1', 'ghkkgkhkgfhkgfhkgfh', '2'),
#    ('1', 'mmnjmknnmjkn', '0');
#"""
#execute_query(connection, create_comments) 


# Get comments from DB
select_comments = "SELECT * FROM comments"
comments = execute_read_query(connection, select_comments)

for comment in comments:
    print(comment)
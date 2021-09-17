import mysql.connector
from mysql.connector import Error

class DataBase:
    def __init__(self, host_name, user_name, user_password, db_name):
        self.connection = self.CreateConnection(host_name, user_name, user_password, db_name)
    
    def CreateConnection(self, host_name, user_name, user_password, db_name):
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

    def CreateDatabase(self, db_name):
        query = "CREATE DATABASE " + db_name
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            print("Database created successfully")
        except Error as e:
            print(f"The error '{e}' occurred")

    def ExecuteQuery(self, query):
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            self.connection.commit()
            print("Query executed successfully")
        except Error as e:
            print(f"The error '{e}' occurred")

    def ExecuteReadQuery(self, query):
        cursor = self.connection.cursor()
        result = None
        try:
            cursor.execute(query)
            result = cursor.fetchall()
            return result
        except Error as e:
            print(f"The error '{e}' occurred")
    
    def AddComments(self, comments):
        create_comments = "INSERT INTO  `comments` (`user_id`, `text`, `toxic`) VALUES "
        for comment in comments:
            create_comments += "("
            for field in comment:
                field_str = str(field).replace("\"", "''")
                create_comments += "\"" + field_str + "\"" + ","
            create_comments = create_comments[:-1]
            create_comments += "),"
        create_comments = create_comments[:-1]
        create_comments += ";"
        print(create_comments)
        self.ExecuteQuery(create_comments) 

    def GetComments(self):
        select_comments = "SELECT * FROM comments"
        return self.ExecuteReadQuery(select_comments)
    
    def GetCommentsCount(self):
        select_comments = "SELECT COUNT(*) FROM comments"
        return self.ExecuteReadQuery(select_comments)[0][0]
    

    def GetText(self):
        select_text = "SELECT text FROM comments ORDER BY id DESC LIMIT 1"
        return self.ExecuteReadQuery(select_text)
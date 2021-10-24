import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
from mysql.connector import connection

class DataBase:
	def __init__(self, host_name, user_name, user_password, db_name):
		self.host_name = host_name
		self.user_name = user_name
		self.user_password = user_password
		self.db_name = db_name
		self.connection = self.CreateConnection()
	
	def CreateConnection(self,):
		connection = None
		try:
			connection = mysql.connector.connect(
				host = self.host_name,
				user = self.user_name,
				passwd = self.user_password,
				database = self.db_name
			)
			print("Connection to MySQL DB successful")
		except Error as e:
			print(f"The error '{e}' occurred")

		return connection

	def GetCursor(self):
		try:
			cursor = self.connection.cursor()
			return cursor
		except Error as e:
			print("ERRRROR!!!")
			print(f"The error '{e}' occurred")
			if (e.errno == -1):
				connection = self.CreateConnection()
				if (connection):
					self.connection = connection

	def CreateDatabase(self, db_name):
		query = "CREATE DATABASE " + db_name
		cursor = self.GetCursor()
		try:
			cursor.execute(query)
			print("Database created successfully")
		except Error as e:
			print(f"The error '{e}' occurred")

	def ExecuteQuery(self, query):
		cursor = self.GetCursor()
		try:
			cursor.execute(query)
			self.connection.commit()
			print("Query(E) executed successfully")
		except Error as e:
			print(f"The error '{e}' occurred")
			
	def ExecuteManyQuery(self, query, data):
		cursor = self.GetCursor()
		try:
			cursor.executemany(query, data)
			self.connection.commit()
			print("Query(EM) executed successfully")
		except Error as e:
			print(f"The error '{e}' occurred")

	def ExecuteReadQuery(self, query):
		cursor = self.GetCursor()
		result = None
		try:
			cursor.execute(query)
			result = cursor.fetchall()
			return result
		except Error as e:
			print(f"The error '{e}' occurred")
	
	def AddComments(self, comments):
		NewComments = []
		for comment in comments:
			NewFields = []
			for field in comment:
				NewFields.append(str(field))
			NewComments.append(NewFields)
		create_comments = """
			INSERT INTO  `comments`
			(`user_id`, `text`, `toxic`) 
			VALUES ( %s, %s, %s )
		"""
		self.ExecuteManyQuery(create_comments, NewComments) 

	def DelComment(self, id):
		delete_comment = f"DELETE FROM comments WHERE id='{id}'"
		self.ExecuteQuery(delete_comment)

	def GetComments(self):
		select_comments = "SELECT * FROM comments"
		return self.ExecuteReadQuery(select_comments)

	def GetTableElements(self, tableName, start, count):
		select_elements = f"SELECT * FROM {tableName} LIMIT {start}, {count}"
		return self.ExecuteReadQuery(select_elements)
	
	def GetCommentsCount(self):
		select_comments = "SELECT COUNT(*) FROM comments"
		return self.ExecuteReadQuery(select_comments)[0][0]
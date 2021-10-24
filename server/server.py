import random
from flask import Flask, jsonify, make_response, request, abort
from DBlib import DataBase as DB
#from neural import GetToxic

DataBase = DB("lanhelen.asuscomm.com", "daniel", "Daniel123!", "finno_bd")
print("Comments count: ", DataBase.GetCommentsCount())
print("Col Names: ", DataBase.ExecuteReadQuery("DESCRIBE comments")[0][0])

app = Flask(__name__)

def GetSerialize(tableName, page, pageSize):
	DBData = DataBase.GetTableElements(tableName, page * pageSize, pageSize)
	DBColData = DataBase.ExecuteReadQuery("DESCRIBE " + tableName)
	result = []
	for data in DBData:
		line = {}
		for field, name in zip(data, DBColData):
			line.update({name[0] : field})
		result.append(line)
	return result

@app.route("/comments", methods=["GET"])
def comments_get():
	page = int(request.args.get("page"))
	pageSize = min(int(request.args.get("page_size", 5)), 10)
	return jsonify({
		"comments" : GetSerialize("comments", page, pageSize), 
		"count" : DataBase.GetCommentsCount()
	})

@app.route("/comments", methods=["POST"])
def comments_post():
	if not request.json:
		abort(400)
	UserID = request.json.get("userID")
	Text = request.json.get("text")
	Toxic = random.randint(0, 2)
	#Toxic = GetToxic(Text)[0]
	comment = (UserID, Text, Toxic)
	DataBase.AddComments([comment])
	return jsonify({"res" : str(Toxic)})
	

@app.route("/comments", methods=["DELETE"])
def comments_delete():
	id = request.args.get("id")
	DataBase.DelComment(id)
	return jsonify({"res" : "Deleted!"})

if __name__ == "__main__":
	app.run(port = 3444, debug = True)
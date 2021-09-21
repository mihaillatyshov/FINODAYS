from flask import Flask, jsonify, make_response, request, abort
from DBlib import DataBase as DB
from neural import GetToxic

DataBase = DB("lanhelen.asuscomm.com", "daniel", "Daniel123!", "finno_bd")
print("Comments count: ", DataBase.GetCommentsCount())
print("Col Names: ", DataBase.ExecuteReadQuery("DESCRIBE comments")[0][0])
#print("Comments: ", DataBase.GetComments())

app = Flask(__name__)

def GetSerialize(tableName):
    DBData = DataBase.GetTableElements(tableName)
    DBColData = DataBase.ExecuteReadQuery("DESCRIBE " + tableName)
    result = []
    for data in DBData:
        line = {}
        for field, name in zip(data, DBColData):
            line.update({name[0] : field})
            result.append(line)
    print(result)
    return result

@app.route("/get_comments", methods=["GET"])
def get_comments():
    DBComments = DataBase.GetComments()
    print(" ", "Coms", sep = "\n")
    for com in DBComments:
        print(com)
    return jsonify({"comments" : GetSerialize("comments")})

@app.route("/add_comment", methods=["POST"])
def create_comment():
    if not request.json:
        abort(400)
    UserID = request.json.get("userID")
    Text = request.json.get("text")
    #Toxic = random.randint(0, 2)
    Toxic = GetToxic(Text)[0]
    print(UserID, " -------- ", Text)
    comment = (UserID, Text, Toxic)
    print("Add Comment: ", comment)
    DataBase.AddComments([comment])
    return jsonify({"res": str(Toxic)})
    

if __name__ == "__main__":
    app.run(port = 3444, debug = True)
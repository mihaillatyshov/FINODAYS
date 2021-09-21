from DBlib import DataBase as DB

DataBase = DB("lanhelen.asuscomm.com", "daniel", "Daniel123!", "finno_bd")
print("Comments count: ", DataBase.GetCommentsCount())
print("Col Names: ", DataBase.ExecuteReadQuery("DESCRIBE comments")[0][0])
#print("Comments: ", DataBase.GetComments())

def Serialize(data, colData):
    return { colData[0] : data }


def SerializeAll(data):
    colData = DataBase.ExecuteReadQuery("DESCRIBE comments")
    return [*map(Serialize, data, colData)]

def GetSerialize(tableName):
    DBData = DataBase.GetTableElements(tableName)
    DBColData = DataBase.ExecuteReadQuery("DESCRIBE " + tableName)
    result = { tableName : [] }
    for data in DBData:
        line = {}
        for field, name in zip(data, DBColData):
            line.update({name[0] : field})
            result[tableName].append(line)
    print("Line: ", line)

    print(result)
    return result

GetSerialize("comments")

#print("Serialize: ", Serialize(DataBase.GetComments()[0][0], DataBase.ExecuteReadQuery("DESCRIBE comments")[0]))
#print("SerializeALL: ", SerializeAll(DataBase.GetComments()[0]))

#print(" ==================== AllCom ==================== ")
#for com in [*map(SerializeAll, DataBase.GetComments())]:
#    print(com)
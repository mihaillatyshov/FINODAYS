from flask import Flask, jsonify, make_response, request

app = Flask(__name__)

members = [
    "Member1", 
    "Member2", 
    "Member3"
]

@app.route("/members", methods=["GET"])
def get_members():
    return jsonify({"members": members})

@app.route("/add_member", methods=["POST"])
def create_member():
    if not request.json:
        abort(400)
    reqName = request.json
    members.append(reqName)
    return jsonify({"member": "req.ok"})

if __name__ == "__main__":
    app.run(port = 3444, debug = True)
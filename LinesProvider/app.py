import json
from flask import Flask, jsonify

with open('../../processing-tools/out.json') as f:
    whole_json = json.loads(''.join(f.readlines()))

app = Flask(__name__)
@app.route("/api/lines")
def lines():
    return jsonify(list(whole_json.keys()))

@app.route("/api/route/<line_num>")
def rotes(line_num):
    return jsonify(whole_json[str(line_num)])


if __name__ == "__main__":
    app.run()

import json
from flask import Flask, jsonify
from flask.ext.cors import CORS, cross_origin



with open('../../processing-tools/out.json') as f:
    whole_json = json.loads(''.join(f.readlines()))

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api/lines")
@cross_origin()
def lines():
    return jsonify({'lines': list(whole_json.keys())})


@app.route("/api/route/<line_num>")
@cross_origin()
def rotes(line_num):
    return jsonify(whole_json[str(line_num)])


if __name__ == "__main__":
    app.run()

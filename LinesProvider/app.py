from flask import Flask, jsonify
app = Flask(__name__)


@app.route("/api/lines")
def lines():
    return jsonify(['1', '2', '3', '4', '5'])

@app.route("/api/route/<line_num>")
def rotes(line_num):

    return jsonify({
        'route': [{
            'lat': 52.2848927,
            'lng': 20.9315048
        }, {
            'lat': 52.2858283,
            'lng': 20.9380713
        }, {
            'lat': 52.2811923,
            'lng': 20.9315048
        }],
        'green_waypoints': [{
            'center': {
                'lat': 52.2858283,
                'lng': 20.9380713
            },
            'radius': 1
        }]
    })


if __name__ == "__main__":
    app.run()

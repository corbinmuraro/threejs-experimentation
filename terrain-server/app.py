import srtm
from flask import Flask, request, send_from_directory
from PIL import Image
app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hello, World!'

# /api/lat=-37.7&long=-38
@app.route('/api/')
def create_task():
	geo_elevation_data = srtm.get_data()

	latitude = float(request.args['lat'])
	longitude = float(request.args['long'])

	image = geo_elevation_data.get_image((500, 500), (latitude-0.5,latitude+0.5), (longitude-0.5, longitude+0.5), 300)

	image.save('static/temp.png')

	return send_from_directory('static', 'temp.png', as_attachment=False)
from flask import Flask, request, send_file, render_template
from PIL import Image
import srtm
from StringIO import StringIO

app = Flask(__name__)

@app.route('/')
def main():
	if 'lat' in request.args and 'long' in request.args:


		geo_elevation_data = srtm.get_data()
		latitude = float(request.args['lat'])
		longitude = float(request.args['long'])
		image = geo_elevation_data.get_image((500, 500), (latitude-0.5,latitude+0.5), (longitude-0.5, longitude+0.5), 300)
		return serve_pil_image(image)
		# image.save('static/temp.png')
		# return send_from_directory('static', 'temp.png', as_attachment=False)

	else:
		return render_template("index.html")



def serve_pil_image(pil_img):
    img_io = StringIO()
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return render_template('index.html', image=send_file(img_io, mimetype='image/jpeg'))


if __name__ == "__app__":
	app.run()
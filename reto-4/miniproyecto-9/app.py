import requests
from flask import Flask, render_template, request

app = Flask(__name__)

API_KEY = "03c7ccfb8d2ce063eb5bfe9703f7f583" 

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        busqueda = request.form["busqueda"]

        url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={busqueda}"
        response = requests.get(url)
        data = response.json()
        peliculas = data["results"]
    else:
        peliculas = []

    return render_template("index.html", peliculas=peliculas)

if __name__ == "__main__":
    app.run(debug=True)
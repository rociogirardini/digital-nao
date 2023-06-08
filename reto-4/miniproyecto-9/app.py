import requests

API_KEY = "03c7ccfb8d2ce063eb5bfe9703f7f583"

print("Bienvenido a la aplicación de búsqueda de películas.")
busqueda = input("Ingrese el nombre de la película que desea buscar: ")

url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={busqueda}"
response = requests.get(url)
data = response.json()
peliculas = data["results"]

if peliculas:
    for pelicula in peliculas:
        titulo = pelicula["title"]
        rating = pelicula["vote_average"]
        print(f"Título: {titulo}")
        print(f"Rating: {rating}")
        print("---")
else:
    print("No se encontraron películas con ese nombre.")

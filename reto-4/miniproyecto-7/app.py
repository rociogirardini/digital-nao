from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape', methods=['POST'])
def scrape():
    url = request.form['url']
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    titulo = soup.title.text
    print('Título:', titulo)

    enlaces = [enlace.get('href') for enlace in soup.find_all('a')]
    print('Enlaces:', enlaces)

    resultados = {titulo: enlaces}

    return render_template('results.html', resultados=resultados)

if __name__ == '__main__':
    app.run()

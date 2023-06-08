from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/draw', methods=['POST'])
def draw():
    data = request.get_json()
    # Aquí puedes procesar los datos del dibujo recibidos en 'data'
    # y realizar cualquier lógica adicional que desees
    print(data)
    return 'Dibujo recibido correctamente'

if __name__ == '__main__':
    app.run(debug=True)

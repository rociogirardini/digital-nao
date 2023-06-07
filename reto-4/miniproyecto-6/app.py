from flask import Flask, render_template, request

app = Flask(__name__)

def convertir_a_palabras(numero):
    unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
    especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve']
    decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
    centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']

    if numero == 0:
        return 'cero'
    elif numero < 0 or numero > 999:
        return 'Número fuera de rango'
    elif numero <= 9:
        return unidades[numero]
    elif numero <= 19:
        return especiales[numero - 10]
    elif numero <= 99:
        return decenas[numero // 10] + ' ' + convertir_a_palabras(numero % 10)
    else:
        return centenas[numero // 100] + ' ' + convertir_a_palabras(numero % 100)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        numero = int(request.form['numero'])
        resultado = convertir_a_palabras(numero)
        return render_template('index.html', resultado=resultado)
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
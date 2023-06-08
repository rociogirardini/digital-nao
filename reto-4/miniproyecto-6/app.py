UNITS = [
    'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
]

TENS = [
    '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
]

HUNDREDS = [
    '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
]

def numberToLetter(number):
    if number < 20:
        return UNITS[number]
    
    if number < 100:
        unit = number % 10
        ten = number // 10
        
        if unit == 0:
            return TENS[ten]
        else:
            return f'{TENS[ten]} y {UNITS[unit]}'
        
    if number < 1000:
        hundred = number // 100
        rest = number % 100
        
        if rest == 0:
            if hundred == 1:
                return 'cien'
            else:
                return f'{HUNDREDS[hundred]}'
        else:
            return f'{HUNDREDS[hundred]} {numberToLetter(rest)}'
    
    raise ValueError('El número ingresado debe ser menor o igual a 999.')

number = int(input('Ingrese un número entre 0 y 999: '))

if 0 <= number <= 999:
    result = numberToLetter(number)
    print(f'{number} en letras: {result}')
else:
    print('El número ingresado está fuera del rango permitido.')
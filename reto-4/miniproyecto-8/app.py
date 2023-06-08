import os

def showMenu():
    print("Bienvenido al Menú USSD")
    print("1. Ver saldo")
    print("2. Recargar saldo")
    print("3. Comprar paquete de datos")
    print("4. Salir")

credit = 0
os.system('cls' if os.name == 'nt' else 'clear')
print("-------------------------------------------")
showMenu()
print("-------------------------------------------")

while True:
    option = input("Ingrese el número de opción: ")
    os.system('cls' if os.name == 'nt' else 'clear')

    print("-------------------------------------------")
    showMenu()
    print("-------------------------------------------")

    if option == "1":
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Su saldo actual es:", credit)
        print("-------------------------------------------")
    elif option == "2":
        os.system('cls' if os.name == 'nt' else 'clear')
        creditToRecharge = float(input("Ingrese el monto de la recarga: "))
        credit += creditToRecharge
        print("¡Recarga exitosa!")
        print("-------------------------------------------")
    elif option == "3":
        os.system('cls' if os.name == 'nt' else 'clear')
        data = input("Ingrese la cantidad de datos a comprar: ")
        print("¡Compra de", data, "paquete(s) de datos exitosa!")
        print("-------------------------------------------")
    elif option == "4":
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Gracias por utilizar nuestro Menú USSD. ¡Hasta luego!")
        print("-------------------------------------------")
        break
    else:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Opción inválida. Por favor, ingrese un número válido.")
        print("-------------------------------------------")
    
    showMenu()
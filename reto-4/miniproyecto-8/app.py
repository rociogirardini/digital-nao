import os

def mostrar_menu():
    print("Bienvenido al Menú USSD")
    print("1. Ver saldo")
    print("2. Recargar saldo")
    print("3. Comprar paquete de datos")
    print("4. Salir")

saldo = 0
os.system('cls' if os.name == 'nt' else 'clear')
print("-------------------------------------------")
mostrar_menu()
print("-------------------------------------------")

while True:
    opcion = input("Ingrese el número de opción: ")
    os.system('cls' if os.name == 'nt' else 'clear')

    print("-------------------------------------------")
    mostrar_menu()
    print("-------------------------------------------")

    if opcion == "1":
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Su saldo actual es:", saldo)
        print("-------------------------------------------")
    elif opcion == "2":
        os.system('cls' if os.name == 'nt' else 'clear')
        recarga = float(input("Ingrese el monto de la recarga: "))
        saldo += recarga
        print("¡Recarga exitosa!")
        print("-------------------------------------------")
    elif opcion == "3":
        os.system('cls' if os.name == 'nt' else 'clear')
        datos = input("Ingrese la cantidad de datos a comprar: ")
        print("¡Compra de", datos, "paquete(s) de datos exitosa!")
        print("-------------------------------------------")
    elif opcion == "4":
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Gracias por utilizar nuestro Menú USSD. ¡Hasta luego!")
        print("-------------------------------------------")
        break
    else:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Opción inválida. Por favor, ingrese un número válido.")
        print("-------------------------------------------")
    
    mostrar_menu()
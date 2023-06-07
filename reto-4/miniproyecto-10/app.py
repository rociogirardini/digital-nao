import time 
name = input("¿Cuál es tu nombre? ")
print("Hola, " + name + " juguemos al ahorcado\n")

time.sleep(1)
print("Comienza a adivinar")
time.sleep(0.5)
wordToGuess = "PYTHON"
userGuess = ""
lifes = 5

while lifes > 0:

    mistakes = 0
    for userLetter in wordToGuess:
        if userLetter in userGuess.upper():
            print(userLetter, end="")
        else:
            print("_", end="")
            mistakes +=1
    if mistakes ==0:
        print("\nGanaste! :)")
        break

    userLetter=input("\nIntroducte una letra: ")
    userGuess += userLetter.upper()

    if userLetter.upper() not in wordToGuess:
        lifes-=1
        print("\nUh, te equivocaste")
        print("Te quedan ", lifes, " vidas")
    if lifes == 0:
        print("\nPerdiste ):")
else:
    print("\nGracias por participar")

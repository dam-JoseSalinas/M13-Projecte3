import sqlite3

try:
    mi_conexion = sqlite3.connect(".\\db.sqlite3")
    cursor = mi_conexion.cursor()

    email = "anthony_spa@outlook.com"
    password = "a1s2d3f4g5"
    cursor.execute("SELECT email, psw FROM tasks_register WHERE email =? AND psw=?", (email, password))

    resultado = cursor.fetchone()
    
    if resultado:
        print("¡Usuario encontrado!")
    else:
        print("¡Usuario no encontrado!")

except Exception as ex:
    print('Error:', ex)
finally:
    cursor.close()
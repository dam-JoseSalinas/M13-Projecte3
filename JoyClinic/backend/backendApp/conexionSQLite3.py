import sqlite3

try:
    mi_conexion = sqlite3.connect("db.sqlite3")
    cursor = mi_conexion.cursor()
    
except Exception as ex:
    print(ex)
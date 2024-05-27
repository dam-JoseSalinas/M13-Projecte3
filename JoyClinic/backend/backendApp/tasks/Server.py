import socket
import threading

PORT = 5000
SERVER = socket.gethostbyname(socket.gethostname())
ADDR = (SERVER, PORT)
clients = []

def handle_client(conn, addr):
    print(f"[SERVER] New client connected: {addr}")
    while True:
        try:
            message = conn.recv(1024).decode()
            if message:
                print(f"\n{message}")
                broadcast(message, conn)
        except:
            index = clients.index(conn)
            clients.remove(conn)
            conn.close()
            print(f"[SERVER] Client {addr} disconnected")
            break

def broadcast(message, sender_conn):
    for client in clients:
        if client != sender_conn:
            try:
                client.send(message.encode())
            except:
                client.close()
                clients.remove(client)

def start():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(ADDR)
    server.listen()
    print(f"[SERVER] Server is listening on {SERVER}")

    while True:
        conn, addr = server.accept()
        clients.append(conn)
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
        print(f"[SERVER] Active connections: {threading.activeCount() - 1}")

print("[SERVER] Server is starting...")
start()

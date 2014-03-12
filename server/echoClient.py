import socket

udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM);

for i in range(3):
    udp.sendto("aiu", ("127.0.0.1", 8888))

udp.close()

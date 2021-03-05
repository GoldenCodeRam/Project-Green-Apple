#!bin/ash

redis-server --daemonize yes;

python3 src/main.py;
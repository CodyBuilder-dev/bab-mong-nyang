import RPi.GPIO as GPIO
import time

pin = 14
GPIO.setmode(GPIO.BCM)

GPIO.setup(pin, GPIO.IN)

try:
    while 1 : 
       data=  GPIO.input(pin)
       print(data)
       time.sleep(1)
except KeyboardInterrupt :
    print('now EXIT')
    GPIO.cleanup()

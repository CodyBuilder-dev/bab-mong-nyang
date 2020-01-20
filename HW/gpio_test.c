#include <stdio.h>
#include <wiringPi.h>

#define pres 15

int main(void){
    if(wiringPiSetup() == -1)
    return 1;

    pinMode(pres, INPUT);

while(1){
    printf("%d\n",digitalRead(pres));
    delay(1000);
    }
    return 0;
}

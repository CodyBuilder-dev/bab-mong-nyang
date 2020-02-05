//wiringPi 이용 motor 제어
#include <stdio.h>
#include <stdlib.h>
#include <wiringPi.h>

//MOTOR pin set
#define IN1 22
#define IN2 23
#define IN3 24
#define IN4 25

void setsteps(int w1, int w2, int w3, int w4)
{
    pinMode(IN1, OUTPUT);
    digitalWrite(IN1, w1);
    pinMode(IN2, OUTPUT);
    digitalWrite(IN2, w2);
    pinMode(IN3, OUTPUT);
    digitalWrite(IN3, w3);
    pinMode(IN4, OUTPUT);
    digitalWrite(IN4, w4);
}

void goFront(int steps){
    for(int i=0; i<=steps; ++i){
        setsteps(1,1,0,0);
        delay(5);
        setsteps(0,1,1,0);
        delay(5);
        setsteps(0,0,1,1);
        delay(5);
        setsteps(1,0,0,1);
        delay(5);
    }
}
void end(){
      setsteps(0,0,0,0);
}

int main(int argc, char *argv[])
{
    if( wiringPiSetup() == -1 )
    {
        printf("wiringPi Error!! \n");
        return 0;
    }
    int loopcnt = atoi(argv[1]);
    if(loopcnt == 0) { //종료 명령
        end();
    }
    else { //회전 명령
        
        for(int i=0; i<loopcnt; ++i)
        goFront(128); //512 1loop
    
        printf("feed %d Times!\n", loopcnt);
    }
    
    return 0;
}

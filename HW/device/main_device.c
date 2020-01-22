#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <wiringPi.h>
#include <softPwm.h>
#include <unistd.h>

//LED pin set
#define LED1 27
#define LED2 28
#define LED3 29
//MOTOR pin set
#define ENA 29
#define IN1 28
#define IN2 27
#define IN3 25
#define IN4 24
#define ENB 23
//Photo diode pin set
#define PHOTO 1

void goFront()
{
    digitalWrite(IN1, 0);
    digitalWrite(IN2, 1);
    digitalWrite(IN3, 0);
    digitalWrite(IN4, 1);
    softPwmWrite(ENA, 128);
    softPwmWrite(ENB, 128);
}
void end()
{
    digitalWrite(IN1, 0);
    digitalWrite(IN2, 0);
    digitalWrite(IN3, 0);
    digitalWrite(IN4, 0);
    softPwmWrite(ENA, 0);
    softPwmWrite(ENB, 0);
}
int main()
{
    if( wiringPiSetup() == -1 )
    {
        printf("wiringPi Error!! \n");
        return 0;
    }
    //Initial Setting
    pinMode(ENA, OUTPUT);
    pinMode(IN1, OUTPUT);
    pinMode(IN2, OUTPUT);
    pinMode(IN3, OUTPUT);
    pinMode(IN4, OUTPUT);
    pinMode(ENB, OUTPUT);
    softPwmCreate(ENA, 0, 255);
    softPwmCreate(ENB, 0, 255);
    //call goFront function
    goFront();
    usleep(1000*1000*5);
    end();
    return 0;
}
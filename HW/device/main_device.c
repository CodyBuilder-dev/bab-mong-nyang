#include <stdio.h>
#include <stdlib.h>
#include <wiringPi.h>
#include <mysql/mysql.h>
#include <time.h>
#include <sys/types.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

//IR pin set
#define IRRCV 27
#define IRTSM 26
//MOTOR pin set
#define IN1 22
#define IN2 23
#define IN3 24
#define IN4 25

static char *host = "localhost";
static char *user = "dev1";
static char *pass = "1234";
static char *dbname = "feed";

void error(MYSQL *conn)
{
	fprintf(stderr, "%s\n", mysql_error(conn));
	mysql_close(conn);
	//exit(1);
}
void setIRsensing() {
	pinMode(IRTSM, OUTPUT);
	pinMode(IRRCV, INPUT);
	digitalWrite(IRTSM,HIGH);
}
void setIRoff() {
	digitalWrite(IRTSM,LOW);	
}

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
void goFront(int steps) {
	for (int i = 0; i <= steps; ++i) {
		setsteps(1, 1, 0, 0);
		delay(5);
		setsteps(0, 1, 1, 0);
		delay(5);
		setsteps(0, 0, 1, 1);
		delay(5);
		setsteps(1, 0, 0, 1);
		delay(5);
	}
}
void end() {
	setsteps(0, 0, 0, 0);
}

int main(int argc, char *argv[])
{

    MYSQL *conn;
    MYSQL_RES *result;
    conn = mysql_init(NULL);
    int res;
    char buf[1024];
    char tbuf[1024];
	char dbuf[1024];

	if (!(mysql_real_connect(conn, host, user, pass, dbname, 0, NULL, 0)))
	{
		fprintf(stderr, "ERROR: %s[%d]\n", mysql_error(conn), mysql_errno(conn));
		exit(1);
	}
	printf("Connection Successful!\n\n");

	time_t restime;
	pid_t pid;

	if (wiringPiSetup() == -1)
	{
		printf("wiringPi Error!! \n");
		return 0;
	}

	restime = time(NULL);
	sprintf(tbuf, "%d:%d:00", localtime(&restime)->tm_hour, localtime(&restime)->tm_min);
	sprintf(dbuf, "%d-%d-%d", localtime(&restime)->tm_year, localtime(&restime)->tm_mon, localtime(&restime)->tm_mday);

	mysql_query(conn, "select * from feedingtime");
	result = mysql_store_result(conn);
	if (result == NULL)
	{
		error(conn);
	}
	int num_fields = mysql_num_fields(result);
	MYSQL_ROW row;
	while (row = mysql_fetch_row(result))
	{
		if (/*strcmp(row[1], tbuf)*/1)
		{
			setIRsensing();
			int rcv = digitalRead(IRRCV);

			pid = fork();
			if (pid == 0) {
				int loopcnt = atoi(row[2]);
				//call goFront function
				for (int i = 0; i < loopcnt; ++i)
					goFront(128); //512 1loop
				end();
				printf("feed %d Times!\n", loopcnt);
				exit(1);
			}
			else {
				int tt = 3000;
				while (tt--) {
					if (digitalRead(IRRCV) != rcv) {
						printf("%d :: %d\n", digitalRead(IRRCV), rcv);
						sprintf(buf, "insert into feeding (_date, _time, total_remain) values ('%s', '%s', '%d')", dbuf,tbuf, 0);
						res = mysql_query(conn, buf);
						if (!res)
							printf("Insert <%s> <%d> successful!\n", tbuf, 0);
						else
							error(conn);
                       	break;
					}
					delay(5);
				}
			}
			setIRoff();
		}
	}
	return 0;
}

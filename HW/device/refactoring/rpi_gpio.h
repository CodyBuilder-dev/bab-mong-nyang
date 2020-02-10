int connectpi(int fd, unsigned long baud, char *device);

void setdefault();

char* serial_signal(int fd);

void setsteps(int w1, int w2, int w3, int w4);
void goFront(int steps);
void end();

void IR_TRANSMITTING(int loop);
int EMPTYCHECK();
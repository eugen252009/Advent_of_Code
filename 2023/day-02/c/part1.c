#include <errno.h>
#include <fcntl.h>
#include <locale.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#define BUFSIZE 4090

void handleError(int errcode) {
  if (errcode == -1) {
    char *string = strerror_l(errno, LC_GLOBAL_LOCALE);
    printf("%s\n", string);
    _exit(1);
  }
}

int main(int argc, char **argv) {
  char *filepath = "../testinput.txt";
  if (argc > 1) {
    filepath = argv[1];
  }
  FILE *filestream = fopen(filepath, "r");
  if (filestream == NULL) {
    printf("%s", "Could not Open File!");
    // _exit(1);
    return 1;
  }
  char buf[BUFSIZE] = {};
  while (fgets(buf, BUFSIZE, filestream)) {
    char *begin = strchr(buf, ':');
    char *ptr = strchr(buf, ';');
    printf("Beginn: %zu, abschluss erste Runde: %zu\n", begin - buf, ptr - buf);
  }
  return 0;
}

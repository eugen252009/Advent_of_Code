#include <errno.h>
#include <fcntl.h>
#include <locale.h>
#include <stdio.h>
#include <stdlib.h>
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
char **SplitNewLine(char *text, size_t size) {
  char **ptr = malloc(size);
  int last = 0;
  int id = 0;
  for (int i = 0; i < size; i++) {
    if (text[i] == '\n') {
      last = i;
      char tmp[BUFSIZE] = {};
      char *ptr2 = strncpy(tmp, text, i);
      ptr[id++] = tmp;
    }
  }
  return ptr;
}

int main(int argc, char **argv) {
  char *filepath = "../textinput.txt";
  if (argc > 1) {
    filepath = argv[1];
  }
  int filestream = open(filepath, O_RDONLY);
  handleError(errno);
  char buf[BUFSIZE] = {};
  char carry[BUFSIZE] = {};
  size_t size = read(filestream, buf, BUFSIZE);

  while (size != 0) {
    char **ptr2 = SplitNewLine(buf, size);
    for (int i = 0; i < size; i++) {
      printf("%s", ptr2[i]);
    }
    free(ptr2);
    size = read(filestream, buf, 1024);
  }
  return 0;
}

#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main() {
  size_t buflen = 300;
  char *data[300] = {};

  while (getline(data, &buflen, stdin) > 0) {
    if (!strcmp(*data, "\n")) {
      printf("%s", *data);
    }
  }
  return 0;
}

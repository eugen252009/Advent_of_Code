#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  int result = 0;
  FILE *file2 = fopen("input", "r");
  if (file2 == NULL) {
    perror("Error opening file");
    return 1;
  }
  char line[1024];
  while (fgets(line, sizeof(line), file2) != NULL) {
    int leftmost = -1;
    int rightmost = -1;
    int len = strlen(line);

    for (int i = 0; i < len; i++) {
      if (!isdigit(line[i])) {
        continue;
      }

      char linechar[1] = {line[i]};
      int currentNumber = atoi(linechar);
      printf("%d_%d\n", line[i], currentNumber);
      if (leftmost == -1) {
        leftmost = line[i];
        rightmost = line[i];
      } else {
        rightmost = line[i];
      }
    }
    char string[2] = {leftmost, rightmost};
    result += atoi(string);
    printf("zwischen result:%d\n", result);
    // line);
  }

  // Close the file
  fclose(file2);
  printf("%d", result);
  return 0;
}

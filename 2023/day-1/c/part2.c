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
  char line[512];
  while (fgets(line, sizeof(line), file2) != NULL) {
    char leftmost = -1;
    char rightmost = -1;
    int len = strlen(line);
    for (int i = 0; i < len; i++) {
      if (!isdigit(line[i])) {
        continue;
      }
      if (leftmost == -1) {
        leftmost = line[i];
        rightmost = line[i];
      } else {
        rightmost = line[i];
      }
    }
    int right = rightmost -= '0';
    int left = leftmost -= '0';
    result += left * 10 + right;
  }

  fclose(file2);
  printf("%d\n", result);
  return 0;
}

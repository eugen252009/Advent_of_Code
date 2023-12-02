#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  char *lines[10000] = {"2"};
  // FILE *file = fopen("../input.txt", "r");
  FILE *file2 = fopen("testinput", "r");
  if (file2 == NULL) {
    perror("Error opening file");
    return 1;
  }
  char line[1024];
  while (fgets(line, sizeof(line), file2) != NULL) {
    int leftmost = -1;
    int rightmost = -1;
    size_t len = strlen(line);

    for (size_t i = 0; i < len; i++) {
      if (!isdigit(line[i])) {
        continue;
      }
      // Convert the substring to an integer
      int currentNumber = atoi(&line[i]);

      printf("%d:%c\n", currentNumber, line[i]);

      if (leftmost == -1) {
        leftmost = currentNumber;
        rightmost = currentNumber;
      } else {
        rightmost = currentNumber;
      }

      // Skip to the end of the current number
      while (isdigit(line[i])) {
        i++;
      }
      i--; // Adjust for the upcoming increment in the loop
      printf("%d:%d\n", leftmost, rightmost);
    }
  }

  // Close the file
  fclose(file2);
  return 0;
}

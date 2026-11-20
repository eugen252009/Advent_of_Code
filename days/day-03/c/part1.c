#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *read_from_file(char *filename) {
  FILE *file = fopen(filename, "r");
  fseek(file, 0, SEEK_END);
  int length = ftell(file);
  fseek(file, 0, SEEK_SET);
  char *content = malloc(length + 1);
  int n = fread(content, 1, length, file);
  if (n == 0) {
    printf("%s", "Could not Read the String!");
  }
  content[length] = '\0';
  return content;
}

int calculate(char *content, int length) {
  int width = -1;
  for (int i = 0; i < length; i++) {
    if (content[i] == '\n') {
      width = i;
      break;
    }
  }

  printf("width: %d\n", width);
  int begin = -1, end = -1;
  for (int i = 0; i < length; i++) {
    if (isdigit(content[i])) {
      if (begin == -1) {
        begin = i;
        continue;
      }
      end = i;
      continue;
    }
    printf("%d,%d,%c\n", begin, end, content[i]);
    end = -1;
    begin = -1;
  }
  return 0;
}

int main(void) {
  // char *content = read_from_file("../input");
  char *content = "467..114..\n"
                  "...*......\n"
                  "..35..633.\n"
                  "......#...\n"
                  "617*......\n"
                  ".....+.58.\n"
                  "..592.....\n"
                  "......755.\n"
                  "...$.*....\n"
                  ".664.598..\n\0";
  int length = strlen(content);

  int result = calculate(content, length);
  printf("%d\n", result);
  // free(content);
  return 0;
}

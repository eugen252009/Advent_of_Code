#include <iostream>
#include <string>

int part1() {
  int sum = 0;
  for (std::string line; std::getline(std::cin, line);) {
    char right = -1;
    char left = -1;
    for (int i = 0; i < line.length(); i++) {
      if (line[i] >= '0' && line[i] <= '9') {
        if (left == -1) {
          left = line[i];
        }
        right = line[i];
      }
    }
    sum += (right - '0') + (left - '0') * 10;
    // std::cout << sum << std::endl;
  }
  return sum;
}

int part2() {
  int sum = 0;
  for (std::string line; std::getline(std::cin, line);) {
    char right = -1;
    char left = -1;
    for (int i = 0; i < line.length(); i++) {
      // 1
      if (line[i] == 'o' && line[i + 1] == 'n' && line[i + 2] == 'e') {
        line[i + 1] = '1';
      }
      // 2
      if (line[i] == 't' && line[i + 1] == 'w' && line[i + 2] == 'o') {
        line[i + 1] = '2';
      }
      // 3
      if (line[i] == 't' && line[i + 1] == 'h' && line[i + 2] == 'r' &&
          line[i + 3] == 'e' && line[i + 4] == 'e') {
        line[i + 1] = '3';
      }
      // 4
      if (line[i] == 'f' && line[i + 1] == 'o' && line[i + 2] == 'u' &&
          line[i + 3] == 'r') {
        line[i + 1] = '4';
      }
      // 5
      if (line[i] == 'f' && line[i + 1] == 'i' && line[i + 2] == 'v' &&
          line[i + 3] == 'e') {
        line[i + 1] = '5';
      }
      // 6
      if (line[i] == 's' && line[i + 1] == 'i' && line[i + 2] == 'x') {
        line[i + 1] = '6';
      }
      // 7
      if (line[i] == 's' && line[i + 1] == 'e' && line[i + 2] == 'v' &&
          line[i + 3] == 'e' && line[i + 4] == 'n') {
        line[i + 1] = '7';
      }
      // 8
      if (line[i] == 'e' && line[i + 1] == 'i' && line[i + 2] == 'g' &&
          line[i + 3] == 'h' && line[i + 4] == 't') {
        line[i + 1] = '8';
      }
      // 9
      if (line[i] == 'n' && line[i + 1] == 'i' && line[i + 2] == 'n' &&
          line[i + 3] == 'e') {
        line[i + 1] = '9';
      }
      if (line[i] >= '0' && line[i] <= '9') {
        if (left == -1) {
          left = line[i];
        }
        right = line[i];
      }
    }
    sum += (right - '0') + (left - '0') * 10;
  }
  return sum;
}
int main() {
  // std::cout << "\nThe sum for Part 1 is " << part1() << std::endl;
  std::cout << "\nThe sum for Part 2 is " << part2() << std::endl;
  return 0;
}

#include <cctype>
#include <iostream>
#include <string>

int main() {
  int sum = 0;
  for (std::string line; std::getline(std::cin, line);) {
    char right = -1;
    char left = -1;
    for (int i = 0; i < line.length(); i++) {
      if (isdigit(line[i])) {
        if (left == -1) {
          left = line[i];
        }
        right = line[i];
      }
    }
    sum += (right - '0') + (left - '0') * 10;
  }
  std::cout << "\nThe sum is " << sum << std::endl;
  return 0;
}

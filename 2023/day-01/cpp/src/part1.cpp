#include <iostream>
#include <string>
enum class Lane { RIGHT_LANE, CENTER_LANE, LEFT_LANE };
struct Vehicle {
  std ::uint32_t id;
  float velocity;
  Lane lane;
};
int part1(const std::string input) {

  int sum = 0;
  for (int i = 0; i < input.length(); i++) {

    std::cout << input[i];
    char right = -1;
    char left = -1;
    // for (int j = 0; j < input->length(); j++) {
    // std::cout << (*input) << std::endl;
    // if ((*input)[j] >= '0' && (*input)[j] <= '9') {
    //   if (left == -1) {
    //     left = (*input)[j];
    //     std::cout << (*input)[j];
    //   }
    //   right = (*input)[j];
    // }
    // }
    // sum += (right - '0') + (left - '0') * 10;
  }
  return sum;
}

int part2(std::string *data) {
  int sum = 0;
  for (int i = 0; i < data->length(); i++) {
    char right = -1;
    char left = -1;
    for (int i = 0; i < data->length(); i++) {
      // 1
      if ((*data)[i] == 'o' && (*data)[i + 1] == 'n' && (*data)[i + 2] == 'e') {
        (*data)[i + 1] = '1';
      }
      // 2
      if ((*data)[i] == 't' && (*data)[i + 1] == 'w' && (*data)[i + 2] == 'o') {
        (*data)[i + 1] = '2';
      }
      // 3
      if ((*data)[i] == 't' && (*data)[i + 1] == 'h' && (*data)[i + 2] == 'r' &&
          (*data)[i + 3] == 'e' && (*data)[i + 4] == 'e') {
        (*data)[i + 1] = '3';
      }
      // 4
      if ((*data)[i] == 'f' && (*data)[i + 1] == 'o' && (*data)[i + 2] == 'u' &&
          (*data)[i + 3] == 'r') {
        (*data)[i + 1] = '4';
      }
      // 5
      if ((*data)[i] == 'f' && (*data)[i + 1] == 'i' && (*data)[i + 2] == 'v' &&
          (*data)[i + 3] == 'e') {
        (*data)[i + 1] = '5';
      }
      // 6
      if ((*data)[i] == 's' && (*data)[i + 1] == 'i' && (*data)[i + 2] == 'x') {
        (*data)[i + 1] = '6';
      }
      // 7
      if ((*data)[i] == 's' && (*data)[i + 1] == 'e' && (*data)[i + 2] == 'v' &&
          (*data)[i + 3] == 'e' && (*data)[i + 4] == 'n') {
        (*data)[i + 1] = '7';
      }
      // 8
      if ((*data)[i] == 'e' && (*data)[i + 1] == 'i' && (*data)[i + 2] == 'g' &&
          (*data)[i + 3] == 'h' && (*data)[i + 4] == 't') {
        (*data)[i + 1] = '8';
      }
      // 9
      if ((*data)[i] == 'n' && (*data)[i + 1] == 'i' && (*data)[i + 2] == 'n' &&
          (*data)[i + 3] == 'e') {
        (*data)[i + 1] = '9';
      }
      if ((*data)[i] >= '0' && (*data)[i] <= '9') {
        if (left == -1) {
          left = (*data)[i];
        }
        right = (*data)[i];
      }
    }
    sum += (right - '0') + (left - '0') * 10;
  }
  return sum;
}
int main() {
  std::string data;
  for (std::string line; std::getline(std::cin, line);) {
    data.append(line);
  }
  std::cout << "\nThe sum for Part 1 is " << part1(&data) << std::endl;
  // std::cout << "\nThe sum for Part 2 is " << part2(&data) << std::endl;
  return 0;
}

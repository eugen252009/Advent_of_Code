#include <fstream>
#include <iostream>

int main() {
  std::ofstream myfile;
  myfile.open("../input");
  void *ptr = malloc(sizeof(std::string) * myfile.width());
  std::cout << &ptr << std::endl;
  free(ptr);
  return 0;
}

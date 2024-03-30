#include <iostream>
#include <string_view>

int main(int argc, char **argv) {
  using namespace std::literals;
  if (argv[0] == "-h"sv || argv[0] == "--help"sv) {
    std::cout
        << "Pipe your Input into this runnable or specify a Path to a file";
  }
  for (std::string line; std::getline(std::cin, line);) {
  }
}

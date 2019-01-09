#include <iostream>
#include "Field.hpp"
#include "FieldGenerator.hpp"
#include "FieldJsonSerializer.hpp"


int main() {

    FieldGenerator generator;

    int fails = 0;
    while (fails < 1000) {
        try {
            Field f = generator.generate();

            std::cout << FieldJsonSerializer::serialize(f);

            return 0;

        } catch (std::runtime_error& e) {
            std::cerr << e.what() << '\n';
            fails++;
        }
    }

    std::cerr << "Generation failed :(\nTry again!\n";

    return 1;
}




cmake_minimum_required(VERSION 3.10)

set(CMAKE_CXX_STANDARD 17)

set(TEST_UTIL_SRC test_util.cpp)
add_executable(test_util ${TEST_UTIL_SRC})

add_test(NAME test_util COMMAND test_util)

set(TEST_COMPLEX_SHAPE_SRC test_ComplexShape.cpp)
add_executable(test_ComplexShape ${TEST_COMPLEX_SHAPE_SRC})

add_test(NAME test_ComplexShape COMMAND test_ComplexShape)

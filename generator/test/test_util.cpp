//
// Created by xappm on 16.12.18.
//

#include "../util.hpp"
#include <cassert>


int main() {
    Quad q ({Point {-2, -1}, Point {-5, 2}, Point {3, 1}, Point {5, -3}});
    assert(q.contains({0, 0}));
    assert(q.contains({5, -3}));
    assert(q.contains({3, 1}));
    assert(q.contains({2, 1}));
    assert(q.contains({-5, 2}));
    assert(q.contains({-2, -1}));
    assert(!q.contains({-2, -2}));

    assert(q.overlaps(Rect {1, 2, 10, 10}));

    assert(dist({0, 0}, {100, 0}) == 100);
}

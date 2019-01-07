//
// Created by xappm on 19.12.18.
//

#include <cassert>
#include "../util.hpp"
#include "../Field.hpp"



int main() {
    Quad loc ({Point {100, 100}, {100 + ParkingZone::SIZE, 100},
               {100 + ParkingZone::SIZE, 100 + ParkingZone::SIZE},
               {100, 100 + ParkingZone::SIZE}});
    ParkingZone p(loc);

    ComplexShape zone(
            // contains
            [p](Point point) { return dist(point, p.location.points[0]) < 460 ||
                                      dist(point, p.location.points[3]) < 460; },
            // overlaps
            [&zone](const Shape& shape) {
                auto r = dynamic_cast<const Rect&>(shape);
                return zone.contains(r.leftTop()) || zone.contains(r.rightBottom()) ||
                       zone.contains(r.leftBottom()) || zone.contains(r.rightTop());
            }
    );


    assert(zone.contains({0, 0}));
    assert(zone.contains({200, 200}));
    assert(zone.contains({20, 20}));
    assert(zone.contains({500, 100}));
    assert(!zone.contains({1000, 1000}));
    assert(!zone.contains({100+ParkingZone::SIZE/2, 100+ParkingZone::SIZE+460}));
    assert(zone.contains({300, 100 + ParkingZone::SIZE + 100}));
    assert(zone.overlaps(Rect {100 + ParkingZone::SIZE + 100, 300, 1000, 1000}));

    return 0;
}

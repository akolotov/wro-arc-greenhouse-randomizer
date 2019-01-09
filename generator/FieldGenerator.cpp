//
// Created by xappm on 17.12.18.
//

#include <queue>
#include "FieldGenerator.hpp"



std::default_random_engine FieldGenerator::rand(time(NULL));



Field FieldGenerator::generate() {

    for(int i = 1; i < 18; i++) {
        for (int j = 1; j < 18; ++j) {
            freePoints.emplace_back(Point {i * 115, j * 115});
        }
    }

    ParkingZone zone = randParkingZone();
    while(minDistToWall(zone.location.points[3]) < 460) {
        zone = randParkingZone();
    }

    f = new Field(zone);

    updateFreePoints();

    int count = 0;
    std::uniform_int_distribution dist(0, (int)freePoints.size() - 1);
    while(count < 5) {
        auto p = std::begin(freePoints) + dist(rand);
        if(tryPutBox(Box(*p))) {
            count++;
        } else {
            freePoints.erase(p);
        }
        if(freePoints.empty()) {
            throw std::runtime_error("Generation failed: Couldn't arrange the boxes");
        }
        dist = std::uniform_int_distribution(0, (int)freePoints.size() - 1);
    }

    generateColors();
    generateTargetColors();

    if (!isPassable()) {
        throw std::runtime_error("Generation failed: Field is not passable");
    }

    Field f_copy = *f;
    delete f;

    return f_copy;
}


// zone that should be free of field objects
Rect FieldGenerator::getFreeZone(const Box& b) {
    int min = min4(b.location.left, b.location.top,
                   Field::SIZE - b.location.right, Field::SIZE - b.location.bottom);

    Rect freeZone(0, 0, 0, 0);
    if(min == b.location.left) {
        freeZone.left = b.location.right;
        freeZone.top = b.location.center().y - FREE_ZONE_SIZE / 2;

    } else if(min == b.location.top) {
        freeZone.left = b.location.center().x - FREE_ZONE_SIZE / 2;
        freeZone.top = b.location.bottom;

    } else if(min == Field::SIZE - b.location.right) {
        freeZone.left = b.location.left - FREE_ZONE_SIZE;
        freeZone.top = b.location.center().y - FREE_ZONE_SIZE / 2;

    } else if(min == Field::SIZE - b.location.bottom) {
        freeZone.left = b.location.center().x - FREE_ZONE_SIZE / 2;
        freeZone.top = b.location.top - FREE_ZONE_SIZE;
    } else {
        std::cerr << "Min failed\n";
        exit(1);
    }
    freeZone.right = freeZone.left + FREE_ZONE_SIZE;
    freeZone.bottom = freeZone.top + FREE_ZONE_SIZE;

    if(freeZone.right > Field::SIZE) freeZone.right = Field::SIZE - 1;
    if(freeZone.bottom > Field::SIZE) freeZone.bottom = Field::SIZE - 1;
    if(freeZone.left < 0) freeZone.left = 0;
    if(freeZone.top < 0) freeZone.top = 0;

    return freeZone;
}



bool FieldGenerator::isAroundParkingZone(const Box& b) const {
    auto loc = f->parkingZone.location;
    auto contains = [loc](Point point) -> bool {
        return dist(point, loc.points[0]) < 460 ||
               dist(point, loc.points[3]) < 460;
        };

    return contains(b.location.leftTop()) || contains(b.location.rightBottom()) ||
           contains(b.location.leftBottom()) || contains(b.location.rightTop());
}



bool FieldGenerator::isPassable() const {
    if (f == nullptr || f->boxes.size() != 5) {
        throw std::runtime_error("Passability Check Error: Boxes generation stage is incomplete!");
    }



    return true;
}





int FieldGenerator::minDistToWall(const Box& b) const {
    return min4(b.location.left, b.location.top,
            Field::SIZE - b.location.bottom, Field::SIZE - b.location.right);
}



void FieldGenerator::generateColors() {
    if(f == nullptr || f->boxes.size() != 5) {
        throw std::runtime_error("Color Generation Error: Boxes generation stage is incomplete!");
    }

    std::vector<Color> colors = {Color::Blue, Color::Green, Color::Orange, Color::Red, Color::Yellow};

    auto it = f->boxes.begin();
    for (size_t i = 0; i < 5; ++i) {
        it->ownColor = colors.at(i);
        it++;
    }
}


void FieldGenerator::generateTargetColors() {
    if(f == nullptr || f->boxes.size() != 5) {
        throw std::runtime_error("Target Color Generation Error: Boxes generation stage is incomplete!");
    }

    std::vector<Color> colors = {Color::Green, Color::Orange, Color::Red, Color::Yellow};

    std::vector<Box> v(f->boxes.begin(), f->boxes.end());
    // can't use shuffle on a list (requires random access), but can use it on a vector
    std::shuffle(v.begin(), v.end(), rand);

    Color first = Color::Black;
    Color second = Color::Black;
    for (Box& b: v) {
        if (b.ownColor == Color::Blue) {
            ;

        } else if (first == Color::Black) {
            first = b.ownColor;

        } else if (second == Color::Black) {
            second = b.ownColor;
        }
    }

    auto blueBox = std::find_if(f->boxes.begin(), f->boxes.end(), [](auto b) { return b.ownColor == Color::Blue; });
    auto firstBox = std::find_if(f->boxes.begin(), f->boxes.end(), [first](auto b) { return b.ownColor == first; });
    auto secondBox = std::find_if(f->boxes.begin(), f->boxes.end(), [second](auto b) { return b.ownColor == second; });
    blueBox->targetColor = firstBox->ownColor;
    firstBox->targetColor = secondBox->ownColor;
    secondBox->targetColor = blueBox->ownColor;

    std::list<Box> leftBoxes = f->boxes;
    leftBoxes.remove_if([blueBox, firstBox, secondBox](auto& b) {
        return b.ownColor == blueBox->ownColor ||
               b.ownColor == firstBox->ownColor ||
               b.ownColor == secondBox->ownColor;
    });
    colors.erase(std::remove(colors.begin(), colors.end(), blueBox->targetColor), colors.end());
    colors.erase(std::remove(colors.begin(), colors.end(), firstBox->targetColor), colors.end());
    colors.erase(std::remove(colors.begin(), colors.end(), secondBox->targetColor), colors.end());

    Box& frontBox = *std::find_if(f->boxes.begin(), f->boxes.end(), [&leftBoxes](auto b) {
        return b.ownColor == leftBoxes.front().ownColor;
    });
    frontBox.targetColor = (colors.front() == frontBox.ownColor)
            ? colors.back() : colors.front();

    Box& backBox = *std::find_if(f->boxes.begin(), f->boxes.end(), [&leftBoxes](auto b) {
        return b.ownColor == leftBoxes.back().ownColor;
    });
    backBox.targetColor = (colors.front() == backBox.ownColor)
            ? colors.back() : colors.front();
}


// return true and updates free points if a box is put successfully
// otherwise returns false
bool FieldGenerator::tryPutBox(Box box) {
    if(!isBoxPositionValid(box)) {
        return false;
    }
    for (Box& putBox: f->boxes) {
        if(getFreeZone(box).overlaps(putBox.location) ||
           getFreeZone(putBox).overlaps(box.location) ||
           box.location.overlaps(putBox.location)) {
            return false;
        }
    }
    if(isAroundParkingZone(box) ||
       f->parkingZone.location.overlaps(getFreeZone(box)) ||
       f->parkingZone.getFieldOfSight().overlaps(box.location)) {
        return false;
    }
    f->boxes.push_back(box);
    auto loc = box.location;
    freePoints.erase(std::remove_if(freePoints.begin(), freePoints.end(),
            [&loc](auto point) {
                return point.x >= (loc.left - Field::CELL_SIZE * 3) &&
                       point.x <= (loc.right + Field::CELL_SIZE * 3) &&
                       point.y >= (loc.top - Field::CELL_SIZE * 3) &&
                       point.y <= (loc.bottom + Field::CELL_SIZE * 3);}), freePoints.end());

    return true;
}



bool FieldGenerator::isBoxPositionValid(const Box& b) const {
    int dists[] = {b.location.left, b.location.top,
                   Field::SIZE - b.location.bottom, Field::SIZE - b.location.right};
    for (int i = 0; i < 4; ++i) {
        for (int j = i+1; j < 4; ++j) {
            if(abs(dists[i] - dists[j]) < 230) {
                return false;
            }
        }
    }
    return true;
}



void FieldGenerator::updateFreePoints() {
    auto& zone = f->parkingZone.location;

    std::remove_if(freePoints.begin(), freePoints.end(), [&zone](auto p) {
        return dist(p, zone.points[0]) < 460 || dist(p, zone.points[3]) < 460;
    });
}



ParkingZone FieldGenerator::randParkingZone() {
    Point p1 = randPoint(460);

    // shift from position parallel to the upper wall
    Vector2f32 secondPointShifts[] = {
            {3, 0},
            {3, 1},
            {2, 1},
            {2, 2},
            {1, 2},
            {1, 3},
            {0, 3}
    };
    std::uniform_int_distribution dist(0, 5);
    Vector2f32 shift = secondPointShifts[dist(rand)];

    shift *= Field::CELL_SIZE;
    shift.setY(shift.y() * randSign());
    shift.setX(shift.x() * randSign());

    ParkingZone zone(p1, Point {(int)shift.x(), (int)shift.y()});

    return zone;
}



Point FieldGenerator::randPoint(int margin) {
    std::uniform_int_distribution dist(margin, Field::SIZE - margin);

    // make coordinates lie on the grid
    int x = dist(rand);
    x /= Field::CELL_SIZE;
    x *= Field::CELL_SIZE;
    int y = dist(rand);
    y /= Field::CELL_SIZE;
    y *= Field::CELL_SIZE;

    return {x, y};
}



int FieldGenerator::randSign() {
    if(std::uniform_int_distribution(0, 1)(rand) == 0) {
        return -1;
    } else {
        return 1;
    }
}

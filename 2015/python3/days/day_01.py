def day1_P1(data):
    up = 0
    down = 0
    for id, val in enumerate(data):
        if (val == "("):
            up = up+1
        if (val == ")"):
            down = down+1
    return up-down


def day1_P2(data):
    up = 0
    down = 0
    for id, val in enumerate(data):
        if (up-down == -1):
            return id
        if (val == "("):
            up = up+1
        if (val == ")"):
            down = down+1

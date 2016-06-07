function zebra(n) {
    return n % 2 == 0 ? [0, 0, 0, 255] : [255, 255, 255, 255];
}
function leveled(n) {
    var k = n;
    n = image.n;
    var brightness = n > 1 ? 255 * k * 4 / (n - 1) : 255;
    return [brightness, brightness, brightness , 255];
}
function classical(n) {
    return n == 0 ? [0, 0, 0, 255] : [255, 255, 255, 255];
}
function classicalNewton(attract) {
    var opacity = 255;
    var red = 0;
    var green = 0;
    var blue = 0;

    switch (attract) {
        case 1:
            red = 255;
            break;
        case 2:
            green = 255;
            break;
        case 3:
            blue = 255;
            break;
    }
    return [red, green, blue, opacity];
}
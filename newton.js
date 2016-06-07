cos = Math.cos(Math.PI / 3);
sin = Math.sin(Math.PI / 3);

function getAttract(x,y,i,n) {
    
    if (n == 0) return {at : 0,it : i};
    if (check(x, y, 1, 0))return {at : 1,it : i};
    if (check(x, y, -cos, sin))return {at : 2,it : i};
    if (check(x, y, -cos, -sin))return {at : 3,it : i};

    var a = x * x;
    var b = y * y;

    var X = 2 * x / 3 + (a - b) / (3 * Math.pow((a + b), 2));
    var Y = 2 * y * (1 - x / Math.pow((a + b), 2)) / 3;
    
    return getAttract(X, Y, i + 1, n - 1);
}


function check(x1, y1, x2, y2) {
    var epsilon = 0.0001;
    return Math.abs(x1 - x2) <= epsilon && Math.abs(y1 - y2) <= epsilon;
}
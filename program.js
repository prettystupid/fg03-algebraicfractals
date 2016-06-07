function Image(){

    this.left;
    this.top;
    this.right;
    this.bottom;
    this.width;
    this.height;
    this.n;
    this.color;
    this.method;
    this.re;
    this.im;

    this.readData = function(){
        this.n = document.getElementById("n").value;
        this.color = document.getElementById("colorType").value;
        this.method = document.getElementById("method").value;
        this.re = document.getElementById("re").value;
        this.im = document.getElementById("im").value;
        this.width = parseInt(document.getElementById("canvas").getAttribute("width"));
        this.height = parseInt(document.getElementById("canvas").getAttribute("height"));
    };

    this.newCoords = function (left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    };
    
    this.getPlaneCoordinates = function (x, y) {
        var i = x * (this.right - this.left) / (this.width - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.height - 1) + this.top;
        return {x: i, y: j};
    };
    
    this.colorIt = function (d) {
        var attract;
        var iteration = d;
        if (this.method == "newtonPools") {
            attract = d.at;
            iteration = d.it;
        }
        switch (this.color) {
            case "classical":
                if (this.method == "newtonPools")
                    return classicalNewton(attract);
                return classical(iteration);
            case "leveled":
                return leveled(iteration);
            case "zebra":
                return zebra(iteration);
        }
    };
}

image = new Image();
document.oncontextmenu = function (){
    return false;
};

function start(left,top,right,bottom) {
    image.newCoords(left,top,right,bottom);
    image.readData();
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(image.width, image.height);
    var fractalChoise = chooseFractal(image.method);
    draw(imageData, fractalChoise);

    context.putImageData(imageData, 0, 0);
}

function chooseFractal(method) {
    switch (method) {
        case "newtonPools":
            return function(point) {return getAttract(point.x, point.y, 0, image.n)};
        case "juliaSet":
            return function(point) {return countJulia(point.x, point.y, parseFloat(image.re), parseFloat(image.im), image.n)};
        case  "mandelbrotSet":
            return function(point) {return countMandelbrot(point.x, point.y, image.n);};
    }
}

function draw(imageData, fractalFunc) {
    for (var i = 0; i < image.width; ++i) {
        for (var j = 0; j < image.height; ++j) {
            var iterations = [i,j];
            var point = image.getPlaneCoordinates(i, j);
            colorPoint(imageData, image.colorIt(fractalFunc(point)), iterations);
        }
    }
}

function colorPoint(imageData, colorla, it) {
    var paint = colorla;
    imageData.data[4 * (it[0] + image.width * it[1])] = paint[0];
    imageData.data[4 * (it[0] + image.width * it[1]) + 1] = paint[1];
    imageData.data[4 * (it[0] + image.width * it[1]) + 2] = paint[2];
    imageData.data[4 * (it[0] + image.width * it[1]) + 3] = paint[3];
}


function mouseDownHandler(canvas, e) {
    var z = 4;
    var coords = canvas.relMouseCoords(e);

    var ox,oy;

    if (e.button === 0) {
        ox = image.width / z;
        oy = image.height / z;
    } else if (e.button === 2) {
       ox = image.width * z/2;
       oy = image.height * z/2;
    }

    var left = coords.x - ox;
    var top = coords.y - oy;
    var right = coords.x + ox;
    var bottom = coords.y + oy;

    var point1 = image.getPlaneCoordinates(left,top);
    var point2 = image.getPlaneCoordinates(right,bottom);

    start(point1.x, point1.y, point2.x, point2.y);
}

HTMLCanvasElement.prototype.relMouseCoords = function (event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while (currentElement = currentElement.offsetParent);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    canvasX = Math.round(canvasX * (this.width / this.offsetWidth));
    canvasY = Math.round(canvasY * (this.height / this.offsetHeight));

    return {x: canvasX, y: canvasY}
};

function click(){
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", function (e) {
        mouseDownHandler(canvas, e);
    }, false);
}

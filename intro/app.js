var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d'),
    n = 100, // number of line segments

    // define the math "window"
    xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10;


// ============= 0,0 to xMax,yMax line ================= //
drawDiagLine();

function drawDiagLine() {
    var i, x, y,
        percentX, percentY;

    c.beginPath(); // begin fresh drawing thing

    for (i = 0; i < n; i += 1) {
        percentX = i / (n - 1);
        percentY = i / (n - 1);
        x = percentX * canvas.width;
        y = percentY * canvas.height;
        c.lineTo(x, y);
    }
    c.stroke(); // finally draw the thing 
};
// ===================== end line ==================== //

// ============= draw sin wave ================= //
drawCurve();

function drawCurve() {
    var i, xPixel, yPixel, // used in for loop
        percentX, percentY, // vary between 0 and 1
        mathX, mathY;

    // need to define y as a function of x,
    // in the space of our math coordinates

    c.beginPath(); // begin fresh drawing thing
    for (i = 0; i < n; i += 1) {

        // introduce an intermediate coordinate space.
        // percentX varies between 0 and 1.
        // we project that to mathX, which varies between
        // xMin and xMax.
        percentX = i / (n - 1);
        mathX = percentX * (xMax - xMin) + xMin;

        // in the above 'math' space, we comput mathY
        // based on mathX. mathY is a function of mathX:
        mathY = Math.sin(mathX);

        // need to go from mathY to percentY so we can get from
        // percentY to the Y pixel. Invert the math that projects
        // it from percentX to mathX.  Take the mathX = stuff
        // from above, change all the x's to y's, like:
        //   mathY = percentY * (yMax - yMin) + yMin;
        // and solve for percent
        percentY = (mathY - yMin) / (yMax - yMin);

        xPixel = percentX * canvas.width;
        yPixel = percentY * canvas.height;
        c.lineTo(xPixel, yPixel);
    }
    c.stroke(); // finally draw the thing 
}
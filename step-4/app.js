// ============= animate our curve ================= //

/* For step 4, we want to store the equation inside the hash
 * part of the URL.
 *
*/

var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d'),
    n = 100, // number of line segments

    // define the math "window"
    xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10,
    
    time = 0,
    timeIncrement = 0.1,
    
    math = mathjs(),
    expr = '',  // we assign value of expr down in initExprFromHash
    scope = {
        x: 0,
        t: 0
    },
    tree;


// ==== main program ====
initExprFromHash();
drawCurve();
initTextField();
startAnimation();


// ============ function definitions ============== //
function drawCurve() {
    var i, xPixel, yPixel,  // used in for loop
        percentX, percentY, // vary between 0 and 1
        mathX, mathY;       // our math coordinates
    
    // clear canvas before each redraw
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw curve
    c.beginPath();
    for (i = 0; i < n; i += 1) {
        percentX = i / (n - 1);
        mathX = percentX * (xMax - xMin) + xMin;

        mathY = evaluateMathExpr(mathX);

        percentY = (mathY - yMin) / (yMax - yMin);
        
        // flip y coordinates
        percentY = 1 - percentY;

        xPixel = percentX * canvas.width;
        yPixel = percentY * canvas.height;
        c.lineTo(xPixel, yPixel);
    }
    c.stroke();
}


function evaluateMathExpr(mathX) {
    scope.x = mathX;
    scope.t = time;
    return tree.eval();
}


function initTextField() {
    
    var input = $('#inputField');
    
    // set initial text value programmatically using jQuery
    input.val(expr);
    
    // listen for changes using jQuery
    input.keyup(function (event) {
        setExpr(input.val());
        setHashFromExpr();
    });
    
}


function startAnimation() {

    (function animLoop() {
        // requestAnimationFrame takes a function: recursion!
        // schedule the param function to be called whenever the screen refreshes
        requestAnimationFrame(animLoop);
        render();
    }());
}

function render() {
    // increment time
    time += timeIncrement;

    // redraw plot
    drawCurve();
}

// gets the URL fragment after the #
function getHashValue() {
    return location.hash.substr(1);
}

// sets the URL fragment after the #
function setHashValue(value) {
    return location.hash = value;
}


function setExpr(newExpr) {
    expr = newExpr;
    tree = math.parse(expr, scope);
}


function initExprFromHash() {
    var hash = getHashValue();
    
    if (hash) {
        // assign our hash expression to expr
        setExpr(hash);
    } else {
        // set expr to our default math expression
        setExpr('sin(x+t)*x');
        setHashFromExpr();
    }
    $('#inputField').val(expr);
}

function setHashFromExpr() {
    setHashValue(expr);
}

// update screen after using back/fwd buttons
// listen for fragment value changes
window.addEventListener('hashchange', initExprFromHash);
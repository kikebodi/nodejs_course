//Import the object functions from the rectangle-1.js file.
var rect = require('./rectangle-1');

//This is the method that uses the Object functions.
function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    if (l < 0 || b < 0) {
        console.log("Rectangle dimensions should be greater than zero:  l = "
               + l + ",  and b = " + b);
    }
    else {
	console.log("The area of a rectangle of dimensions length = "
               + l + " and breadth = " + b + " is " + rect.area(l,b));
	console.log("The perimeter of a rectangle of dimensions length = "
               + l + " and breadth = " + b + " is " + rect.perimeter(l,b));
    }
}

//These are the calls for the method.
solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
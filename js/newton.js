function findRoot(b, e, iter = 0) {
    iter++
    var x = b - (Math.pow(b,3) + 10 * b - 9)/(3*Math.pow(b, 2) + 10)
    if(Math.abs(x - b) < e) {return {x, iter}}
    else {return findRoot(x, e, iter)}
}


module.exports = findRoot
function validInterval(a, b){
    return (Math.pow(b,3) + 10 * b - 9)*(Math.pow(a,3) + 10 * a - 9) < 0 ? true : false
}

module.exports = validInterval
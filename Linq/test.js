var Queryable= require('./linq.js')


var arr = []
for (var i = 0; i < 100; i ++) {
    arr.push(i)
}
function isEven(n) {
    return n % 2 === 0
}
function add3(n) {
    return n + 3
}
function sum(sum, n) {
    return sum + n
}
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite
function useRawLoop() {
    let result = 0
    for (let i = 0; i < arr.length; ++i) {
        let n = arr[i]
        if (n % 2 === 0) {
            n += 3
            result += n
        }
    }
    return result
}
function useLoop() {
    let result = 0
    for (let n of arr) {
        if (isEven(n)) {
            n = add3(n)
            result = sum(result, n)
        }
    }
    return result
}
function useArray() {
    return arr.filter(isEven)
        .map(add3)
        .reduce(sum, 0)
}
function useLINQ() {
    return arr.asQueryable()
        .filter(isEven)
        .map(add3)
        .reduce(sum, 0)
}
suite.add('RawLoop', useRawLoop)
    .add('Loop', useLoop)
    .add('Array', useArray)
    .add('Linq', useLINQ)
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });/**
 * Created by chizhang on 2017/8/19.
 */

/**
 * Created by chizhang on 2017/8/19.
 * 学习jim liu 在JavaScript中实现linq
 * 原文链接 http://jimliu.net/2017/02/04/a-failed-attemption-to-js-linq/
 * 环境 node v8.4.0
 * 通过iterator接口，将map、reduce、filter等操作不是立即执行而是返回一个iterator
 * 达到只遍历一次集合的目的
 *
 * tip:作者说node v8x以上优化了for of操作，但是我测了一下还是linq最慢。。。。。
 */

class Queryable {
    constructor(iterable) {
        this.iterable = iterable
    }

    [Symbol.iterator]() {
        let iterator = this.iterable[Symbol.iterator]()
        return iterator
    }

    filter(predicate) {
        let iterable = _filter(this, predicate)
        return new Queryable(iterable)
    }

    map(mapper) {
        let iterable = _map(this, mapper)
        return new Queryable(iterable)
    }

    reduce(reducer, initial) {
        let result = initial
        for (let item of this) {
            result = reducer(result, item)
        }
        return result
    }
}
function *_filter(iterable, predicate) {
    for (let item of iterable) {
        console.log('filter')
        let checked = predicate(item)
        if (checked) {
            yield item
        }
    }
}


function *_map(iterable, mapper) {
    for (let item of iterable) {
        console.log('map')
        let mapped = mapper(item)
        yield mapped
    }
}
Queryable.prototype.length = function () {
    return this.reduce(n => n + 1, 0)
}
Queryable.prototype.toArray = function () {
    return this.reduce((arr, it) => {
        arr.push(it)
        return arr
    }, [])
}
Array.prototype.asQueryable = function () {
    return new Queryable(this)
}
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
var sum = arr.asQueryable().filter(n => n >= 6)
    .map(n => n * 2)
    .reduce((sum, n) => sum + n, 0)
console.log(sum)
function *a() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
}
function *b() {
    for (item of a()) {
        console.log(item)
        yield item * 3
    }
}
for(item of b()){
    console.log(item)
}
module.exports = Queryable

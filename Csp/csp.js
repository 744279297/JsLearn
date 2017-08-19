/**
 * Created by chizhang on 2017/8/19.
 */
function *eventListeringByCoroutine() {
    var eventSource = someMagicFuntion()
    while (true) {
        var e = yield eventSource.take()
        document.querySelector('#logger').innerHTML = e.pageX + ',' + e.pageY
    }
}
startCoroutine(eventListeringByCoroutine)
function startCoroutine(generatorFunction) {
    var iter = generatorFunction()

    function step(data) {
        var it = iter.next(data)
        if (it.done) {
            return
        }
        var callback = it.value
        callback(function (val) {
            step(val)
        })
    }

    step()
}
function someMagicFuntion() {
    var taker
    var iter = {
        take: function () {
            return function (callback) {
                taker = function (e) {
                    callback(e)
                }
            }
        }
    }

    function put(e) {
        if (!taker) {
            return
        }
        var _taker = taker
        taker = null
        _taker(e)
    }

    document.querySelector('#main').addEventListener('mousemove', function (e) {
        put(e)
    })
    return iter
}
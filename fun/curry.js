/**
 * Created by chizhang on 2017/8/20.
 */

var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (arg) => judge(...args, arg)


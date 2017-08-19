/**
 * Created by chizhang on 2017/8/19.
 */
function Channel() {
    this.channel = []
    this.scheduler = []
    this.registers = []
}
Channel.prototype = {
    put: function (value) {
        this.channel.push(value)
    },
    register: function (register) {
        var self = this
        register.getChannelValue = function () {
            return self.channel.pop()
        }
        this.registers.push(register)
    }
}
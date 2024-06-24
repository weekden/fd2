const getCounter = function(a = 0) {
    const counter = {
        currentCount: a,

        log: function() {
            console.log(this.currentCount);
            return this;
        },

        count: function(value) {
            this.currentCount += value;
            return this;
        },

        reset: function() {
            this.currentCount = 0;
            return this;
        },
    }
    return counter;
}

getCounter().log().count(5).log().count(3).log().reset().log().count(8).log().count(3).count(7).log();
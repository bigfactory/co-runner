function coRunner(genFn, callback) {
    var generator = genFn();
    var result = generator.next();

    function check(result) {
        if (result.done) {
            callback(null, result.value);
            return;
        }

        var fn = result.value;
        fn(function(err, data) {
            if(err){
                var isContinue = callback(err);
                if(isContinue === false){
                    return;
                }
            }
            var result = generator.next(data);
            check(result);
        });
    }

    check(result);
}

module.exports = coRunner;
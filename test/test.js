var path = require('path');
var fs = require('fs');
var thunkify = require('thunkify');
var runner = require('../');

var getFile = thunkify(function(){
    fs.readFile.apply(fs, arguments);
});

describe('co-runner', function() {
    it('should exactly the same result', function(done) {

        function* getFileGenerator(list) {
            var result = [];
            var content;
            for (var i = 0, len = list.length; i < len; i++) {
                content = yield getFile(list[i]);
                result.push(content);
            }
            return result;
        }


        var list = [
            path.join(__dirname, './files/1.txt'), 
            path.join(__dirname, './files/2.txt')
        ];

        console.log(list)


        runner(getFileGenerator(list), function(err, result){
            if(err){
                return false;
            }
            result.length.should.be.eql(2);
            result[0].toString().should.be.eql('abc');
            result[1].toString().should.be.eql('ddd');
            done();
        });
    });
});
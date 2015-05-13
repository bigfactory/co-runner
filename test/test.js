var fs = require('fs');
var thunkify = require('thunkify');
var runner = require('../');

var getFile = thunkify(function(){
    fs.readFile.apply(fs, arguments);
});

function* getFileGenerator() {
    var list = ['./files/1.txt', './files/2.txt'];
    var result = [];
    var content;

    for (var i = 0, len = list.length; i < len; i++) {
        content = yield getFile(list[i]);
        result.push(content);
    }
    
    return result;
}

runner(getFileGenerator, function(err, result){
    if(err){
        //return false to break the flow
        return false;
    }
    console.log(result);
});
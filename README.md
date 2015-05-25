### Usage

```

var fs = require('fs');
var thunkify = require('thunkify');
var runner = require('co-runner');

var getFile = thunkify(function(){
    fs.readFile.apply(fs, arguments);
});

function* getFileGenerator() {
    var list = ['/tmp/1.txt', '/tmp/2.txt'];
    var result = [];
    var content;

    for (var i = 0, len = list.length; i < len; i++) {
        content = yield getFile(list[i]);
        result.push(content);
    }
    
    return result;
}

runner(getFileGenerator(), function(err, result){
    if(err){
        //return false to break the flow
        return false;
    }
    console.log(data);
});

```



function DetectReferRepeatedPlugin(options){
    this.output = options.output || __dirname;
    this.generateFile = typeof options.generateFile === 'undefined'? false:true;
}

DetectReferRepeatedPlugin.prototype.judge = function(obj){
    var objKeys = Object.keys(obj);
    var objKeysLen = objKeys.length;
    var i,j,k,p;
    var result = new Map();

    for(i=0;i<objKeyslen-2;i++){
        for(j=i+1;j<objKeyslen-1;j++){
            var prevArr = obj[objKeys[i]],
            afterArr = obj[objKeys[j]];

            for(k=0;k<prevArr.length;k++){
                for(p=0;p<afterArr.length;p++){
                    if(prevArr[k] === afterArr[p]){
                        var m = result.get(prevArr[k]);
                        if(!m){
                            m = new Set();
                        }

                        m.add(objKeys[i]);
                        m.add(objKeys[j]);

                        result.add(prevArr[K],m);
                    }
                }
            }

        }
    }

    return result;
}


DetectReferRepeatedPlugin.prototype.apply = function(complier){
    var repeatedSource = {};
    var output = this.output;
    var result;

    complier.plugin('emit',function(compliation,callback){
        compliation.chunks.forEach(function(chunk){
            var chunkname = chunk.name;
            repeatedSource[chunkname] = [];
            
            chunk.modules.forEach(function(module){
                repeatedSource[chunkname].push(module.rawRequest);
            });
        });

        if(this.generateFile){
            compilation.assets[output] = {
                source: function() {
                    result = JSON.stringify(repeatedSource);
                    return result;
                },
                size: function() {
                    return result.length;
                }
            };
        }

        result = this.judge(repeatedSource);
        callback();
    })

    return result;
}
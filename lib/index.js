const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const warning = chalk.keyword('orange');


function DetectReferRepeatedPlugin(){
}

DetectReferRepeatedPlugin.prototype.judge = function(obj){
    let objKeys = Object.keys(obj);
    let objKeysLen = objKeys.length;

    let chunkArray = [];
    let totalArray = [];
    let moduleResult = {};
    let result = {};


    for(let i=0;objKeysLen>0&&i<objKeysLen;i++){
        let oKey = objKeys[i];
        let oKeyLen = obj[oKey].length;


        chunkArray = chunkArray.concat(new Array(oKeyLen).fill(oKey));
        totalArray = totalArray.concat(obj[oKey]);
    }


    for(let j=0;totalArray.length&&j<totalArray.length;j++){
        let req = totalArray[j] || '';
        
        let moduleName = req.split('/').slice(-1)[0];

        if(!moduleResult[moduleName]){
            moduleResult[moduleName] = new Set();
        }

        moduleResult[moduleName].add(chunkArray[j]);
    }


    let moduleKeys = Object.keys(moduleResult);

    for(let k=0;moduleKeys.length&&k<moduleKeys.length;k++){

        let moduleKey = moduleKeys[k];

        let moduleReferLen = moduleResult[moduleKey].size;

        if(moduleReferLen>=2){
            result[moduleKey] = Array.from(moduleResult[moduleKey]);
        }

    }

    console.log(warning(JSON.stringify(result,null,'\t')));
    
    return result;

}


DetectReferRepeatedPlugin.prototype.apply = function(complier){
    let repeatedSource = {};
    let self = this;

    complier.plugin('after-emit',function(compliation,callback){
        compliation.chunks.forEach(function(chunk){
            let chunkname = chunk.name;
            repeatedSource[chunkname] = [];


            chunk.forEachModule(function(module){

                repeatedSource[chunkname].push(module.rawRequest);

            });
        });


        self.judge(repeatedSource);

        callback();
    })

}

module.exports = DetectReferRepeatedPlugin;
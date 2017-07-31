const expect = require('expect');
const fs = require('fs');
const webpack = require('webpack');

const config = require('./fixtures/webpack.config.js');

const webpackCompiler = webpack(config);


function isPlainObject(obj){
	return typeof obj === 'object' && obj!==null && obj !== obj.window && Object.getPrototypeOf(obj) === Object.prototype;
}


describe('to log repeatedly bundled modules',function(){

    it('should return a plain json',function(done){
        
        webpackCompiler.run((err,stats)=>{
            expect(err).toBe(null);

            let content = fs.readFileSync('test/fixtures/res.json','utf8');
            let isJson = isPlainObject(JSON.parse(content));

            expect(isJson).toBe(true);

            done();

        })

    })


})

var assert = require('assert')
var mocha = require('mocha')
var watcher = require('../watcher')

describe('watcher', () => {
    /*describe('#isSame()', () =>{
        it('is same', () =>{
            let a = { "0xbf964e4972c8c39a9a7bf81fd6bb657dc15d5d761a508b34a895e7d9da07a69b" : true }
            let b = { "0xbf964e4972c8c39a9a7bf81fd6bb657dc15d5d761a508b34a895e7d9da07a69b" : true }
            assert.equal(watcher.isSame(a, b), true);
        })
        it('is not same', () =>{
            let a = { "0xbf964e4972c8c39a9a7bf81fd6bb657dc15d5d761a508b34a895e7d9da07a69b" : true }
            let b = { "0x1ed1eff3312985461c3a6fe55eb904f3cbe1456c6190fc2eb17958ad4039a046" : true }
            assert.equal(watcher.isSame(a, b), false);
        })
        it('is same 2', () =>{
            let a = {  }
            let b = {  }
            assert.equal(watcher.isSame(a, b), true);
        })
    })*/
    describe('#getNewerEntries(olde,newe)', () =>{
        it('is same', () =>{
            let a = { "0xbf964e4972c8c39a9a7bf81fd6bb657dc15d5d761a508b34a895e7d9da07a69b" : true }
            let b = { "0xbf964e4972c8c39a9a7bf81fd6bb657dc15d5d761a508b34a895e7d9da07a69b" : true }
            assert.deepEqual(watcher.getNewerEntries(a, b), []);
        })
        it('is diff', () =>{
            let a = { "0xbf964e4972c8c39a9a7bf81fd6bb657dc15d5d761a508b34a895e7d9da07a69b" : true }
            let b = { "0x1ed1eff3312985461c3a6fe55eb904f3cbe1456c6190fc2eb17958ad4039a046" : true }
            assert.deepEqual(watcher.getNewerEntries(a, b), ["0x1ed1eff3312985461c3a6fe55eb904f3cbe1456c6190fc2eb17958ad4039a046"]);
        })
    })
})

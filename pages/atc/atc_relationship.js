var optionList = new Array("0")
var supportedOpt = ["+","=","c"]
var lvDic = {"2":[["祖父","祖母"],["祖父","祖母"],["外祖父","外祖母"]],"1":[["父亲","母亲"],["伯叔","姑"],["舅","姨"]],"0":[["兄","妹"],["堂兄弟","堂姐妹"],["表兄弟","表姐妹"]],"-1":[["儿","女"],["侄子","侄女"],["外甥","外甥女"]],"-2":[["孙子","孙女"],["孙子","孙女"],["外孙","外孙女"]]}
var basicDic = {"父":[1,0,0],
                "母":[1,1,0],
                "子":[-1,0,0],
                "女":[-1,1,0],
                "兄":[0,0,0],
                "妹":[0,1,0]}
class Relation {
    constructor(lv, sx, dir) {
        this.lv = lv            //plus in
        this.sx = sx            //set in
        this.dir = dir          //set in
        this.namestring = "还是叫名字吧"
    }
    get relationName(){
        this.namestring = "还是叫名字吧"
        var namestring_prefix = ""
        var lv_value = this.lv
        if(this.lv > 2){
            var pre = this.lv - 2
            for (var i = 0; i < pre; i++){
                namestring_prefix += "曾"
            }
            lv_value = 2
        }else if(this.lv == -3) {
            namestring_prefix += "玄"
            lv_value = -2
        }else if(this.lv < -2) {
            var pre = -this.lv - 2
            for (var i = 0; i < pre; i++){
                namestring_prefix += "曾"
            }
            lv_value = -2
        }
        var currentDic = lvDic[lv_value + ""]       //list(lv_value between 2 to -2)
        var offset = 0
        if (this.dir < currentDic.length) {
            //get call set
            offset = this.dir
        }
        this.namestring = currentDic[offset][this.sx]        //sx between 0 to 1
        this.namestring = namestring_prefix + this.namestring
        return this.namestring
    }
}

function getStrinDisplay(inputStr){
    var optionTop = optionList.length>0?optionList.pop():''
    var input = makeRelation(inputStr)
    var display = input
        var topValue = parseInt(optionTop)
        if (!isInputOpt(input) && !isInputOpt(optionTop)) {
            optionTop = input
            display = optionTop
        }else {
            if(input == "c") {
                cleanUp()  //clean list?
                display = 0
                return display
            } else if (input == "=") {
                //make answer
                optionTop = makeListResult(optionList,optionTop)
                display = optionTop
            } else {
                optionTop = makeListResult(optionList,optionTop)
                optionList.push(optionTop)
                optionTop = input
                display = optionTop
            }
        }
        optionList.push(optionTop)
    return display.relationName
}

function makeRelation(input) {
    var attr_list = basicDic[input]
    if (!attr_list || attr_list.length == 0) {
        return input
    } 
    var relation = new Relation(attr_list[0],attr_list[1],attr_list[2])
    return relation
}

function isInputOpt(input)
{
    for(var index = 0; index < supportedOpt.length; index++) {
        var opt = supportedOpt[index]
        if(opt == input)
        {
            return true
        }
    }
    return false
}

function makeListResult(optionList,optionTop)
{
    var result = '0'
     if (optionList.length < 2) {
        return optionTop
    }
    var optionValue = optionList.pop()
    var last_value = optionList.pop()
    var result = makeResult(last_value,optionTop,optionValue)
    return  result
}

function makeResult(first, second, opt) {
    var new_lv = first.lv+second.lv
    var new_sx = second.sx
    var new_dir = first.dir>0?first.dir:second.dir
    if (first.lv != second.lv && first.dir == 0) {
        new_dir = new_sx + 1
    }
    var result = new Relation(new_lv,new_sx,new_dir)
    return result
}

function cleanUp() {
    console.log("clean up")
    optionList = new Array("0")
}

module.exports ={
    getStrinDisplay:getStrinDisplay,
    cleanUp:cleanUp
}
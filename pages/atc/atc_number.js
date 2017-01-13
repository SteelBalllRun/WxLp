var optionList = new Array("0")
// var inputList = new Array();
var supportedOpt = ["+","-","=","c","*"]
var trackback = ""
function getNumberDisplay(input){
    var optionTop = optionList.length>0?optionList.pop():''
    var display = input
        var topValue = parseInt(optionTop)
        if (!isInputOpt(input) && !isInputOpt(optionTop)) {
            optionTop = ((topValue != 0)?optionTop:'') + input
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
            } else if (isInputOpt(input) ^ isInputOpt(optionTop)) {
                optionTop = makeListResult(optionList,optionTop)
                optionList.push(optionTop)
                optionTop = input
                display = optionTop
            } else {
                optionTop =  input;
                display = optionTop;
            }
        }
        optionList.push(optionTop)
    trackback = optionList.toString
    return display
}
function getTackBack(){
    return trackback
}

function makeListResult(optionList,optionTop)
{
    if (optionList.length < 2) {
        return optionTop
    }
    var optionValue = optionList.pop()
    var last_value = optionList.pop()
    var result = makeResult(parseInt(last_value),parseInt(optionTop),optionValue)
    return  result
}

function makeResult(first, second, opt) {
    if (opt == "+") {
        return (first + second)
    } else if (opt == "-") {
        return (first - second)
    } else if (opt == "*") {
        return (first * second)
    } else if (opt == "c") {
        return "0"
    } else if (opt == "=") {
        return 
    }
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

function cleanUp() {
    console.log("clean up")
    optionList = new Array("0")
}

module.exports ={
    getNumberDisplay:getNumberDisplay,
    getTackBack:getTackBack,
    cleanUp:cleanUp
}
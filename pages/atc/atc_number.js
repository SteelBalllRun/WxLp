var optionList = new ArrayBuffer();
var inputList = new ArrayBuffer();
var supportedOpt = ["+","-","="]
var trackback = ""
function getNumberDisplay(input){
    if(!isInputOpt(input)){
        
    }
}

function isInputOpt(input)
{
    for(opt in supportedOpt) {
        if(opt == input)
        {
            return true
        }
    }
    return false
}

module.exports ={
    getNumberDisplay:getNumberDisplay
}
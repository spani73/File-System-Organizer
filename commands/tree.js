let fs = require("fs");
let path = require("path");
function treeFn(dirPath){
    if(dirPath == undefined){
        treehelper(process.cwd(), "");
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
           treehelper(dirPath,"");
        }else{
            console.log("enter valid path");
            return;
        }
    }
    
}
function treehelper(dirPath,indent){
    //is file or folder if file print else go inside
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
        let  fileName = path.basename(dirPath);
        console.log(indent+ "|------"+fileName);
    }else{
        let dirName = path.basename(dirPath);
        console.log(indent + "|--------" + dirName);
        let children = fs.readdirSync(dirPath);
        for(let i =0;i<children.length;i++){
            let childPath = path.join(dirPath,children[i]);
            treehelper(childPath , indent + "\t");
        }
    }
}

module.exports= {
    treeKey: treeFn
}
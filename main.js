let inputArr =  process.argv.slice(2);
let fs = require("fs");
let path = require("path");

let command = inputArr[0];
let types = {
    media: ["mp4", "mkv","jpg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch (command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case 'help':
        helpFn();
        break;
    default:
        console.log("Please put right command");
        break;            
}

function treeFn(dirPath){
    if(dirPath == undefined){
        console.log("enter the path");
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
function organizeFn(dirPath){
    //console.log("TreeCommand implemented for" , dirPath);
    let destPath;
    if(dirPath == undefined){
        console.log("enter the path");
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
           destPath = path.join(dirPath , "organized_files");
           if(fs.existsSync(destPath)==false){
           fs.mkdirSync(destPath);
           }
        }else{
            console.log("enter valid path");
            return;
        }
    }

    organizeHelper(dirPath,destPath);
}
function organizeHelper(src ,dest){
   let childNames = fs.readdirSync(src);
   //console.log(childNames);
   for(let i=0;i<childNames.length;i++){
       let childAddress = path.join(src ,childNames[i]);
       let isFile = fs.lstatSync(childAddress).isFile();
       if(isFile){
           //console.log(childNames[i]);
           let category = getCategory(childNames[i]);
           console.log(category);
           sendFiles(childAddress , dest ,category);
       }
   }
}
function helpFn(){ 
    console.log(`
        List of all the command:  
        abc
        nknnd  
    `);
}

function getCategory(name){
   let ext = path.extname(name);
   ext = ext.slice(1);
   for(let type in types){
      let cTypeArray =  types[type];
      for(let i=0;i<cTypeArray.length;i++){
          if(ext == cTypeArray[i]){
              return type;
          }
      }
   }
   return "others";
}
function sendFiles(srcFilePath,dest , category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
   let fileName = path.basename(srcFilePath); 
   let destFilePath = path.join(categoryPath,fileName);
   fs.copyFileSync(srcFilePath,destFilePath);
   fs.unlinkSync(srcFilePath);
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
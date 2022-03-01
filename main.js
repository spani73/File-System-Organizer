let inputArr =  process.argv.slice(2);
console.log(inputArr); 


let command = inputArr[0];
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
        console.log("Please put right command ajdas");
        break;            
}

function treeFn(dirPath){
    console.log("TreeCommand implemented for" , dirPath);
}
function organizeFn(dirPath){
    console.log("TreeCommand implemented for" , dirPath);
}
function helpFn(){ 
    console.log(`
        List of all the command:  
        abc
        nknnd  
    `);
}


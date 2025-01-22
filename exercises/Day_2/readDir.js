const fs = require("fs");


const dirpath=`..\\Day_1`;

fs.readdir(dirpath,(err,files)=>{
    try{
        console.log(`List of files in ${dirpath} :`)
        files.forEach((file)=>{
            console.log(`\n${file}`);
        });
    }
    catch(err){
        // console.log(err);
        console.log(`no file found in the directory`);
    }
});

import fs from 'node:fs'
import getContentType from './getContentType.js'

export default function sendResponses(res, filePath){
    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404,{"Content-Type":"application/json"});
                res.end(JSON.stringify({ error: "Not Found", message: "File does not exist." }))
            }else{
                res.writeHead(500,{"Content-Type": "text/plain"});
                res.end(`Server Error: ${err.code}`);
            }
        }else{
            const contentType = getContentType(filePath);
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, 'utf-8');
        }
        
    })
    return;
}
























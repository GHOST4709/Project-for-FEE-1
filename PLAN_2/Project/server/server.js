import { error } from 'node:console';
import http, { get } from 'node:http' 
import sendResponses from './utils/sendResponses.js'
import getContentType from './utils/getContentType.js';
const PORT = 8000;



// const server = http.createServer(async (req,res)=>{
    
//     const urlObj = new URL(req.url, `http://${req.headers.host}`)
    
//     if(urlObj.pathname.startsWith('/api') && req.method === "GET" ){
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader('Access-Control-Allow-Origin', '*')
//         res.setHeader('Access-Control-Allow-Methods', 'GET')
//         const filePath = path.join(__dirname,'../Login/login.html');
//             fs.readFile(filePath, (err, content) => {
//                 if (err) {
//                     res.writeHead(500, { "Content-Type": "text/plain" });
//                     res.end("Server Error: Could not read the HTML file.");
//                 } else {
//                     res.writeHead(200, { "Content-Type": "text/html" });
//                     res.end(content);
//                 }
//             });
//         res.statusCode = 200;
//         res.end();
//     }
//     else{
//         res.setHeader("Content-Type", "application/json");
//         res.statusCode = 404
//         const message = {
//             error: "Not Found",
//             message: "This request route does not exist."
//         }
//         res.end(JSON.stringify(message))
//     }
// });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            


// server.listen(PORT,()=>{
//     console.log(`The Server is Running on PORT ${PORT}`);
//     console.log("http://localhost:8000");
// })

// THis is to reconstruct dirName for ES_Modules 
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Project Root DR
const PUBLIC_DIR = path.join(__dirname, '..');

// The Server Bigins Here-------------------------------

const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    
    if ((urlObj.pathname.startsWith("/api")) && req.method === "GET") {
        // const filePath = path.join(__dirname, '../Login/login.html');
        // fs.readFile(filePath, (err, content) => {
        //     if (err) {
        //         res.writeHead(500, { "Content-Type": "text/plain" });
        //         res.end("Server Error: Could not read the HTML file.");
        //     } else {
        //         res.writeHead(200, { "Content-Type": "text/html" });
        //         res.end(content);
        //     }
        // });
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "API is working!" }));
    } 
    if ((urlObj.pathname.startsWith('/') || urlObj.pathname.startsWith('/login')) && req.method === "GET") {
        // res.writeHead(200, {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET"
        // });
        urlObj.pathname = '/Login/login.html';
        // res.end();
    } 
    
    // The Absolute Path for the Fetching 
    const filePath = path.join(PUBLIC_DIR, urlObj.pathname);
    
    
    
    // Security Check to Prevent directory traversal(Vibe)  (Comment If Not Needed in the Forther)
    if(!filePath.startsWith(PUBLIC_DIR)) {
        // res.writeHead(404, { "Content-Type": "application/json" });
        // res.end(JSON.stringify({
        //     error: "Not Found",
        //     message: "This request route does not exist."
        // }));
        res.writeHead(403, { "Content-Type": "text/plain" });
        return res.end("403 Forbidden");
    }
    
    
    // Fs File Read Currently Vibe Fix and Look for Better Options on StackOverflow
    // fs.readFile(filePath, (err, content) => {
    //     if (err) {
    //         if (err.code === 'ENOENT') {
    //             res.writeHead(404, { "Content-Type": "application/json" });
    //             res.end(JSON.stringify({ error: "Not Found", message: "File does not exist." }));
    //         } else {
    //             res.writeHead(500, { "Content-Type": "text/plain" });
    //             res.end(`Server Error: ${err.code}`);
    //         }
    //     } else {
    //         // 2. Extract the extension from the file path
    //         const extname = path.extname(filePath);
            
    //         // 3. Pass ONLY the extracted extension to your utility function
    //         const contentType = getContentType(extname);
            
    //         // Send the response with the correct Content-Type
    //         res.writeHead(200, { "Content-Type": contentType });
    //         res.end(content, 'utf-8');
    //     }
    // });
    sendResponses(res, filePath);
});
// >>>>>>> parent of 0ca845d (The Server is Finnaly fuckin working and Now Ready to finalize evrything, Since Everything is tested and working efficiently.)


server.listen(PORT,()=>{
    console.log(`The Server is Running on PORT ${PORT}`);
    console.log("http://localhost:8000");

})

// >>>>>>> parent of 0ca845d (The Server is Finnaly fuckin working and Now Ready to finalize evrything, Since Everything is tested and working efficiently.)

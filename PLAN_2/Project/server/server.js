import { error } from 'node:console';
import http, { get } from 'node:http' 

const PORT = 8000;


const server = http.createServer(async (req,res)=>{
    
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    
    if(urlObj.pathname.startsWith('/api') && req.method === "GET" ){
        res.setHeader("Content-Type", "application/json");
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        const filePath = path.join(__dirname,'../Login/login.html');
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Server Error: Could not read the HTML file.");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }
            });
        res.statusCode = 200;
        res.end();
    }
    else{
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404
        const message = {
            error: "Not Found",
            message: "This request route does not exist."
        }
        res.end(JSON.stringify(message))
    }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            


server.listen(PORT,()=>{
    console.log(`The Server is Running on PORT ${PORT}`);
    console.log("http://localhost:8000");
})


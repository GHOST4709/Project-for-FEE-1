import path from "node:path";

// export default function getContentType(ext) {

//     const types = {
//     ".js": "text/javascript",
//     ".css": "text/css",
//     ".json": "application/json",
//     ".png": "image/png",
//     ".jpg": "image/jpeg",
//     ".jpeg": "image/jpeg",
//     ".gif": "image/gif",
//     ".svg": "image/svg+xml"
//     }
    
//     return types[ext.toLowerCase()] || "text/html"
// }


export default function getContentType(filePath) {
    const ext = String(path.extname(filePath)).toLowerCase();
    const types = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml"
    };
    
    return types[ext] || "application/octet-stream";
}


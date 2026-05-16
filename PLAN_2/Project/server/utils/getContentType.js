import path from "node:path";

// <<<<<<< HEAD
export default function getContentType(filePath) {
    // Extract just the extension from the full file path
    const ext = String(path.extname(filePath)).toLowerCase();

    const types = {
        ".html": "text/html",  // <-- I forgot this line last time!
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".mp4": "video/mp4"
    };
    
    // Return the correct type, or default to a generic download
    return types[ext] || "application/octet-stream";
}
// =======
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


// >>>>>>> c27a31f (Revert "The Server is Finnaly fuckin working and Now Ready to finalize evrything, Since Everything is tested and working efficiently.")

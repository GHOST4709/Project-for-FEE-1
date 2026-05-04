import path from "node:path";

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
        ".svg": "image/svg+xml"
    };
    
    // Return the correct type, or default to a generic download
    return types[ext] || "application/octet-stream";
}
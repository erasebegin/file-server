const fs = require("fs");
const dirTree = require("directory-tree");

const rootDir = "./server_files";

const tree = dirTree(rootDir);

function getFilesWithType(dir) {
    const files = fs.readdirSync(dir);
    return files.map((file) => {
        if (fs.lstatSync(dir + "/" + file).isDirectory()) {
            return { name: file, isDirectory: true };
        } else {
            return { name: file, isDirectory: false };
        }
    });
}

export default function handler(req, res) {
    if (req.method === "GET") {
        const files = getFilesWithType(rootDir);
        res.status(200).json({ currentDirectory: files, tree });
    }

    if (req.method === "POST") {
        console.log({ body: req.body.directoryName });
        res.status(200).json({
            currentDirectory: getFilesWithType(req.body.directoryName),
        });
    }
}

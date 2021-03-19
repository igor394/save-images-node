// fs, http, path modules. db
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const Image = db.image;

//server
http.createServer((req, res) => {
        if (req.url === '/') {
            sendResource('index.html', 'text/html', res);
        }
        else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST') {
            saveUploadFile(req, res);
        }
        else {
            sendResource(req.url, getContentType(req.url), res);
        }
}).listen(3500, () => {
    console.log('server start 3500');
});


//send resource(отправка ресурса)
function sendResource (url, contentType, res){
    // console.log(`sRurl: ${url}`);
    let file = path.join(__dirname , '/static/', url);

    // console.log(`sFile: ${file}`);
    fs.readFile(file, (err, content)=>{
        if(err){
            res.writeHead(404);
            res.write('file not found');
            res.end();
            // console.log(`error 404 ${file}`)
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
            res.end();
            // console.log(`response --- ${file}`)
        }
    })
}
// type of content
function  getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        default:
            return "application/octate-stream"
    }
}
//save files
function saveUploadFile(req, res) {
    let fileName = path.basename(req.url);
    let file = path.join(__dirname, 'uploads', fileName);
    let imageFolder = path.join(__dirname, 'static/images', fileName);

    //Write image file in temp folder 'uploads'
    req.pipe(fs.createWriteStream(file));
    req.on('end', ()=>{
        //copy image file in folder 'uploads'--> 'static/images'
        fs.copyFile(file, imageFolder, err => {
            if (err) {
                console.log(err);
            }
            // delete image file in temp folder 'uploads'
            fs.unlink(file, err => {
                if(err){
                    console.log(err);
                }
            })
        });
        res.writeHead(200,  {'Content-Type': 'text'});
        res.write(fileName);
        res.end();
    });

}

//save writeToDataBase
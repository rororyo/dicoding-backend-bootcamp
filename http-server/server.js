import http from 'http';

const requestListener=(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.statusCode=200;

    //extract method
    const {method} = req;
    if (method== 'GET'){
        res.end('<h1>Hello World</h1>');
    }
    if (method=='POST'){
        let body= [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on ('end',()=>{
            body=Buffer.concat(body).toString();
            const {name}=JSON.parse(body);
            res.end('<h1>Halo '+name+'</h1>');
        })
       
    }


};

const server = http.createServer(requestListener)


server.listen(3000,'localhost',()=>{
    console.log('server is listening on port 3000...')
})
import http from 'http';

const requestListener=(req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.setHeader('Powered-by','Node.js');
const {url,method} = req
if(url=='/'){
    if(method==='GET'){
        res.statusCode=200;
res.end(JSON.stringify({message:"Homepage"}))
    }
    else{
        res.statusCode=401;
        res.end(JSON.stringify({message:`Halaman tidak dapat diakses dengan ${method}  request`}))
    }

}
 if(url === '/about') {
        if(method==='GET'){
            res.statusCode=200;
            res.end(JSON.stringify({message:"Halaman About"}))
            //res.end("Halaman About")

        }
        if(method=='POST'){
            res.statusCode=200;
            let body= []
            req.on('data',(chunk)=>{
                body.push(chunk)
            })
            req.on('end',()=>{
                body= Buffer.concat(body).toString()
                const{name}=JSON.parse(body)
                res.end(JSON.stringify({message:`Halo ${name} ini adalah halaman about`}))
            })
        }
        else{
            res.statusCode=401
res.end (JSON.stringify({message:`<p>Halaman tidak dapat diakses dengan ${method} request `}))
        }

    }
else{
    res.statusCode=404
    res.end(JSON.stringify({
        message:'Halaman tidak ditemukan'
    }))
}

};

const server = http.createServer(requestListener)


server.listen(3000,'localhost',()=>{
    console.log('server is listening on port 3000...')
})
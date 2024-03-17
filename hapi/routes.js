const routes = [{
    method: 'GET',
    path: '/',
    handler: (request, h)=>{
        return 'Homepage';
    }
},
{
method: '*',
path: '/',
handler: (request, h)=>{
    const method = request.method.toUpperCase();  
    return `Halaman tidak dapat diakses dengan method ${method} `
}
},

//about page

{
    method: 'GET',
    path:'/about',
    handler: (request,h)=>{
        return 'About Page'
    }
},
{
    method:'*',
    path: '/about',
    handler:(request,h)=>{
        const method = request.method.toUpperCase();  
        return `Halaman tidak dapat diakses dengan method ${method} `
    }
},
//users page
{
 method: 'GET',
 path:'/users/{username?}',
 handler:(request,h)=>{
    const {username}=request.params
    return `Halaman user ${username}`
 }
},
{
    method: 'POST',
    path:'/user',
    handler:(request,h)=>{
return h.response('created').code(201);
    }
   },

//hello path
{
method: 'GET',
path: '/hello/{name?}',
handler:(req,h)=>{
    const {name= 'stranger'}=req.params
    const {lang}= req.query;  //?name=john&id
    if(lang==='id'){
        return `Hai ${name}`
    }
    return `Hello ${name}`
}
},
//query paramaters
{
method: 'GET',
path: '/query',
handler:(req,h)=>{
const {name,location}=req.query
return `Hello ${name} from ${location}`
}
},

//404 page
{
    method:'*',
    path:'/{any*}',
    handler:(request,h)=>{
        return 'Halaman tidak ditemukan'
    }
}

]
export default routes
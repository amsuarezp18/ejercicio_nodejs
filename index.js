const axios = require("axios")
const http = require("http")
const url = require("url")
const fs = require("fs")

async function getSuppliers(){
    const res = await axios.get(
        'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
    );
    return res.data;
}

async function getCustomers(){
    const res = await axios.get(
        'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'
    );
    return res.data;
}

http
    .createServer(function(req, resp){
        // get request from user
        var url_req = url.parse(req.url).pathname
        var render;

        if ( url_req == "/api/proveedores"){
            getSuppliers().then((data) =>{
                // fs module to read data from promise
                fs.readFile("proveedores.html", "utf-8", (err, dat) =>{
                    if( err){
                        resp.writeHead(502, {'Content-type': 'text/html'});
                        return resp.end('The server had an internal error ')
                    }
                    else{
                        // Create table
                        render =
                            resp.writeHead(200, {'Content-type': 'text/html'});
                            resp.write(dat);
                            resp.write(
                                '<table class="table table-striped"> \
                                <thead> \
                                    <tr> \
                                    <th scope="col">#</th> \
                                    <th scope="col">First</th> \
                                    <th scope="col">Last</th> \
                                    <th scope="col">Handle</th> \
                                    </tr> \
                                </thead> \
                                <tbody> \
                                </tbody> \
                                </table>');
                        
                        resp.end(render) 
                    }
                });
            });
        }

        else if ( url_req == "/api/clientes"){
            getCustomers().then((data)=>{
                // fs module to read data from promise
                fs.readFile("clientes.html", "utf-8", (err, dat) =>{
                    if( err){
                        resp.writeHead(502, {'Content-type': 'text/html'});
                        return resp.end('The server had an internal error ')
                    }
                    else{
                        //Create table
                    }
                });
            });
            
        }
        else{
            // The page doesn't existe, return a 404
            resp.writeHead(404, {'Content-type': 'text/html'});
            resp.end('Sorry, the page you tried can not be found.')
        
        }
    })
      .listen(8001)
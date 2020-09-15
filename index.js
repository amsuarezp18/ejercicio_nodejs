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
      resp.writeHead(200, {'Content-type': 'text/html'});
      resp.end('Hello word')
      
    })
      .listen(8001)
const express = require ("express");
const fs = require ("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//This joining request static file like .css .js and redirects to public folder//
app.use(express.static(path.join(__dirname,"public")));
//extracts the json portion from a post request//
app.use(express.json());

//HTML routes//
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"));
});
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"));
});

//api routes//
app.get("/api/notes",(req,res)=>{
    res.json(getData());
});

app.post("/api/notes",(req,res)=>{
    const data=getData();
    const newnote=req.body;
    newnote.id=Date.now();
    data.push(newnote);
    saveData(data);
    res.send();
});

app.delete("/api/notes/:id",(req,res)=>{
    const id =Number(req.params.id);
    
    const data= getData();
    const index=data.findIndex(note=>note.id===id);
    
    if(index>=0){
        data.splice(index,1);
        saveData (data);
    }
    res.send();
});

app.listen(3000,()=>{
    console.log ("express is listening on port 3000");
});

function getData(){
    const data =fs.readFileSync("./db/db.json");
    return JSON.parse(data);
}


function saveData(data){
    const path="./db/db.json";
    fs.writeFileSync(path,JSON.stringify(data));
}

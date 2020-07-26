const express = require('express')
const app = express()
const path = require('path')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const static = path.join(__dirname,'./Public')
const views = path.join(__dirname ,'./View')
app.set('view engine','hbs')
app.set('views',views)
app.use(express.static(static))
app.use(express.json())
app.get('/watchys', function (req, res) {
    try{
        console.log(encodeURI(req.query.link));    

        const request = require('request');
        var url =encodeURI(req.query.link)
  

    request(url, function (error, response, body) {
    const dom = new JSDOM(body);
    res.render('watchy.hbs',{player:dom.window.document.getElementsByClassName("WatchURL Gotoscroll nobind Hoverable")[0].href});

});
      
    }catch(e){
        res.status(400).send(e.message)
    }
    
})
 
app.listen(process.env.PORT || 3000)
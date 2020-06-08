const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/search', (req, res) => {
    res.render('search')
})
app.get('/result', (req, res) => {
    let query=req.query.search
    request('https://api.themoviedb.org/3/search/movie?api_key=cb97d1b21cc93c408b4dbae100f2c344&query='+query, (err, response, body) => {
        if (err) {
            console.log(err);
        }
        let data =JSON.parse(body)
        res.render('result',{data:data,searchQuery:query})    
    })
    
})
app.listen(3000, () => {
    console.log('Server started at port 3000');

})
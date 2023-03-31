const express = require('express');
const cors = require('cors')
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');//обработчик всех запросов корзины

const corsOptions = {
    origin: 'http://127.0.0.1:3000', // домен сервиса, с которого будут приниматься запросы
    optionsSuccessStatus: 200 // для старых браузеров
}
  
app.use(cors(corsOptions)); // если не указать corsOptions, то запросы смогут слать все запросы

app.use(express.json());
//app.use('/', express.static('public')); // отдаёт главную страницу фронта

app.use('/api/cart', cart);

app.get('/',(req,res)=>{
    res.send("hello world!!!!!!!!!");
})

// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
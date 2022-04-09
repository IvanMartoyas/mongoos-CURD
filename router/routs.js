const express = require('express');
const Quote = require('../model/Quotes');// подлкючаю файл с моделью (БД)
const router = express.Router();

// select all 
// http://localhost:3000/api/
router.get('/', async (req, res) => {

    const quotes = await Quote.find();
    res.json(quotes); 
})

// insert new
//http://localhost:3000/api/new
router.post('/new', async (req, res) => {

    // new Quote сохраняет данные в модель, req.body должен присывлать json такойже какой определён в схеме модели
    const newQuote = new Quote(req.body);

    // newQuote.save(); сохранить в базу данных
    const savedQuote = await newQuote.save();

    res.json(savedQuote);
})

// select by ID
// http://localhost:3000/api/item/62519e07d34b7c6bfcc04863
router.post('/item/:id', async (req, res) => {
// соотвественно если бы я в (/item:id) вместо id написал например test, то в findById я писал бы req.params.test
 
    // в коллекции id записывается как _id, в общем к find указываю поле и искомое значение
    const quote = await Quote.findById({ _id: req.params.id });
    res.json(quote); 
})


// delete
// http://localhost:3000/api/item/delete/62519eb7d34b7c6bfcc04865
router.delete('/item/delete/:id', async (req, res) => {

    const i_delete = await Quote.findByIdAndDelete({ _id: req.params.id });

    res.json(i_delete); 
})


// update
// http://localhost:3000/api/item/update/62519ec8d34b7c6bfcc04867
router.patch('/item/update/:id', async (req, res) => {

    // {$set: req.body} новые данные которые хочу записать
    // { _id: req.params.id } достаю нужную запись
    const i_update = await Quote.updateOne({ _id: req.params.id } , {$set: req.body} );

    res.json(i_update); 
})

// получть рандомную запись
// http://localhost:3000/api/item/rundom/
router.get('/item/rundom/', async (req, res) => {

    const count = await Quote.countDocuments(); // количество записей
    const random = Math.floor( Math.random() * count );
    
    const i_random = await Quote.findOne().skip(random)

    res.json(i_random); 
})

module.exports = router;
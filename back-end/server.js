const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/concert_planner', {
  useNewUrlParser: true
});


app.listen(3000, () => console.log('Server listening on port 3000!'));

const concertSchema = new mongoose.Schema({
  title: String,
  start: String,
  artist_id: String,
  friends_coming: String,
});

const Concert = mongoose.model('Concert', concertSchema);


// Create a new Concert
app.post('/api/concerts', async (req, res) => {
  const this_concert = new Concert({
    title: req.body.title,
    start: req.body.start,
    artist_id: req.body.artist_id,
  });
  try {
    await this_concert.save();
    res.send(this_concert);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete concert
app.delete('/api/concerts/:id', async (req, res) => {
    try {
    await Concert.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

});

// Edit a concert
app.put('/api/concerts/:id', async (req, res) => {
    try {
    const thisItem = await Concert.findOne({
      _id: req.params.id
    });
    
    thisItem.title = req.body.title;
    thisItem.description = req.body.description;
    thisItem.save();
    
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

});


// Get a list of all of the concerts
app.get('/api/concerts', async (req, res) => {
  try {
    let concerts = await Concert.find();
    res.send(concerts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a count
app.get('/api/concerts/count', async (req, res) => {
  try {
    let concerts = await Concert.find();
    res.send({count:concerts.length});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a single concert
app.get('/api/concerts/:id', async (req, res) => {
  try {
    const thisItem = await Concert.findOne({
      _id: req.params.id
    });
    
    res.send(thisItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



const express = require('express');
const path = require('path');
const shortid = require('shortid');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = require('./db');

app.get('/testimonials', (req, res) => {
  res.json(db);
});
app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});
app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if(testimonial)
    res.json(testimonial);
  else
    res.status(404).json({message: 'Testimonial not found'});
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  if(author && text){
    const newTestimonial = {
      id: shortid(),
      author,
      text,
    };
    db.testimonials.push(newTestimonial);
    res.status(201).json({message: 'OK'});
  }
  else
    res.status(400).json({message: 'Missing author or text in request body'});
});

app.put('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const {author, text} = req.body;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if(testimonial){
    testimonial.author = author || testimonial.author;
    testimonial.text = text || testimonial.text;
    res.json({message: 'OK'});
  }
  else
    res.status(404).json({message: 'Testimonial not found'});
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testiniomal = db.testimonials.find((item) => item.id === id);
  if(testiniomal !== -1){
    db.testimonials.splice(testiniomal, 1);
    res.json({message: 'OK'});
  }
  else
    res.status(404).json({message: 'Testimonial not found'});
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
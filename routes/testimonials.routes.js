const express = require('express');
const shortid = require('shortid');
const db = require('../db');
const router = express.Router();

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get('/', (req, res) => {
  res.json(db.testimonials);
});
router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if(!testimonial)
    return res.status(404).json({message: 'Testimonial not found'});

  res.json(testimonial);
});
router.post('/', (req, res) => {
  const {author, text} = req.body;
  const hasAuthorAndText = author && text;
  if(!hasAuthorAndText)
    return res.status(400).json({message: 'Missing author or text in request body'});

  const newTestimonial = {
    id: shortid(),
    author,
    text
  };

  db.testimonials.push(newTestimonial);
  res.status(201).json({message: 'OK'});
});
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const {author, text} = req.body;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if(!testimonial)
    return res.status(404).json({message: 'Testimonial not found'});

  const hasAuthorAndText = author && text;
  if(!hasAuthorAndText)
    return res.status(400).json({message: 'Missing author or text in request body'});

  testimonial.author = author;
  testimonial.text = text;

  res.json({message: 'OK'});
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const testimonialIndex = db.testimonials.findIndex((item) => item.id === id);
  if(testimonialIndex === -1)
    return res.status(404).json({message: 'Testimonial not found'});

  db.testimonials.splice(testimonialIndex, 1);
  res.json({message: 'OK'});
});

module.exports = router;
const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try{
    res.json(await Testimonial.find());
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {
  try{
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonialFromDB = await Testimonial.findOne().skip(rand);
    if(!testimonialFromDB)
      return res.status(404).json({message: 'Not found'});

    res.json(testimonialFromDB);
  }
  catch(err){
    res.json({message: err});
  }
};

exports.getById = async (req, res) => {
  try{
    const testimonialFromDB = await Testimonial.findById(req.params.id);
    if(!testimonialFromDB)
      return res.status(404).json({message: 'Not found'});

    res.json(testimonialFromDB);
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.addNew = async (req, res) => {
  try{
    const {author, text} = req.body;
    const newTestimonial = new Testimonial({author: author, text: text});
    await newTestimonial.save();
    res.json({message: 'OK'});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.update = async (req, res) => {
  const {author, text} = req.body;
  try{
    const testimonialFromDB = await Testimonial.findById(req.params.id);
    if(!testimonialFromDB)
      return res.status(404).json({message: 'Not found...'});

    testimonialFromDB.author = author;
    testimonialFromDB.text = text;
    await testimonialFromDB.save();
    res.json({message: 'OK'});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.delete = async (req, res) => {
  try{
    const testimonialFromDB = await Testimonial.findByIdAndDelete(req.params.id);
    if(!testimonialFromDB)
      return res.status(404).json({message: 'Not found...'});

    res.json({message: 'OK', deletedDocument: testimonialFromDB});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};
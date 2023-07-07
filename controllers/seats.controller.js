const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try{
    res.json(await Seat.find());
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {
  try{
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if(!seat)
      res.status(404).json({message: 'Not found'});
    else
      res.json(seat);
  }
  catch(err){
    res.json({message: err});
  }
};

exports.getById = async (req, res) => {
  try{
    const seat = await Seat.findById(req.params.id);
    if(!seat)
      res.status(404).json({message: 'Not found'});
    else
      res.json(seat);
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.addNew = async (req, res) => {
  try{
    const {day, seat, client, email} = req.body;
    const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
    await newSeat.save();
    res.json({message: 'OK'});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.update = async (req, res) => {
  const {day, seat, client, email} = req.body;
  try{
    const sea = await Seat.findById(req.params.id);
    if(sea){
      sea.day = day;
      sea.seat = seat;
      sea.client = client;
      sea.email = email;
      await sea.save();
      res.json({message: 'OK'});
    }
    else
      res.status(404).json({message: 'Not found...'});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.delete = async (req, res) => {
  try{
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if(seat)
      res.json({message: 'OK', deletedDocument: seat});
    else
      res.status(404).json({message: 'Not found...'});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};
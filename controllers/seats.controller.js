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
    const seatFromDB = await seatFromDB.findOne().skip(rand);
    if(!seatFromDB)
      return res.status(404).json({message: 'Not found'});

    res.json(seatFromDB);
  }
  catch(err){
    res.json({message: err});
  }
};

exports.getById = async (req, res) => {
  try{
    const seatFromDB = await Seat.findById(req.params.id);
    if(!seatFromDB)
      return res.status(404).json({message: 'Not found'});

    res.json(seatFromDB);
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
    const seatFromDB = await Seat.findById(req.params.id);
    if(!seatFromDB)
      return res.status(404).json({message: 'Not found...'});

    seatFromDB.day = day;
    seatFromDB.seat = seat;
    seatFromDB.client = client;
    seatFromDB.email = email;
    await seatFromDB.save();
    res.json({message: 'OK'});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};

exports.delete = async (req, res) => {
  try{
    const seatFromDB = await Seat.findByIdAndDelete(req.params.id);
    if(!seatFromDB)
      return res.status(404).json({message: 'Not found...'});

    res.json({message: 'OK', deletedDocument: seatFromDB});
  }
  catch(err){
    res.status(500).json({message: err});
  }
};
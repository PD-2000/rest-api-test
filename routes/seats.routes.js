const express = require('express');
const shortid = require('shortid');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.seats);
});
router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.seats.length);
  const randomSeats = db.seats[randomIndex];
  res.json(randomSeats);
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const seat = db.seats.find((item) => item.id === id);
  if(!seat)
    return res.status(404).json({message: 'Seat not found'});

  res.json(seat);
});
router.post('/', (req, res) => {
  const {day, seat, client, email} = req.body;
  const hasRequiredFields = day && seat && client && email;
  if(!hasRequiredFields)
    return res.status(400).json({message: 'Missing required fields in request body'});

  const newSeat = {
    id: shortid(),
    day,
    seat,
    client,
    email
  };

  db.seats.push(newSeat);
  res.status(201).json({message: 'OK'});
});
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const {day, seat, client, email} = req.body;
  const pickedSeat = db.seats.find((item) => item.id === id);
  if(!pickedSeat)
    return res.status(404).json({message: 'Seat not found'});

  const hasRequiredFields = day && seat && client && email;
  if(!hasRequiredFields)
    return res.status(400).json({message: 'Missing required fields in request body'});

  pickedSeat.day = day;
  pickedSeat.seat = seat;
  pickedSeat.client = client;
  pickedSeat.email = email;

  res.json({message: 'OK'});
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const seatIndex = db.seats.findIndex((item) => item.id === id);
  if(seatIndex === -1)
    return res.status(404).json({message: 'Seat not found'});

  db.seats.splice(seatIndex, 1);
  res.json({message: 'OK'});
});

module.exports = router;
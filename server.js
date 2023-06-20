const express = require('express');
const cors = require('cors');
const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({message: '404 not found...'});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port: 3000');
});
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeatsRequest, getRequests, loadSeats } from '../../../redux/seatsRedux';
import io from 'socket.io-client';
import './SeatChooser.scss';
import { SOCKET_URL } from '../../../config';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  const seatsNumber = 50;
  const takenSeats = seats.filter((item) => item.day === chosenDay).length;
  
  useEffect(() => {
    console.log('here!');
    const socket = io(SOCKET_URL);
    dispatch(loadSeatsRequest());
    socket.on('seatsUpdated', (seats) => dispatch(loadSeats(seats)));
  }, [dispatch])

  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat)
      return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    if(isTaken(seatId))
      return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;

    return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(seatsNumber)].map((_, i) => prepareSeat(i + 1))}</div>}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && (<p>Seats taken: {takenSeats}/{seatsNumber}</p>) }
    </div>
  )
}

export default SeatChooser;
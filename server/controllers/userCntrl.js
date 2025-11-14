import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const createUser = asyncHandler(async (req, res) => {
  console.log('creating a user');
  let { email } = req.body;
  
  const userExists = await User.findOne({ email });
  
  if (!userExists) {
    const user = await User.create(req.body);
    res.send({
      message: 'User registered successfully',
      user: user,
    });
  } else {
    res.status(201).send({ message: 'User already registered' });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date, id } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.bookedVisits.some((visit) => visit.id === id)) {
      return res.status(400).json({ message: 'This residency is already booked by you' });
    }

    user.bookedVisits.push({ id, date });
    await user.save();
    
    res.send('your visit is booked successfully');
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email }).select('bookedVisits');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).send({ bookedVisits: user.bookedVisits });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    user.bookedVisits.splice(index, 1);
    await user.save();

    res.send('Booking cancelled successfully');
  } catch (err) {
    throw new Error(err.message);
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favResidenciesID.includes(rid)) {
      user.favResidenciesID = user.favResidenciesID.filter((id) => id !== rid);
      await user.save();
      res.send({ message: 'Removed from favorites', user });
    } else {
      user.favResidenciesID.push(rid);
      await user.save();
      res.send({ message: 'Updated favorites', user });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email }).select('favResidenciesID');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).send({ favResidenciesID: user.favResidenciesID });
  } catch (err) {
    throw new Error(err.message);
  }
});
import asyncHandler from 'express-async-handler';
import Residency from '../models/Residency.js';

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  
  try {
    const residency = await Residency.create({
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
    });

    res.send({ message: 'Residency created successfully', residency });
  } catch (err) {
    if (err.code === 11000) {
      throw new Error('A residency with address already there');
    }
    throw new Error(err.message);
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await Residency.find().sort({ createdAt: -1 });
  res.send(residencies);
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await Residency.findById(id);
    
    if (!residency) {
      return res.status(404).json({ message: 'Residency not found' });
    }
    
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
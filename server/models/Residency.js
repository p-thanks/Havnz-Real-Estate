import mongoose from "mongoose";

const residencySchema = new mongoose.Schema(
  {
    title: 
    { 
      type: String, 
      required: true 
    },
    description: 
    { 
      type: String, 
      required: true 
    },
    price: 
    { 
      type: Number, 
      required: true 
    },
    address: 
    { 
      type: String, 
      required: true 
    },
    city: 
    { 
      type: String, 
      required: true 
    },
    country: 
    { 
      type: String, 
      required: true 
    },
    image: 
    { 
      type: String, 
      required: true 
    },
    facilities: 
    { 
      type: Object, 
      required: true 
    },
    userEmail: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

residencySchema.index
(
  { 
    address: 1, 
    userEmail: 1 
  }, 
  { 
    unique: true 
  }
);

export default mongoose.model("Residency", residencySchema);

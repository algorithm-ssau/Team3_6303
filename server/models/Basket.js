import mongoose from 'mongoose';

const BasketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Basket', BasketSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
    stripeSessionId: {
      type: String,
      required: true,
    },
    paymentIntentId: String,
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "bank_transfer"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    coursesPrices: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses",
        },
        price: Number,
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);

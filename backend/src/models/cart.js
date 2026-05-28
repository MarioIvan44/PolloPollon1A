/*
        Campos:
            customerId:
            products:
                productId:
                quantity:
                subtotal:
            total:
            status:
    */

import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers", //The name of the coleccion should be "customers" using pascalCase.
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false,
  },
);

//"Cart" is the name of the collection that is saved in the DB
export default model("Cart", cartSchema);

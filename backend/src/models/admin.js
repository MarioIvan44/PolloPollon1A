/*
        Campos:
            name:
            email:
            password:
            isVerified:
            loginAttempts:
            timeOut:
    */

import mongoose, { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    loginAttempts: {
      type: Number,
    },
    timeOut: {
      type: Date,
    },
  },
  {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false,
  },
);

//"Administrators" is the name of the collection that is saved in the DB
export default model("Administrators", adminSchema);
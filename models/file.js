const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const fileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
    expiresAt: {
      type: Date,
     required:true,
     default:Date.now(),
      index:{expires: "5m"}, 
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model('File',fileSchema);
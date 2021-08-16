const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const metainfoSchema = new Schema({
    id: {
    type: Schema.Types.ObjectId,
    ref: "contents",
  },

  experiment: {
    type: String,
  },

  lab: {
    type: String,
  },
  
  department: {
    type: String,
  },

  semester: {
    type: String,
  },

  year: {
    type: String,
  },

  college: {
    type: String,
  },
  
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = MetaInfo = mongoose.model("metainfo", metainfoSchema);

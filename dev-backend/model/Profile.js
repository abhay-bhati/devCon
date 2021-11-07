const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  skills: {
    type: [String],
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
      },
      current: {
        type: String,
        required: false,
      },
      description: {
        type: String,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
      },
      current: {
        type: String,
        required: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = mongoose.model("profile", ProfileSchema);

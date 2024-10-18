const { default: mongoose } = require('mongoose');

const definition = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
};

// globl mongoose instance
const IssueSchema = new mongoose.Schema(definition, { versionKey: false });

const IssueModel = mongoose.model('Issue', IssueSchema);

module.exports = { IssueModel };

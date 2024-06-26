const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    format: { type: String, required: true },
    date: { type: Date, required: true },
    size: { type: String, required: true },
    path: { type: String, required: true },
    active: { type: Boolean, default: true }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;

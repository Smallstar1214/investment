const mongoose = require('mongoose');

// Define the Document schema
const documentSchema = new mongoose.Schema({
    // Your other document fields here
    companyName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    document: [{
        icons: String,
        iconBg: String,
        fileName: String,
        fileType: String
    }],
    Updated: String,
    size: String,
    actions: [
        {preview: String},
    ],
    shareTo:String,
});

// Middleware to update the 'updatedDate' field whenever the document is updated
documentSchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

// Create the Document model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
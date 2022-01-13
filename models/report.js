const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining schema, template for data we will save locally
const Report = new Schema ({
        serviceName: { type: String, required: true },
        time: { type: Date, required: true },
        metric: { type: Array, required: true },
        numKPI:{ type: Number, required: true },
        success: { type: Boolean, required: true},
        error: { type: String, required: false}
});

module.exports = mongoose.model('Report', Report)
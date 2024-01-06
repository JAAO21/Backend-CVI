const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
    title: {
        type: String,
    },
    key: String,
    url: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
});



const ImageModel = mongoose.model("Image", ImageSchema);
module.exports = ImageModel;



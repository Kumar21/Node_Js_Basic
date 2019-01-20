const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
});
const customers = mongoose.model('customers', Schema);

function validateBody(validBody) {
    const schema1 = {
        name: Joi.string().min(5).required(),
        phone: Joi.required(),
        isGold: Joi.required()
    };
    return Joi.validate(validBody, schema1);
}

exports.customers = customers;
exports.validate = validateBody;
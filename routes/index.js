/* eslint-disable no-underscore-dangle */
const express = require('express');
const asyncHandler = require('express-async-handler');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIError = require('jsonapi-serializer').Error;
const mongoose = require('mongoose');

const router = express.Router();

const Category = require('../models/Category');

const CategorySerializer = new JSONAPISerializer('Category', {
    attributes: [
        'name',
        'max',
        'amount'
    ]
})

router.get('/', asyncHandler(async (req, res, next) => {
    try {
        const cats = await Category.find();
        res.status(200).send(CategorySerializer.serialize(cats));
        next();
    } catch (error) {
        next(error);
    }
}));

router.post('/', asyncHandler(async (req, res, next) => {
    try {
        const cat = new JSONAPIDeserializer({ keyForAttribute: 'camelCase'}).deserialize(req.body);

        const newCat = new Category(cat)
        res.status(200).send(CategorySerializer.serialize(newCat.save()));
        
    } catch (error) {
        next(error);
    }

}));
router.get('/', asyncHandler(async (req, res, next) => {

}));
router.get('/', asyncHandler(async (req, res, next) => {

}));

module.exports = router;

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
        const cat = await new JSONAPIDeserializer({ keyForAttribute: 'camelCase'}).deserialize(req.body);
        const newCat = await new Category(cat)
        res.status(200).send(CategorySerializer.serialize(await newCat.save()));
        next();
    } catch (error) {
        next(error);
    }

}));
router.patch('/:id', asyncHandler(async (req, res, next) => {
    try {
        const cat = await new JSONAPIDeserializer({ keyForAttribute: 'camelCase' }).deserialize(req.body);
        const findCat = await Category.findById(req.params.id);
        findCat.amount = cat.amount;
        await findCat.save();
        res.status(200).send(CategorySerializer.serialize(findCat));
        next();
    } catch (error) {
        next(error);
    }
}));
router.delete('/:id', asyncHandler(async (req, res, next) => {
    try {
        await Category.deleteOne({ _id: req.params.id });
        res.status(204).send({});
        next();
    } catch (error) {
        next(error);
    }
}));

module.exports = router;

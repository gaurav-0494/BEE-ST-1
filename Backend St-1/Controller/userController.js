const express = require('express');
const User = require('../model/User');

exports.createUser = async (req,res) => {
    try {
        const inputData = req.body;
        const details = await User.create(inputData);
        res.status(200).json({ message: 'Created Successfully'});
    } catch (error) {
        res.status(500).json({ message: error.stack});
    }
}

exports.user = async (req,res) => {}

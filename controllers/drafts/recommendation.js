"use strict";

const Recommendation = require("../models/recommendation");

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        // create movie in database
        let recommendation = await Recommendation.create(req.body);

        // return created movie
        return res.status(201).json(recommendation);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: "Error",
        });
    }
};

const read = async (req, res) => {
    try {
        // get movie with id from database
        let movie = await Recommendation.findById(req.params.id).exec();
        console.log(typeof req.params.id);
        // if no movie with id is found, return 404
        if (!movie)
            return res.status(404).json({
                error: "Not Found",
                message: `Recommendation not found`,
            });

        // return gotten movie
        return res.status(200).json(movie);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Fehler beim Lesen",
        });
    }
};

const readAllRecommendationsForUser = async (req, res) => {
    try {
      //let recommendations = await Recommendation.findListOfRecommendationsByUserId(req.params.id).exec();
      //let recommendations = await Recommendation.find({userId: req.params.id});
      //let rec2 = Recommendation.find({userId: req.params.id}).lean().exec(function (err, docs) {});
      //var ObjectId = require('mongoose').Types.ObjectId;
      //var String userId = req.params.id;
      //let recommendations = Recommendation.find({ userId: new ObjectId(req.params.id) }, function (err, docs) {});
      //let recommendations = await Recommendation.find({userId: ObjectId('60c718a44e5d0a0cd0552099')}).exec();
      //let recommendations = await Recommendation.findById(req.params.id).exec();
      //let recommendations = await Recommendation.find({userId: ObjectId(req.params.id)});
      let recommendations = await Recommendation.where('userId').equals(ObjectId(req.params.id));
      return res.status(200).json(recommendations);
    } catch (e) {
      console.log(err);
      return res.status(500).json({
          error: "Internal Server Error",
          message: "Fehler beim Lesen",
      });
    }
};
/*
const update = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        // find and update movie with id
        let movie = await Recommendation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        // return updated movie
        return res.status(200).json(movie);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};
*/
const remove = async (req, res) => {
    try {
        // find and remove movie
        await Recommendation.findByIdAndRemove(req.params.id).exec();

        // return message that movie was deleted
        return res
            .status(200)
            .json({ message: `Recommendation with id${req.params.id} was deleted` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: "Fehler beim Loeschen",
        });
    }
};

module.exports = {
    create,
    read,
    readAllRecommendationsForUser,
    //update,
    remove
};

const Rating = require("../models/Rating");
exports.createRating = async (req, res, next) => {
    const { value, user, device,email } = req.body;
    
    try {
        const rating = await Rating.create({
            value,
            user,
            device,
            email
        });
        return res.status(200).json({
            message: device + " received a " + value + " stars rating from " + user,
        })
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        })
    }
};
exports.getRatings = async (req, res, next) => {

    try {
        let ratings = await Rating.find({}).exec();
        return res.status(200).json(ratings);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};
exports.updateRating = async (req, res, next) => {
    const { id, value } = req.body;

    try {
        let rating = await Rating.findById(id);
        let updated = await Rating.updateOne(rating, { value: value })

        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};
exports.deleteRating = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Rating.findByIdAndRemove(id).exec();
        return res
            .status(200)
            .json({ message: `rating with id${id} was deleted` });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

exports.getDeviceAvgRating = async (req, res, next) => {
    const { device, user, email } = req.body;
    let rated = false;

    try {
        let value = 0;
        let ratings = await Rating.find({ device: device }).exec();
        for (let i = 0; i < ratings.length; i++) {
            if (email == ratings[i].email) {
                rated = true;
            }
            value += ratings[i].value
        }
        value = value / ratings.length;
        return res
            .status(200)
            .json({
                "avg": value,
                "ratings": ratings.length,
                "rated": rated});
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};
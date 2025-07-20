const FeaturesModel = require("../models/FeaturesModel");
const LegalModel=require("../models/LegalModel")

const FeaturesListService = async () => {
    try {
        let data = await FeaturesModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", message: e.message }; // ✅ clean error output
    }
};

const LegalListService = async (req) => {
    try {
        let type=req.params.type;
        let data = await LegalModel.find({type: type});
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", message: e.message }; // ✅ clean error output
    }
};

module.exports = {
    FeaturesListService,
    LegalListService
};
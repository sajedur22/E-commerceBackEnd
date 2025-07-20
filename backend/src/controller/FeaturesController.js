const {FeaturesListService, LegalListService} = require("../services/FeaturesServices");


exports.FeaturesList=async (req,res)=>{
    let result=await FeaturesListService(req);
    return res.status(200).json(result);
}
exports.LegalDetailsLis=async (req,res)=>{
    let result=await LegalListService(req);
    return res.status(200).json(result);
}
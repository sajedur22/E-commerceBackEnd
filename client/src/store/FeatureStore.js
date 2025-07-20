import {create} from "zustand";
import axios from "axios";

const FeatureStore=create((set)=>({
    FeaturesList:null,
    FeatureListRequest:async ()=>{
        let res=await axios.get('/api/v1/FeaturesList');
        if(res.data['status']==='success'){
            set({FeaturesList:res.data['data']});
        }
    },

    LegalsList:null,
    LegalsListRequest:async (type)=>{
        let res=await axios.get(`/api/v1/LegalsDetails/${type}`);
        if(res.data['status']==='success'){
            set({LegalsList:res.data['data']});
        }
    },



}))
export default FeatureStore;
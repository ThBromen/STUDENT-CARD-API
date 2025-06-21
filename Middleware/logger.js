
export const logger = (req,res,next)=>{
    console.log(res.body); 
    next();
};
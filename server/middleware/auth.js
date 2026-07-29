import jwt from jwt;

const auth = (req,res,next)=>{
    const header = req.headers.authorization;
    if(!header || !header.startswith("Bearer ")){
        return res.status(401).json({message:"No token provided"});
    }
    const token = header.split("")[1];
    try{
        const decoded = jwt.vertify(token,process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }catch(err){
        return res.status(401).json({message:"token invalid or expired"});
    }
};
export default auth;
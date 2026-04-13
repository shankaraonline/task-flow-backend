export const tenantScope = (req:any,res:any,next:any)=>{

  if(!req.user?.tenantId){
    return res.status(403).json({message:"Tenant missing"});
  }

  req.tenantId = req.user.tenantId;

  next();

};
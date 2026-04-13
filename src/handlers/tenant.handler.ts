import * as tenantService from "../services/tenant.service";

export const createTenant = async (req:any,res:any,next:any)=>{

  try{

    const tenant = await tenantService.createTenant(req.body);

    res.status(201).json({
      success:true,
      data:tenant
    });

  }catch(err){
    next(err);
  }

};

export const getTenants = async(req:any,res:any,next:any)=>{

  try{

    const result = await tenantService.getTenants(req.query);

    res.json({
      success:true,
      ...result
    });

  }catch(err){
    next(err);
  }

};

export const upsertTenant = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await tenantService.upsertTenant(
     req.params.id,
     req.body
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};

export const archiveTenant = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await tenantService.archiveTenant(
     req.params.id
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};
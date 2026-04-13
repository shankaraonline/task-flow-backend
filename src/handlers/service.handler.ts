import * as service from "../services/service.service";

export const createService = async (req:any,res:any,next:any)=>{

  try{

    const result = await service.createService({
      ...req.body,
      tenantId: req.user.tenantId
    });

    res.status(201).json({
      success:true,
      data: result
    });

  }catch(err){
    next(err);
  }

};

export const getServices = async (req:any,res:any,next:any)=>{

  try{

    const result = await service.getServices(
      req.query,
      req.user.tenantId
    );

    res.json({
      success:true,
      ...result
    });

  }catch(err){
    next(err);
  }

};

export const upsertService = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await service.upsertService(
     req.params.id,
     req.body
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};

export const archiveService = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await service.archiveService(
     req.params.id
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};
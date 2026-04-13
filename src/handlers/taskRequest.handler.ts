import * as service from "../services/taskRequest.service";

export const createTaskRequest = async (
  req: any,
  res: any,
  next: any
) => {

  try {

    const request = await service.createTaskRequest(
      req.body,
      req.user
    );

    res.json({
      success: true,
      data: request
    });

  } catch (err) {

    next(err);

  }

};


export const getClientRequests = async (
  req: any,
  res: any,
  next: any
) => {

  try {

    const result = await service.getClientRequests(
      req.query,
      req.user
    );

    res.json({
      success: true,
      ...result
    });

  } catch (err) {

    next(err);

  }

};
export const upsertTaskRequest = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await service.upsertTaskRequest(
     req.params.id,
     req.body
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};

export const archiveTaskRequest = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await service.archiveTaskRequest(
     req.params.id
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};
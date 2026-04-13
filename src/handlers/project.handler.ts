import * as projectService from "../services/project.service";

export const createProject = async(req:any,res:any,next:any)=>{

  try{

    const project = await projectService.createProject({
      ...req.body,
      tenantId:req.user.tenantId
    });

    res.status(201).json({
      success:true,
      data:project
    });

  }catch(err){
    next(err);
  }

};

export const getProjects = async(req:any,res:any,next:any)=>{

  try{

    const result = await projectService.getProjects(
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
export const upsertProject = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await projectService.upsertProject(
     req.params.id,
     req.body
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};

export const archiveProject = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await projectService.archiveProject(
     req.params.id
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};
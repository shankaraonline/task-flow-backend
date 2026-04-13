import * as taskService from "../services/tasks.service";

/**
 * Assign task to employees
 */
export const assignTask = async (req: any, res: any, next: any) => {
  try {

    const task = await taskService.assignTask(req.body, req.user);

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (err) {
    next(err);
  }
};


/**
 * Get tasks
 */
export const getTasks = async (req: any, res: any, next: any) => {
  try {

    const result = await taskService.getTasks(
      req.query,
      req.user.tenantId
    );

    res.json({
      success: true,
      ...result
    });

  } catch (err) {
    next(err);
  }
};

export const updateStatus = async(req:any,res:any,next:any)=>{

  try{

    const { entryId } = req.params;
    const { status } = req.body;

    await taskService.updateTaskStatus(entryId,status);

    res.json({
      success:true
    });

  }catch(err){
    next(err);
  }

};
export const upsertTask = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await taskService.upsertTask(
     req.params.id,
     req.body
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};

export const archiveTask = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await taskService.archiveTask(
     req.params.id
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};
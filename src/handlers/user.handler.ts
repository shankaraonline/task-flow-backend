import * as service from "../services/user.service";

export const createUser = async(req:any,res:any,next:any)=>{

  try{

    const user = await service.createUser({
      ...req.body,
      tenantId:req.user.tenantId
    });

    res.status(201).json({success:true,data:user});

  }catch(err){
    next(err);
  }

};

export const getUsers = async(req:any,res:any,next:any)=>{

  try{

    const result = await service.getUsers(
      req.query,
      req.user.tenantId
    );

    res.json({success:true,...result});

  }catch(err){
    next(err);
  }

};
export const upsertUser = async (req: any, res: any, next: any) => {

  try {

    const user = await service.upsertUser(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: user
    });

  } catch (err) {

    next(err);

  }

};


export const archiveUser = async (req: any, res: any, next: any) => {

  try {

    const user = await service.archiveUser(
      req.params.id
    );

    res.json({
      success: true,
      data: user
    });

  } catch (err) {

    next(err);

  }

};
export const getEmployees = async (req: any, res: any, next: any) => {
  try {

    const result = await service.getEmployees(
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
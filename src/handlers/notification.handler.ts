import PushSubscription from "../schemas/pushSubscription.schema";

export const subscribe = async (
  req: any,
  res: any,
  next: any
) => {

  try {

    await PushSubscription.create({

      userId: req.user.id,
      tenantId: req.user.tenantId,
      subscription: req.body

    });

    res.json({
      success: true
    });

  } catch (err) {

    next(err);

  }

};
import * as service from "../services/notification.service";

export const createNotification = async (
  req: any,
  res: any,
  next: any
) => {

  try {

    const notification =
      await service.createNotification({
        ...req.body,
        tenantId: req.user.tenantId
      });

    res.json({
      success: true,
      data: notification
    });

  } catch (err) {

    next(err);

  }

};


export const getNotifications = async (
  req: any,
  res: any,
  next: any
) => {

  try {

    const result =
      await service.getNotifications(
        req.query,
        req.user.id
      );

    res.json({
      success: true,
      ...result
    });

  } catch (err) {

    next(err);

  }

};


export const markRead = async (
  req: any,
  res: any,
  next: any
) => {

  try {

    await service.markRead(req.params.id);

    res.json({
      success: true
    });

  } catch (err) {

    next(err);

  }

};
export const upsertNotification = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await service.upsertNotification(
     req.params.id,
     req.body
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};

export const archiveNotification = async (req:any,res:any,next:any)=>{
 try{
   const tenant = await service.archiveNotification(
     req.params.id
   );

   res.json({ success:true, data:tenant });

 }catch(err){
   next(err);
 }
};
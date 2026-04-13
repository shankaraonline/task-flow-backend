import Notification from "../schemas/notification.schema";
import { buildQuery } from "../utils/queryBuilder";

/**
 * Create notification
 */
export const createNotification = async (payload: any) => {

  return Notification.create(payload);

};


/**
 * Get user notifications
 */
export const getNotifications = async (
  query: any,
  userId: string
) => {

  const { filter, skip, limit, sort, page } =
    buildQuery(query);

  filter.userId = userId;

  const data = await Notification.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Notification.countDocuments(filter);

  return {
    data,
    meta: { page, limit, total }
  };

};


/**
 * Mark notification read
 */
export const markRead = async (id: string) => {

  return Notification.updateOne(
    { _id: id },
    { $set: { read: true } }
  );

};

export const upsertNotification = async (
  id:string,
  payload:any
)=>{

  return Notification.findByIdAndUpdate(
    id,
    payload,
    { new:true, upsert:true }
  );

};

export const archiveNotification = async (id:string)=>{

  return Notification.findByIdAndUpdate(
    id,
    { isArchived:true },
    { new:true }
  );

};
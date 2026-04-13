import Task from "../schemas/task.schema";
import User from "../schemas/user.schema";
import PushSubscription from "../schemas/pushSubscription.schema";
import Notification from "../schemas/notification.schema";

import { buildQuery } from "../utils/queryBuilder";
import { sendPushNotification } from "../utils/push";

/**
 * Assign task with employee hierarchy validation
 */
export const assignTask = async (
  payload: any,
  user: any
) => {

  const assignerLevel = user.level;

  const employees = await User.find({
    _id: { $in: payload.employeeIds }
  });

  for (const emp of employees) {

    if (assignerLevel <= emp.level) {

      throw new Error(
        "You cannot assign task to same or higher level employee"
      );

    }

  }

  const task = await Task.findOneAndUpdate(
    {
      projectId: payload.projectId,
      date: payload.date
    },
    {
      $push: {
        entries: {
          title: payload.title,
          description: payload.description,
          employeeIds: payload.employeeIds,
          serviceIds: payload.serviceIds
        }
      }
    },
    {
      upsert: true,
      new: true
    }
  );


  /**
   * CREATE IN-APP NOTIFICATIONS
   */
  const notifications = payload.employeeIds.map((empId: string) => ({
    userId: empId,
    tenantId: user.tenantId,
    title: "New Task Assigned",
    message: payload.title,
    type: "task"
  }));

  await Notification.insertMany(notifications);


  /**
   * SEND PUSH NOTIFICATIONS
   */
//   const subscriptions = await PushSubscription.find({
//     userId: { $in: payload.employeeIds }
//   });

//   for (const sub of subscriptions) {

//     await sendPushNotification(
//       sub.subscription,
//       {
//         title: "New Task Assigned",
//         body: payload.title
//       }
//     );

//   }

  return task;

};


/**
 * Get tasks with pagination
 */
export const getTasks = async (
  query: any,
  tenantId: any
) => {

  const { filter, skip, limit, sort, page } =
    buildQuery(query);

  filter.tenantId = tenantId;

  const tasks = await Task.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .populate("projectId");

  const total =
    await Task.countDocuments(filter);

  return {
    data: tasks,
    meta: {
      page,
      limit,
      total
    }
  };

};


/**
 * Update task status
 */
export const updateTaskStatus = async (
  entryId: string,
  status: string
) => {

  return Task.updateOne(
    { "entries._id": entryId },
    {
      $set: {
        "entries.$.status": status
      }
    }
  );

};

export const upsertTask = async (
  id:string,
  payload:any
)=>{

  return Task.findByIdAndUpdate(
    id,
    payload,
    { new:true, upsert:true }
  );

};

export const archiveTask = async (id:string)=>{

  return Task.findByIdAndUpdate(
    id,
    { isArchived:true },
    { new:true }
  );

};
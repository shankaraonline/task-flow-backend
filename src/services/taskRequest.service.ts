import TaskRequest from "../schemas/taskRequest.schema";
import { buildQuery } from "../utils/queryBuilder";

/**
 * Client requests task
 */
export const createTaskRequest = async (
  payload: any,
  user: any
) => {

  const request = await TaskRequest.create({

    tenantId: user.tenantId,
    clientId: user.id,
    projectId: payload.projectId,
    title: payload.title,
    description: payload.description,
    requiredBy: payload.requiredBy,

    comments: payload.comment
      ? [
        {
          userId: user.id,
          message: payload.comment
        }
      ]
      : []

  });

  return request;

};


/**
 * Client view requested tasks
 */
export const getClientRequests = async (
  query: any,
  user: any
) => {

  const { filter, skip, limit, sort, page } =
    buildQuery(query);

  filter.clientId = user.id;

  const data = await TaskRequest.find(filter)
    .populate("projectId")
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await TaskRequest.countDocuments(filter);

  return {
    data,
    meta: { page, limit, total }
  };

};

export const upsertTaskRequest = async (
  id: string,
  payload: any
) => {

  return TaskRequest.findByIdAndUpdate(
    id,
    payload,
    { new: true, upsert: true }
  );

};

export const archiveTaskRequest = async (id: string) => {

  return TaskRequest.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );

};
import Service from "../schemas/service.schema";
import { buildQuery } from "../utils/queryBuilder";

export const createService = async (payload:any) => {

  return Service.create(payload);

};

export const getServices = async (query:any, tenantId:any) => {

  const { filter, skip, limit, sort, page } = buildQuery(query);

  filter.tenantId = tenantId;

  const data = await Service.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Service.countDocuments(filter);

  return {
    data,
    meta: { page, limit, total }
  };

};

export const upsertService = async (id:string,payload:any)=>{

  return Service.findByIdAndUpdate(
    id,
    payload,
    { new:true, upsert:true }
  );

};

export const archiveService = async (id:string)=>{

  return Service.findByIdAndUpdate(
    id,
    { isArchived:true },
    { new:true }
  );

};
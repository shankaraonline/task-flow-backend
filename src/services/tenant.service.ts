import Tenant from "../schemas/tenant.schema";
import { buildQuery } from "../utils/queryBuilder";

export const createTenant = async(payload:any)=>{

  const tenant = await Tenant.create(payload);

  return tenant;

};

export const getTenants = async(query:any)=>{

  const {filter,skip,limit,sort,page} = buildQuery(query);

  const tenants = await Tenant.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Tenant.countDocuments(filter);

  return {
    data:tenants,
    meta:{page,limit,total}
  };

};

export const upsertTenant = async (id: string, payload: any) => {

  return Tenant.findByIdAndUpdate(
    id,
    payload,
    { new: true, upsert: true }
  );

};

export const archiveTenant = async (id: string) => {

  return Tenant.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );

};
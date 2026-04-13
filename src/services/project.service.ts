import Project from "../schemas/project.schema";
import { buildQuery } from "../utils/queryBuilder";

export const createProject = async(payload:any)=>{

  return Project.create(payload);

};

export const getProjects = async(query:any,tenantId:any)=>{

  const {filter,skip,limit,sort,page} = buildQuery(query);

  filter.tenantId = tenantId;

  const data = await Project.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Project.countDocuments(filter);

  return {data,meta:{page,limit,total}};

};

export const upsertProject = async (
  id:string,
  payload:any
)=>{

  return Project.findByIdAndUpdate(
    id,
    payload,
    { new:true, upsert:true }
  );

};

export const archiveProject = async (id:string)=>{

  return Project.findByIdAndUpdate(
    id,
    { isArchived:true },
    { new:true }
  );

};
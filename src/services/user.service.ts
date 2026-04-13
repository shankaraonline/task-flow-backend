import User from "../schemas/user.schema";
import { buildQuery } from "../utils/queryBuilder";
import { hashPassword } from "../utils/password";

export const createUser = async (payload: any) => {
    const hashed = await hashPassword(payload.password);

    const user = await User.create({
        ...payload,
        password: hashed
    });

    return user;

};
export const upsertUser = async (id: string, payload: any) => {

  return User.findByIdAndUpdate(
    id,
    payload,
    { new: true, upsert: true }
  );

};
export const archiveUser = async (id: string) => {

  return User.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );

};
export const getUsers = async (query: any, tenantId: any) => {

    const { filter, skip, limit, sort, page } = buildQuery(query);

    filter.tenantId = tenantId;
    filter.isArchived =false;

    const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort);

    const total = await User.countDocuments(filter);

    return {
        data: users,
        meta: { page, limit, total }
    };

};
export const getEmployees = async (query: any, tenantId: any) => {

    const { filter, skip, limit, sort, page } = buildQuery(query);

    filter.tenantId = tenantId;
    filter.role = "employee";
    filter.isArchived =false;


    const employees = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort);

    const total = await User.countDocuments(filter);

    return {
        data: employees,
        meta: {
            page,
            limit,
            total
        }
    };
};

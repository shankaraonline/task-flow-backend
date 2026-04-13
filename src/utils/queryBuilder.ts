export const buildQuery = (query: any) => {

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const sort = query.sort || "-createdAt";

  const filter: any = {};

  if (query.name) {
    filter.name = {
      $regex: query.name,
      $options: "i"
    };
  }

  return { filter, skip, limit, sort, page };

};
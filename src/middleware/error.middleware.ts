export const errorHandler = (
  err: any,
  req: any,
  res: any,
  next: any
) => {

  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

};
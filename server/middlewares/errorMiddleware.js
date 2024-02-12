const errorMiddleware = (err, req, res, next) => {
  console.log("Some general error", err.message);
  console.log("Some general error", err.statusCode);

  if (!process.env.production) console.log(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).send({ error: message });
};

export default errorMiddleware;

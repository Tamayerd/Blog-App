import { NextFunction, Request, Response } from "express";
import { validate as classValidate, ValidationError } from "class-validator";

const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = Object.assign(new schema(), {
      ...req.body,
      ...req.query,
      ...req.params,
    });

    classValidate(dtoObject)
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const formattedErrors = errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          }));

          return res.status(400).json({
            status: "Bad Request!",
            message: "Validation failed",
            errors: formattedErrors,
          });
        }
        next();
      })
      .catch((err) => {
        res.status(500).json({
          status: "Internal Server Error",
          message: "An unexpected error occurred",
        });
      });
  };

export default validate;

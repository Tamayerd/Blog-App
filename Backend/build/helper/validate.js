"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const validate = (schema) => (req, res, next) => {
    const dtoObject = Object.assign(new schema(), Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.params));
    (0, class_validator_1.validate)(dtoObject)
        .then((errors) => {
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
exports.default = validate;

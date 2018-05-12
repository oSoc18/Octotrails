import Joi from 'joi';

// define validation for all the env vars
process.env.NODE_ENV= process.env.NODE_ENV || 'development';
process.env.SERVER_PORT= process.env.SERVER_PORT || '4040';
process.env.JWT_SECRET='0a6b944d-d2fb-46fc-a85e-0295c986cd9f';
process.env.MONGO_HOST='mongodb://localhost:27017/mean';
process.env.MONGO_PORT='27017';

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown()
  .required();


const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;

import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  JWT_SECRET: Joi.string()
    .description('JWT Secret required to sign')
    .default('58d49jQc5E=6854099462989ef034a5+ihvhOjbWoa65A'),
  MONGO_HOST: Joi.string()
    .description('Mongo DB host url')
    .default('mongodb://localhost:27017/mean'),
  MONGO_PORT: Joi.number().default(27017),
  STIB_API: Joi.string()
    .description('STIB API url')
    .default(
      'https://proxy.sulliops.co/index.php?http://detobel36.ddns.net/files/osoc/'
    )
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
};
export default config;

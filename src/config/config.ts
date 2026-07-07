const PORT = process.env.SERVER_PORT as string;
const MONGODB_DB = process.env.MONGO_DB_DATABASE as string;
const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? '10');
const ENC_KEY = process.env.ENC_KEY as string;
const ENC_IV_LENGTH = parseInt(process.env.SALT_ROUND ?? '16');

export { PORT, MONGODB_DB, SALT_ROUND, ENC_KEY, ENC_IV_LENGTH };

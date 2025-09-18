import dotenv from "dotenv";

// Load `.env` first, then optionally `.env.keys`
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.keys" });

export const {
   MONGO_URL,
  NODE_ENV,
  FRONT_END_DOMAIN,
  PORT,
  ADMIN_EMAIL,

  SEND_TO_LOCAL,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,

  SECRET_KEY,

  PAY_STACK_SECRET_KEYS,
  PAY_STACK_PUBLIC_KEYS,
} = process.env;

export const isDev = NODE_ENV !== "production";

export const cookieOptions = {
  domain: isDev ? "localhost" : "",
  httpOnly: true,
};

const envs: Record<string, string | undefined> = {
  MONGO_URL,
  NODE_ENV,
  FRONT_END_DOMAIN,
  PORT,
  ADMIN_EMAIL,

  SEND_TO_LOCAL,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,

  SECRET_KEY,

  PAY_STACK_SECRET_KEYS,
  PAY_STACK_PUBLIC_KEYS,
};

const errors: Record<string, string> = {};
for (const key of Object.keys(envs)) {
  if (!envs[key]) {
    errors[key] = `${key} is not defined`;
  }
}

if (Object.keys(errors).length > 0) {
  console.error("ENV Error, the following ENV are not set:");
  console.table(errors);
  throw new Error("Fix Env and rebuild");
}

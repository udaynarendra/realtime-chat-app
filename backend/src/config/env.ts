import dotenv from 'dotenv';
dotenv.config();
 const MONGODB_URL=process.env.MONGODB_URL;
 const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_EXPIRES=process.env.REFRESH_TOKEN_EXPIRES
const ACCESS_TOKEN_EXPIRES=process.env.ACCESS_TOKEN_EXPIRES

if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
}

if (!SMTP_USER) {
    throw new Error("SMTP_USER is not defined");
}

if (!SMTP_PASS) {
    throw new Error("SMTP_PASS is not defined");
}
if(!ACCESS_TOKEN_SECRET){
    throw new Error("ACCESS_TOKEN_SECRET is not defined")
}
if(!REFRESH_TOKEN_SECRET){
    throw new Error("REFRESH_TOKEN_SECRET is not defined")
}
if(!REFRESH_TOKEN_EXPIRES){
    throw new Error("REFRESH_TOKEN_EXPIRES is not defined")
}
if(!ACCESS_TOKEN_EXPIRES){
    throw new Error("ACCESS_TOKEN_EXPIRES is not defined")
}
export const env={
   MONGODB_URL,
   SMTP_PASS,
   SMTP_USER,
   ACCESS_TOKEN_EXPIRES,
   ACCESS_TOKEN_SECRET,
   REFRESH_TOKEN_EXPIRES,
   REFRESH_TOKEN_SECRET
}as const;


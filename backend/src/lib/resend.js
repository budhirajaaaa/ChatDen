import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config({ path: "./src/.env" })
export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender={
  email: process.env.EMAIL_FROM_DOMAIN,
  name:process.env.EMAIL_FROM
}

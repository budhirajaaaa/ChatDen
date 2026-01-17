import {resendClient,sender}from '../lib/resend.js'
import {createWelcomeEmailTemplate} from './emailTemplate.js'
export const sendWelcomeEmail =async (email,name,clientURL)=>{
  console.log({
    from: `${sender.name} ${sender.email} `,
    to: [email],
    subject: 'Welcome to ChatDen',
  })
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: [email],
    subject: 'Welcome to ChatDen',
    html: createWelcomeEmailTemplate(name,clientURL)
  });

  if (error) {
    throw new Error(error)
  }

  console.log(`Email sent`,data);
}

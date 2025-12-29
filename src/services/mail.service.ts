import { transporter } from "../config/mail";

export type EmailPayloadType = {
  to: string;
  medicineName: string;
  expireDate: Date;
};

export async function sendReminderEmail({ to, medicineName, expireDate }: EmailPayloadType) {
  const info = await transporter.sendMail({
    from: '"MedLife Reminder for your Medicine" <noreply@medlife.com>',
    to,
    subject: "Your Medicine will expire soon!",
    html: `
      <h3>Medicine Reminder</h3>
      <p>Medicine <b>${medicineName}</b> will expire soon</p>
      <p><b>Expire Date : ${expireDate.toDateString()}</b></p>
    `,
  });

  console.log(`Sending email.. : ${info.messageId}`);
}

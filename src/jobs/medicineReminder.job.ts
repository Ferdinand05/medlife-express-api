import cron from "node-cron";
import { sendReminderEmail } from "../services/mail.service";
import Medicine from "../models/Medicine";
import { IMedicine } from "../types/medicine";
import { IUser } from "../types/user";
import { sendWhatsAppMessage } from "../services/whatsapp.service";

export async function startReminderJob() {
  cron.schedule(
    "* 12 * * *",
    async () => {
      console.log("📧 Running H-7 expiry reminder job");

      const now = new Date();

      const start = new Date();
      start.setDate(now.getDate() + 7);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setDate(now.getDate() + 7);
      end.setHours(23, 59, 59, 999);

      const medicines = await Medicine.find({
        expireDate: {
          $gte: start,
          $lte: end,
        },
        reminderSent: false,
      }).populate<{ user: IUser }>("user");

      console.log(medicines);

      for (const med of medicines) {
        console.log("➡️ Sending email to:", {
          email: med.user.email,
        });

        await sendReminderEmail({
          to: med.user.email,
          medicineName: med.name,
          expireDate: med.expireDate,
        });

        const waMessage: string = `Hello ${med.user.username}, your medicine ${med.name} will expire soon!`;
        await sendWhatsAppMessage(med.user.telepon as string, waMessage as string);

        med.reminderSent = true;
        await med.save();
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );
}

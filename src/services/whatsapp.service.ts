import axios from "axios";
import FormData from "form-data";

export async function sendWhatsAppMessage(target: string, message: string) {
  try {
    const form = new FormData();

    form.append("target", target);
    form.append("message", message);
    form.append("countryCode", "62");
    form.append("delay", "2");

    const response = await axios.post("https://api.fonnte.com/send", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: process.env.FONNTE_TOKEN!,
      },
    });

    console.log("📱 Fonnte response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ WhatsApp error:", error.response?.data || error.message);
    throw error;
  }
}

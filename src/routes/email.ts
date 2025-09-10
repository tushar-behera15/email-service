import { Router,Request,Response } from "express";
import { sendEmail } from "../utils/mailer";

const router = Router();

router.post("/send-email", async (req:Request, res:Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await sendEmail({ to, subject, text, html });
    return res.json({ success: true, messageId: result.messageId });
  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;

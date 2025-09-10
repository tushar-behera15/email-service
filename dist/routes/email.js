"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailer_1 = require("../utils/mailer");
const router = (0, express_1.Router)();
router.post("/send-email", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const { to, subject, text, html } = req.body;
        if (!to || !subject || (!text && !html)) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await (0, mailer_1.sendEmail)({ to, subject, text, html });
        return res.json({ success: true, messageId: result.messageId });
    }
    catch (err) {
        console.error("❌ Error:", err);
        return res.status(500).json({ error: "Failed to send email" });
    }
});
exports.default = router;

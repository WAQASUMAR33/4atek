import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, company, phone, subject, message, budget, timeline, website } = body;

        // Honeypot check for spam/bots
        if (website && website.trim() !== "") {
            // Silently ignore spam or return success to mislead the bot
            return NextResponse.json({ success: true, message: "Message received." });
        }

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required fields." },
                { status: 400 }
            );
        }

        // Hostinger SMTP config
        const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
        const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
        const smtpSecure = process.env.SMTP_SECURE === "true";
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "contact@fouratek.com";

        if (!smtpUser || !smtpPass) {
            console.error("SMTP credentials are not configured in environment variables.");
            return NextResponse.json(
                { error: "Email configuration is incomplete on the server." },
                { status: 500 }
            );
        }

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        // Construct cleaner email subjects and contents
        const emailSubject = `4A Tek Contact: ${subject || "New Inquiry"}`;
        
        // Build detail rows for details section
        const details = [];
        if (company) details.push(`<strong>Company:</strong> ${company}`);
        if (phone) details.push(`<strong>Phone:</strong> ${phone}`);
        if (budget) details.push(`<strong>Budget Range:</strong> ${budget}`);
        if (timeline) details.push(`<strong>Timeline:</strong> ${timeline}`);

        const detailsHtml = details.length > 0 
            ? `<div style="margin-bottom: 20px; padding: 15px; background-color: #f5f8fa; border-radius: 6px; border-left: 4px solid #0f6f70;">
                <h4 style="margin: 0 0 10px 0; color: #0f6f70;">Submission Details</h4>
                ${details.map(d => `<p style="margin: 5px 0; font-size: 14px;">${d}</p>`).join("")}
               </div>`
            : "";

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; color: #333333;">
                <div style="background-color: #0f6f70; padding: 20px; text-align: center; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">4A TEK</h2>
                    <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">New Form Inquiry Received</p>
                </div>
                
                <div style="padding: 25px; line-height: 1.6;">
                    <p style="font-size: 16px; margin-top: 0;">Hello Team,</p>
                    <p style="font-size: 15px;">You have received a new message submission from the website contact/quote form.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-weight: bold; width: 120px; font-size: 14px;">Sender Name:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-size: 14px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-weight: bold; font-size: 14px;">Sender Email:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-size: 14px;"><a href="mailto:${email}" style="color: #0f6f70; text-decoration: none;">${email}</a></td>
                        </tr>
                        ${subject ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-weight: bold; font-size: 14px;">Subject:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-size: 14px;">${subject}</td>
                        </tr>` : ""}
                    </table>

                    ${detailsHtml}

                    <div style="margin-bottom: 25px;">
                        <h4 style="margin: 0 0 10px 0; color: #0f6f70; font-size: 14px;">Message Content</h4>
                        <div style="padding: 15px; background-color: #f9f9f9; border-radius: 6px; font-size: 14px; white-space: pre-wrap; border: 1px solid #eef0f2;">${message || "No message provided."}</div>
                    </div>

                    <p style="font-size: 12px; color: #888888; margin-bottom: 0; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
                        This email was sent automatically from the 4A Tek Contact Server.
                    </p>
                </div>
            </div>
        `;

        // Send mail options
        const mailOptions = {
            from: `"${name}" <${smtpUser}>`, // MUST be the SMTP user or authorized sender address
            to: receiverEmail,
            replyTo: email, // Allow replying directly to the user who filled the form
            subject: emailSubject,
            text: `
                New Contact Form Submission:
                Name: ${name}
                Email: ${email}
                Company: ${company || "N/A"}
                Phone: ${phone || "N/A"}
                Budget: ${budget || "N/A"}
                Timeline: ${timeline || "N/A"}
                Subject: ${subject || "N/A"}
                Message: ${message || "N/A"}
            `,
            html: htmlContent,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending contact email via SMTP:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formType, name, email, phone, address, serviceType, description, preferredDate, submittedAt } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create transporter using Gmail or your preferred email service
    // You'll need to set these environment variables in Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // TODO: set the real inbox address before launch (where leads are emailed).
    const inboxAddress = process.env.LEAD_INBOX || 'leads@monmouthcountygenerac.com';
    const SITE_TAG = '[Monmouth Generac]';
    const SITE_NAME = 'monmouthcountygenerac.com';

    const emailSubject = formType === 'booking'
      ? `${SITE_TAG} New Booking Request from ${name}`
      : `${SITE_TAG} New Estimate Request from ${name}`;

    const emailBody = `
      <h2>${formType === 'booking' ? 'New Booking Request' : 'New Estimate Request'}</h2>
      <p><strong>Source Site:</strong> ${SITE_NAME}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
      ${serviceType ? `<p><strong>Service Type:</strong> ${serviceType}</p>` : ''}
      ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
      ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
      <p><strong>Submitted:</strong> ${submittedAt}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: `Monmouth County Generac <${inboxAddress}>`,
      to: inboxAddress,
      subject: emailSubject,
      html: emailBody,
      replyTo: email,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

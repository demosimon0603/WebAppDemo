import nodemailer from "nodemailer";
import type { ReservationInput } from "@/lib/reservation";
import { createReservationEmail } from "@/lib/reservation";

export async function sendReservationEmail(reservation: ReservationInput) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.RESERVATION_TO_EMAIL;

  if (!user || !pass || !to) {
    const missing = [
      !user ? "GMAIL_USER" : null,
      !pass ? "GMAIL_APP_PASSWORD" : null,
      !to ? "RESERVATION_TO_EMAIL" : null
    ].filter(Boolean);

    throw new Error(`Missing Gmail email environment variables: ${missing.join(", ")}`);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  const message = createReservationEmail(reservation);

  await transporter.sendMail({
    from: `"Dust & Ember Reservations" <${user}>`,
    replyTo: reservation.email,
    to,
    subject: message.subject,
    text: message.text,
    html: message.html
  });
}

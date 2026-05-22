import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(120),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  partySize: z.coerce.number().int().min(1).max(20),
  note: z.string().trim().max(500).optional().default(""),
  locale: z.enum(["zh", "en"]).default("zh")
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export function createReservationEmail(reservation: ReservationInput) {
  const labels =
    reservation.locale === "en"
      ? {
          subject: "New Reservation",
          name: "Name",
          phone: "Phone",
          email: "Email",
          date: "Date",
          time: "Time",
          partySize: "Guests",
          note: "Notes"
        }
      : {
          subject: "新訂位通知",
          name: "姓名",
          phone: "電話",
          email: "Email",
          date: "日期",
          time: "時間",
          partySize: "人數",
          note: "備註"
        };

  const subject = `[Dust & Ember Reservation] ${reservation.date} ${reservation.time} - ${reservation.name}`;
  const text = `${labels.subject}

${labels.name}: ${reservation.name}
${labels.phone}: ${reservation.phone}
${labels.email}: ${reservation.email}
${labels.date}: ${reservation.date}
${labels.time}: ${reservation.time}
${labels.partySize}: ${reservation.partySize}
${labels.note}: ${reservation.note || "-"}
`;

  const html = `
    <div style="font-family:Arial,'Noto Sans TC',sans-serif;color:#211610;line-height:1.6">
      <h2 style="color:#a94420">${labels.subject}</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr><td><strong>${labels.name}</strong></td><td>${escapeHtml(reservation.name)}</td></tr>
        <tr><td><strong>${labels.phone}</strong></td><td>${escapeHtml(reservation.phone)}</td></tr>
        <tr><td><strong>${labels.email}</strong></td><td>${escapeHtml(reservation.email)}</td></tr>
        <tr><td><strong>${labels.date}</strong></td><td>${reservation.date}</td></tr>
        <tr><td><strong>${labels.time}</strong></td><td>${reservation.time}</td></tr>
        <tr><td><strong>${labels.partySize}</strong></td><td>${reservation.partySize}</td></tr>
        <tr><td><strong>${labels.note}</strong></td><td>${escapeHtml(reservation.note || "-")}</td></tr>
      </table>
    </div>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

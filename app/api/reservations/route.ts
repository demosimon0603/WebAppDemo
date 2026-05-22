import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sendReservationEmail } from "@/lib/mailer";
import { reservationSchema } from "@/lib/reservation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const reservation = reservationSchema.parse(payload);
    await sendReservationEmail(reservation);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reservation submission failed", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ ok: false, error: "invalid_reservation" }, { status: 422 });
    }

    return NextResponse.json({ ok: false, error: "email_delivery_failed" }, { status: 500 });
  }
}

"use client";

import { CalendarDays, Languages, Mail, MapPin, Menu, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type Locale = "zh" | "en";

const copy = {
  zh: {
    nav: ["特色", "菜單", "訂位"],
    admin: "管理員登入",
    switch: "English",
    heroKicker: "台北西部牛仔餐館",
    heroTitle: "Dust & Ember Steakhouse",
    heroLead: "木炭火光、手切牛排、復古酒館聲響。今晚，把晚餐交給荒野的熱度。",
    heroCta: "立即訂位",
    heroSecondary: "查看菜單",
    statOne: "炭火料理",
    statTwo: "現場調酒",
    statThree: "每日晚餐",
    featuresTitle: "牛仔酒館的晚餐節奏",
    features: [
      ["開放式炭烤台", "看得見的火候，聞得到的煙燻香氣，讓每份主餐都像剛從牧場晚宴端上桌。"],
      ["西部靈感酒單", "波本、龍舌蘭與香料糖漿調出粗獷但平衡的招牌飲品。"],
      ["適合聚會的座位", "吧台、雙人桌與長桌區，適合約會、家庭晚餐或朋友慶祝。"]
    ],
    menuTitle: "今日招牌",
    menu: [
      [
        "黑鐵鍋肋眼牛排",
        "乾式香料、炭烤玉米、煙燻奶油",
        "$980",
        "/menu-ribeye.png"
      ],
      [
        "邊境辣味烤雞",
        "辣椒蜂蜜、烤馬鈴薯、酸奶醬",
        "$620",
        "/menu-chicken.png"
      ],
      [
        "牧場豆子燉鍋",
        "番茄、豆類、香料飯、烤餅",
        "$420",
        "/menu-stew.png"
      ]
    ],
    reservationTitle: "預約你的座位",
    reservationLead: "送出後，我們會把訂位資訊寄到餐廳 Gmail，並盡快回覆確認。",
    labels: {
      name: "姓名",
      phone: "電話",
      email: "Email",
      date: "日期",
      time: "時間",
      partySize: "人數",
      note: "備註"
    },
    placeholders: {
      name: "王小明",
      phone: "0912-345-678",
      email: "you@example.com",
      note: "兒童椅、生日、素食需求等"
    },
    submit: "送出訂位",
    sending: "送出中...",
    success: "訂位已送出，我們會盡快透過電話或 Email 確認。",
    failure: "訂位送出失敗，請稍後再試或直接來電。",
    footer: "Dust & Ember Steakhouse - 西部牛仔餐廳"
  },
  en: {
    nav: ["Features", "Menu", "Reserve"],
    admin: "Admin Login",
    switch: "繁體中文",
    heroKicker: "Western Cowboy Dining",
    heroTitle: "Dust & Ember Steakhouse",
    heroLead: "Charcoal heat, hand-cut steaks, and a saloon glow. Tonight, let the frontier set the table.",
    heroCta: "Reserve Now",
    heroSecondary: "View Menu",
    statOne: "Charcoal Grill",
    statTwo: "House Cocktails",
    statThree: "Dinner Daily",
    featuresTitle: "A Saloon Supper Rhythm",
    features: [
      ["Open-fire cooking", "Visible flame, smoke, and a steakhouse pace that feels straight from a ranch table."],
      ["Frontier cocktails", "Bourbon, tequila, spice syrups, and bright citrus in rugged but balanced pours."],
      ["Tables for every party", "Bar seats, date-night tables, and long tables for families or celebrations."]
    ],
    menuTitle: "House Signatures",
    menu: [
      [
        "Cast-Iron Ribeye",
        "Dry rub, charred corn, smoked butter",
        "$980",
        "/menu-ribeye.png"
      ],
      [
        "Border-Spiced Roast Chicken",
        "Chile honey, roasted potatoes, sour cream sauce",
        "$620",
        "/menu-chicken.png"
      ],
      [
        "Ranch Bean Stew",
        "Tomato, beans, spice rice, warm flatbread",
        "$420",
        "/menu-stew.png"
      ]
    ],
    reservationTitle: "Book Your Table",
    reservationLead: "After submission, reservation details are emailed to the restaurant Gmail for confirmation.",
    labels: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      date: "Date",
      time: "Time",
      partySize: "Guests",
      note: "Notes"
    },
    placeholders: {
      name: "Alex Chen",
      phone: "0912-345-678",
      email: "you@example.com",
      note: "High chair, birthday, vegetarian needs, etc."
    },
    submit: "Send Reservation",
    sending: "Sending...",
    success: "Reservation sent. We will confirm by phone or email soon.",
    failure: "Reservation failed. Please try again later or call us directly.",
    footer: "Dust & Ember Steakhouse - Western Cowboy Dining"
  }
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  partySize: "2",
  note: ""
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const t = copy[locale];

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorDetail("");

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, locale })
    });

    if (response.ok) {
      setStatus("success");
      setForm(initialForm);
      return;
    }

    const result = await response.json().catch(() => null);
    setStatus("error");
    setErrorDetail(result?.message ?? "");
  }

  return (
    <main>
      <section className="hero" id="top">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Dust and Ember home">
            <span className="brand-mark">D&E</span>
            <span>Dust & Ember</span>
          </a>
          <div className="nav-links">
            <a href="#features">{t.nav[0]}</a>
            <a href="#menu">{t.nav[1]}</a>
            <a href="#reserve">{t.nav[2]}</a>
          </div>
          <div className="nav-actions">
            <button className="icon-button" type="button" onClick={() => setLocale(locale === "zh" ? "en" : "zh")}>
              <Languages size={18} aria-hidden="true" />
              <span>{t.switch}</span>
            </button>
            <a className="admin-link" href="/admin">
              <ShieldCheck size={17} aria-hidden="true" />
              <span>{t.admin}</span>
            </a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#reserve">
              <CalendarDays size={19} aria-hidden="true" />
              {t.heroCta}
            </a>
            <a className="secondary-button" href="#menu">
              <Menu size={19} aria-hidden="true" />
              {t.heroSecondary}
            </a>
          </div>
        </div>

        <div className="hero-stats" aria-label="Restaurant highlights">
          <span>{t.statOne}</span>
          <span>{t.statTwo}</span>
          <span>{t.statThree}</span>
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-heading">
          <p className="eyebrow">Frontier Hospitality</p>
          <h2>{t.featuresTitle}</h2>
        </div>
        <div className="feature-grid">
          {t.features.map(([title, text]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-band" id="menu">
        <div className="section-heading">
          <p className="eyebrow">Cast Iron & Smoke</p>
          <h2>{t.menuTitle}</h2>
        </div>
        <div className="menu-list">
          {t.menu.map(([name, description, price, image]) => (
            <article className="menu-item" key={name}>
              <div className="menu-photo">
                <Image src={image} alt={name} width={720} height={520} sizes="(max-width: 620px) 100vw, 320px" />
              </div>
              <div className="menu-copy">
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <strong>{price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="reserve-section" id="reserve">
        <div className="reserve-copy">
          <p className="eyebrow">Reservations</p>
          <h2>{t.reservationTitle}</h2>
          <p>{t.reservationLead}</p>
          <div className="contact-row">
            <MapPin size={18} aria-hidden="true" />
            <span>88 Frontier Road, Taipei</span>
          </div>
          <div className="map-embed" aria-label="Restaurant map">
            <iframe
              title="Dust & Ember Steakhouse map"
              src="https://www.google.com/maps?q=88%20Frontier%20Road%2C%20Taipei&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="contact-row">
            <Mail size={18} aria-hidden="true" />
            <span>reservations@example.com</span>
          </div>
        </div>

        <form className="reservation-form" onSubmit={submitReservation}>
          <label>
            {t.labels.name}
            <input
              required
              name="name"
              value={form.name}
              placeholder={t.placeholders.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>
          <label>
            {t.labels.phone}
            <input
              required
              name="phone"
              value={form.phone}
              placeholder={t.placeholders.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
          </label>
          <label>
            {t.labels.email}
            <input
              required
              type="email"
              name="email"
              value={form.email}
              placeholder={t.placeholders.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <div className="form-row">
            <label>
              {t.labels.date}
              <input
                required
                type="date"
                min={minDate}
                name="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
              />
            </label>
            <label>
              {t.labels.time}
              <input
                required
                type="time"
                name="time"
                value={form.time}
                onChange={(event) => setForm({ ...form, time: event.target.value })}
              />
            </label>
          </div>
          <label>
            {t.labels.partySize}
            <div className="number-field">
              <Users size={18} aria-hidden="true" />
              <input
                required
                type="number"
                min="1"
                max="20"
                name="partySize"
                value={form.partySize}
                onChange={(event) => setForm({ ...form, partySize: event.target.value })}
              />
            </div>
          </label>
          <label>
            {t.labels.note}
            <textarea
              name="note"
              rows={4}
              value={form.note}
              placeholder={t.placeholders.note}
              onChange={(event) => setForm({ ...form, note: event.target.value })}
            />
          </label>
          <button className="primary-button form-submit" type="submit" disabled={status === "loading"}>
            <CalendarDays size={18} aria-hidden="true" />
            {status === "loading" ? t.sending : t.submit}
          </button>
          {status === "success" && <p className="form-message success">{t.success}</p>}
          {status === "error" && (
            <p className="form-message error">
              {t.failure}
              {errorDetail && <span className="error-detail">{errorDetail}</span>}
            </p>
          )}
        </form>
      </section>

      <footer>{t.footer}</footer>
    </main>
  );
}

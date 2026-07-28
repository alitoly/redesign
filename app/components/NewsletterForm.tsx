"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
  };

  return (
    <form className="newsletter" onSubmit={submitNewsletter} data-reveal>
      <div><strong>المجلة الأسبوعية</strong><span>أخبار القيادات والفرص تصل إلى بريدك</span></div>
      {joined ? (
        <p className="success-message" role="status">شكرًا لانضمامك إلى مجتمع قيادات.</p>
      ) : (
        <div className="newsletter-control">
          <label className="sr-only" htmlFor="email">البريد الإلكتروني</label>
          <input id="email" type="email" required placeholder="البريد الإلكتروني" />
          <button type="submit">انضمي</button>
        </div>
      )}
    </form>
  );
}

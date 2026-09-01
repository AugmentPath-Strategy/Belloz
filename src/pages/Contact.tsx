import { useState, type FormEvent } from "react";
import { PageHero } from "../components/PageHero";
import { company } from "../data/content";

export function Contact() {
  const [sent, setSent] = useState(false);
  const phone = company.phones[0];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${from}\n\n${message}`);
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Project inquiry")}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="page-pad">
      <PageHero
        kicker="Start here"
        title="Call, text, or send a message."
        text="Reach Belloz Construction directly. We will take it from there."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2">
        <div className="space-y-4">
          {company.phones.map((p) => (
            <a key={p.display} href={p.href} className="block rounded-3xl bg-white p-7">
              <p className="label text-gold-deep">{p.label}</p>
              <p className="mt-2 font-display text-4xl text-navy">{p.display}</p>
            </a>
          ))}
          <a href={`mailto:${company.email}`} className="block rounded-3xl bg-cream p-7">
            <p className="label text-gold-deep">Email</p>
            <p className="mt-2 font-display text-3xl text-navy">{company.email}</p>
          </a>
          <a href={phone.sms} className="btn btn-gold">
            Text {phone.display}
          </a>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl bg-white p-8">
          <h2 className="text-3xl text-navy">Send a message</h2>
          <label className="mt-6 block text-sm text-stone">
            Name
            <input name="name" required className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-navy" />
          </label>
          <label className="mt-4 block text-sm text-stone">
            Email
            <input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-navy" />
          </label>
          <label className="mt-4 block text-sm text-stone">
            How can we help?
            <textarea name="message" required rows={5} className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-navy" />
          </label>
          <button type="submit" className="btn btn-navy mt-6 w-full">
            Open email to {company.email}
          </button>
          {sent && <p className="mt-3 text-sm text-stone">Your email app should open with the message ready to send.</p>}
        </form>
      </section>
    </div>
  );
}

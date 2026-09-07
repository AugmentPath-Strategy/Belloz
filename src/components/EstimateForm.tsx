import { useState, type FormEvent } from "react";
import { projectTypes } from "../data/content";

type Props = {
  heading?: string;
};

const webhook = import.meta.env.VITE_SHEETS_WEBHOOK_URL;

export function EstimateForm({ heading = "Request a free estimate" }: Props) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSent(false);
    if (!webhook) {
      setError("Estimate webhook is not configured.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      type: String(data.get("type") || ""),
      message: String(data.get("message") || ""),
    };

    setPending(true);
    try {
      await fetch(webhook, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setSent(true);
      form.reset();
    } catch {
      setError("Could not send the estimate. Try again or call us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-8">
      <h2 className="text-3xl text-navy">{heading}</h2>
      <p className="mt-2 text-stone">Four fields. We will follow up by phone.</p>
      <label className="mt-6 block text-sm font-medium text-navy">
        Name
        <input name="name" required autoComplete="name" className="field" />
      </label>
      <label className="mt-4 block text-sm font-medium text-navy">
        Phone
        <input name="phone" type="tel" required autoComplete="tel" className="field" />
      </label>
      <label className="mt-4 block text-sm font-medium text-navy">
        Project type
        <select name="type" required className="field" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium text-navy">
        Project details
        <textarea name="message" required rows={4} className="field" placeholder="Location, timeline, and what you want built." />
      </label>
      <button type="submit" className="btn btn-gold mt-6 w-full" disabled={pending}>
        {pending ? "Sending…" : "Get a free estimate"}
      </button>
      {sent && <p className="mt-3 text-sm text-stone">Request sent. We will call you back.</p>}
      {error && <p className="mt-3 text-sm text-stone">{error}</p>}
    </form>
  );
}
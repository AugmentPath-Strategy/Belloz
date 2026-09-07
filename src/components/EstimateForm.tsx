import { useState, type FormEvent } from "react";
import { company, projectTypes } from "../data/content";

type Props = {
  heading?: string;
};

export function EstimateForm({ heading = "Request a free estimate" }: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const type = String(data.get("type") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nProject: ${type}\n\n${message}`);
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Free estimate request")}&body=${body}`;
    setSent(true);
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
      <button type="submit" className="btn btn-gold mt-6 w-full">
        Get a free estimate
      </button>
      {sent && <p className="mt-3 text-sm text-stone">Your email app should open with the request ready to send.</p>}
    </form>
  );
}
import { useEffect, useRef, useState, type FormEvent } from "react";
import { normalizePhone, phoneForSheet } from "../lib/phone";

const webhook =
  import.meta.env.VITE_CHAT_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbz_EsjujWuobxwTvjZOj3nR-c_TiOxtCpbqvOWJbtT3wQ0S1XJklbEm6JlkboD2QXbjhw/exec";

type Bubble = {
  id: string;
  from: "them" | "you";
  text: string;
  detail?: string;
};

function TypingDots() {
  return (
    <div className="chat-in flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-cream px-4 py-3" aria-live="polite">
      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-stone" />
      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-stone" />
      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-stone" />
    </div>
  );
}

export function ChatLead() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [bubbles, typing, showForm, open]);

  useEffect(() => {
    if (!open || introDone) return;

    setTyping(true);
    const first = window.setTimeout(() => {
      setTyping(false);
      setBubbles([
        {
          id: "greet",
          from: "them",
          text: "Hi, thanks for reaching out to Belloz Construction.",
        },
      ]);
      setTyping(true);
    }, 850);

    const second = window.setTimeout(() => {
      setTyping(false);
      setBubbles((prev) => [
        ...prev,
        {
          id: "ask",
          from: "them",
          text: "Please enter your name, phone number, and a short message. A sales representative will get back to you soon.",
        },
      ]);
      setShowForm(true);
      setIntroDone(true);
    }, 2100);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [open, introDone]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = normalizePhone(String(data.get("phone") || ""));
    if (!phone.ok) {
      setError("Enter a full phone number with country code, like +1 512 202 0459 or +91 98765 43210.");
      return;
    }

    const payload = {
      source: "chat",
      name: String(data.get("name") || "").trim(),
      phone: phoneForSheet(phone.display),
      message: String(data.get("message") || "").trim(),
    };

    if (!webhook) {
      setError("This form is not connected yet. Call us or use the estimate form on the page.");
      return;
    }

    setPending(true);
    try {
      await fetch(webhook, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setShowForm(false);
      setBubbles((prev) => [
        ...prev,
        {
          id: "you",
          from: "you",
          text: payload.message,
          detail: `${payload.name}, ${phone.display}`,
        },
      ]);
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setBubbles((prev) => [
          ...prev,
          {
            id: "received",
            from: "them",
            text: "We received your message. A sales representative will call you shortly. Thank you.",
          },
        ]);
      }, 1100);
      form.reset();
    } catch {
      setError("We could not send that just now. Please try again, or call us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed right-3 z-[60] bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-6 md:right-6">
      {open && (
        <div className="mb-3 flex h-[min(28rem,calc(100svh-12rem))] w-[min(22.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/10">
          <div className="flex items-start justify-between gap-3 bg-navy px-5 py-4 text-white">
            <div>
              <p className="font-display text-2xl">Talk with us</p>
              <p className="mt-1 text-sm text-white/75">Usually replies within a business day</p>
            </div>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={threadRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f7f4ef] px-4 py-4">
            {bubbles.map((bubble) =>
              bubble.from === "them" ? (
                <div key={bubble.id} className="chat-in max-w-[90%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-navy shadow-sm">
                  {bubble.text}
                </div>
              ) : (
                <div key={bubble.id} className="chat-in ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-navy px-4 py-3 text-sm leading-relaxed text-white">
                  {bubble.detail && <p className="mb-1 text-xs text-white/65">{bubble.detail}</p>}
                  {bubble.text}
                </div>
              ),
            )}
            {typing && <TypingDots />}

            {showForm && (
              <form onSubmit={onSubmit} className="chat-in rounded-2xl bg-white p-4 shadow-sm">
                <label className="block text-sm font-medium text-navy">
                  Name
                  <input name="name" required autoComplete="name" className="field" />
                </label>
                <label className="mt-3 block text-sm font-medium text-navy">
                  Phone
                  <input
                    name="phone"
                    type="text"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className="field"
                  />
                </label>
                <label className="mt-3 block text-sm font-medium text-navy">
                  Message
                  <textarea name="message" required rows={3} className="field" placeholder="Tell us about the project." />
                </label>
                <button type="submit" className="btn btn-gold mt-4 w-full" disabled={pending}>
                  {pending ? "Sending…" : "Send message"}
                </button>
                {error && <p className="mt-3 text-sm text-stone">{error}</p>}
              </form>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg ring-1 ring-black/10 hover:bg-gold-deep hover:text-white md:h-14 md:w-14"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
            <path
              d="M5 7.5A3.5 3.5 0 0 1 8.5 4h7A3.5 3.5 0 0 1 19 7.5v6A3.5 3.5 0 0 1 15.5 17H12l-4.2 2.6A.8.8 0 0 1 6.6 19V17h-.1A3.5 3.5 0 0 1 3 13.5v-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

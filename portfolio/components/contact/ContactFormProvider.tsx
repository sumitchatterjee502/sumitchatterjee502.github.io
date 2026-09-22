"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { siteConfig } from "@/data/portfolio";
import {
  submitContactForm,
  type ContactFormValues,
  type ContactIntent,
} from "@/lib/contact-form";
import { cn } from "@/lib/utils";

interface ContactFormContextValue {
  openContactForm: (intent?: ContactIntent) => void;
  closeContactForm: () => void;
}

const defaultIntent: ContactIntent = {
  subject: "Portfolio Inquiry",
  source: "General",
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return context;
}

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const titleId = useId();
  const descriptionId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<ContactIntent>(defaultIntent);
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  const openContactForm = useCallback((nextIntent?: ContactIntent) => {
    setIntent(nextIntent ?? defaultIntent);
    setValues(emptyValues);
    setStatus("idle");
    setFeedback("");
    setIsOpen(true);
  }, []);

  const closeContactForm = useCallback(() => {
    setIsOpen(false);
    setStatus("idle");
    setFeedback("");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("contact-modal-open", isOpen);
    return () => document.body.classList.remove("contact-modal-open");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContactForm();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    firstFieldRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeContactForm, isOpen]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const result = await submitContactForm(values, intent);

    if (result.ok) {
      setStatus("success");
      setFeedback(result.message);
      setValues(emptyValues);
      return;
    }

    setStatus("error");
    setFeedback(result.message);
  }

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <ContactFormContext.Provider value={{ openContactForm, closeContactForm }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeContactForm}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="contact-modal relative z-[101] flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-2xl"
          >
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
                    // Get in touch
                  </p>
                  <h2
                    id={titleId}
                    className="mt-1 font-display text-xl font-bold text-heading sm:text-2xl"
                  >
                    {intent.subject}
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-2 text-sm font-light leading-relaxed text-muted"
                  >
                    Share your details and project query. I&apos;ll reply to your
                    email within 1–2 business days.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeContactForm}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              {status === "success" ? (
                <div className="rounded-xl border border-accent/30 bg-accent/10 p-5">
                  <p className="font-display text-lg font-semibold text-heading">
                    Message sent
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text">{feedback}</p>
                  <button
                    type="button"
                    onClick={closeContactForm}
                    className="primary-shadow-hover mt-5 inline-flex min-h-[44px] items-center justify-center rounded bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-background transition-all hover:-translate-y-0.5"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                      Full name *
                    </span>
                    <input
                      ref={firstFieldRef}
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      className="contact-field"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                      Email *
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="contact-field"
                      placeholder="you@company.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                      Phone / WhatsApp *
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className="contact-field"
                      placeholder="+91 98765 43210"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                      Your query *
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={values.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      className={cn("contact-field min-h-[120px] resize-y")}
                      placeholder="Tell me about your project, timeline, and what you need help with..."
                    />
                  </label>

                  {status === "error" && feedback && (
                    <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      {feedback}
                    </p>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="primary-shadow-hover inline-flex min-h-[44px] flex-1 items-center justify-center rounded bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-background transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending..." : "Send Message →"}
                    </button>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-border px-6 py-3 font-mono text-xs tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      Email directly
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </ContactFormContext.Provider>
  );
}

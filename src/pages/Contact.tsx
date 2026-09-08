import { PageHero } from "../components/PageHero";
import { EstimateForm } from "../components/EstimateForm";
import { company } from "../data/content";

export function Contact() {
  return (
    <div className="page-pad">
      <PageHero
        kicker="Free estimate"
        title="Request an estimate. We will call you back."
        text="Four fields, or just call. That is how most jobs start."
      />

      <section id="estimate" className="wrap grid scroll-mt-28 gap-8 py-16 lg:grid-cols-2">
        <div className="space-y-4">
          {company.phones.map((p) => (
            <a key={p.name} href={p.href} className="card block p-7">
              <p className="label text-gold-deep">{p.label}</p>
              <p className="mt-2 font-display text-4xl text-navy">{p.display}</p>
            </a>
          ))}
          <a href={`mailto:${company.email}`} className="card block bg-cream p-7">
            <p className="label text-gold-deep">Email</p>
            <p className="mt-2 font-display text-3xl text-navy">{company.email}</p>
          </a>
          <div className="flex flex-wrap gap-3">
            {company.phones.map((p) => (
              <a key={p.name} href={p.href} className="btn btn-gold">
                {p.label}
              </a>
            ))}
          </div>
        </div>
        <EstimateForm />
      </section>
    </div>
  );
}
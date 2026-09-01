import { Link } from "react-router-dom";
import { company } from "../data/content";

const sections = [
  {
    title: "Using this website",
    body: [
      "This website is provided by Belloz Construction LLC so you can learn about our work, services, and how to reach us. By using the site, you agree to these terms.",
      "The site is for general information. Viewing pages, sending a message, calling, or texting does not create a construction contract, bid, or warranty.",
    ],
  },
  {
    title: "Inquiries and project work",
    body: [
      "Any estimate, schedule, or scope of work is only binding if it is confirmed in a written agreement signed by Belloz Construction LLC and you.",
      "Project details, including price, timeline, materials, and warranties, are set in that agreement, not on this website.",
    ],
  },
  {
    title: "Photos and content",
    body: [
      "Photographs, text, and branding on this site belong to Belloz Construction LLC or are used with permission. Please do not copy or reuse them for another business without our written consent.",
      "Project photos show real Belloz work. Finished spaces may vary based on the client's design, materials, and site conditions.",
    ],
  },
  {
    title: "Accuracy",
    body: [
      "We aim to keep the site current. Service descriptions and other information may change. If something here differs from a conversation or written proposal, the written proposal controls.",
    ],
  },
  {
    title: "Third-party links",
    body: [
      "This site may link to Facebook, Instagram, or other third-party pages. Those sites have their own terms. We are not responsible for their content or practices.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "This website is provided as-is. To the extent allowed by law, Belloz Construction LLC is not liable for damages that come only from using or being unable to use the website, such as interrupted access or reliance on general site copy.",
      "This does not limit rights you may have under a signed construction agreement or under applicable law.",
    ],
  },
];

export function Terms() {
  const phone = company.phones[0];

  return (
    <div className="page-pad">
      <section className="bg-navy px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="label text-gold">Legal</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Terms and conditions</h1>
          <p className="mt-5 text-white/70">Last updated September 1, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed text-stone">
          These terms apply to the Belloz Construction LLC website. They are written in plain language so you know how to use the site and how to reach us. They are not a substitute for a signed construction contract.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <article key={section.title}>
              <h2 className="text-3xl text-navy">
                {i + 1}. {section.title}
              </h2>
              {section.body.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-stone">
                  {p}
                </p>
              ))}
            </article>
          ))}

          <article>
            <h2 className="text-3xl text-navy">{sections.length + 1}. Contact</h2>
            <p className="mt-3 leading-relaxed text-stone">
              Questions about these terms, or about a project, can go to Belloz Construction LLC in {company.region}:
            </p>
            <ul className="mt-4 space-y-2 text-navy">
              <li>
                Email:{" "}
                <a className="underline decoration-gold underline-offset-4" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </li>
              {company.phones.map((p) => (
                <li key={p.display}>
                  {p.label}:{" "}
                  <a className="underline decoration-gold underline-offset-4" href={p.href}>
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-stone">
              You can also use our{" "}
              <Link className="text-navy underline decoration-gold underline-offset-4" to="/contact">
                contact page
              </Link>
              .
            </p>
          </article>
        </div>

        <a
          href={phone.href}
          className="btn btn-navy mt-12"
        >
          Call {phone.display}
        </a>
      </section>
    </div>
  );
}

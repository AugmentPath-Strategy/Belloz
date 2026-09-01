type Props = {
  kicker: string;
  title: string;
  text?: string;
};

export function PageHero({ kicker, title, text }: Props) {
  return (
    <section className="bg-navy px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="label text-gold">{kicker}</p>
        <h1 className="mt-3 max-w-4xl text-5xl md:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-white/70">{text}</p>}
      </div>
    </section>
  );
}

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export function Lightbox({ src, alt, onClose }: Props) {
  return (
    <button
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/90 p-4"
      onClick={onClose}
      aria-label="Close image"
    >
      <img src={src} alt={alt} className="max-h-[90vh] max-w-full rounded-2xl object-contain" />
    </button>
  );
}

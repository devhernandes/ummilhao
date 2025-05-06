import { ReactNode } from "react";

interface SectionProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

export default function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={`max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden ${className}`}>
      <div className="bg-purple-900/30 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
        <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
        <p className="text-center mb-8 text-purple-100">{description}</p>
        {children}
      </div>
    </section>
  );
}
import React from "react";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-8">{children}</section>
      </div>
    </div>
  );
}

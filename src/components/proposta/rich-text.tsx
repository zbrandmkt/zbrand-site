"use client";

import React from "react";

export function RichText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-inherit">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}

export function RichParagraph({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={className}>
      <RichText text={text} />
    </p>
  );
}

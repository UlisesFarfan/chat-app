import React from "react";

interface LabelContent {
  className?: string;
  content?: string;
  htmlFor: string;
}

export default function Label({ className, content, htmlFor }: LabelContent) {
  return (
    <label className={className ? className : ""} htmlFor={htmlFor}>
      {content}
    </label>
  );
}

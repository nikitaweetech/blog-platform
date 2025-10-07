"use client";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  contents: string;
  className?: string;
};

const SanitizeContents = (props: Props) => {
  const cleanHtml = DOMPurify.sanitize("<script>alert('xss')</script>"+props.contents);
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default SanitizeContents;

import type { JSX } from "react";
import  MarkdownLib from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MarkdownProps } from "./Markdown.types";


export const Markdown = ({text}:MarkdownProps): JSX.Element => {
  return (
    <MarkdownLib
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => (
          <span className="w-full text-lg font-light mb-2 ml-1" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-semibold" {...props} />
        ),
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        a: ({ node, ...props }) => (
          <a
            className="text-blue-500 underline hover:text-blue-700"
            {...props}
          />
        ),
        code: ({ node, ...props }) => (
          <code
            className="bg-gray-200 text-sm rounded px-1 py-1 font-mono"
            {...props}
          />
        ),
        pre: ({ node, ...props }) => (
          <pre
            className="bg-gray-100 rounded p-2 overflow-x-auto mb-2"
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc ml-5 mb-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal ml-5 mb-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="ml-2 mb-1 text-lg font-light" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2"
            {...props}
          />
        ),
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold my-2" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold my-2" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-semibold my-2" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-4 border-gray-300" {...props} />
        ),
      }}
    >
      {text}
    </MarkdownLib>
  );
};

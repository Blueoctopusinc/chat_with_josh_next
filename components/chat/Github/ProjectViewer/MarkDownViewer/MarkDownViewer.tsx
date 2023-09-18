import ReactMarkdown from "react-markdown";
import React from "react";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface ReadMeViewerProps {
  ReadMeContent: string;
}
// import 'prismjs/themes/prism.css';  // Choose the theme that you like
import "github-markdown-css/github-markdown.css";
import "./github-markdown-overload.css";
const MarkDownViewer: React.FC<ReadMeViewerProps> = ({ ReadMeContent }) => {
  return (
    <div className="markdown-body flex h-full flex-col overflow-y-scroll  rounded-md p-4 ">
      <ReactMarkdown
        /* eslint-disable-next-line react/no-children-prop */
        children={ReadMeContent}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          // Override the default a component
          a: ({ node, children, href }) => {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={"bg-gray-800"}
              >
                {children}
              </a>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkDownViewer;

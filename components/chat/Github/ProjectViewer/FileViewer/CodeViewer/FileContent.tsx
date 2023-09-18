import React, { useEffect, useRef } from "react";
import { Highlight, Prism, themes } from "prism-react-renderer";
import { VirtuosoGrid } from "react-virtuoso";

import LineNumber from "@/components/chat/Github/ProjectViewer/FileViewer/CodeViewer/LineNumber";
import CodeLine from "@/components/chat/Github/ProjectViewer/FileViewer/CodeViewer/CodeLine";
import classNames from "classnames";
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-python");
require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-json");
require("prismjs/components/prism-yaml");
require("prismjs/components/prism-docker");
require("prismjs/components/prism-yaml");
require("prismjs/components/prism-csv");

const FileContent: React.FC<{
  content: string;
  maxLineChars: number;
  language: string;
  className?: string;
}> = ({ content, maxLineChars, language, className }) => {
  const contentRef = useRef<HTMLPreElement | null>(null);
  // Reset scroll position whenever content changes
  const NumberLineWidthStyle = {
    minWidth: `${maxLineChars}ch`,
  };
  useEffect(() => {
    if (contentRef.current !== null) {
      contentRef.current!.scrollTop = 0; // Using the non-null assertion
    }
  }, [content]);

  const wrapperClass = classNames(
    "flex h-full w-full bg-gray-900 rounded-md overflow-hidden text-sm",
    className,
  );

  // return (
  return (
    <Highlight theme={themes.vsDark} code={content} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div className={wrapperClass} ref={contentRef}>
          {/* Virtual grid for performance (only in view + overscan elements are rendered (with a scroll bar showing the
          full data length) */}
          <VirtuosoGrid
            style={{ flex: 1, overflowX: "scroll" }}
            totalCount={tokens.length}
            overscan={200}
            itemContent={(index) => {
              const line = tokens[index];

              return (
                <div className="flex">
                  {/* Column for Line Numbers */}
                  <div
                    style={NumberLineWidthStyle}
                    className={`flex flex-col items-end  bg-sky-900 text-left `}
                  >
                    <LineNumber key={index} index={index} />
                  </div>
                  {/* Column for Code Content */}
                  <pre className="w-full rounded-r-md border-sky-900 bg-gray-900 ">
                    <div {...getLineProps({ line, key: index })}>
                      <CodeLine
                        key={index}
                        index={index}
                        line={tokens[index]}
                        getTokenProps={getTokenProps}
                      />
                    </div>
                  </pre>
                </div>
              );
            }}
          />
        </div>
      )}
    </Highlight>
  );
};

export default FileContent;

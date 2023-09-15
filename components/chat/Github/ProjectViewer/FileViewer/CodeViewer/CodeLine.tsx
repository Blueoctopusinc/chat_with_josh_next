import React from "react";

const CodeLine: React.FC<{ index: number; line: any; getTokenProps: any }> = ({
  index,
  line,
  getTokenProps,
}) => (
  <div className={`flex py-1 pl-2 `}>
    {line.map((token, key) => (
      <span key={key} {...getTokenProps({ token })} />
    ))}
  </div>
);
export default CodeLine;

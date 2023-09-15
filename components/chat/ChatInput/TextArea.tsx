import React, { ChangeEvent, KeyboardEvent, FC } from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({ value, onChange, onKeyPress }) => (
  <textarea
    className="h-12 w-full resize-none overflow-y-auto rounded-l-lg bg-gray-600 p-4 leading-4 focus:outline-none"
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    aria-label="Chat Input"
  />
);

export default TextArea;

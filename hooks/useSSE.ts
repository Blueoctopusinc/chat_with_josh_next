// hooks/useSSE.ts
import { useEffect, useState } from "react";

interface IMessage {
  result?: string;
  error?: string;
}

const useSSE = (url: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event: MessageEvent) => {
      const parsedData: IMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, parsedData]);
    };

    eventSource.onerror = (err: Event) => {
      setError(`EventSource failed: ${JSON.stringify(err)}`);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { messages, error };
};

export default useSSE;

import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

interface Data {
  fact: string,
  legth: string,
}

function FactComponent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);


    const getData = async (): Promise<Data> => {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      if (textareaRef.current) textareaRef.current.focus();
      return data;
    }

  const { data, refetch } = useQuery({queryKey: ['FactKey'], queryFn: getData, enabled: false});

  return (
    <>
      <h1>FactComponent</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <button onClick={() => refetch()}>Получить факт</button>
        <textarea ref={textareaRef} value={data?.fact}  cols={55} rows={5}></textarea>
      </div>
    </>
  );
}

export default FactComponent
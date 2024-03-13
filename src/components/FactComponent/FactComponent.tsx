import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface catFace {
  data: Data
}

interface Data {
  fact: string,
  legth: string,
}

function FactComponent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);


    const getData = async () => {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      textareaRef.current.focus();
      return data;
    }

  const { data } = useQuery({queryKey: ['FactKey'], queryFn: getData});
  console.log(data);

  return (
    <div className='App'>
      <textarea ref={textareaRef} value={data?.fact}  cols='55' rows="5"></textarea>
    </div>
  );
}

export default FactComponent
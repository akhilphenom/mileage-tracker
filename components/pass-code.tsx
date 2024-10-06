import { useRef, useState } from "react";
import type { RefObject } from "react";
import type { TextInput } from "react-native";
import { CodeInput } from "./code-input";
import React, { forwardRef, useImperativeHandle } from "react";

export interface PassCodeRef {
  getCodes: () => string[];
}

export const PassCode = forwardRef<PassCodeRef, {}>((props, ref) => {
  const [codes, setCodes] = useState<string[]>(Array(4).fill(""));
  const [errorMessages, setErrorMessages] = useState<string[]>();
  
  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useImperativeHandle(ref, () => ({
    getCodes: () => codes,
  }));

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      const newCodes = text.split("").slice(0, 4);
      refs[3]!.current?.focus();

      setErrorMessages(undefined);
      setCodes(newCodes);
      
      return;
    }

    setErrorMessages(undefined);
    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);
    
    if (text !== "" && index < 3) {
      refs[index + 1]!.current?.focus();
    }
  };

  return (
    <CodeInput
      codes={codes}
      errorMessages={errorMessages}
      onChangeCode={onChangeCode}
      refs={refs}
      config={{
        backgroundColor: 'white',
        textColor: 'black',
        borderColor: 'gray',
        errorColor: 'red',
        focusColor: 'blue'
      }}
    />
  );
});
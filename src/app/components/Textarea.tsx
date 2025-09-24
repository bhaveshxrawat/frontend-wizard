import { useRef } from "react";
import { type Data, DataZod } from "../types";

export default function Textarea({
  data,
  changeHandler,
}: {
  data: Data;
  changeHandler: (data: Data) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleFormChange() {
    if (!btnRef?.current) return;
    btnRef.current.disabled = false;
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!textareaRef?.current) return;
    const { value } = textareaRef.current;
    let parsedJson: Data;
    try {
      parsedJson = JSON.parse(value);
    } catch (err) {
      alert(`Invalid JSON: ${err instanceof Error && err.message}`);
      return;
    }
    const parseVal = DataZod.safeParse(parsedJson);
    if (parseVal.error) alert(`${parseVal.error.issues[0].message}`);
    if (!parseVal.success) return;
    changeHandler(parseVal.data);
  }

  return (
    <div className="jsonData">
      <form onChange={handleFormChange} onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          suppressHydrationWarning
          name=""
          id=""
          defaultValue={JSON.stringify(data)}
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          autoCapitalize="off"
        ></textarea>
        <button ref={btnRef} type="submit" disabled>
          Save
        </button>
      </form>
    </div>
  );
}

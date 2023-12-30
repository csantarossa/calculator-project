import { ACTIONS } from "../App";

export default function DigitButton({ dispatch, digit, gridSpan }) {
  const buttonClassName = `buttons ${gridSpan ? `col-span-2` : ""}`;

  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }}
      className={buttonClassName}
    >
      {digit}
    </button>
  );
}

import React, { useReducer } from "react";
import { ACTIONS } from "../App";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

const Calculator = () => {
  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          };
        }
        if (payload.digit === "0" && state.currentOperand === "0") return state;
        if (payload.digit === "." && state.currentOperand.includes("."))
          return state;
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        };

      case ACTIONS.CLEAR:
        return {};

      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state;
        }
        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state),
        };

      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state;
        }

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          };
        }

        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          };
        }
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        };

      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return { ...state, overwrite: false, currentOperand: null };
        }
        if (state.currentOperand == null) return state;
        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null };
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };

      default:
        return state;
    }
  }

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let computation = "";
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      //
      default:
    }
    return computation.toString();
  }

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });

  function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(",");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
  }

  return (
    <div className="h-screen w-screen bg-[#333333] shadow-xl overflow-hidden">
      <div className="h-[16vh] w-full bg-[#333333] flex flex-col justify-center items-end relative p-5">
        <div className="text-xl font-semibold absolute top-3 screen">
          {/* Previous Operand */}
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="text-7xl font-bold screen mt-8">
          {/* Current Operand */}
          {formatOperand(currentOperand)}
        </div>
      </div>
      <div className="grid justify-center items-center grid-cols-4 gap-1 h-[70vh] w-full p-1">
        <button
          className="special-buttons"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          className="special-buttons"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </button>
        <OperationButton operation="%" dispatch={dispatch} />
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="x" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="0" gridSpan={2} dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button
          className="special-buttons"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;

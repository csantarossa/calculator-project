import Calculator from "./components/Calculator";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate",
};

function App() {
  return (
    <div className="App h-screen w-screen flex flex-col justify-center items-center bg-[#6d6d6d]">
      <Calculator />
    </div>
  );
}

export default App;

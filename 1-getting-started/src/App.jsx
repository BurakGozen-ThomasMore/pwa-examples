import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <h1>PWA Demo APP</h1>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </main>
    </>
  );
}

export default App;

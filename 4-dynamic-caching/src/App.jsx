export default function App() {
  function fetchData() {
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <>
      <main>
        <h1>PWA Demo APP</h1>
        <button onClick={fetchData}>Fetch Data</button>
      </main>
    </>
  );
}

export default function App() {
  async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json = await response.json();
    return console.log(json);
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

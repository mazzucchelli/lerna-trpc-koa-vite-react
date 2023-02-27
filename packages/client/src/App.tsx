import { trpc } from "./utils/trpc";
import "./App.css";

function App() {
  const { data } = trpc.greeting.useQuery({
    name: "Mario",
  });

  return <main className="p-2">{data?.text}</main>;
}

export default App;

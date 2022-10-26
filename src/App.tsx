import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

type Table = {
  name: string;
  sql_path: string;
  sql: string;
  depends_on: Array<Table>
}

function App() {

  const [tables, setTable] = useState<Array<Table>>([]);
  
  async function getDepends() {
    invoke<Array<Table>>("get_table_dependencies", {})
    .then((res)=> {
      console.log(res);
      setTable(res);
    })
    .catch((e) => console.error(e))
  }

  return (
    <div className="container">
      <h1>Simple BI tool Subrow</h1>

      <div className="row">
        <div>
          <button type="button" onClick={() => getDepends()}>
            Greet
          </button>
        </div>
      </div>
      { tables.map((table) => {
        return <p>{table.name}{table.sql}</p>;
      })}
      <p>

      </p>
    </div>
  );
}

export default App;

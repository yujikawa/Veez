import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from '@tauri-apps/api/dialog';

type SQL = {
  path: string;
  query: string;
  rendered_query: string;
}

type Table = {
  table: string;
  sql: SQL;
  depends_on: Array<string>
}

function App() {

  const [tables, setTable] = useState<Array<Table>>([]);
  
  function openDialog() {
    open(
     {directory: true}
    ).then(
      dirPath =>{
        invoke<Array<Table>>("get_analized_tables", {"rootDir": dirPath})
        .then((result)=> setTable(result) )
        .catch((e) => console.error(e))
      }

    );
  }



  return (
    <div className="container">
      <h1>Simple BI tool Subrow</h1>

      <div className="row">
        <div>
          <button type="button" onClick={() => openDialog()}>
            Select SQL folder
          </button>
        </div>
      </div>
      { tables.map((table) => {
        return <p>{table.table}<br/>{table.sql.rendered_query}</p>;
      })}
      <p>

      </p>
    </div>
  );
}

export default App;

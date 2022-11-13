import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from '@tauri-apps/api/dialog';
import { CsvChart } from './components/CsvChart';
import { Table } from './components/Table';
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
  const [sqlPath, setSqlPath] = useState<string | string[] | null>("");
  const [csvPath, setCsvPath] = useState<string | string[] | null>("");


  function openSqlDialog() {
    open(
      { directory: true }
    ).then(
      dirPath => {
        setSqlPath(dirPath);
        invoke<Array<Table>>("get_analized_tables", { "rootDir": dirPath })
          .then((result) => setTable(result))
          .catch((e) => console.error(e))
      }

    );
  }

  function openCsvDialog() {
    open(
      { filters: [
        {name: 'Data', extensions: ['csv']}
      ]}
    ).then(
      csvFilePath => {
        setCsvPath(csvFilePath);
        invoke<Array<Table>>("injestion_source_data", { "csvFilePath": csvFilePath })
          .then((result) => console.log(result));
      }

    );
  }


  return (
    <div className="container">
      <h1>Subrow</h1>

      <div className="row">
        <div>
          {/* <button type="button" onClick={() => openCsvDialog()}>
            Select CSV folder
          </button> */}
          <button type="button" onClick={() => openSqlDialog()}>
            Select SQL folder
          </button>
        </div>
      </div>
      {/* <p>CSV Path: {csvPath}</p>
      <p>SQL Path: {sqlPath}</p> */}
      <Table />
      <CsvChart/>
      {tables.map((table) => {
        return <p>{table.table}<br />{table.sql.rendered_query}</p>;
      })}
      
    </div>
  );
}

export default App;

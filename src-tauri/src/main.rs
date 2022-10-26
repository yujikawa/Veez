#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[derive(serde::Serialize)]
struct Table {
    name: String,
    sql_path: String,
    sql: String,
    depends_on: Vec<Table>
}

impl Table {
    fn new(name: String, sql_path: String, depends_on: Vec<Table>) -> Self{
        Table {
            name: name,
            sql_path: sql_path,
            sql: "select * frmo table".to_string(),
            depends_on: depends_on
        }
    }
}

#[tauri::command]
async fn get_table_dependencies() -> Result<Vec<Table>, String> {
    let t1 = Table::new("tableA".to_string(), "tableA.sql".to_string(), vec![]);
    Ok(vec![t1])
}

fn main() {
   
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_table_dependencies])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests{
    use crate::Table;

    #[test]
    fn test_create_table() {
        let t = Table::new("tableName".to_string(), "sample.sql".to_string(), vec![]);
        assert_eq!(t.name, "tableName".to_string());

    }

    fn test_render_sql() {
        let sql = "select * from {{ ref('db', 'tableA') }}".to_string();
        let get_ref_tables(sql);
    }
}
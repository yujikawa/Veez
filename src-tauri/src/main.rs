#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use alisql::get_dependencies;
use alisql::sql_analyzer::analyzer::Table;

#[tauri::command]
async fn get_analized_tables(root_dir: String) -> Result<Vec<Table>, String> {
    let tables = get_dependencies(&root_dir);
    Ok(tables)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_analized_tables])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

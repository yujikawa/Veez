#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use alisql::get_dependencies;
use alisql::sql_analyzer::analyzer::Table;
use datafusion::prelude::*;
use serde::Serialize;
use std::path::Path;

#[tauri::command]
async fn get_analized_tables(root_dir: String) -> Result<Vec<Table>, String> {
    let tables = get_dependencies(&root_dir);
    Ok(tables)
}

#[tauri::command]
async fn injestion_source_data(csv_file_path: String) -> Result<(), String> {
    let ctx = SessionContext::new();
    let file_name = Path::new(&csv_file_path).file_name().unwrap();
    ctx.register_csv("subrow", &csv_file_path, CsvReadOptions::new())
        .await;
    let df = ctx.sql("select * from subrow").await.unwrap();
    df.write_json("sabrow.json").await.unwrap();

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_analized_tables])
        .invoke_handler(tauri::generate_handler![injestion_source_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

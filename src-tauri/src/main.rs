#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;

#[tauri::command]
fn cmd(input: &str) -> String {
    // let paths = fs::read_dir(path).unwrap();
    format!("Input command is {}!", input)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![cmd])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

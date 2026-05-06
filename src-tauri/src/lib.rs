use tauri::Manager;
use tauri_plugin_dialog::{DialogExt, MessageDialogKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                let app = window.app_handle().clone();
                api.prevent_close();

                app.dialog()
                    .message("Are you sure you want to quit? Your timer will stop.")
                    .title("Exit Focus Timer")
                    .kind(MessageDialogKind::Info) // Using Info as Question might not be in all versions
                    .buttons(tauri_plugin_dialog::MessageDialogButtons::YesNo)
                    .show(move |answer| {
                        if answer {
                            app.exit(0);
                        }
                    });
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

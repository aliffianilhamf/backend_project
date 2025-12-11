import fs from "fs";
import path from "path";

/**
 * Definisikan interface untuk task dan task list
 */
interface ITask {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

interface ITaskList {
  tasks: ITask[];
  nextId: number;
}

/**
 * File path untuk menyimpan data tasks
 */
const DATA_FILE = path.join(__dirname, "tasks.json");

/**
 * fungsi untuk meload tasks dari file JSON dan mengembalikan sebagai objek ITaskList
 */
function loadTasks(): ITaskList {
  try {
    // Cek apakah file ada
    if (!fs.existsSync(DATA_FILE)) {
      // Jika tidak ada, kembalikan task list kosong dengan nextId 1
      return { tasks: [], nextId: 1 };
    }

    // Jika ada, baca file dengan encoding utf-8 agar menghasilkan string
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    // Parse JSON dan kembalikan sebagai ITaskList, berguna untuk TypeScript type checking
    return JSON.parse(data) as ITaskList;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return { tasks: [], nextId: 1 };
  }
}

/**
 * fungsi untuk menyimpan tasks ke file JSON
 */
function saveTasks(taskList: ITaskList): void {
  try {
    // Tulis data ke file dengan format JSON yang terstruktur (indentasi 2 spasi)
    fs.writeFileSync(DATA_FILE, JSON.stringify(taskList, null, 2));
  } catch (error) {
    console.error("Error saving tasks:", error);
    process.exit(1);
  }
}

/**
 * Fungsi untuk menambahkan task baru
 */
function addTask(description: string): void {
  try {
    const taskList = loadTasks();
    const now = new Date().toISOString();

    // Buat task baru dengan tipe ITask dan deskripsi dari parameter
    const newTask: ITask = {
      id: taskList.nextId,
      description,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    // Tambahkan task baru ke daftar task, karena taskList.tasks adalah array
    taskList.tasks.push(newTask);
    // update nextId untuk task berikutnya
    taskList.nextId += 1;

    // Simpan task list yang sudah diperbarui ke json file
    saveTasks(taskList);
    console.log("Task added successfully:", newTask);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

/**
 * Fungsi untuk mengupdate task yang ada
 */
function updateTask(id: number, description: string): void {
  try {
    const taskList = loadTasks();
    // Cari task berdasarkan ID
    const task = taskList.tasks.find((t) => t.id === id);
    if (!task) {
      console.error(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    // Update deskripsi dan waktu update
    task.description = description;
    task.updatedAt = new Date().toISOString();

    // Simpan task list yang sudah diperbarui ke json file
    saveTasks(taskList);
    console.log("Task updated successfully:", task);
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

/**
 * Fungsi untuk menghapus task berdasarkan ID
 */
function deleteTask(id: number): void {
  try {
    const taskList = loadTasks();
    // Cari index task berdasarkan ID
    const taskIndex = taskList.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      console.error(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    // Hapus task dari array menggunakan splice
    /**
     * Cara kerja splice:
     * splice(startIndex, deleteCount)
     * startIndex: index awal untuk mulai menghapus
     * deleteCount: jumlah elemen yang akan dihapus dari startIndex
     */
    taskList.tasks.splice(taskIndex, 1);

    // Simpan task list yang sudah diperbarui ke json file
    saveTasks(taskList);
    console.log(`Task with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

/**
 * Fungsi untuk menandai task sebagai in-progress atau done
 */
function markTask(id: number, status: "in-progress" | "done"): void {
  try {
    const taskList = loadTasks();
    // Cari task berdasarkan ID
    const task = taskList.tasks.find((t) => t.id === id);

    if (!task) {
      console.error(`Task with ID ${id} not found.`);
      process.exit(1);
    }

    // Update status dan waktu update
    task.status = status;
    task.updatedAt = new Date().toISOString();

    // Simpan task list yang sudah diperbarui ke json file
    saveTasks(taskList);
    console.log(`Task with ID ${id} marked as ${status} successfully.`);
  } catch (error) {
    console.error("Error marking task:", error);
  }
}

/**
 * Fungsi untuk menampilkan daftar task, dengan opsi filter berdasarkan status
 */
function listTasks(filterStatus?: "todo" | "in-progress" | "done"): void {
  try {
    const taskList = loadTasks();
    let tasksToDisplay = taskList.tasks;

    // Jika ada filter status, saring task sesuai status tersebut
    if (filterStatus) {
      // Filter tasks berdasarkan status yang diberikan
      /**
       * Cara kerja filter:
       * filter(callbackFn)
       * callbackFn: fungsi yang mengembalikan true atau false untuk setiap elemen
       * Jika true, elemen tersebut akan dimasukkan ke array hasil filter
       */
      tasksToDisplay = tasksToDisplay.filter(
        (task) => task.status === filterStatus
      );
    }

    // Jika tidak ada task yang ditemukan, tampilkan pesan
    if (tasksToDisplay.length === 0) {
      console.log("No tasks found.");
      return;
    }

    console.log("Tasks:");
    console.log("-".repeat(80));

    // Tampilkan setiap task dengan format yang rapi
    /* Cara kerja forEach:
     * forEach(callbackFn)
     * callbackFn: fungsi yang dipanggil untuk setiap elemen dalam array
     */
    tasksToDisplay.forEach((task) => {
      const statusIcon = {
        todo: "[ ]",
        "in-progress": "[~]",
        done: "[✓]",
      }[task.status];

      console.log(`${statusIcon} ID: ${task.id} | ${task.description}`);
      console.log(
        `   Status : ${task.status} | updatedAt: ${new Date(
          task.updatedAt
        ).toLocaleString()}`
      );
      console.log("-".repeat(80));
    });

    console.log(`Total tasks: ${tasksToDisplay.length}`);
  } catch (error) {
    console.error("Error listing tasks:", error);
  }
}

/**
 * Fungsi utama untuk menangani input CLI dan menjalankan perintah yang sesuai
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: task-cli <command> [arguments]");
    console.log("\nCommands:");
    console.log("  add <description>           - Add a new task");
    console.log("  update <id> <description>   - Update a task");
    console.log("  delete <id>                 - Delete a task");
    console.log("  mark-in-progress <id>       - Mark task as in progress");
    console.log("  mark-done <id>              - Mark task as done");
    console.log(
      "  list [status]               - List tasks (optional: done, todo, in-progress)"
    );
    process.exit(0);
  }

  const command = args[0];

  try {
    switch (command) {
      case "add":
        if (args.length < 2) {
          console.error("Description is required for adding a task.");
          process.exit(1);
        }
        addTask(args.slice(1).join(" "));
        break;
      case "update":
        if (args.length < 3) {
          console.error("ID and Description are required for updating a task.");
          process.exit(1);
        }
        updateTask(parseInt(args[1]), args.slice(2).join(" "));
        break;
      case "delete":
        if (args.length < 2) {
          console.error("ID is required for deleting a task.");
          process.exit(1);
        }
        deleteTask(parseInt(args[1]));
        break;
      case "mark-in-progress":
        if (args.length < 2) {
          console.error("ID is required for marking a task as in-progress.");
          process.exit(1);
        }
        markTask(parseInt(args[1]), "in-progress");
        break;
      case "mark-done":
        if (args.length < 2) {
          console.error("ID is required for marking a task as done.");
          process.exit(1);
        }
        markTask(parseInt(args[1]), "done");
        break;
      case "list":
        if (args.length === 2) {
          const status = args[1];
          if (
            status !== "todo" &&
            status !== "in-progress" &&
            status !== "done"
          ) {
            console.error(
              "Invalid status. Use 'todo', 'in-progress', or 'done'."
            );
            process.exit(1);
          }
          listTasks(status as "todo" | "in-progress" | "done");
        } else {
          listTasks();
        }
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error("Error executing command:", error);
    process.exit(1);
  }
}

/**
 * Jalankan fungsi utama
 */
main();

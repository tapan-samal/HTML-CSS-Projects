import { tasks } from "./data/task";

export const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export const insertDataInIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("task-tracker", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("task")) {
      const objectStore = db.createObjectStore("task", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("id", "id", { unique: false });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("task", "readwrite");
    var task = tx.objectStore("task");

    tasks.forEach((item) => task.add(item));

    return tx.complete;
  };
};

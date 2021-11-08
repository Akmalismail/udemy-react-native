import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number
) => {
  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

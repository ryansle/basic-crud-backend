const fs = require('fs');
const fsPromises = require('fs/promises');

// Utilities
import { v4 as uuid } from 'uuid';

// Models
import { Data } from './models/enums';
import List from './models/List';
import Task from './models/Task';

// This is essentially our dataSource

// Mock database
const lists = '/Users/ryanle/Desktop/projects/basic-crud-backend/src/data/lists.json';
const tasks = '/Users/ryanle/Desktop/projects/basic-crud-backend/src/data/tasks.json';

class DatabaseService {
  // Typically in a database service we would
  //  have a constructor that initialized the
  //  database connection for use as a singleton
  // Because we only make the connection to the
  //  database the singular time for use
  private getStore = (type) => {
    if (type === Data.LIST) return lists;
    return tasks;
  }

  getAllItems = (type): Promise<List[] | Task[]> => {
    return new Promise((resolve, reject) => {
      const file = this.getStore(type);
      try {
        const contents = fs.readFileSync(file);
        const items: List[] | Task[] = JSON.parse(contents);

        resolve(items);
      } catch (e) {
        reject('items are not available');
      }
    });
  }

  getItemById = (id, type): Promise<any> => {
    return new Promise((resolve, reject) => {
      const file = this.getStore(type);
      try {
        const contents = fs.readFileSync(file);
        const items = JSON.parse(contents);

        const result = items.find((item) => item.id === id);
        if (!result) return reject(`item with id ${id} found`);
        return resolve(result);
      } catch (e) {
        reject('items are not available');
      }
    });
  }

  deleteItemById = (id, type): Promise<void> => {
    return new Promise((resolve, reject) => {
      const file = this.getStore(type);
      try {
        const contents = fs.readFileSync(file);
        const items = JSON.parse(contents);

        const index = items.findIndex((item) => item.id === id);
        if (index === -1) return reject(`no item found with id ${id}`);
        const remaining = items.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(remaining));
        resolve();
      } catch (e) {
        reject('items are not available');
      }
    });
  }

  replaceItemById = (toBeReplaced, type): Promise<void> => {
    return new Promise((resolve, reject) => {
      const file = this.getStore(type);
      try {
        const contents = fs.readFileSync(file);
        const items = JSON.parse(contents);

        const index = items.findIndex((item) => item.id === toBeReplaced.id);
        if (index === -1) return reject(`no item found with id ${toBeReplaced.id}`);

        items[index] = toBeReplaced;
        fs.writeFileSync(file, JSON.stringify(items));
        resolve();
      } catch (e) {
        reject('items are not available');
      }
    });
  }

  createItem = (body, type): Promise<Task | List> => {
    return new Promise((resolve, reject) => {
      const file = this.getStore(type);

      try {
        body.id = uuid();

        const contents = fs.readFileSync(file);
        const items = JSON.parse(contents);

        items.push(body);
        fs.writeFileSync(file, JSON.stringify(items));
        resolve(body);
      } catch (e) {
        reject('could not create resource');
      }
    })
  }
}

export default new DatabaseService();
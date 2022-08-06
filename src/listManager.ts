import databaseService from './databaseService';
import { Data } from './models/enums';
import List from './models/List';

// This is where you should do all of your validation prior to communicating with the database service
export default class ListManager {
  createList(body) {
    if (!body.name) {
      throw 'List requires a name';
    }

    // Sanitize the item and make sure its of the
    //  correct type first
    const item: List = {
      name: body.name,
      description: body.description,
      tasks: []
    };

    return databaseService.createItem(item, Data.LIST)
  }

  getLists() {
    return databaseService.getAllItems(Data.LIST);
  }

  getListById(id) {
    if (!id) {
      throw 'ID is required';
    }

    return databaseService.getItemById(id, Data.LIST);
  }

  async updateList(id, updateParams) {
    if (!id) {
      throw `no list to update under id ${id}`;
    }

    const listToUpdate: List = await databaseService.getItemById(id, Data.LIST);

    listToUpdate.name = updateParams.name ?? listToUpdate.name;
    listToUpdate.description = updateParams.description ?? listToUpdate.description;

    return await databaseService.replaceItemById(listToUpdate, Data.LIST);
  }

  deleteList(id) {
    if (!id) {
      throw `no list with id ${id}`;
    }

    return databaseService.deleteItemById(id, Data.LIST);
  }
}

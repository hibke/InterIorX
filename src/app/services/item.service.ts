import { Injectable } from '@angular/core';
import { sample_items } from '../components/shared/models/data';
import { Item } from '../components/shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getAll(): Item[]{
    return sample_items;

  }

  getAllItemsByType(fourniture:string){
    return this.getAll().filter(item => item.type.includes(fourniture))
  }

  getItemById(itemId:number):Item{
    return this.getAll().find(Item => Item.id == itemId) ?? new Item();
  }
  
  
}

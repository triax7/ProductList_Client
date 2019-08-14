import {Category} from './category';

export class ProductAdd {
  name: string;
  categoryId: number;
  constructor(name: string, categoryId: number) {
    this.name = name;
    this.categoryId = categoryId;
  }
}

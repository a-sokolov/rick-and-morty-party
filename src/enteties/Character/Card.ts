export interface ICard {
  id: string;
  name: string;
  image: string;
}

export class Card implements ICard {
  id: string;
  name: string;
  image: string;

  constructor(id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

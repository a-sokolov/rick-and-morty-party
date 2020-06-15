export interface AbstractCard {
  id: string;
  name: string;
  image: string;
}

export class Card implements AbstractCard {
  id: string;
  name: string;
  image: string;

  constructor(id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

export interface CharacterCardProperty {
  item: Card,
  onSelect: (item: Card) => void,
  onDelete: (item: Card) => void
}

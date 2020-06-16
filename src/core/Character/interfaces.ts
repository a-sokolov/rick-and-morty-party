import {Card} from "./Card/interfaces";

export interface ScreensCharacterFormProperty {
  characterName: string
}

export interface CharactersResultData {
  characters: {
    results?: Array<Card>
  }
}
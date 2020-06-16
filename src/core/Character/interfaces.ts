import gql from "graphql-tag";
import {Card} from "./Card/interfaces";

export interface ScreensCharacterFormProperty {
  characterName: string
}

export interface CharactersResultData {
  characters: {
    results?: Array<Card>
  }
}

export const getCharactersByNameQuery = gql`
  query getCharactersByNameQuery($characterName: String!) {
    characters(filter: {name: $characterName }) {
      results {
        id,
        name,
        image
      }
    }
  }
`;
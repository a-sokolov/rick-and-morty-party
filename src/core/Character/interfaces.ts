import gql from "graphql-tag";

export interface ScreensCharacterFormProperty {
  characterName: string
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
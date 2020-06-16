import gql from 'graphql-tag';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

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

export type GetCharactersByNameQueryVariables = {
  characterName: string;
};

export interface Query {
  __typename?: 'Query';
  characters?: Maybe<CharactersQuery>;
}

export interface CharactersQuery {
  __typename?: 'CharactersQuery';
  result: Array<Character>;
}

export interface Character {
  id: string;
  name: string;
  image: string;
}

export type GetCharactersByNameProfileQuery = {
  __typename?: 'Query';
  characters?: Maybe<{
    __typename?: 'CharactersQuery';
    results: Array<{
      __typename?: 'Character';
      id: string;
      name: number;
      image: string;
    }>;
  }>;
};

export function useCharactersByNameQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<null, GetCharactersByNameQueryVariables>,
) {
  return ApolloReactHooks.useQuery<null, GetCharactersByNameQueryVariables>(
      getCharactersByNameQuery,
      baseOptions,
  );
}
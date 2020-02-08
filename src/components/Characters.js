import React, { useContext } from 'react';
// GraphQL
import { Query } from "react-apollo";
import gql from 'graphql-tag';
// Context
import { CharacterNameContext } from './Context.js';

function Characters() {
  const value = useContext(CharacterNameContext);
  const LoadCharactersByName = (props) => (
    <Query
        query={gql`
          query {
            characters(filter: {status: "alive", name: "${ props.name }" }) {
              info {
                count
              }
              results {
                id,
                name,
                image
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error while loading characters list.</p>;

          return (
            <div className="CharacterList">
               {data.characters.results.map(({ id, name, image }) => (
                 <img src={ image } width="100" height="100" />
               ))}
            </div>
          );
        }}
    </Query>
  );

  return (
    <LoadCharactersByName name={ value } />
  );
};

export default Characters;

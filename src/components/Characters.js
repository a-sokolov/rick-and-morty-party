import React, { useContext, useState, useEffect } from 'react';
// GraphQL
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
// Context
import { CharacterNameContext } from './Context.js';
// Utils
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    overflowY: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 250,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'rgba(0,0,0,0)',
  },
  icon: {
    color: 'white',
  },
}));

function Characters() {
  const classes = useStyles();
  // Состяние текущего Рика и Морти
  const [rick, setRick] = useState('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  const [morty, setMorty] = useState('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  // Здесь будем хранить коллекцию персонажей (id, name, image)
  const [list, setList] = useState([]);
  const setCharacterList = (data) => {
    setList(data.characters.results);
  }
  // Читаем имя персонажа из контекста
  const characterName = useContext(CharacterNameContext);
  useEffect(() => {
    if (characterName && characterName.length > 2) {
      if (characterName.toLowerCase().indexOf('ric') >= 0) {
        setList([
            {
              "id": "1",
              "name": "Rick Sanchez",
              "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            },
            {
              "id": "48",
              "name": "Black Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/48.jpeg"
            },
            {
              "id": "72",
              "name": "Cool Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/72.jpeg"
            },
            {
              "id": "74",
              "name": "Cop Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/74.jpeg"
            },
            {
              "id": "78",
              "name": "Cowboy Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/78.jpeg"
            },
            {
              "id": "220",
              "name": "Mega Fruit Farmer Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/220.jpeg"
            },
            {
              "id": "265",
              "name": "Pickle Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/265.jpeg"
            },
            {
              "id": "267",
              "name": "Plumber Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/267.jpeg"
            },
            {
              "id": "288",
              "name": "Rick D716-B",
              "image": "https://rickandmortyapi.com/api/character/avatar/288.jpeg"
            },
            {
              "id": "289",
              "name": "Rick D716-C",
              "image": "https://rickandmortyapi.com/api/character/avatar/289.jpeg"
            },
            {
              "id": "291",
              "name": "Rick J-22",
              "image": "https://rickandmortyapi.com/api/character/avatar/291.jpeg"
            },
            {
              "id": "292",
              "name": "Rick K-22",
              "image": "https://rickandmortyapi.com/api/character/avatar/292.jpeg"
            },
            {
              "id": "328",
              "name": "Slow Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/328.jpeg"
            },
            {
              "id": "345",
              "name": "Teacher Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/345.jpeg"
            },
            {
              "id": "381",
              "name": "Woman Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/381.jpeg"
            },
            {
              "id": "472",
              "name": "Baby Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/472.jpeg"
            },
            {
              "id": "477",
              "name": "Hairdresser Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/477.jpeg"
            },
            {
              "id": "478",
              "name": "Journalist Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/478.jpeg"
            },
            {
              "id": "482",
              "name": "Secret Service Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/482.jpeg"
            },
            {
              "id": "483",
              "name": "Steve Jobs Rick",
              "image": "https://rickandmortyapi.com/api/character/avatar/483.jpeg"
            }
          ]);
      } else if (characterName.toLowerCase().indexOf('mor') >= 0) {
        setList([
          {
            "id": "2",
            "name": "Morty Smith",
            "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          },
          {
            "id": "18",
            "name": "Antenna Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg"
          },
          {
            "id": "27",
            "name": "Artist Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/27.jpeg"
          },
          {
            "id": "77",
            "name": "Cowboy Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/77.jpeg"
          },
          {
            "id": "84",
            "name": "Cult Leader Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/84.jpeg"
          },
          {
            "id": "85",
            "name": "Cyclops Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/85.jpeg"
          },
          {
            "id": "118",
            "name": "Evil Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/118.jpeg"
          },
          {
            "id": "123",
            "name": "Fat Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/123.jpeg"
          },
          {
            "id": "143",
            "name": "Glasses Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/143.jpeg"
          },
          {
            "id": "206",
            "name": "Lizard Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/206.jpeg"
          },
          {
            "id": "229",
            "name": "Morty Mart Manager Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/229.jpeg"
          },
          {
            "id": "230",
            "name": "Morty Jr.",
            "image": "https://rickandmortyapi.com/api/character/avatar/230.jpeg"
          },
          {
            "id": "232",
            "name": "Morty Smith",
            "image": "https://rickandmortyapi.com/api/character/avatar/232.jpeg"
          },
          {
            "id": "233",
            "name": "Morty K-22",
            "image": "https://rickandmortyapi.com/api/character/avatar/233.jpeg"
          },
          {
            "id": "366",
            "name": "Trunk Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/366.jpeg"
          },
          {
            "id": "392",
            "name": "Bearded Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/392.jpeg"
          },
          {
            "id": "401",
            "name": "Morty Jr's interviewer",
            "image": "https://rickandmortyapi.com/api/character/avatar/401.jpeg"
          },
          {
            "id": "473",
            "name": "Bartender Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/473.jpeg"
          },
          {
            "id": "474",
            "name": "Dancer Cowboy Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/474.jpeg"
          },
          {
            "id": "475",
            "name": "Dancer Morty",
            "image": "https://rickandmortyapi.com/api/character/avatar/475.jpeg"
          }
        ]);
      } else if (characterName.toLowerCase().indexOf('bet') >= 0) {
        setList([
          {
            "id": "4",
            "name": "Beth Smith",
            "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
          },
          {
            "id": "36",
            "name": "Beta-Seven",
            "image": "https://rickandmortyapi.com/api/character/avatar/36.jpeg"
          },
          {
            "id": "37",
            "name": "Beth Sanchez",
            "image": "https://rickandmortyapi.com/api/character/avatar/37.jpeg"
          },
          {
            "id": "38",
            "name": "Beth Smith",
            "image": "https://rickandmortyapi.com/api/character/avatar/38.jpeg"
          },
          {
            "id": "39",
            "name": "Beth Smith",
            "image": "https://rickandmortyapi.com/api/character/avatar/39.jpeg"
          }
        ]);
      } else {
        setList([]);
      }
    } else {
      setList([]);
    };
  }, [characterName]);

  // Запрос поиска персонажей по имени.
  const GET_CHARACTERS_QUERY = gql`
    query Characters($characterName: String!) {
      characters(filter: {status: "alive", name: $characterName }) {
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
  `;
  // Выполняем запрос
  /*
  const { loading, error } = useQuery(GET_CHARACTERS_QUERY, {
      variables: { characterName },
      skip: !characterName,
      pollInterval: 300,
      onCompleted: setCharacterList
  });
  // Отображаем прогресс
  if (loading) return <CircularProgress />;
  // Отображаем ошибку
  if (error) return <p>Error while loading data.</p>;
  */
  // Если выбрали карточку
  const handleSelectCardById = (id) => {
    list.map(item => {
      if (item.id === id) {
        if (item.name.toLowerCase().indexOf('rick') >= 0) {
          setRick(item.image);
        } else if (item.name.toLowerCase().indexOf('morty') >= 0) {
          setMorty(item.image);
        };
        return item;
      }
    })
    console.log(`Selected card with id ${id}`);
  };
  // Если нажали на удаление карточки
  const handleDeleteCardById = (id) => {
    setList(_.reject(list, { id: id }));
    console.log(`Deleted card with id ${id}`);
  };

  // Отображаем список
  return (
    <div className="Characters">
      {list && list.length > 0 ?
        (<div className={classes.root}>
          <GridList cellHeight={120} cols={4} className={classes.gridList}>
             {list.map(({ id, name, image }) => (
               <GridListTile key={ id }>
                <img
                  src={image}
                  onClick={ () => handleSelectCardById(id) }
                />
                <GridListTileBar
                  titlePosition="top"
                  className={classes.titleBar}
                  actionIcon={
                    <IconButton
                        onClick={ () => handleDeleteCardById(id) }
                        aria-label={`info about ${ name }`}
                        className={classes.icon}>
                      <CancelIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
             ))}
           </GridList>
        </div>) : <p>No data found.</p>
      }
      <p><b>PARTY</b></p>
      <div className="Party">
        <div className="Rick">
          <img
            src={rick}
            width={125}
            height={120}
            alt="skeleton.jpeg"/>
        </div>
        <div className="Morty">
          <img
            src={morty}
            width={125}
            height={120}
            alt="skeleton.jpeg"/>
        </div>
      </div>
    </div>
  );
};

export default Characters;

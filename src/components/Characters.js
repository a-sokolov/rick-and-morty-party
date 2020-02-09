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
// JSON stubs for offline mode
import * as rickJson from './json/rick.json';
import * as mortyJson from './json/morty.json';
import * as bethJson from './json/beth.json';

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

const skeleton = require('./skeleton.jpeg');

function Characters() {
  const classes = useStyles();
  // Карточи выбранных Рика и Морти
  const [rick, setRick] = useState(skeleton);
  const [morty, setMorty] = useState(skeleton);
  // Текущая коллекция карточек персонажей (id, name, image)
  const [list, setList] = useState([]);
  // Коллекция удаленных карточек персонажей, которые больше не показываем
  const [prohibitedList, setProhibitedList] = useState([]);
  /*
    Функция возвращающая список, который можно отображать.
    1. Удаляем карточки, которые были запрещены ранее;
    2. Возвращаем коллекцию, размером не больше 6 элементов
  */
  const getCharacterList = () => {
    let newList = list.slice().filter(item => {
      const prohibitedItem = prohibitedList.find(el => {
        return (el.image === item.image);
      });
      return (prohibitedItem === undefined);
    })

    return newList.slice(0, 6);
  }

  // Читаем имя персонажа из контекста
  const characterName = useContext(CharacterNameContext);
  // Attention! Временное решение, чтобы отладить код (часть данных грузиться из JSON'а).
  useEffect(() => {
    let newList = [];
    if (characterName && characterName.length > 2) {
      if ('rick'.indexOf(characterName.toLowerCase()) >= 0) {
        newList = rickJson.default;
      } else if ('morty'.indexOf(characterName.toLowerCase()) >= 0) {
        newList = mortyJson.default;
      } else if ('beth'.indexOf(characterName.toLowerCase()) >= 0) {
        newList = bethJson.default;
      }
    };
    setList(newList);
  }, [characterName]);

  // Запрос поиска персонажей по имени
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
      onCompleted: { (data) => setList(data.characters.results) }
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
      };
      return item;
    });

    console.log(`Selected card with id ${id}`);
  };
  // Если нажали на удаление карточки
  const handleDeleteCardById = (id) => {
    // Добавляем карточку в список запрещенных
    list.map(item => {
        if (item.id === id) {
          setProhibitedList([...prohibitedList, item]);
        };
        return item;
    });

    //setList(_.reject(list, { id: id }));
    console.log(`Deleted card with id ${id}`);
  };

  // Читаем список карточек, которые можно отображать
  const listToDisplay = getCharacterList();

  // Отображаем список
  return (
    <div className="Characters">
      {listToDisplay && listToDisplay.length > 0 ?
        (<div className={classes.root}>
          <GridList cellHeight={120} cols={4} className={classes.gridList}>
             {listToDisplay.map(({ id, name, image }) => (
               <GridListTile key={id}>
                <img
                  src={image}
                  alt={skeleton}
                  onClick={ () => handleSelectCardById(id) }
                />
                <GridListTileBar
                  titlePosition="top"
                  className={classes.titleBar}
                  actionIcon={
                    <IconButton
                        onClick={ () => handleDeleteCardById(id) }
                        aria-label={`info about ${name}`}
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
            alt={skeleton}/>
        </div>
        <div className="Morty">
          <img
            src={morty}
            width={125}
            height={120}
            alt={skeleton}/>
        </div>
      </div>
    </div>
  );
};

export default Characters;

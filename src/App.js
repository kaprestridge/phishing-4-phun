import React, {useEffect, useReducer} from 'react';
import initialStorage   from './data/initialStorage'
// reducer-state
import playerReducer    from './reducers/playerReducer.js'
// components
import CurrentFishBox   from './components/CurrentFishBox';
import PlayerContainer  from './components/PlayerContainer';
import PlayerInventory  from './components/PlayerInventory';
import UpgradeStore     from './components/UpgradeStore';
// utilities
import loadPlayer       from './utils/loadPlayer' 
import savePlayer       from  './utils/savePlayer'
import { hats } from './data/hats';
import { rods } from './data/rods';
import { baits } from './data/baits';

const App = () => {
  // const [player, setPlayer] = useState(initialStorage)
  const [store, dispatch] = useReducer(
    playerReducer,
    initialStorage
  )


  // onLoad
  useEffect(() => {
    loadPlayer(dispatch)
  },[])
  

  const handleSubmit = (event) => {
    event.preventDefault()
    savePlayer(store)
  } 

  const handleChange = (event) => {
    dispatch({
      type: 'setName',
      data: event.target.value
    })
  }

  const handleHat = (event) => {
    dispatch({
      type: 'setHat',
      data: event.target.value
    })
  }

  const printHat = (input) => {
    return (
      hats.find(i => i.id === parseInt(input)).name
    )
  }

  const printHatMod= (input) => {
    return (
      hats.find(i => i.id === parseInt(input)).modifier
    )
  }

  return (
    <div className="App">
      <PlayerContainer />
      <CurrentFishBox/>
      <UpgradeStore />
      <PlayerInventory />
      <h1>Name: {store.name}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} ></input>
        <button type="submit" value={store.name}>Submit</button>
        <button onClick={handleHat} value={4}>Buy pirate hat</button>
        <button onClick={handleHat} value={1}>Buy bucket hat</button>
        <p>Hat: {printHat(store.inventory.hatId)}</p>
        <p>Hat Mod: {printHatMod(store.inventory.hatId)}</p>
      </form>
    </div>
  );
}

export default App;

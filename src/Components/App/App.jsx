import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import * as _ from 'lodash';
import './App.css';
import { NavBar } from '../NavBar/NavBar';
import { Splash } from '../Splash/Splash';
import { Dashboard } from '../Dashboard/Dashboard';
import { ManageListings } from '../ManageListings/ManageListings';
import { ReservationList } from '../ReservationList/ReservationList';
import { Product } from '../Product/Product';
import { ReserveForm } from '../ReserveForm/ReserveForm';
//import NavBar from '../NavBar/NavBar';
import { useQuery, useMutation } from '@apollo/client';
import { getGPUs, addPerson, addReservation } from '../../util/graphql';

function App() {

  const [ gpus, setGPUs ] = useState([]);
  const [reserveFormActive, setReserveFormActive] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [user, setUser] = useState({ info: {}, foundersOnly: false });

  const { loading, error, data, refetch: refreshGPUs } = useQuery(getGPUs);
  const [createPerson, { personError }] = useMutation(addPerson);
  const [createReservation, { reservationError }] = useMutation(addReservation);

  useEffect(() => {
      if(data) {
          const dbGPUs = _.cloneDeep(data.gpus)
          setGPUs(dbGPUs);
      }
  }, [data])

  if (loading) return <p>loading ...</p>;
  if (error) {
      console.log(error);
      return <p>Sorry, we're having trouble with our servers right now. Please check back soon.</p>;
  }

  const startReservation = (card) => {
      setSelectedCard(card);

      if (Object.keys(user.info).length && Object.keys(card).length) {
          submitReservation(user, [card.id]);
      } else {
          setReserveFormActive(true);
      }
  }

  const submitReservation = async (personInput, cardIds) => {
      let person;
      //---check if there is an existing user to avoid creating duplicate
      if (Object.keys(user.info).length) {
          person = user.info;
      } else {
          const {data: {createPerson: newPerson}} = await createPerson({
              variables: personInput.info
          })
          setUser({
              info: newPerson, 
              foundersOnly: personInput.foundersOnly
          });
          person = newPerson;
      }
      //---check if there is an existing user to avoid creating duplicate

      const response = await createReservation({
          variables: { 
              gpuIds: cardIds, 
              personId: person.id, 
              foundersOnly: personInput.foundersOnly
          }
      })
      const newReservation = response.data.createReservation;
      console.log(newReservation)

      if (personError || reservationError) {
          const error = personError ? personError : reservationError;
          console.log(error);
      }
      updateReservations(cardIds);
      return newReservation;
  }

  const updateReservations = (cardIds) => {
    const currentGPUs = [...gpus];
    cardIds.forEach(cardId => {
      const matchingGPU = currentGPUs.find(gpu => gpu.id === cardId)
      matchingGPU.reserved = true;
    });

    setGPUs(currentGPUs);
  }

  const closeForm = () => {
    setReserveFormActive(false);
  }

  const renderReserveForm = () => {
      if (reserveFormActive) {
          return (
              <ReserveForm  
                  closeForm={closeForm} 
                  card={selectedCard} 
                  cards={gpus}
                  submitRes={submitReservation} />
          )
      } else {
          return
      }    
  }


  return (
    <>
      <Router>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <Splash 
                cards={gpus} 
                startRes={startReservation} 
                renderReserveForm={renderReserveForm} />
            </Route>
            <Route exact path="/manage">
              <Dashboard gpus={gpus} refreshGPUs={refreshGPUs}/>
            </Route>
            <Route path="/product/:id" >
              <Product 
                cards={gpus}
                startRes={startReservation}
                renderReserveForm={renderReserveForm} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;

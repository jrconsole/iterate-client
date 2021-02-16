import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import * as _ from 'lodash';
import './App.css';
import Splash from '../Splash/Splash';
import Dashboard from '../Dashboard/Dashboard';
import ManageListings from '../ManageListings/ManageListings';
import Product from '../Product/Product';
import ReserveForm from '../ReserveForm/ReserveForm';
//import NavBar from '../NavBar/NavBar';
import { useQuery, useMutation } from '@apollo/client';
import { getGPUs, addPerson, addReservation } from '../../util/graphql';

function App() {

  const [ gpus, setGPUs ] = useState([]);
  const [reserveFormActive, setReserveFormActive] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [user, setUser] = useState({ info: {}, foundersOnly: false });

  const { loading, error, data } = useQuery(getGPUs);
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
      return <p>nooo</p>;
  }

  const startReservation = (card) => {
      setSelectedCard(card);

      if (Object.keys(user.info).length) {
          submitReservation(user, card);
      } else {
          setReserveFormActive(true);
      }
  }

  const submitReservation = async (personInput, card) => {
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

      await createReservation({
          variables: { 
              gpuId: card.id, 
              personId: person.id, 
              foundersOnly: personInput.foundersOnly
          }
      })

      if (personError || reservationError) {
          const error = personError ? personError : reservationError;
          console.log(error);
      }
      updateReservations(card);
  }

  const updateReservations = (card) => {
    const currentGPUs = [...gpus];
    currentGPUs.forEach(gpu => {
      if(gpu.id === card.id) {
        console.log(gpu);
        gpu.reserved = true;
      }
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
          {/*<NavBar />*/}

          <Switch>
            <Route exact path="/">
              <Splash 
                cards={gpus} 
                startRes={startReservation} 
                renderReserveForm={renderReserveForm} />
            </Route>
            <Route exact path="/manage">
              <Dashboard />
            </Route>
            <Route path="/manage/listings">
              <ManageListings gpus={gpus} />
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

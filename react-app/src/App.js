import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfilePage";
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';

import CreateNewReview from "./components/Reviews/CreateNewReview";
import RestaurantList from "./components/RestaurantList"
import SingleRestaurant from "./components/SingleRestaurant"
import UpdateReview from "./components/Reviews/UpdateReview";
import RestaurantBySearch from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/users/get/:userId' exact={true}>
            <UserProfilePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginFormPage />
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <Route path="/search/:keyword" >
            <RestaurantBySearch />
          </Route>
          <Route exact path="/">
            <RestaurantList />
          </Route>
          <Route exact path="/:restaurantId">
            <SingleRestaurant />
          </Route>
          <Route exact path="/:restaurantId/create-review">
            <CreateNewReview />
          </Route>
          <Route exact path="/:restaurantId/reviews/:reviewId/update">
            <UpdateReview />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

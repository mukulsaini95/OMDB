/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export default class NotFoundPage extends React.PureComponent {
  
  render() {
    
    return (
      
    <div className="bg-purple">
      
       <div className="stars">
            <div className="custom-navbar">
                <div className="navbar-links">
                    <ul>
                      <li><Link to="/" href="http://salehriaz.com/404Page/404.html">OMDB</Link></li>
                    </ul>
                </div>
            </div>
            <div className="central-body">
                <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px"/>
               <Link to="/" href="http://salehriaz.com/404Page/404.html" className="btn-go-home">GO BACK HOME</Link>
            </div>
            <div className="objects">
                <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                <div className="earth-moon">
                    <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px"/>
                    <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
                </div>
                <div className="box_astronaut">
                    <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
                </div>
            </div>
            <div className="glowing_stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>

            </div>

        </div>

    </div>
    );
  }
}

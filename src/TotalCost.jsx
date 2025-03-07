import React, { useState, useEffect } from 'react'
import "./TotalCost.css"

// TotalCost() function component takes the props totalCosts and ItemsDisplay as parameters.
// The TotalCost component structure includes multiple <div> elements along with their class names.
// In the ConferenceEvent.jsx component, one object named totalCosts aggregates the total costs for venue, audio-visual (AV), and meals.
// It assigns them to their respective properties venue, av, and meals.

// create a variable named total_amount to get the sum of the total costs for the venue, audio-visual (AV), and meals
const TotalCost = ({ totalCosts, ItemsDisplay }) => {

  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;
  return (
      <div className="pricing-app">
          <div className="display_box">
              <div className="header">
                  <p className="preheading"><h3>Total cost for the event</h3></p>
              </div>
              <div>
              <h2 id="pre_fee_cost_display" className="price">
                  ${total_amount}
              </h2>
              <div className="render_items">
                  <ItemsDisplay />
              </div>
              </div>
          </div>
      </div>
  );
};
export default TotalCost
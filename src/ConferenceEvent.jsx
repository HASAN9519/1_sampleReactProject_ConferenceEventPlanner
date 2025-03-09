import React, { useState } from "react"
import "./ConferenceEvent.css"
import TotalCost from "./TotalCost"
// useSelector() function retrieves venue items from the Redux store state
import { useSelector, useDispatch } from "react-redux"
import { incrementQuantity, decrementQuantity } from "./venueSlice"
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice"
import { toggleMealSelection } from "./mealsSlice"


const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    // Import the add-on items into the ConferenceEvent.jsx component from store.js where avSlice.js and mealsSlice.js sends details using reducers
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals);

    const dispatch = useDispatch();
    // it calculates the remaining number of available auditorium halls to three, so the user cannot request more than three
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementQuantity(index));
    };
    
    const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
    };
    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
    };
    
    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };

    // function takes an index parameter of the meal item that triggered the selection. It retrieves the meal item object from the mealsItems array using the provided index. It checks if the retrieved item is both selected, item.selected === true and that its type is mealForPeople
    // If these two conditions are met, it prepares to update the numberOfPeople state variable before toggling the selection
    // If the item is of type mealForPeople and already selected, item.selected is true, it maintains the current numberOfPeople
    // If not selected, it sets numberOfPeople to 0
    // It dispatches the toggleMealSelection action with the index of the item and, if applicable, the new numberOfPeople
    // If the item is not of type mealForPeople or is not selected, it dispatches an action to toggle the meal selection without any additional considerations
    const handleMealSelection = (index) => {
      const item = mealsItems[index];
      if (item.selected && item.type === "mealForPeople") {
          // Ensure numberOfPeople is set before toggling selection
          const newNumberOfPeople = item.selected ? numberOfPeople : 0;
          dispatch(toggleMealSelection(index, newNumberOfPeople));
      }
      else {
          dispatch(toggleMealSelection(index));
      }
    };

    // getItemsFromTotalCost() function will store all items the user selected in an array by creating an empty array named items.
    // each item type, venue, av, and meals, defines its own forEach() function. These functions look for and include only items in the array the user selects. These functions also label each item in the array, "venue", "av", or "meals". The function returns the items array, comprising items from each of the three categories: venue, AV, and meals
    const getItemsFromTotalCost = () => {
          const items = [];
          venueItems.forEach((item) => {
            if (item.quantity > 0) {
              items.push({ ...item, type: "venue" });
            }
          });
          avItems.forEach((item) => {
            if (
              item.quantity > 0 &&
              !items.some((i) => i.name === item.name && i.type === "av")
            ) {
              items.push({ ...item, type: "av" });
            }
          });
          mealsItems.forEach((item) => {
            if (item.selected) {
              const itemForDisplay = { ...item, type: "meals" };
              if (item.numberOfPeople) {
                itemForDisplay.numberOfPeople = numberOfPeople;
              }
              items.push(itemForDisplay);
            }
          });
          return items;
    };

    const items = getItemsFromTotalCost();

    // First, the component writes the list of items to the console, which helps with testing.
    // The component returns a <div> element with the class name display_box1. Within this element: It displays the message "No items selected" if there are no items in the items array. If the array contains items, it displays a table with the class name "table_item_data".
    // The table layout has four columns: "Name", "Unit Cost", "Quantity", and "Subtotal". It iterates over the items array using the map() function. Each item in the items array creates a table row, <tr> element.Each row of the table displays the following information, respectively, The name of the item, item's unit price with a dollar sign in front of it, For rooms and add-ons, it displays the quantity of the item, For meals, it uses the numberOfPeople property to display "For x people" where x is the number of people.
    // It calculates the subtotal for each item type by multiplying the item unit cost by the quantity or the number of people
    const ItemsDisplay = ({ items }) => {
      console.log(items);
      return <>
          <div className="display_box1">
              {items.length === 0 && <p>No items selected</p>}
              <table className="table_item_data">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Unit Cost</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                      </tr>
                  </thead>
                  <tbody>
                      {items.map((item, index) => (
                          <tr key={index}>
                              <td>{item.name}</td>
                              <td>${item.cost}</td>
                              <td>
                                  {item.type === "meals" || item.numberOfPeople
                                  ? ` For ${numberOfPeople} people`
                                  : item.quantity}
                              </td>
                              <td>{item.type === "meals" || item.numberOfPeople
                                  ? `${item.cost * numberOfPeople}`
                                  : `${item.cost * item.quantity}`}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </>
    };

    // Function declaration: The function is defined using arrow function syntax and assigned to the constant calculateTotalCost. It takes one string parameter, section, that indicates the section is calculated. 
    // Initialization of totalCost: The totalCost variable is initialized to 0. This value will hold the cumulative total cost for the specified section.
    // Conditional check: The function checks if the section passed as an argument equals the string "venue". If true, the total cost for the venue items will be calculated.
    // Iteration over venueItems: The venueItems items array represents an item with properties cost and quantity. The forEach function iterates over each item in the venueItems array. For each item, it multiplies item.cost by item.quantity and adds the result to totalCost.
    // Return statement: After the loop is complete, the function returns the calculated totalCost.
    // Function call: The function calculateTotalCost is called with the "venue" argument, which calculates the total cost for the items in the "venue" section. The result of this calculation is stored in the constant venueTotalCost.
    const calculateTotalCost = (section) => {
      let totalCost = 0;
      if (section === "venue") {
          venueItems.forEach((item) => {
              totalCost += item.cost * item.quantity;
          });
      } else if (section === "av") {
          avItems.forEach((item) => {
              totalCost += item.cost * item.quantity;
          });
      } else if (section === "meals") {
          mealsItems.forEach((item) => {
              if (item.selected) {
                totalCost += item.cost * numberOfPeople;
              }
            });
      }
      return totalCost;
    };

    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals");

    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
          if (showItems) { // Check if showItems is false
            setShowItems(!showItems); // Toggle showItems to true only if it's currently false
          }
        }
    }
    
    // Create one object named totalCosts which includes all three subtotals in the total cost
    const totalCosts = {
        venue: venueTotalCost,
        av: avTotalCost,
        meals: mealsTotalCost,
    };

    return (
      <>
                <navbar className="navbar_event_conference">
                    <div className="company_logo">Conference Expense Planner</div>
                    <div className="left_navbar">
                        <div className="nav_links">
                            <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                            <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                            <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                        </div>
                        <button className="details_button" onClick={() => setShowItems(!showItems)}>
                            Show Details
                        </button>
                    </div>
                </navbar>
<div className="main_container">
        {!showItems
            ?
            (
    <div className="items-information">
        <div id="venue" className="venue_container container_main">
                                      <div className="text">
                                        <h1>Venue Room Selection</h1>
                                      </div>
                                      <div className="venue_selection">
            {venueItems.map((item, index) => (
                                          <div className="venue_main" key={index}>
                                            <div className="img">
                                              <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                <div className="button_container">
                              {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

                                <>
                                <button
                                  className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                                  onClick={() => handleRemoveFromCart(index)}
                                >
                                  &#8211;
                                </button>
                                <span className="selected_count">
                                  {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                </span>
                                <button
                                  className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
                                  onClick={() => handleAddToCart(index)}
                                >
                                  &#43;
                                </button>
                                </>
                          ) : (
                            <div className="button_container">
                            <button
                                className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
                                onClick={() => handleRemoveFromCart(index)}
                              >
                                &#8211;
                              </button>
                              <span className="selected_count">
                                {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                              </span>
                              <button
                                className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
                                onClick={() => handleAddToCart(index)}
                              >
                              &#43;
                              </button>
                              
                              
                          </div>
                        )}
                </div>
                      </div>
            ))}
          </div>
                              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
        </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">

                                <div className="text">
                                    <h1> Add-ons Selection</h1>
                                </div>
                                <div className="addons_selection">

                                      {/* map() function to iterate over an array called avItems, which contains information about audio-visual items. Each item in the array creates a <div> element with the class av_data venue_main. Inside this <div>, it contains:
                                      An <img> tag displays the item's image. The image source (src) is obtained from item.img, and the alt text is set to item.name. A <div> displaying the item's name (item.name). Another <div>displays the item's cost, item.cost, in dollars. A set of buttons wrapped in a <div> with class addons_btn. These buttons allow users to adjust the quantity of the item. There are two buttons: The first button, with the class btn-warning, is labeled with an n-dash (–). It decrements the quantity when selected. Its click event is bound to the function handleDecrementAvQuantity() with the item's index as an argument. The second button, with the class btn-success, is labeled with a plus sign (+). It increments the quantity when selected. Its click event is bound to the function handleIncrementAvQuantity() with the item's index as an argument. item's current quantity is displayed between the decrement and increment buttons. This value is obtained from the item.quantity object.*/}
                                      {avItems.map((item, index) => (
                                      <div className="av_data venue_main" key={index}>
                                          <div className="img">
                                              <img src={item.img} alt={item.name} />
                                          </div>
                                      <div className="text"> {item.name} </div>
                                      <div> ${item.cost} </div>
                                          <div className="addons_btn">
                                              <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
                                              <span className="quantity-value">{item.quantity}</span>
                                              <button className=" btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
                                          </div>
                                      </div>
                                      ))}




                                </div>
                                      <div className="total_cost">Total Cost: {avTotalCost}</div>

                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main">

                                <div className="text">
                                    <h1>Meals Selection</h1>
                                </div>

                                {/* creates a labeled input field for specifying the number of people. It uses an <input> element of type number with a minimum value of 1 and updates the numberOfPeople state with the parsed integer value entered by the user */}
                                <div className="input-container venue_selection">
                                    <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                                    <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min="1"
                                    />
                                </div>

                                {/* <div className="meal_selection"> This is a container for the list of meal items.
                                {mealsItems.map((item, index) => ( ... ))} This maps over an array of mealsItems and generates HTML for each item using the provided function.
                                <div className="meal_item" key={index} style={{ padding: 15 }}> This is a container for each meal item. The key prop is necessary for React to keep track of each item in the list.
                                <input type="checkbox" id={meal_${index}} checked={item.selected} onChange={() => handleMealSelection(index)} /> This is a checkbox input element. The selected property of the current item controls its checked property. When the checkbox state changes, it triggers the handleMealSelection() function with the current item’s index.
                                <label htmlFor={meal_${index}}>{item.name}</label> This label is associated with the checkbox. Clicking on the label toggles the checkbox.
                                <div className="meal_cost">${item.cost}</div> This displays the cost of each meal item. */}
                                <div className="meal_selection">
                                      {mealsItems.map((item, index) => (
                                          <div className="meal_item" key={index} style={{ padding: 15 }}>
                                              <div className="inner">
                                                  <input type="checkbox" id={ `meal_${index}` }
                                                      checked={ item.selected }
                                                      onChange={() => handleMealSelection(index)}
                                                  />
                                                  <label htmlFor={`meal_${index}`}> {item.name} </label>
                                              </div>
                                              <div className="meal_cost">${item.cost}</div>
                                          </div>
                                      ))}
                                </div>
                                <div className="total_cost">Total Cost: {mealsTotalCost}</div>

                            </div>


    </div>
                    ) : (
                        // TotalCost component renders inside a <div> element with the class name total_amount_detail. TotalCost component receives the props totalCosts and ItemsDisplay. totalCosts prop contains cost data and ItemsDisplay() component with items is passed as props to the TotalCost component
                        <div className ="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }




</div>
        </>

    );
};

export default ConferenceEvent;

// Handles change for an input
function handleChange(event) {
  const { name, value } = event.target;
  this.setState({
    [name]: value,
  });
}

// Toggles some state
function toggleState(toggleKey) {
  this.setState((prevState) => ({ [toggleKey]: !prevState[toggleKey] }));
}

// Removes an item from a list in a state
function removeFromList(listKey, removedItem) {
  const { [listKey]: list } = this.state;
  this.setState({
    [listKey]: list.filter((item) => item !== removedItem),
  });
}

export { handleChange, toggleState, removeFromList };

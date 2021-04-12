function handleChange(event) {
  const { name, value } = event.target;
  this.setState({
    [name]: value,
  });
}

// eslint-disable-next-line import/prefer-default-export
export { handleChange };

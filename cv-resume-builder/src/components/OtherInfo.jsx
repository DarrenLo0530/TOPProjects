import React, { Component } from 'react';
import EditableField from './EditableField';
import { handleChange } from './Utils';
import './OtherInfo.css';

class OtherInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writeup: '',
      // education: [],
      // work: [],
    };

    this.handleChange = handleChange.bind(this);
  }

  render() {
    const { writeup } = this.state;
    return (
      <div className="other-info-container">
        <EditableField
          name="writeup"
          type="textarea"
          className="writeup"
          value={writeup}
          placeHolder="Write something interesting about yourself..."
          onChange={this.handleChange}
        />
        <hr />
      </div>
    );
  }
}

export default OtherInfo;

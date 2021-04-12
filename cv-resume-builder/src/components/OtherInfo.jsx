import React, { Component } from 'react';
import EditableField from './EditableField';
import { handleChange } from './Utils';
import './OtherInfo.css';
import Experience from './Experience';

class OtherInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writeup: '',
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
        <Experience experienceType="work" purposeType="position" />
        <Experience experienceType="education" purposeType="degree" />
      </div>
    );
  }
}

export default OtherInfo;

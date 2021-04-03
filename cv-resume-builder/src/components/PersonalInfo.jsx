import React, { Component } from 'react';
import EditableField, { fieldOnChange } from './EditableField';
import './PersonalInfo.css';

class GeneralInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      profession: '',
      // contacts: [],
      // skills: [],
    };

    this.fieldOnChange = fieldOnChange.bind(this);
  }

  render() {
    const { fullName, profession } = this.state;
    return (
      <div className="container">
        <div className="introduction">
          <EditableField type="text" name="fullName" value={fullName} placeHolder="Full Name" className="full-name" onChange={this.fieldOnChange} />
          <EditableField type="text" name="profession" value={profession} placeHolder="Profession" className="profession" onChange={this.fieldOnChange} />
        </div>

        <h2>Contacts</h2>
        <h2>Skills</h2>
      </div>
    );
  }
}
export default GeneralInfo;

import React, { Component } from 'react';
import EditableField from './EditableField';

class OtherInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // writeup: '',
      // education: [],
      // work: [],
    };
  }

  render() {
    return (
      <div>
        <EditableField type="textarea" className="writeup" />
      </div>
    );
  }
}

export default OtherInfo;

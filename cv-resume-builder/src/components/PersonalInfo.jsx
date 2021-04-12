import React, { useState, Component } from 'react';
import PropType from 'prop-types';
import uniqid from 'uniqid';
import EditableField from './EditableField';
import { handleChange, toggleState, removeFromList } from './Utils';
import './PersonalInfo.css';

// A display for a string item in a list
const InfoListItem = ({ item, deleteItem }) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => { setHovered(true); }}
      onMouseLeave={() => { setHovered(false); }}
    >
      { item }
      { isHovered ? (<button className="btn delete-btn" type="button" onClick={deleteItem}>X</button>) : null }
    </li>
  );
};

InfoListItem.propTypes = {
  item: PropType.string.isRequired,
  deleteItem: PropType.func.isRequired,
};

// A list of items
const InfoList = ({ list, className, deleteItem }) => (
  <ul className={`${className} info-list`}>
    {list.map((item) => (
      <InfoListItem key={uniqid()} item={item} deleteItem={() => { deleteItem(item); }} />
    ))}
  </ul>
);

InfoList.defaultProps = {
  className: '',
};

InfoList.propTypes = {
  list: PropType.arrayOf(PropType.string).isRequired,
  className: PropType.string,
  deleteItem: PropType.func.isRequired,
};

class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      profession: '',
      showContactForm: false,
      contact: '',
      contactsList: [],
      showSkillForm: false,
      skill: '',
      skillsList: [],
      showHobbyForm: false,
      hobby: '',
      hobbiesList: [],
    };

    this.handleChange = handleChange.bind(this);
    this.toggleState = toggleState.bind(this);
    this.removeFromList = removeFromList.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event, valueKey, listKey) {
    event.preventDefault();
    const { [valueKey]: value, [listKey]: list } = this.state;
    this.setState({
      [listKey]: list.concat(value),
      [valueKey]: '',
    });
  }

  render() {
    const {
      fullName, profession,
      showContactForm, contact, contactsList,
      showSkillForm, skill, skillsList,
      showHobbyForm, hobby, hobbiesList,
    } = this.state;
    return (
      <div className="personal-info-container">
        <div className="introduction">
          <EditableField type="textarea" name="fullName" value={fullName} placeHolder="Full Name" className="full-name" onChange={this.handleChange} />
          <EditableField type="textarea" name="profession" value={profession} placeHolder="Profession" className="profession" onChange={this.handleChange} />
        </div>

        <h2>
          <span>Contacts</span>
          <button className="btn btn-primary" type="button" onClick={() => { this.toggleState('showContactForm'); }}>
            {showContactForm ? 'Close' : 'Add' }
          </button>
        </h2>
        <InfoList list={contactsList} className="contacts-list" deleteItem={(item) => { this.removeFromList('contactsList', item); }} />
        {
          showContactForm ? (
            <form className="personal-form" onSubmit={(event) => { this.formSubmit(event, 'contact', 'contactsList'); }}>
              <input type="text" value={contact} placeholder="Add a contact" name="contact" onChange={this.handleChange} required />
              <input className="btn btn-primary" type="submit" value="Add" />
            </form>
          ) : null
        }
        <h2>
          <span>Skills</span>
          <button className="btn btn-primary" type="button" onClick={() => { this.toggleState('showSkillForm'); }}>
            {showSkillForm ? 'Close' : 'Add' }
          </button>
        </h2>
        <InfoList list={skillsList} className="skills-list" deleteItem={(item) => { this.removeFromList('skillsList', item); }} />
        {
          showSkillForm ? (
            <form className="personal-form" onSubmit={(event) => { this.formSubmit(event, 'skill', 'skillsList'); }}>
              <input type="text" value={skill} placeholder="Add a skill" name="skill" onChange={this.handleChange} required />
              <input className="btn btn-primary" type="submit" value="Add" />
            </form>
          ) : null
        }
        <h2>
          <span>Hobbies</span>
          <button className="btn btn-primary" type="button" onClick={() => { this.toggleState('showHobbyForm'); }}>
            {showHobbyForm ? 'Close' : 'Add' }
          </button>
        </h2>
        <InfoList list={hobbiesList} className="hobbies-list" deleteItem={(item) => { this.removeFromList('hobbiesList', item); }} />
        {
          showHobbyForm ? (
            <form className="personal-form" onSubmit={(event) => { this.formSubmit(event, 'hobby', 'hobbiesList'); }}>
              <input type="text" value={hobby} placeholder="Add a hobby" name="hobby" onChange={this.handleChange} required />
              <input className="btn btn-primary" type="submit" value="Add" />
            </form>
          ) : null
        }
      </div>
    );
  }
}

export default PersonalInfo;

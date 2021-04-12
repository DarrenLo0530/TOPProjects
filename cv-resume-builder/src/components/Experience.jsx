import React, { useState, Component } from 'react';
import PropType from 'prop-types';
import uniqid from 'uniqid';
import capitalize from 'capitalize';
import { handleChange, toggleState, removeFromList } from './Utils';
import './Experience.css';

// Builds an experience entry
const experienceBuilder = (institution, city, startTime, endTime, purpose, description) => ({
  institution, city, startTime, endTime, purpose, description,
});

// Creates a display for the experinece
function ExperienceItem({ experience, deleteItem }) {
  const [isHovered, setHovered] = useState(false);

  function formatTime(time) {
    const splitTime = time.split('-');
    const year = splitTime[0];
    const month = splitTime[1];

    const date = new Date(year, month - 1, 1);
    const monthString = date.toLocaleString('default', { month: 'short' });
    return `${monthString} ${year}`;
  }

  return (
    <div className="exp-entry" onMouseEnter={() => { setHovered(true); }} onMouseLeave={() => { setHovered(false); }}>
      <div>
        <div className="exp-time">
          <span>
            {`${formatTime(experience.startTime)} to ${formatTime(experience.endTime)}`}
          </span>
          { isHovered ? (
            <button className="btn delete-btn" type="button" onClick={deleteItem}>X</button>
          ) : null }
        </div>
        <div className="exp-school">
          <span className="exp-location">{`${experience.institution} - ${experience.city}`}</span>
          <span className="exp-purpose">{experience.purpose}</span>
        </div>
        <p className="exp-desc">{experience.description}</p>
      </div>
    </div>
  );
}

ExperienceItem.propTypes = {
  experience: PropType.shape({
    institution: PropType.string.isRequired,
    city: PropType.string.isRequired,
    startTime: PropType.number.isRequired,
    endTime: PropType.number.isRequired,
    purpose: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
  deleteItem: PropType.func.isRequired,
};

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institution: '',
      city: '',
      startTime: '',
      endTime: '',
      purpose: '',
      description: '',
      experienceList: [],
      formOpen: false,
    };

    this.handleChange = handleChange.bind(this);
    this.toggleState = toggleState.bind(this);
    this.removeFromList = removeFromList.bind(this);
    this.createExperience = this.createExperience.bind(this);
  }

  // Adds an experience entry to the state
  createExperience(event) {
    event.preventDefault();
    const {
      institution, city, startTime, endTime, purpose, description, experienceList,
    } = this.state;
    const experience = experienceBuilder(
      institution, city, startTime, endTime, purpose, description,
    );

    this.setState({
      institution: '',
      city: '',
      startTime: '',
      endTime: '',
      purpose: '',
      description: '',
      experienceList: experienceList.concat(experience),
    });
  }

  render() {
    // Destructuring state and props
    const {
      institution, city, startTime, endTime, purpose, description, experienceList, formOpen,
    } = this.state;
    const { experienceType, purposeType } = this.props;

    return (
      <div className="experience-container">
        <header>
          <h2>
            {capitalize.words(experienceType)}
            <button className="btn btn-secondary" type="button" onClick={() => { this.toggleState('formOpen'); }}>
              {formOpen ? 'Cancel' : `Add ${capitalize.words(experienceType)}`}
            </button>
          </h2>
          <hr />
        </header>

        <ul className="experience-list">
          { experienceList.map((experience) => (
            <ExperienceItem key={uniqid()} experience={experience} deleteItem={() => { this.removeFromList('experienceList', experience); }} />
          ))}
        </ul>

        {formOpen ? (
          <form onSubmit={(event) => { this.createExperience(event); }}>
            <label htmlFor="institution">
              <span>Institution</span>
              <input type="text" value={institution} name="institution" id="institution" onChange={this.handleChange} required />
            </label>
            <label htmlFor="city">
              <span>City</span>
              <input type="text" value={city} name="city" id="city" onChange={this.handleChange} required />
            </label>
            <div className="form-time">
              <label htmlFor="start-time">
                <span>Start Time</span>
                <input type="month" value={startTime} name="startTime" id="start-time" onChange={this.handleChange} required />
              </label>
              <label htmlFor="end-time">
                <span>End Time</span>
                <input type="month" value={endTime} name="endTime" id="end-time" onChange={this.handleChange} required />
              </label>
            </div>
            <label htmlFor="purpose">
              <span>{capitalize.words(purposeType)}</span>
              <input type="text" value={purpose} name="purpose" id="purpose" onChange={this.handleChange} required />
            </label>
            <label htmlFor="description">
              <span>Description</span>
              <textarea type="text" value={description} name="description" id="description" onChange={this.handleChange} required />
            </label>
            <input className="btn btn-secondary" type="submit" value="Add" />
          </form>
        ) : null}
      </div>
    );
  }
}

Experience.propTypes = {
  experienceType: PropType.string.isRequired,
  purposeType: PropType.string.isRequired,
};

export default Experience;

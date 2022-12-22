import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import styles from "./update-athlete-modal.module.scss";

class UpdateAthleteModal extends React.Component {
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSportsChange(sport) {
    let currentSports = this.state.sports;
    let index = currentSports.indexOf(sport);
    if (index > -1) {
      currentSports.removeAt(-1);
      return;
    }

    currentSports.push(sport);
  }

  SubmitForm = async () => {
    const athlete = {
      _id: this.state._id,
      profileIcon: this.state.profileIcon,
      fullName: this.state.fullName,
      gender: this.state.gender,
      dob: this.state.dob,
      location: this.state.location,
      interests: this.state.interests,
      about: this.state.about,
      team: this.state.team,
      sports: this.state.sports,
      positions: this.state.positions,
    };

    const response = await fetch(
      "https://intense-woodland-50775.herokuapp.com/athlete",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete),
      }
    );

    if (response.ok) this.props.RefreshAthletes();
  };

  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      _id: props.athlete._id,
      profileIcon: props.athlete.profileIcon,
      fullName: props.athlete.fullName,
      gender: props.athlete.gender,
      dob: props.athlete.dob,
      location: props.athlete.location,
      interests: props.athlete.interests,
      about: props.athlete.about,
      team: props.athlete.team,
      sports: props.athlete.sports,
      positions: props.athlete.positions,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    let sportsItems = this.props.sports.map((sport, index) => (
      <div key={index} className={styles.Checkbox}>
        <input
          onChange={() => this.handleSportsChange(sport)}
          type="checkbox"
          name={sport}
          value={this.state.sports.includes(sport)}
        />
        {sport}
      </div>
    ));

    return this.state.isEditing ? (
      <div className={styles.UpdateAthleteModal}>
        <div className={styles.Modal}>
          <button
            style={{ alignSelf: "flex-end" }}
            onClick={this.props.Unmount}
          >
            Close
          </button>
          <h2>Update Profile</h2>
          {this.state.profileIcon && (
            <img
              className="profile-icon"
              src={this.state.profileIcon}
              alt="profile icon"
            ></img>
          )}
          {/* <input
            onChange={this.handleInputChange}
            type="file"
            placeholder="Profile Icon"
            name="profileIcon"
            value={this.state.profileIcon}
          /> */}
          <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={this.state.fullName}
          />

          <select
            value={this.state.gender}
            onChange={this.handleInputChange}
            placeholder="Gender"
            name="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Nonbinary</option>
            <option value="other">Other</option>
          </select>

          <input
            onChange={this.handleInputChange}
            type="date"
            placeholder="Date of Birth"
            name="dob"
            value={this.state.dob}
          />
          <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Location"
            name="location"
            value={this.state.location}
          />
          <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Interests"
            name="interests"
            value={this.state.interests}
          />
          <textarea
            onChange={this.handleInputChange}
            type="text"
            placeholder="About"
            rows="10"
            name="about"
            value={this.state.about}
          />
          <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Team"
            name="team"
            value={this.state.team}
          />

          {sportsItems}
          {/* <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Sports"
            name="sports"
            value={this.state.sports}
          /> */}
          <input
            onChange={this.handleInputChange}
            type="text"
            placeholder="Positions"
            name="positions"
            value={this.state.positions}
          />
          <div
            style={{
              alignSelf: "flex-end",
            }}
          >
            {" "}
            <input type="submit" value="Submit" onClick={this.SubmitForm} />
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.UpdateAthleteModal}>
        <div className={styles.Modal}>
          <div className={styles.Summary}>
            <button
              style={{ alignSelf: "flex-end" }}
              onClick={this.props.Unmount}
            >
              Close
            </button>
            <h2>Profile</h2>
            {this.state.profileIcon && (
              <img
                className="profile-icon"
                src={this.state.profileIcon}
                alt="profile icon"
              ></img>
            )}
            <p>Name: {this.state.fullName}</p>
            <p>Gender: {this.state.gender}</p>
            <p>Date of Birth: {this.state.dob}</p>
            <p>Location: {this.state.location}</p>
            <p>Interests: {this.state.interests}</p>
            <p>About: {this.state.about}</p>
            <p>Team: {this.state.team}</p>
            <p>
              Sports: {this.state.sports ? this.state.sports.join(", ") : ""}
            </p>
            <p>Positions: {this.state.positions}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <input type="submit" value="Edit" onClick={this.toggleEditing} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateAthleteModal;

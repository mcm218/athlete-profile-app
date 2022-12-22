import React from "react";
import styles from "./athlete-form.module.scss";

class AthleteForm extends React.Component {
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

  NextForm = () => {
    this.setState((prevState) => ({
      currentForm: prevState.currentForm + 1,
    }));
  };

  PrevForm = () => {
    this.setState((prevState) => ({
      currentForm: prevState.currentForm - 1,
    }));
  };

  ResetForm = () => {
    this.setState((prevState) => ({
      currentForm: 0,
      profileIcon:
        "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png",
      fullName: "",
      gender: "",
      dob: "",
      location: "",
      interests: "",
      about: "",
      team: "",
      sports: [],
      positions: "",
    }));
  };

  SubmitForm = async () => {
    const athlete = {
      profileIcon: this.state.profileIcon,
      fullName: this.state.fullName,
      gender: this.state.gender,
      dob: this.state.dob,
      location: this.state.location,
      interests: this.state.interests,
      about: this.state.about,
      team: this.state.team,
      sports: [this.state.sports],
      positions: this.state.positions,
    };

    const response = await fetch(
      "https://intense-woodland-50775.herokuapp.com/athlete",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete),
      }
    );

    if (response.ok) {
      this.props.refreshList();
      this.ResetForm();
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      currentForm: 0,
      profileIcon:
        "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png",
      fullName: "",
      gender: "",
      dob: "",
      location: "",
      interests: "",
      about: "",
      team: "",
      sports: [],
      positions: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    if (this.state.currentForm === 0)
      return (
        <div className={styles.AthleteForm}>
          <h2>Personal Info</h2>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <input type="submit" value="Continue" onClick={this.NextForm} />
          </div>
        </div>
      );

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

    if (this.state.currentForm === 1)
      return (
        <div className={styles.AthleteForm}>
          <h2>Professional Info</h2>
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
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <input type="submit" value="Go Back" onClick={this.PrevForm} />
            <input type="submit" value="Continue" onClick={this.NextForm} />
          </div>
        </div>
      );

    if (this.state.currentForm === 2)
      return (
        <div className={styles.Summary}>
          <h2>Preview</h2>
          <p>Profile:</p>
          <img
            className="profile-icon"
            src={this.state.profileIcon}
            alt="profile icon"
          ></img>
          <p>Name: {this.state.fullName}</p>
          <p>Gender: {this.state.gender}</p>
          <p>Date of Birth: {this.state.dob}</p>
          <p>Location: {this.state.location}</p>
          <p>Interests: {this.state.interests}</p>
          <p>About: {this.state.about}</p>
          <p>Team: {this.state.team}</p>
          <p>Sports: {this.state.sports ? this.state.sports.join(", ") : ""}</p>
          <p>Positions: {this.state.positions}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <input type="submit" value="Go Back" onClick={this.PrevForm} />
            <input type="submit" value="Submit" onClick={this.SubmitForm} />
          </div>
        </div>
      );
  }
}

export default AthleteForm;

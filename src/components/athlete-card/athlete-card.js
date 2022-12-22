import React from "react";
import styles from "./athlete-card.module.scss";

class AthleteCard extends React.Component {
  render() {
    return (
      <div className={styles.AthleteCard}>
        <img
          className="profile-icon"
          src={
            this.props.athlete.profileIcon
              ? this.props.athlete.profileIcon
              : "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
          }
          alt="Profile Icon"
        ></img>
        <div className={styles.CardBody}>
          <p> {this.props.athlete.fullName} </p>
          <p> {this.props.athlete.team} </p>
          <p> {this.props.athlete.sports ? this.props.athlete.sports.join(", ") : ""} </p>
        </div>
      </div>
    );
  }
}

export default AthleteCard;

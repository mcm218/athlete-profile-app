import React from "react";
import styles from "./athlete-list.module.scss";
import AthleteCard from "../athlete-card/athlete-card";
import UpdateAthleteModal from "../update-athlete-modal/update-athlete-modal";

class AthleteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      athletes: [],
      currentAthlete: {},
      isUpdating: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  displayUpdateModal(athlete) {
    console.log(athlete);
    this.setState({
      isUpdating: true,
      currentAthlete: athlete,
    });
  }

  refreshList() {
    fetch("https://intense-woodland-50775.herokuapp.com/athlete")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            athletes: result,
          });
          console.log(result);
        },
        (error) => console.log(error)
      );
  }

  hideUpdateModal() {
    this.setState({
      isUpdating: false,
      currentAthlete: {},
    });
  }

  render() {
    let items = this.state.athletes.map((current) => (
      <li key={current._id} onClick={() => this.displayUpdateModal(current)}>
        <AthleteCard
          athlete={current}
        ></AthleteCard>
      </li>
    ));
    return (
      <div>
        <h2>Athletes</h2>
        <ul className={styles.AthleteList}>{items}</ul>
        {this.state.isUpdating && (
          <UpdateAthleteModal
            sports={ this.props.sports }
            athlete={this.state.currentAthlete}
            Unmount={() => this.hideUpdateModal()}
            RefreshAthletes={() => this.refreshList ()}
          ></UpdateAthleteModal>
        )}
      </div>
    );
  }
}

export default AthleteList;

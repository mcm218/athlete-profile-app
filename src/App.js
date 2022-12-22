import logo from "./logo.svg";
import "./App.scss";
import AthleteForm from "./components/athlete-form/athlete-form";
import AthleteList from "./components/athlete-list/athlete-list";
import UpdateAthleteModal from "./components/update-athlete-modal/update-athlete-modal";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setRefreshRef = (ref) => this.athleteList = ref;
    this.state = {
      athletes: [],
    };
  }
  render() {
    const sports = ["Soccer", "Football", "Baseball", "eSports"];



    let athleteList = (
      <AthleteList
        sports={sports}
        athletes={this.state.athletes}
        ref={this.setRefreshRef}
      ></AthleteList>
    );
    let athleteForm = (
      <AthleteForm
        sports={sports}
        refreshList={() => this.athleteList.refreshList ()}
      ></AthleteForm>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Athlete Profile App</h1>
          <div className="container">
            <div className="col">{athleteForm}</div>
            <div className="seperator"></div>
            <div className="col">{athleteList}</div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

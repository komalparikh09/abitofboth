import React, { Component } from 'react';
import axios from 'axios';

import Doctors from '../../components/Doctors/Doctors';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class DoctorsPage extends Component {
  state = { isLoading: true, doctors: [] };
  componentDidMount() {
    this.fetchData();
  }

  doctorDeleteHandler = doctorId => {
    axios
      .delete('http://localhost:3100/doctors/' + doctorId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the doctor account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/doctors')
      .then(doctorsResponse => {
        this.setState({ isLoading: false, doctors: doctorsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, doctors: [] });
        this.props.onError('Loading doctor accounts failed. Please try again later');
        console.log(err);
      });
  };

  searchDoctorHandler = () => {
    axios
      .get('http://localhost:3100/searchdoctors')
      .then(doctorsResponse => {
        this.setState({ isLoading: false, doctors: doctorsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, doctors: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading doctor accounts...</p></div>;

    if (!this.state.isLoading && this.state.doctors.length > 0) {
      content = (
        <Doctors
          doctors={this.state.doctors}
          onDeleteDoctor={this.doctorDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.doctors.length === 0) {
      content = <p>Found no doctors. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default DoctorsPage;
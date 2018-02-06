import React from 'react';

const PatientInfo = (props) => {
  // check to see if async request has populated the state
  const patient = props.patient;
  if (patient.length < 1){
    if (props.patientStatus === 'n'){
      return (
        <div className="patient-stats">
          <h1>Patient Information</h1>
          <p>No patient found with this ID. Please search again</p>
        </div>
      );
    }
    return (
      <div className="patient-stats">
        <h1>Patient Information</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // format fields
  const name = `${patient.name[0].given[0]} ${patient.name[0].family[0]}`;

  return (
    <div className="patient-stats">
      <h1 className="patient-stats__title">Patient Information</h1>
      <p className="patient-stats__name">{name}</p>
      <p className="patient-stats__gender">{patient.gender}</p>
      <p className="patient-stats__dob">{patient.birthDate}</p>
    </div>
  );
}

export default PatientInfo;
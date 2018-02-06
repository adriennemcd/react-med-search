import React, { Component } from 'react';

import PatientInfo from './components/patient_info.js';
import ConditionList from './components/condition_list.js';
import SearchBar from './components/search_bar.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      person: [],
      conditions: [],
      personFound: '',
      conditionsFound: ''
    }

    this.personSearch = this.personSearch.bind(this);
  }

  personSearch(id){
    // reset state when a new search is submitted
    this.setState({
      person: [],
      conditions: []
    });

    // Simultaneously get person array and condition array with id 
    const personUrl = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient?_id=${id}`;
    const conditionUrl = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition?patient=${id}`;

    fetch(personUrl, {headers: {"accept": "application/json+fhir"}})
    .then(results => {
      return results.json();
    }).then(data => {
      // check to make sure patient ID is valid
      if (data.total < 1) {
        this.setState({
          person: [],
          personFound: 'n'
        });
      } else {
        this.setState({
          person: data.entry[0].resource,
          personFound: 'y'
        });
      }
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    fetch(conditionUrl, {headers: {"accept": "application/json+fhir"}})
    .then(results => {
      return results.json();
    }).then(data => {
      // check to make sure there are any conditions assoc w patient ID
      if (data.total < 1) {
        this.setState({
          conditions: [],
          conditionsFound: 'n'
        });
      } else {
        // only pass through the data we need, in a sortable format
        let conditionsArr = data.entry.reduce((conditions, condition)=> {
          if (condition.resource.clinicalStatus === 'active') {
            const conditionObj = {
              condition: condition.resource.code.text,
              date: condition.resource.dateRecorded,
              link: `https://www.ncbi.nlm.nih.gov/pubmed/?term=${condition.resource.code.text}`,
              id: condition.resource.meta.versionId,
              clinicalStatus: condition.resource.clinicalStatus
            };
            conditions.push(conditionObj);
          }
          return conditions;
        }, []);

        this.setState({
          conditions: conditionsArr,
          conditionsFound: 'y'
        });
      }
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  componentDidMount(){
    this.personSearch(4342008);

    console.info('Test IDs');
    console.table([4342008, 4342009, 4342010, 4342011, 4342012, 4478007, 4596007, 4642007]);
  }

  render() {
    return (
      <div className="app">
        <PatientInfo patient={this.state.person} patientStatus={this.state.personFound} />
        <SearchBar onSearchTermChange={this.personSearch} />
        <ConditionList 
          conditions={this.state.conditions} 
          conditionStatus={this.state.conditionsFound}
          patientStatus={this.state.personFound} />
      </div>
    );
  }
}

export default App;

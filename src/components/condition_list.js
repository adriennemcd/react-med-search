import React, { Component } from 'react';
import ConditionListItem from './condition_list_item';

class ConditionList extends Component {
  constructor(props){
    super(props);

    this.state = { 
      conditions: [],
      sort: {
        column: null,
        direction: 'asc'
      }
   };
    this.onSort = this.onSort.bind(this);
  }

  createConditionItems(){
    if (this.props.conditions.length < 1) {
      if (this.props.patientStatus === 'n'){
        return (
          <tr className="conditions__item">
            <td>No conditions</td>
          </tr>
        );
      };

      return (
        <tr className="conditions__item">
          <td>Loading...</td>
        </tr>
      );
    }

    return this.props.conditions.map((condition)=> {
      return (
        <ConditionListItem 
          key={condition.id} 
          condition={condition} />
      );
    });
  }

  onSort(column){
    const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'asc';

    const conditions = this.props.conditions.sort((a, b) => {
      if (column === 'condition') {
        const nameA = a.condition.toUpperCase(); // ignore upper and lowercase
        const nameB = b.condition.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      } else {
        return +new Date(a.date) - +new Date(b.date);
      }
    });

    if (direction === 'desc') {
      conditions.reverse();
    }

    this.setState({
      conditions: conditions,
      sort: {
        column,
        direction,
      }
    });
  }

  render(){
    return (
      <div className="conditions__wrapper">
        <table className="conditions">
          <thead>
            <tr className="conditions__header-row">
              <th className="conditions__header" onClick={e => this.onSort('condition')}>Condition</th>
              <th className="conditions__header" onClick={e => this.onSort('date')}>Date Recorded</th>
              <th className="conditions__header">PubMed Search</th>
            </tr>
          </thead>
          <tbody>
            {this.createConditionItems()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ConditionList;
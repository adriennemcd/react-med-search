import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e){
    this.setState({term: e.target.value});
  }

  onFormSubmit(e){
    e.preventDefault();
    this.props.onSearchTermChange(this.state.term);
  }

  render(){
    return (
      <form onSubmit={this.onFormSubmit} className="searchbar">
        <label htmlFor="searchbar__input" className="searchbar__label">Enter a 7-digit patient ID number</label>
        <input 
          placeholder="1234567"
          id="searchbar__input"
          className="searchbar__input"
          required='required'
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <button type="submit" className="searchbar__btn">Submit</button>
      </form>
    );
  }
}

export default SearchBar;
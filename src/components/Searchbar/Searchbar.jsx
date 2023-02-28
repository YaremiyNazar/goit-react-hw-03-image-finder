import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MdLocationSearching}  from "react-icons/md";

import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };
  formSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      Notify.failure('Sorry, no matching your search query. Please try again.');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.searchForm } onSubmit={this.formSubmit}>
            <button type="submit" className={css.button}>
              <span className={css.label}>Search</span>
              
              <MdLocationSearching size={30} fill={"orange"} />
            </button>

            <input
              className={css.input}
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;

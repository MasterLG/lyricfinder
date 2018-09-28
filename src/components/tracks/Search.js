import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=7f42fdbb6ab1609796df015b0cf48dd5`
      )
      .then(res => {
        //console.log(res.data);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
        this.setState({
          trackTitle: ""
        });
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({
      trackTitle: e.target.value
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          //console.log(value);
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" />
                Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    type="text"
                    className="form-control form-control-lg"
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;

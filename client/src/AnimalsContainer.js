import React from 'react';
import AnimalsTable from './AnimalsTable';
import $ from 'jquery'

var AnimalsContainer = React.createClass({
  getInitialState: function () {
    return ({animals: null});
  },
  componentWillMount: function () {
    this.getAnimalsFromServer();
  },
  getAnimalsFromServer: function () {
    var that = this;
    $.ajax({
      url: '/api/animals/',
      method: 'GET'
    }).done(function (data) {
      console.log(data);
      that.setState({animals: data});
      console.log(that.state.animals);
    })
  },
  deleteHandler: function (id) {
    $.ajax({
      url: "/api/animals/" +id,
      method: 'DELETE'
    }).done(function (data) {
      console.log(data);
    })
  },
  render: function () {
    return (
      <div>
        {this.state.animals ? <AnimalsTable animals={this.state.animals} deleteHandler={this.deleteHandler}/> : <span> I have no animals </span>}
      </div>
    );
  }
})

export default AnimalsContainer;

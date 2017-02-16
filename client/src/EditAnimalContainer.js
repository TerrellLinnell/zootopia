import React from 'react';
import $ from 'jquery';
import EditAnimalForm from './EditAnimalForm';

var EditAnimalContainer = React.createClass({
  getInitialState: function () {
    return (
      {name: null, species: null}
    );
  },
  componentWillMount: function () {
    this.getAnimalById();
  },
  getAnimalById: function () {
    var that = this;
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId,
      method: 'GET'
    }).done(function (data) {
      console.log(data);
      that.setState(data)
    })
  },
  onChangeHandler: function (field, value) {
    var newData = {};
    newData[field] = value;
    this.setState(newData);
  },
  onClickHandler: function functionName() {
    var that = this;
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId,
      method: "PUT",
      data: this.state
    }).done(function () {
      console.log("Updated animal with id: " + that.props.params.animalId );
      window.location='#/animals'

    })
  },
  render: function () {
    return(
      <div>
        <EditAnimalForm onClickHandler={this.onClickHandler} onChangeHandler={this.onChangeHandler} animalName={this.state.name} animalSpecies={this.state.species} />
      </div>
    );
  }
})

export default EditAnimalContainer;

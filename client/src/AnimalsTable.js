import React from 'react';
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router';

var AnimalsTable = function (props) {
  var Animals = props.animals.map(function (item) {
    return (<tr><td>{item.name}</td><td>{item.species}</td>
                <td><Button bsStyle='danger' onClick={ () => props.deleteHandler(item._id)}>Delete</Button></td>
                <td><Link to={'/edit/' + item._id} className='btn btn-primary'> Update </Link></td>
            </tr>);
  });
  return (
    <div>
    <h1> Animals of Zootopia </h1>
      <Table  hover>
        <thead>
          <tr>
            <th> Name </th>
            <th> Species </th>
          </tr>
          </thead>
          <tbody>
            {Animals}
          </tbody>
      </Table>
    </div>
  );
}
export default AnimalsTable;

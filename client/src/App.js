import React from 'react';
import { Link } from 'react-router';
import {Navbar, NavItem, Nav} from 'react-bootstrap';


var App = React.createClass({
  render: function () {
    return(
      <div>
          <Navbar inverse >
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Animals Home</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem><Link to={'/animals'}>Show All Animals</Link></NavItem>
            <NavItem><Link to={'/post'}>Add an Animal</Link></NavItem>
              </Nav>
          </Navbar>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});


export default App;

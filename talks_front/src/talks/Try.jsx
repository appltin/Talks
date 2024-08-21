import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Try() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='edit_button border-0'>
                Dropdown
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
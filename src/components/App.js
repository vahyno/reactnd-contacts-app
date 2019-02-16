import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';

import * as ContactsApi from '../utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactsApi.getAll()
    .then((contacts)=>{
      this.setState(()=>({
        contacts
      }))
    })
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c)=> {
        return c.id !== contact.id;
      })
    }));
    ContactsApi.remove(contact);
  }

  onCreateContact = (contact) => {
    ContactsApi.create(contact)
      .then((contact)=>{
        this.setState((currentState)=>({
          contacts: [...currentState.contacts, contact]
        }))
      })

  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContacts 
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )} />
        <Route path="/create" render={({ history }) => (
          <CreateContact 
            onCreateContact={(contact)=> {
              this.onCreateContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    );
  }
}

export default App;

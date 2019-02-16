import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';

import * as ContactsApi from '../utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
    screen: 'create',
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

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (<ListContacts contacts={this.state.contacts}
        onDeleteContact={this.removeContact}/>)}

        {this.state.screen === 'create' && (<CreateContact />)}
      </div>
    );
  }
}

export default App;

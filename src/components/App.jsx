import { nanoid } from 'nanoid';
import { Component } from 'react';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title } from './App.styled';
import { TitleContact } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filteredContacts = () => {
    if (this.state.filter.trim() === '') {
      return this.state.contacts;
    }

    return this.state.contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(this.state.filter)
    );
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <>
        <Title>Phonebook</Title>
          <PhonebookForm
            addContact={(contactName, contactNumber) => {
              if (
                !this.state.contacts.some(
                  contact => contact.name === contactName
                )
              ) {
                return this.setState(prevState => ({
                  contacts: [
                    ...prevState.contacts,
                    { id: nanoid(), name: contactName, number: contactNumber },
                  ],
                }));
              }
              alert(`${contactName} is already in contacts`);
            }}
        />
        <TitleContact>Contacts</TitleContact>
        <ContactsFilter
          initialValue={this.state.filter}
          filterChanged={filterValue => this.setState({ filter: filterValue })}
        />

        <ContactsList
          contacts={this.filteredContacts()}
          onDeleteContact={this.deleteContacts}
        />
      </>
    );
  }
}

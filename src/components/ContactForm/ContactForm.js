import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as contactsActions from '../../redux/phonebook/contacts-actions';
import s from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);

    reset();
  };

  const reset = () => {
    setName(name => (name = ''));
    setNumber(number => (number = ''));
  };

  return (
    <div className={s.container_form}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label_text}>
          Name
          <input
            className={s.input_form}
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={s.label_text}>
          Number
          <input
            className={s.input_form}
            type="tel"
            value={number}
            onChange={handleChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>

        <button type="submit" className={s.button_form}>
          Add contact
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsActions.addContact(name, number)),
});

export default connect(null, mapDispatchToProps)(ContactForm);

import React from "react";

//component that displays the persons in the phonebook

const Persons = ({ persons, filter, deletePerson }) => {
  return persons.map((p) => {
    if (filter.length !== 0) {
      if (p.name.toLowerCase().includes(filter.toLowerCase())) {
        return (
          <p key={p.name}>
            {` ${p.name}  
                 ${p.number}`}
            <button onClick={() => deletePerson(p.id)}>delete</button>
          </p>
        );
      }
    } else {
      return (
        <div>
          <p key={p.name}>
            {` ${p.name}  
                 ${p.number}`}
            <button onClick={() => deletePerson(p.id)}>delete</button>
          </p>
        </div>
      );
    }
  });
};

export default Persons;

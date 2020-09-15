import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import Persons from "./Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "230-563-874" },
    { name: "Joe", number: "220-563-874" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState(" ");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  //using axios from separate module

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    // console.log(e.target.value);
    setNumber(e.target.value);
  };
  //adding new person / updating number of existing person
  //1. check if the person already exists in database
  //2. if exists, ask if you want to update the //#endregion
  //3. if yes, update the number
  //4. if doesn't exist, add new person object
  //5. if exists but don't wanna update, do nothing
  const handleSubmit = (e) => {
    e.preventDefault();
    //1. copy of persons object
    const personsCopy = [...persons];
    //2.see if the newName already exists in the personsCopy
    const filteredPerson = personsCopy.filter(
      (person) => newName === person.name
    );

    if (filteredPerson.length !== 0) {
      alert(`person already exists, update number?`);
      // filteredPerson[0].number = newNumber;
      // const filteredPersonId = filteredPerson[0].id;

      //can use either filter or find
      //find method returns FIRST object matching the condition
      //filter method searches all and returns all instances of matching condition
      const previousPerson = persons.filter(
        (person) => person.name === newName
      );
      //putll out the object from previousPerson
      const filteredPerson = previousPerson[0];
      console.log(previousPerson);
      console.log(filteredPerson);

      //console.log(filteredPerson[0].name);
      // const updatedPerson = personsCopy.map((person) =>
      //   person.id === filteredPersonId
      //     ? { ...person, number: newNumber }
      //     : person
      // );
      // console.log(updatedPerson);
      // personServices.update(filteredPersonId, personsCopy).then((response) => {
      //   setPersons(
      //     persons.map((person) =>
      //       person.id === filteredPersonId
      //         ? { ...person, number: newNumber }
      //         : person
      //     )
      //   );
      // });

      personServices
        .update(filteredPerson.id, { ...filteredPerson, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.name === newName ? updatedPerson : person
            )
          );
        });
    } else {
      //3.filter out that person -- filter method creates a new array
      //ask if user wants to update number
      //update number
      //setPersons with new number

      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personServices.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
      });
    }
  };

  const deletePerson = (id) => {
    let newPersons = [...persons];
    const personToRemove = newPersons.filter((p) => p.id === id);
    const personToRemoveName = personToRemove[0].name;
    const personToRemoveId = personToRemove[0].id;
    if (window.confirm(`remove ${personToRemoveName}?`)) {
      personServices.remove(id);

      //re-render without the delted person
      setPersons(persons.filter((p) => p.id !== personToRemoveId));
    }

    // const personToDelete = persons.filter((p) => p.id === id);
    // const personName = filteredPerson[0].name;
    // const personId = filteredPerson[0].id;
    // if (window.confirm(`remove ${personName}?`)) {
    //   personServices.remove(id);

    //   setPersons(persons.filter((p) => p.id !== personId));
    // }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div>
      {/* <h2>Phonebook</h2>
      <div>
        filter names <input onChange={handleFilter}></input>
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2> */}
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      {/* {persons.map((p) => {
        if (filter.length !== 0) {
          if (p.name.toLowerCase().includes(filter.toLowerCase())) {
            return (
              <p key={p.name}>
                {` ${p.name}  
             ${p.number}`}
              </p>
            );
          }
        } else {
          return (
            <div>
              <p key={p.name}>
                {` ${p.name}  
             ${p.number}`}
              </p>
            </div>
          );
        }
      })} */}

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

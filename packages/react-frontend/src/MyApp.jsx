// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [
    {
      name: "Charlie",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    },
    {
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      name: "Dennis",
      job: "Bartender"
    }
  ];

function MyApp() {
    const [characters, setCharacters] =useState([]);


    function removeOneCharacter(index, id) {
        
        fetch (`Http://localhost:8000/users/${id}`, {
          method: "DELETE",
        })
        .then((res) => {
          if (res.status === 204){
            const updated = characters.filter((character, i) => {
                return i !== index;
            });
          }
          setCharacters(updated);
        })
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
    
      return promise;
    }

    function updateList(person) {
      postUser(person)
        .then((res) => { 
          if(res.status === 201){
            setCharacters([...characters, res.json()])
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
                
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

export default MyApp;
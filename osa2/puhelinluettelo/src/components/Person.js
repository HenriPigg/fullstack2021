import React from 'react'

const Person = ({ person, removal }) => {
  return (
    <li>{person.name} {person.number}
    <button onClick={removal}>delete</button>
    </li>
  )
}

export default Person
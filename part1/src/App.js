import React from 'react'
const App = () => {
  const nimi = "Pekka"
  const ika = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name = "Maya" age={26 + 10} />
      <Hello name = "Pekka" age={ika}/>

    </div>    


   )
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

export default App
const PracButton = (props) => {

    return (
      <button className="pracContainer">
        <h2>{props.name}</h2>
        <h3>{props.speciality}</h3>
      </button>
    ) 
}

export default PracButton
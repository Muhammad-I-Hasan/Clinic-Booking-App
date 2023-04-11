const PracButton = (props) => {

    return (
      <button className="pracContainer" onClick={props.onClick}>
        <h2>{props.name}</h2>
        <h3>{props.spec}</h3>
      </button>
    ) 
}

export default PracButton
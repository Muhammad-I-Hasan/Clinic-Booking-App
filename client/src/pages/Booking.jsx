import PracButton from "../components/PracButton"

const Booking = () => {

    return (
      <div className="booking">
        <div className="pracSelect">
          <PracButton name="Dr one one" speciality="foot specialist"/>
          <PracButton name="Dr two two" speciality="toe specialist"/>
          <PracButton name="Dr three three" speciality="fungus specialist"/>
          <PracButton name="Dr four four" speciality="general practitioner"/>
        </div>
      </div>
    ) 
}

export default Booking
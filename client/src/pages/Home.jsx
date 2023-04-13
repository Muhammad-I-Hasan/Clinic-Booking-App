import "./Home.css"

const Home = () => {

 

  return (
    <div className="all">
      
      <div className="welcome">
        <h1>Welcome to Taffy's Clinic!</h1>
        <h2>To book or manage an appointment use the menu in the top left</h2>
      </div>

      <div className="infobox1">
        <h2>Contact Information</h2>
        <div className="infoHome"> 
          <h3>Address: 2205 51 ST SW, Calgary</h3>
          <h3>Phone number: (403) 222-3145</h3>
          <h3>Email: inquires@taffyclinic.com</h3>
        </div>
      </div>
    </div>
  );
    
}

export default Home
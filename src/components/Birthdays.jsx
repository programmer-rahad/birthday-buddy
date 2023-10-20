import { useEffect, useState } from "react";
import Birthday from "./Birthday";
import Loading from "./Loading";
import "./Birthdays.scss";
const url =
  "https://raw.githubusercontent.com/programmer-rahad/json-files/main/birthdays.json";

function Birthdays() {
  const [loading, setLoading] = useState(true);
  const [birthdays, setBirthdays] = useState([]);

  const fetchBirthdays = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const birthdays = await response.json();
      setLoading(false);
      setBirthdays(birthdays); 
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBirthdays()
  }, []); 
  
  return (
    <main>
      <section>
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <h3>
              <span>{birthdays.length}</span> birthdays today
            </h3>
            <div className="articles">
              {birthdays.map((birthday) => (
                <Birthday key={birthday.id} {...birthday} />
              ))}
            </div>
            <button
              onClick={() => {
                !birthdays.length ? fetchBirthdays() : setBirthdays([]);
              }}
              className=" btn btn-block clear-btn"
            >
              {!birthdays.length ? "refresh" : "clear all"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Birthdays;

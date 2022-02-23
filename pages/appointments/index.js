import { useState, useEffect } from "react";
import styles from "../../styles/Appointments.module.css";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isSelected, setSelected] = useState(true);
  // for some reason it's standard to init loading to false
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const response = await fetch("/api/appointments");
    const { appointments } = await response.json();
    setAppointments(appointments);
    setLoading(false);
  }, []);

  const handleSelect = () => {
    //updating state based on current value of state
    //using functional version in order to guarantee the previous state value before the update invocation.
    // avoids risk of a stale render
    setSelected((prev) => !prev);
  };

  const filterAppointments = () => {
    // if appointments is empty arr cause no problem
    return appointments.filter((a) => {
      return isSelected ? !a.read : a.read;
    });
  };

  return (
    <>
      <div className={styles.appointments}>
        <div className={styles.tabs}>
          <div
            style={{ color: isSelected ? "pink" : "black" }}
            onClick={handleSelect}
          >
            unread
          </div>
          <div
            style={{ color: !isSelected ? "pink" : "black" }}
            onClick={handleSelect}
          >
            read
          </div>
        </div>
        {!loading &&
          filterAppointments().map((appointment) => {
            const { read, email, id, body } = appointment;
            return (
              <div
                key={id}
                className={
                  read ? styles.appointmentRead : styles.appointmentUnread
                }
              >
                <p>from: {email}</p>
                <p>body: {body}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default AppointmentsPage;

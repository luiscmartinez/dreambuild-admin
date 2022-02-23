import { useState } from "react";
import styles from "../../styles/Appointments.module.css";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isSelected, setSelected] = useState(true);
  const [loading, setLoading] = useState(true);
  const fetchAppointments = async () => {
    const response = await fetch("/api/appointments");
    const { appointments } = await response.json();
    setAppointments(appointments);
    setLoading(false);
  };
  const handleSelect = () => {
    setSelected(!isSelected);
  };
  const filterAppointments = () => {
    if (appointments.length) {
      return appointments.filter((a) => {
        return isSelected ? !a.read : a.read;
      });
    }
  };
  return (
    <>
      <button onClick={fetchAppointments}>load appointments</button>
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

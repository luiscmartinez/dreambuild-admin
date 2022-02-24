import styles from "../styles/Appointments.module.css";
import { Radio } from "antd";

export function Appointments({ appointments }) {
  const handleClickRead = async (appointmentId) => {
    await fetch(`/api/appointments/${JSON.stringify(appointmentId)}`, {
      method: "PUT",
    });
  };

  if (appointments.length === 0) {
    return <h1>nothing to display here yet</h1>;
  }

  return appointments.map((appointment) => {
    const { read, email, id, body } = appointment;
    return (
      <div
        key={id}
        className={read ? styles.appointmentRead : styles.appointmentUnread}
      >
        <div>
          <Radio onChange={() => handleClickRead(id)} /> read
        </div>
        <p>from: {email}</p>
        <p>body: {body}</p>
      </div>
    );
  });
}

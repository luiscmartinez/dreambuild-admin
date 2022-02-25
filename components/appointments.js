import styles from "../styles/Appointments.module.css";
import { RadioBtn } from "./radioBtn.js";

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
        <RadioBtn id={id} handleClickRead={handleClickRead} isRead={read} />
        <p>from: {email}</p>
        <p>message: {body}</p>
      </div>
    );
  });
}

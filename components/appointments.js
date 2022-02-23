import styles from "../styles/Appointments.module.css";

export function Appointments({ appointments }) {
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
        <p>from: {email}</p>
        <p>body: {body}</p>
      </div>
    );
  });
}

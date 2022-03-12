import styles from "../styles/Appointments.module.css";
import { RadioBtn } from "./radioBtn.js";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

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
    const { read, email, id, body, createdAt } = appointment;
    const date = new Date(createdAt).toTimeString();
    const day = createdAt;
    return (
      <div
        key={id}
        className={read ? styles.appointmentRead : styles.appointmentUnread}
      >
        <RadioBtn id={id} handleClickRead={handleClickRead} isRead={read} />
        <p>from: {email}</p>
        <p>message: {body}</p>
        <p>send on: {dayjs(day).format("LLLL")}</p>
      </div>
    );
  });
}

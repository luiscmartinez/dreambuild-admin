import { Radio } from "antd";

export function RadioBtn({ id, isRead, handleClickRead }) {
  if (!isRead) {
    return (
      <div>
        <Radio onChange={() => handleClickRead(id)} /> read
      </div>
    );
  }
  return <></>;
}

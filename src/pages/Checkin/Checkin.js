import "./Checkin.css";
import Statistic from "../Dashboard/Statistic";
import { useState } from "react";
import Participantstable from "../../components/ParticipantsTable";
import ParticipantSearch from "../../components/ParticipantSearch";
export default function Checkin() {
  const originalParticipants = [
    { STT: 1, Name: "Ninh Minh Hieu", MSSV: "202416688", status: false },
    { STT: 2, Name: "Tran Phong Quan", MSSV: "202416456", status: true },
    { STT: 3, Name: "Luu Quynh Hoa", MSSV: "202416453", status: false },
  ];
  const [participants, setParticipants] = useState(originalParticipants);
  const onSearch = (Name, MSSV, status) => {
    setParticipants(
      originalParticipants.filter((participant) => {
        return (
          (!Name ||
            participant.Name.toLowerCase().includes(Name.toLowerCase())) &&
          (!MSSV || participant.MSSV.includes(MSSV)) &&
          participant.status == status
        );
      })
    );
  };
  return (
    <div className="checkInPage">
      <h2>Event cần check-in hiện tại:</h2>
      <button className="warningBtn">Lấy mã QR check-in</button>
      <h3>Tên sự kiện:</h3>
      <h3>Địa điểm:</h3>
      <h3>Thời gian:</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <Statistic
          name={"NGƯỜI THAM GIA"}
          value={100}
          color={"rgb(255,204,204)"}
          iconColor="rgb(230,70,99)"
          icon={"user"}
        />
        <Statistic
          name={"Tổng người tham gia"}
          value={100}
          color={"rgb(248,237,210)"}
          iconColor="rgb(230,194,102)"
          icon={"cart"}
        />
        <Statistic
          name={"Phần trăm tham gia"}
          value={100}
          color={"rgb(204,230,204)"}
          iconColor="rgb(28,142,28)"
          icon={"money"}
        />
        <Statistic
          name={"Thời gian còn lại checkin"}
          value={100}
          color={"rgb(230,204,230)"}
          iconColor="rgb(153,51,153)"
          icon={"wallet"}
        />
      </div>
      <ParticipantSearch onSearch={onSearch} />
      <Participantstable participants={participants} />
    </div>
  );
}

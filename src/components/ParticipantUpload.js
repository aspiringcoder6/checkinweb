import * as XLSX from "xlsx";
import { useState, useRef, useEffect } from "react";
export default function ParticipantUpload({ participants, onChange, watch }) {
  const nameRef = useRef();
  const idRef = useRef();
  const [groups, setGroups] = useState([]);
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((row, index) => ({
        STT: row.STT || index + 1,
        Name: row.Name || row["Tên"] || row["Họ và tên"],
        MSSV: row.MSSV || row["Mã số sinh viên"],
      }));
      onChange(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/groups/getGroups"
        );
        const data = await response.json();
        setGroups(data.groups);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, []);
  return (
    <div className="inputGroup">
      <label>Danh sách người tham gia (tạm thời support mỗi file excel)</label>
      {!watch && (
        <>
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
          />
          <div className="participantInput">
            <input type="text" placeholder="Họ và tên" ref={nameRef} />
            <input type="text" placeholder="Mã số sinh viên" ref={idRef} />
            <button
              onClick={() => {
                onChange([
                  ...participants,
                  {
                    STT: participants.length + 1,
                    Name: nameRef.current.value,
                    MSSV: idRef.current.value,
                    checkinTime: "",
                    status: false,
                  },
                ]);
              }}
            >
              Thêm người tham gia
            </button>
            <p>Chọn nhanh nhóm để thêm</p>
            <select
              value=""
              onChange={(e) => {
                onChange(
                  groups.filter((group) => {
                    return group._id == e.target.value;
                  })[0].participants
                );
              }}
            >
              <option value="" disabled>
                Chọn nhóm
              </option>
              {groups.map((group, index) => (
                <option key={index} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <table className="eventsTable nohover">
        <tr>
          <th>STT</th>
          <th>Họ và tên</th>
          <th>Mã số sinh viên</th>
          {!watch && <th>Hành động</th>}
        </tr>
        {participants.map((participant, index) => (
          <tr key={participant.STT}>
            <td>{index + 1}</td>
            <td>{participant.Name}</td>
            <td>{participant.MSSV}</td>
            {!watch && (
              <td style={{ width: "20%" }}>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    onChange(
                      participants.filter((par) => {
                        return par.MSSV != participant.MSSV;
                      })
                    );
                  }}
                >
                  Xóa
                </button>
              </td>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
}

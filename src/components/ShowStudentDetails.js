import React, { useEffect } from "react";
import { useGlobal } from "../service/hooks/GlobalContext";
import { apiURL } from "../config";
import { Descriptions } from "antd";
import { useParams } from "react-router";

const ShowStudentsDetails = () => {
  const { studentDetail, setStudentDetail } = useGlobal();

  const { studentID } = useParams();

  useEffect(() => {
    fetch(`${apiURL}/getStudentDetails?_id=${studentID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setStudentDetail(res);
      });
  }, []);
  const { studentName, year, skills } = studentDetail;
  return (
    <div>
      <Descriptions title="Student Info">
        <Descriptions.Item label="Name">{studentName}</Descriptions.Item>
        <Descriptions.Item label="Batch">{year}</Descriptions.Item>
        <Descriptions.Item label="Skills">Hangzhou, Zhejiang</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ShowStudentsDetails;

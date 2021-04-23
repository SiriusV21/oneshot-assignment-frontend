import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../service/hooks/GlobalContext";
import { useParams } from "react-router";
import { Table, Typography, Breadcrumb } from "antd";
import { HomeOutlined, BookOutlined, UpSquareOutlined, DownSquareOutlined } from "@ant-design/icons";
import { apiURL } from "../config";
import "antd/dist/antd.css";
import styles from "../css/Students.module.css";

const Students = () => {
  const { studentsInCollege, setStudentsInCollege } = useGlobal();
  const { Text } = Typography;
  const { collegeID } = useParams();

  useEffect(() => {
    fetch(`${apiURL}/getStudentsInCollege?collegeId=${collegeID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setStudentsInCollege(
          res.map((student, index) => ({
            ...student,
            key: index,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
  ];

  return (
    <div className={styles.main}>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/HomePage">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BookOutlined />
            <span>College Details</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <Table
          className="data-display"
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p className={styles.stu_details}>
                <Text>
                  <li>StudentID : {record._id}</li>
                  <li>Batch : {record.year}</li>
                  <li>
                    Skills : {record.Skills[0]}, {record.Skills[1]}, {record.Skills[2]}
                  </li>
                </Text>
              </p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <UpSquareOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <DownSquareOutlined onClick={(e) => onExpand(record, e)} />
              ),
          }}
          dataSource={studentsInCollege}
          pagination={{ position: ["none", "bottomLeft"] }}
        />
      </div>
    </div>
  );
};
export default Students;

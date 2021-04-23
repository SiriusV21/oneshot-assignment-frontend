import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Space, Breadcrumb, Radio, Tag, Typography, Tooltip } from "antd";
import { useGlobal } from "../service/hooks/GlobalContext";
import { HomeOutlined } from "@ant-design/icons";
import { apiURL } from "../config";
import { columns1, columns2, databyStates, databyCourses } from "../assets/data/data-models";
import { PieChart } from "./PieChart";
import "antd/dist/antd.css";
import styles from "../css/Homepage.module.css";

const HomePage = () => {
  const { college, setCollege, setSimilarCollege, similarCollege } = useGlobal();
  const [searchType, setSearchType] = useState(1);
  const { Search } = Input;
  const { Text } = Typography;
  const [similarCollegeStates, setSimilarCollegeStates] = useState([]);
  const [chartResults, setChartResults] = useState([]);

  useEffect(() => {
    setCollege([]);
    setSimilarCollege([]);
  }, [chartResults]);

  useEffect(() => {
    if (similarCollege.length > 0) {
      const states = {};
      similarCollege.forEach((college) => {
        if (!states[college.state]) {
          states[college.state] = 1;
        }
      });
      setSimilarCollegeStates(Object.keys(states));
    }
  }, [similarCollege]);

  const onChange = (e) => {
    setSearchType(e.target.value);
  };

  const refresh = () => window.location.reload();

  const onSearch = (value) => {
    if (value.length > 0) {
      (searchType === 1
        ? fetch(`${apiURL}/getCollegeDetails?collegeName=${value}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        : fetch(`${apiURL}/getCollegeDetails?collegeID=${value}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
      )
        .then((response) => response.json())
        .then((response) =>
          setCollege([
            {
              ...response,
              key: 0,
              collegeName: <Link to={`/collegedetails/${response._id}`}>{response.collegeName}</Link>,
            },
          ])
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const fetchSimilarColleges = () => {
    fetch(`${apiURL}/getSimilarColleges?_id=${college[0]._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSimilarCollege(
          res.map((res, index) => ({ ...res, key: index, collegeName: <Link to={`/collegedetails/${res._id}`}>{res.collegeName}</Link> }))
        );
      });
    document.getElementById("onlyButton").style.display = "none";
  };
  console.log(chartResults);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Breadcrumb className={styles.breadcrums}>
          <Breadcrumb.Item>
            <a onClick={refresh}>
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Space className={styles.searchbox} direction="vertical">
          <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 400 }} />
        </Space>
      </div>
      <div>
        <span>Search by</span>
        <Radio.Group className={styles.radio_button} onChange={onChange} value={searchType}>
          <Radio value={1}>Name</Radio>
          <Radio value={2}>Id</Radio>
        </Radio.Group>
      </div>
      <div className={styles.charts} style={{ height: 400 }}>
        <PieChart data={databyStates} setterFunction={setChartResults} />
        <PieChart data={databyCourses} setterFunction={setChartResults} />
      </div>
      <div>
        <div id="list_wrapper">
          {college.length ? (
            <>
              <Table
                className={styles.data}
                boardered={true}
                columns={columns1}
                dataSource={college}
                pagination={{ position: ["none", "none"] }}
              />

              <button type="button" id="onlyButton" onClick={fetchSimilarColleges}>
                show similar Colleges
              </button>
            </>
          ) : null}
          {similarCollege.length ? (
            <div id="sm_list_wrapper">
              <h2 className={styles.h2}>
                <Text strong>Similar Colleges</Text>
              </h2>
              <Table
                className={styles.sm_data}
                boardered={true}
                columns={columns2(similarCollegeStates)}
                dataSource={similarCollege}
                pagination={{ position: ["none", "bottomCenter"] }}
              />
            </div>
          ) : null}
        </div>
      </div>
      {chartResults.length && !college.length ? (
        <div>
          <Table boardered={true} columns={columns1} dataSource={chartResults} pagination={{ position: ["none", "bottomCenter"] }} />
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;

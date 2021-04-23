import { ResponsivePieCanvas } from "@nivo/pie";
import { Link } from "react-router-dom";
import { apiURL } from "../config";

export const PieChart = ({ data, setterFunction }) => {
  const handleClick = (query) => {
    fetch(`${apiURL}/getCollegeList?key=${query.key}&label=${query.label}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setterFunction(
          res.map((res, index) => ({ ...res, key: index, collegeName: <Link to={`/collegedetails/${res._id}`}>{res.collegeName}</Link> }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ResponsivePieCanvas
      data={data}
      margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
      width={600}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "paired" }}
      borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
      radialLabelsSkipAngle={1}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={1}
      sliceLabelsTextColor="#333333"
      onClick={(node) => handleClick(node.data)}
      legends={[]}
    />
  );
};

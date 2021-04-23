import { Tag } from "antd";

export const columns1 = [
  {
    title: "College Name",
    dataIndex: "collegeName",
    key: "collegeName",
  },
  {
    title: "Founding Year",
    dataIndex: "foundingYear",
    key: "foundingYear",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Number of Students",
    dataIndex: "numberOfStudents",
    key: "numberOfStudents",
  },
  {
    title: "Courses",
    dataIndex: "Courses",
    key: "Courses",
    render: (tags) => (
      <>
        {tags?.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "C") {
            color = "LightSkyBlue";
          } else if (tag === "C" || tag === "Chemical Engineering") {
            color = "grey";
          } else if (tag === "CSE" || tag === "EC") {
            color = "blue";
          } else if (tag === "IT") {
            color = "PaleGreen";
          } else if (tag === "Mechanical Engineering") {
            color = "LightSteelBlue";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

export const columns2 = (states) => {
  const filter = [];
  states.forEach((state) => {
    filter.push({ text: state, value: state });
  });
  return [
    {
      title: "College Name",
      dataIndex: "collegeName",
      key: "collegeName",
    },
    {
      title: "Founding Year",
      dataIndex: "foundingYear",
      key: "foundingYear",
      sorter: (a, b) => a.foundingYear - b.foundingYear,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      filters: filter,
      filterMultiple: true,
      onFilter: (value, record) => record.state.indexOf(value) === 0,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Number of Students",
      dataIndex: "numberOfStudents",
      key: "numberOfStudents",
    },
    {
      title: "Courses",
      dataIndex: "Courses",
      key: "Courses",
      render: (tags) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "C") {
              color = "LightSkyBlue";
            } else if (tag === "C" || tag === "Chemical Engineering") {
              color = "grey";
            } else if (tag === "CSE" || tag === "EC") {
              color = "blue";
            } else if (tag === "IT") {
              color = "PaleGreen";
            } else if (tag === "Mechanical Engineering") {
              color = "LightSteelBlue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
};

export const databyStates = [
  {
    id: "Alaska",
    label: "Alaska",
    value: 3,
    key: "State",
  },
  {
    id: "Missouri",
    label: "Missouri",
    value: 3,
    key: "State",
  },
  {
    id: "New Mexico",
    label: "New Mexico",
    value: 1,
    key: "State",
  },
  {
    id: "Florida",
    label: "Florida",
    value: 18,
    key: "State",
  },
  {
    id: "Texas",
    label: "Texas",
    vlabel: 30,
    key: "State",
  },
  {
    id: "New Jersey",
    label: "New Jersey",
    value: 5,
    key: "State",
  },
  {
    id: "Pennsylvania",
    label: "Pennsylvania",
    value: 7,
    key: "State",
  },
  {
    id: "New York",
    label: "New York",
    value: 12,
    key: "State",
  },
  {
    id: "California",
    label: "California",
    value: 21,
    key: "State",
  },
];

export const databyCourses = [
  {
    id: "EC",
    label: "EC",
    value: 47,
    key: "Courses",
  },
  {
    id: "Mechanical Engineering",
    label: "Mechanical Engineering",
    value: 57,
    key: "Courses",
  },
  {
    id: "Chemical Engineering",
    label: "Chemical Engineering",
    value: 45,
    key: "Courses",
  },
  {
    id: "IT",
    label: "IT",
    value: 52,
    key: "Courses",
  },
  {
    id: "MBA",
    label: "MBA",
    value: 52,
    key: "Courses",
  },

  {
    id: "CSE",
    label: "CSE",
    value: 47,
    key: "Courses",
  },
];

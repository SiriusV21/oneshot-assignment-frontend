import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

const error = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/HomePage">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default error;

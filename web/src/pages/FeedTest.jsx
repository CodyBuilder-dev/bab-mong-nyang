import React from "react";
import { useHistory, useParams, useRouteMatch } from "react-router"
const FeedTest = props => {
  const history = useHistory()
  const match = useRouteMatch()
  let { f_id } = useParams()
  return (
      <>
<span>{f_id}</span>
      </>
  );
};

export default FeedTest;

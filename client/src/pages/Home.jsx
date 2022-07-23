import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "../components";
import axios from "axios";

const ContainerGrid = styled.div`
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  console.log(videos);

  React.useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data.videos);
    };

    fetchVideos();
  }, [type]);

  return (
    <ContainerGrid>
      {videos && videos.map((video) => <Card key={video._id} video={video} />)}
    </ContainerGrid>
  );
};

export default Home;

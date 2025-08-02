import React, { useState } from "react";

import "./VideoSection.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import VideoPopUp from "../videoPopUp/VideoPopUp";
import Img from "../lazyLoadImage/Img";
import { PlayButton } from "../../pages/details/PlayButton";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton" />
        <div className="row skeleton" />
        <div className="row2 skeleton" />
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {/* displaying videos */}
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
              >
                <div className="videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${
                      video.key
                    }/mqdefault.jpg`}
                  />
                  <PlayButton />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopUp
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;

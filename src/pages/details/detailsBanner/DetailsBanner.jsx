import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./detailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayButton } from "../PlayButton";
import VideoPopUp from "../../../components/videoPopUp/VideoPopUp";

const DetailsBanner = ({ video, crew }) => {
  // state for video Popup
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  // fetch data? from Api
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const __genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "ScreenPlay" || f.job === "Writer" || f.job === "Story"
  );
  //formating movie runtime
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {/* displaying info about particular movie or tv show */}
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backDrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer" />
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        src={url.backDrop + data?.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title}(${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={__genres} />
                    {/* displaying rating and trailer playBtn */}
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayButton />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    {/* displaying overview section */}
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    {/* displaying status, release date ,&runtime info */}
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D,YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">RunTime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* displaying Director Info */}
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Director:{" "}
                          <span className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}
                    {/* displaying writer info */}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Writer:{" "}
                          <span className="text">
                            {writer?.map((w, i) => (
                              <span key={i}>
                                {w.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}
                    {/* displaying creater  info  for tv series*/}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Creator:{" "}
                          <span className="text">
                            {data?.created_by?.map((c, i) => (
                              <span key={i}>
                                {c.name}
                                {data?.created_by.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
              {/* displaying popup video for trailer */}
              <VideoPopUp
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton" />
            <div className="right">
              <div className="row skeleton" />
              <div className="row skeleton" />
              <div className="row skeleton" />
              <div className="row skeleton" />
              <div className="row skeleton" />
              <div className="row skeleton" />
              <div className="row skeleton" />
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;

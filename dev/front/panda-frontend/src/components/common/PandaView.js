import React from "react";
import VideoCard from "../ekan/UI/cards/VideoCard";

const PandaView = ({pandas}) => {
  console.log(pandas)

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              {
                pandas && pandas.map((item, index) =>
                      <div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={index}>
                        <VideoCard
                            panda={item.panda}
                            link={item.link}
                        />
                      </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default PandaView;

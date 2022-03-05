import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPandaVideoList } from "../../../../../store/actions/mypageActions/pandaActions";
import Message from "../../../UI/Message";
import { setError, setLoading } from "../../../../../store/actions/pageActions";
import VideoCard from "../../../UI/cards/VideoCard";

const PandaVideoPage = () => {
  const { error } = useSelector((state) => state.page);
  const { pandaVideoList } = useSelector((state) => state.panda);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError(""));
    }
    dispatch(fetchPandaVideoList(() => setLoading(false)));
  }, [dispatch]);

  return (
    <>
      {error ? <Message msg={error} type="danger" /> : null}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              {pandaVideoList ? (
                pandaVideoList.details.map((item, index) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={index}>
                    <VideoCard
                      panda={item.panda}
                      link={item.link}
                      footer={true}
                      pandaToProductId={item.pandaToProductId}
                    />
                  </div>
                ))
              ) : (
                <div>판다 없음</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PandaVideoPage;

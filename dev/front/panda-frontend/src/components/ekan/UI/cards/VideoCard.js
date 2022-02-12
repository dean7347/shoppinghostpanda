import React, {useCallback, useEffect, useState} from "react";
import Button from "../Button";
import "./videocard.css";
import axios from "axios";

function deleteBtnAction(e) {
    e.preventDefault();
    console.log("삭제하기");
}

function completeEditAction(e) {
    e.preventDefault();
    console.log("수정완료");
}

function sliceTitle(title) {
    let slicedTitle = title.slice(0, 27)
    if (title.length > 27) {
        return slicedTitle + '...'
    }
    return title
}

const VideoCard = ({link, panda, footer}) => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        fetchVideoInfo()
    }, []);

    const fetchVideoInfo = useCallback(() => {
        const fullUrl = `https://noembed.com/embed?url=${link}`;
        axios.get(fullUrl)
            .then((result) => {
                // console.log(result.data)
                setVideoInfo(result.data);
                return result.data;
            })
            .then(setVideoInfo);
    }, [])

    const modifyBtnAction = useCallback((e) => {
        e.preventDefault();
        setShowEdit(true)
        console.log("수정하기");

    }, [showEdit])

    const cancelModifyBtnAction = useCallback((e) => {
        e.preventDefault()
        setShowEdit(false)
    }, [showEdit])

    return (
        <>
            {videoInfo && (
                <div className="card video-card">
                    <div className="card-image video-card-image">
                        <figure className="image is-4by3">
                            <img src={videoInfo.thumbnail_url} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <a className="video-title" target="_blank" href={link}>
                                    {sliceTitle(videoInfo.title)}
                                </a>
                            </div>
                        </div>

                        <div className="video-content">
                            <div>
                                <span>Panda </span>
                                <span className="video-sold">{panda}</span>
                            </div>
                            <div>
                                <span>YouTube</span>
                                <span className="video-sold">{videoInfo.author_name}</span>
                            </div>
                        </div>
                    </div>
                    {footer && (
                        <footer className="card-footer has-background-white">
                            <div style={{width: "100%"}}>
                                {
                                    showEdit &&
                                    <span>
                        <textarea className="textarea is-primary" rows='3' value={link}/>
                    </span>
                                }
                                <span className="float-start">
                    {
                        !showEdit ?
                            <Button
                                onClick={modifyBtnAction}
                                text="수정"
                                className="is-info is-inverted"
                            /> :
                            <Button
                                onClick={cancelModifyBtnAction}
                                text="수정취소"
                                className="is-danger is-inverted"
                            />
                    }
                                </span>
                                <span className="float-end">
                    {
                        !showEdit ?
                            <Button
                                onClick={deleteBtnAction}
                                text="삭제"
                                className="is-danger is-inverted"
                            /> :
                            <Button
                                onClick={completeEditAction}
                                text="수정완료"
                                className="is-primary is-inverted"
                            />
                    }
                </span>
                            </div>
                        </footer>
                    )}
                </div>
            )}
        </>
    );
};

export default VideoCard;

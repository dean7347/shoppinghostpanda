import React, {useCallback, useEffect, useState} from "react";
import Button from "../Button";
import "./videocard.css";
import axios from "axios";

function deleteBtnAction(e) {
    e.preventDefault();
    console.log("삭제하기");
}

function sliceTitle(title) {
    let slicedTitle = title.slice(0, 24)
    if (title.length > 27) {
        return slicedTitle + '...'
    }
    return title
}

const VideoCard = ({link, panda, footer}) => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [showEdit, setShowEdit] = useState(false)
    const [linkProps, setLinkProps] = useState(link)

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

    const completeEditAction = useCallback((e) => {
        e.preventDefault();
        console.log("수정완료");
        console.log('링크값: ',linkProps )
    },[linkProps])

    const modifyBtnAction = useCallback((e) => {
        e.preventDefault();
        setShowEdit(true)
        console.log("수정하기");

    }, [showEdit])

    const cancelModifyBtnAction = useCallback((e) => {
        e.preventDefault()
        setShowEdit(false)
        console.log("수정취소");
    }, [showEdit])

    const onChangeLinkAction = useCallback((e) => {
        setLinkProps(e.target.value)
    },[linkProps])

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
                                <i className='bx bx-leaf'></i>
                                <span className="video-sold">{panda}</span>
                            </div>
                            <div>
                                <i className='bx bxl-youtube'/>
                                <span className="video-sold">{videoInfo.author_name.slice(0,6)}</span>
                            </div>
                        </div>
                    </div>
                    {footer && (
                        <footer className="card-footer has-background-white">
                            <div style={{width: "100%"}}>
                                {
                                    showEdit &&
                                    <span>
                        <textarea className="textarea is-primary" rows='3'
                                  value={linkProps}
                                  onChange={onChangeLinkAction}/>
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

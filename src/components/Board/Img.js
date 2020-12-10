import React, { useRef } from "react";

export default function Img({ photo, photoSelect, setPhotoSelect }) {

    const imgRef = useRef(null);

    const handleClick = (e) => {
        if (e.target.classList.contains("active") || e.target.classList.contains("valide") || e.target.tagName.toLowerCase() === 'a') {
            return;
        }
        setPhotoSelect([...photoSelect, photo]);
        e.target.classList.add("active");
    }

    return (
        <div className={`blocImg ` + photo.class} onClick={handleClick} id={photo.id} ref={imgRef} >
            <img src={photo.url} alt="" />
            <span className="photographer">Photo by <a href={photo.link + "?utm_source=random_memory_game&utm_medium=referral"} target="_blank" rel="noreferrer">{photo.user}</a> on <a href="https://unsplash.com/?utm_source=random_memory_game&utm_medium=referral" target="_blank" rel="noreferrer">Unsplash</a></span>
        </div>
    )
}
import React, { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Compteur from "./Compteur";
import Img from "./Img";

export default function BoardGame({photos, setPartie, setPhotos}) {

    const [paires, setPaires] = useState(0);
    const [photoSelect, setPhotoSelect] = useState([]);
    const [nbEssais, setNbEssais] = useState(0);
    const [victory, setVictory] = useState(false);
    const boardRef = useRef(null)
    const nbPaires = photos.length / 2;

    useEffect(() => {
        const board = boardRef.current.children;
        if(photoSelect.length === 2) {
            if (photoSelect[0].class === photoSelect[1].class) {  
                setTimeout(() => {
                    for(let item of board) {
                        if (item.classList.contains("active")) {
                            item.classList.remove("active")
                            item.classList.add("valide")
                        }
                    } 
                }, 300);
                setPaires(paires + 1);
            } else {
                setTimeout(() => {
                    for(let item of board) {
                        item.classList.remove("active");
                    } 
                }, 700);
            }
            setPhotoSelect([]);
            setNbEssais(nbEssais + 1);
        } 
        if (paires === nbPaires) {
            setTimeout(() => {
                setVictory(true);
            }, 700);
        }
        return;
    }, [photoSelect, nbEssais, paires, nbPaires])

    const handlePartie = () => {
        setPhotos([]);
        setPartie(false)
    }

    return (
        <>
            <Compteur paires={paires} nbPaires={nbPaires} nbEssais={nbEssais} victory={victory} />
            {
                victory ?
                <Button onClick={handlePartie} className="center">Recommencer une partie ?</Button> :
                <div className="boardgame" ref={boardRef}>
                { photos.map((photo, index) => <Img key={index} photo={photo} setPhotoSelect={setPhotoSelect} photoSelect={photoSelect} />) }
                </div>
            }
        </>
    )
}
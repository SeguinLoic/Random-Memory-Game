import React from "react";

export default function Compteur({ paires, nbPaires, nbEssais, victory }) {
    return (
        <div className="compteur">
            <span className="essais">Nombre d'essais : {nbEssais}</span>
            {
                victory ? "" : <span className="compare">{paires} / {nbPaires}</span>
            }
        </div>
    )
}
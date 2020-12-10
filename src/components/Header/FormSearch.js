import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormSeach({ setPhotos, setPartie }) {

    const [title, setTitle] = useState(''); 
    const [number, setNumber] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`./.netlify/functions/images?query=${title}`)
        .then(response => response.json())
        .then(data => {
            if( data.results.length < 15 || number === undefined ) {
                alert("Le thème n'a pas été trouvé, le nombre n'a pas été défini, veuillez saisir une nouvelle requête !");
                setTitle("");
                return;
            }
            dataGame(data);
        })

        /*

        const API_KEY = process.env.REACT_APP_API_KEY;

        fetch(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${title}&per_page=15`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if( data.results.length < 15 || number === undefined ) {
                alert("Le thème n'a pas été trouvé, le nombre n'a pas été défini, veuillez saisir une nouvelle requête !");
                setTitle("");
                return;
            }
            dataGame(data);
        }) 

        */

    }

    const dataGame = (data) => {
        let arr = [];
        let newIndex = 0;
        let dataPhotos = data.results.slice(0, number);
        dataPhotos.map((photo) => {
            for(let i = 0; i < 2; i++) {
                arr.push({url: photo.urls.regular, class: photo.urls.regular.slice(34, 44), id: `photo-`+newIndex, user: photo.user.name, link: photo.user.links.html});
                newIndex++;
            }
        });
        randomize(arr);
    }

    const randomize = (array) => {
        let arrayRandomize = [];
        while (arrayRandomize.length < array.length) {
            const r = Math.floor(Math.random() * Math.floor(array.length));
            const elemFiltered = array.filter(elem => Number(elem.id.slice(6)) === r );
            if (arrayRandomize.indexOf(elemFiltered[0]) === -1) {
                arrayRandomize.push(elemFiltered[0]);
            }
        }
        setPhotos(arrayRandomize);
        setPartie(true);
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="formulaire">
                <Form.Group>
                    <Form.Label>Votre thème</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Choisissez votre thème"/>
                    <Form.Text className="text-muted">La recherche de thème doit se faire en Anglais.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nombre de paires</Form.Label>
                    <Form.Control as="select" defaultValue={'DEFAULT'} onChange={(e) => setNumber(Number(e.target.value))}>
                        <option value="DEFAULT" disabled>Choisissez un nombre de paires</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="center">Lancer une partie</Button>
            </Form>
        </>
    )
}
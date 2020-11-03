import React, { useState, useEffect } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { FiClock, FiInfo } from "react-icons/fi"
import { Map, Marker, TileLayer } from "react-leaflet"
import { useHistory, useParams } from 'react-router-dom'


import '../styles/pages/orphanage.css'
import Sidebar from "../components/Sidebar"
import mapIcon from "../utils/mapIcon"
import api from "../services/api"


interface Orphanange {
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: string,
  images: Array<{
    id: number,
    url: string
  }>
}

interface OrphanangeParams {
  id: string;
}

export default function Orphanage() {
  const { goBack } = useHistory()
  const params = useParams<OrphanangeParams>()
  const [orphanange, setOrphanange] = useState<Orphanange>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Sempre que usar uma variavel dentro da URL, tem que passar essa variavel, no array
  // de dependências, no final do useEffect
  useEffect(() => {
    api.get(`orphananges/${params.id}`).then(response => {
      setOrphanange(response.data)
    })
  }, [params.id])


  if (!orphanange) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanange.images[activeImageIndex].url} alt={orphanange.name} />

          <div className="images">
            { orphanange.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {setActiveImageIndex(index)}}
                  >  
                  <img src={image.url} alt={orphanange.name} />
                </button>
              )
            })}
          </div>
           
          <div className="orphanage-details-content">
            <h1>{orphanange.name}</h1>
            <p>{orphanange.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanange.latitude, orphanange.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanange.latitude, orphanange.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanange.latitude}, ${orphanange.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanange.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanange.opening_hours}
              </div>
              
              { 
              // if = ?
              // else = :

                orphanange.open_on_weekends ? (

                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>

                ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
                ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
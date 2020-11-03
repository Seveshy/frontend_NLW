import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'

import mapIcon from '../utils/mapIcon'

import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.png'

import '../styles/pages/orphanages-map.css'
import api from '../services/api'

// Estado significa qual quer tipo de informação, que vai ser armazenada no componente

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanangesMap() {
    // 1 - Primeiro parametro é qual ação executar,
    // 2 - Segundo parametro é quando quero executar essa ação 
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    
    console.log(orphanages)

    useEffect(() => {
        api.get('orphananges').then(response => {
            setOrphanages(response.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                
                    <footer>
                        <strong>São Paulo</strong>
                        <span>São Paulo</span>
                    </footer>
                </aside>

                <Map 
                    center={[ -23.6811085,-46.6607935 ]}
                    zoom={15}
                    style={{ width: '100%', height: '100%' }}
                >
                    {/**<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                
                    <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                
              {orphanages.map(orphanage => {
                  return (
                    <Marker 
                    icon={mapIcon}
                    position={[orphanage.latitude ,orphanage.longitude]}
                    key={orphanage.id}
                    >

                    <Popup className="map-popup" closeButton={false} minWidth={240} maxHeight={240}>
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={32} color="#fff" />
                        </Link>
                    </Popup>
        
                    </Marker>   
                  )
              })}

        
                </Map>

             
                <Link to="/orphanages/create" className="create-orphanage">
                    <FiPlus size={32} color="#fff" /> 
                </Link>
        </div>
    )
}

export default OrphanangesMap
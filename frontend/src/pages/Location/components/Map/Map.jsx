import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import './Map.scss'
import location from '../../../../assets/icons/location.svg'

import { addresses } from '../../../../config/addresses'

export const Map = () => {
    const [activeMarker, setActiveMarker] = useState(addresses[0].position)
    const [zoomLevel, setZoomLevel] = useState(16)
    const [activeTab, setActiveTab] = useState(addresses[0])

    const handleMarkerClick = (marker) => {
        setActiveMarker(marker.position)
        setZoomLevel(16)
        setActiveTab(marker)
    }

    const ChangeMapView = ({ center, zoom }) => {
        const map = useMap()
        map.setView(center, zoom)
        return null
    }

    return (
        <div className="location__map-wrapper">

            <div className="location__map">
                <MapContainer center={activeMarker} zoom={zoomLevel} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <ChangeMapView center={activeMarker} zoom={zoomLevel} />

                    {addresses.map(marker => (
                        <Marker key={marker.id} position={marker.position}>
                            <Popup>{marker.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className='location__map-tabs'>
                {addresses.map(marker => (
                    <button
                        key={marker.id}
                        onClick={() => handleMarkerClick(marker)}
                        className={`location__map-tab ${activeTab.id === marker.id ? 'active' : ''}`}
                    >
                        <div className="location__map-tab__heading">
                            <ReactSVG src={location} className='icon' />
                            {marker.name}
                        </div>
                        {
                            (activeTab.id === marker.id) && (
                                <>
                                    <div className="location__map-tab__body">
                                        {activeTab.contacts.map((item, index) => (
                                            <div className={`location__map-tab__body-${item.type}`} key={index}>
                                                {item.data}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="location__map-tab__bottom">
                                        {activeTab.links.map((item, index) => (
                                            <a 
                                                key={index}
                                                href={item.link}
                                                target='_blank' 
                                                className={`location__map-tab__bottom-btn ${item.type}`}
                                            >
                                                <ReactSVG src={item.icon} className='icon' />
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                    </button>

                ))}
            </div>
        </div>
    )
}
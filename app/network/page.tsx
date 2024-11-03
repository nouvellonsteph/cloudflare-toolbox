'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import DraggableToast from '../../components/DraggableToast'; // Import the DraggableToast component
import cloudflareIcon from '../../public/cloudflare.png'; // Importing the icon directly

// Dynamic import for MapContainer to ensure it's only loaded on the client-side
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const icon = L.icon({
    iconUrl: cloudflareIcon,
    iconSize: [20, 20], // size of the icon
    iconAnchor: [10, 20], // Adjust for your icon's visual center
    popupAnchor: [0, -20], // Adjust based on your icon's size
});

interface PopLocation {
    iata: string;
    lat: number;
    lon: number;
    cca2: string;
    region: string;
    city: string;
}

const PopLocationsMap = () => {
    const [popLocations, setPopLocations] = useState<PopLocation[]>([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchPopLocations = async () => {
            try {
                const response = await fetch('https://speed.cloudflare.com/locations');
                const data = await response.json();
                setPopLocations(data);
                setShowToast(true); // Show toast when data is fetched
            } catch (error) {
                console.error('Error fetching POP locations:', error);
            }
        };

        fetchPopLocations();
    }, []);

    // Calculate unique countries and regions
    const uniqueCountries = new Set(popLocations.map(location => location.cca2));
    const uniqueRegions = new Set(popLocations.map(location => location.region));

    if (popLocations.length === 0) {
        return <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cf-orange border-t-transparent"></div>
        </div>; // Optional loading state
    }

    return (
        <>
            <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {popLocations.map((location) => (
                    <Marker key={location.iata} position={[location.lat, location.lon]} icon={icon}>
                        <Popup>
                            <strong className='text-cf-gray mb-8'>
                                Airport code - {location.iata}<br />
                                Region - {location.region}<br />
                                City - {location.city}
                            </strong>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {showToast && (
                <DraggableToast
                    popCount={popLocations.length}
                    countryCount={uniqueCountries.size}
                    regionCount={uniqueRegions.size}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};

export default PopLocationsMap;

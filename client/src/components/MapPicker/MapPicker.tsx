import { useState, useEffect, useRef, type JSX } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { Map } from "leaflet";

interface MapPickerProps {
  label: string;
  className?: string;
  tooltipText?: string;
  value: { latitude: number | null; longitude: number | null };
  onChange: (val: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

function MapEvents({ onChange }: { onChange: MapPickerProps["onChange"] }) {
  useMapEvents({
    click(e) {
      onChange({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });
  return null;
}

export const MapPicker = ({label, className, tooltipText, value, onChange }: MapPickerProps): JSX.Element => {
  const [fullscreen, setFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [fullscreen]);

  const markerPosition =
    value.latitude !== null && value.longitude !== null
      ? ([value.latitude, value.longitude] as [number, number])
      : null;

  return (
    <div className={`relative flex flex-col gap-2 group ${className}`}>
      <label className="ml-2 text-lg tracking-wide">{label}</label>
      {tooltipText && (
        <div className="z-20 absolute bottom-full mb-1 py-2 px-3 rounded-2xl border border-black/10 bg-white opacity-0 shadow-xl invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-400">
          <p className="break-normal">{tooltipText}</p>
        </div>
      )}
      <div
        ref={mapRef}
        className={
          fullscreen
            ? "fixed inset-0 z-50 bg-white"
            : "relative h-[300px] rounded-2xl border border-black/10"
        }
      >
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-3 right-3 z-50 bg-white px-3 py-1 rounded shadow"
        >
          {fullscreen ? "Zamkni" : "Otwórz"}
        </button>

        <MapContainer
          center={markerPosition ?? [51.505, -0.09]}
          zoom={10}
          className="w-full h-full z-0"
          ref={(map) => {
            if (map) mapInstanceRef.current = map;
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEvents onChange={onChange} />
          {markerPosition && <Marker position={markerPosition} />}
        </MapContainer>
      </div>
    </div>
  );
};

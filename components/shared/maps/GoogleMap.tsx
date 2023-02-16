import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useMemo } from "react";
import CustomMarker from "./CustomMarker";
import Map from "./Map";


const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>;
  }
  return <p>loading...</p>;
};

interface GoogleMapProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick: (payload: any) => void;
  markers?: any[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  highlightedMarkerId?: string;
}

export default function GoogleMap({
  apiKey,
  onClick,
  onIdle,
  zoom,
  center,
  markers,
  onMarkerClick,
  highlightedMarkerId,
}: GoogleMapProps) {
  const filtered = useMemo(() => {
    return markers?.filter((m) => m.location.latitude && m.location.longitude);
  }, [markers]);

  return (
    <div className="flex h-full">
      <Wrapper apiKey={apiKey} render={render}>
        <Map
          className="grow h-full"
          center={center}
          zoom={zoom}
          minZoom={2}
          maxZoom={18}
          onIdle={onIdle}
          onClick={onClick}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          clickableIcons={false}
        >
          {filtered?.map((hotel) => (
            <CustomMarker
              key={hotel.hotelId || hotel.pclnId}
              hotel={hotel}
              onClick={onMarkerClick}
              highlight={hotel.hotelId === highlightedMarkerId}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
}
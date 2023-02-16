import {
    Children,
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from "react";
import type { ReactNode } from "react";
import { useDeepCompareEffectForMaps } from "./useDeepCompareEffectForMaps";
const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#1d2c4d",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#8ec3b9",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1a3646",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#4b6878",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#64779e",
            },
        ],
    },
    {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#4b6878",
            },
        ],
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#334e87",
            },
        ],
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
            {
                color: "#023e58",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#283d6a",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#6f9ba5",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1d2c4d",
            },
        ],
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#023e58",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#3C7680",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#304a7d",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#98a5be",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1d2c4d",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#2c6675",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#255763",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#b0d5ce",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#023e58",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#98a5be",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1d2c4d",
            },
        ],
    },
    {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#283d6a",
            },
        ],
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
            {
                color: "#3a4762",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#0e1626",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#4e6d70",
            },
        ],
    },
];



interface MapProps extends google.maps.MapOptions {
    className: string;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: ReactNode;
}

export default function Map({
    className,
    onClick,
    onIdle,
    children,
    ...options
}: MapProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && map === undefined) {
            const googleMap = new window.google.maps.Map(ref.current, {
                styles: mapStyle,
            });
            setMap(googleMap);
        }
    }, [ref, map]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} className={className} />

            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, map);
                }
            })}
        </>
    );
}
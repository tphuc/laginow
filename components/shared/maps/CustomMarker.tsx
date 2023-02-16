import { useCallback, useMemo } from "react";
import OverlayView from "./OverlayView";
import { motion } from 'framer-motion'

interface Hotel {
    ratesSummary: {
        minPrice: string
    },
    location: {
      latitude: number,
      longitude: number
    }
}

interface CustomMarkerProps {
  hotel: Hotel
  map?: google.maps.Map
  onClick: (payload: Hotel) => void
  highlight?: boolean
}

export default function CustomMarker({
  hotel,
  map,
  onClick,
  highlight,
}: CustomMarkerProps) {
  
  const price = useMemo(() => {
    return `$ ${hotel.ratesSummary.minPrice.replace(/\.(.*?\d*)/g, '')}`
  }, [hotel])

  const handleClick = useCallback(() => {
    onClick(hotel)
  }, [onClick, hotel])


  return (
    <>
    {map && (
        <OverlayView
          position={{
            lat: hotel.location.latitude as number,
            lng: hotel.location.longitude as number,
          }}
          map={map}
          // when users select it, move the marker to the foreground
          zIndex={highlight ? 99 : 0}
        >
          {/* appearance transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 20,
              delay: Math.random() * 0.3,
            }}
          >
            <button
              onClick={handleClick}
              // button state toggle
              style={{
                backgroundColor: highlight ? 'white' : 'DarkGray',
                color: highlight ? 'black' : 'white',
              }}
            >
              {price}
            </button>
          </motion.div>
        </OverlayView>
      )}
      </>
  )
}
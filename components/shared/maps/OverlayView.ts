import { PropsWithChildren, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Overlay } from './Overlay'

type OverlayProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral
  pane?: keyof google.maps.MapPanes
  map: google.maps.Map
  zIndex?: number
}>

export default function OverlayView({
  position,
  pane = 'floatPane',
  map,
  zIndex,
  children,
}: OverlayProps) {
  const container = useMemo(() => {
    const div = document.createElement('div')
    div.style.position = 'absolute'
    return div
  }, [])

  const overlay = useMemo(() => {
    return new Overlay(container, pane, position)
  }, [container, pane, position])

  useEffect(() => {
    overlay?.setMap(map)
    return () => overlay?.setMap(null)
  }, [map, overlay])

  // to move the container to the foreground and background
  useEffect(() => {
    container.style.zIndex = `${zIndex}`
  }, [zIndex, container])

  return createPortal(children, container)
}
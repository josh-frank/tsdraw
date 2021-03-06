import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'

import { useCallback, useEffect } from 'react'
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../hooks'
import { setArtboardDimensions, setOffset, zoomIn, zoomOut } from '../redux/artboardSlice'
import { setMouse, setMouseDown, setMouseUp, setClientDimensions } from '../redux/clientSlice'
import { selectAppMode } from '../redux/modeSlice'
import Artboard from '../components/artboard'
import ArtboardOptions from '../components/artboardOptions'

import Drawer from '../components/drawer'
import Pen from '../components/pen'
import Shapes from '../components/shapes'
import SvgWrapper from '../components/svgWrapper'

const Home: NextPage = () => {
  
  const dispatch = useDispatch();

  const appMode = useSelector( selectAppMode );

  const handleMouseDown = useCallback( ( { target, clientX, clientY } ) => {
    if ( ![ "drawer", "drawer-content" ].includes( target.parentNode.dataset.name ) ) {
      dispatch( setMouse( { x: clientX, y: clientY } ) );
      dispatch( setMouseDown( { coordinates: { x: clientX, y: clientY }, dataset: { ...target.dataset } } ) );
    }
  }, [ dispatch ] );

  const handleMouseUp = useCallback( () => dispatch( setMouseUp() ), [ dispatch ] );

  const handleMouseMove = useCallback( mouseMoveEvent => dispatch( setMouse( { x: mouseMoveEvent.clientX, y: mouseMoveEvent.clientY } ) ), [ dispatch ] );

  const handleResize = useCallback( resizeEvent => dispatch( setClientDimensions( { height: resizeEvent.target.innerHeight, width: resizeEvent.target.innerWidth } ) ), [ dispatch ] );

  const handleWheel = useCallback( ( { deltaY } ) => {
    if ( deltaY && appMode === "pan" ) dispatch( deltaY > 0 ? zoomIn() : zoomOut() );
  }, [ dispatch, appMode ] );

  useEffect( () => {
    dispatch( setClientDimensions( {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    } ) );
    dispatch( setArtboardDimensions( { width: 500, height: 400 } ) );
    dispatch( setOffset( {
      x: ( ( window.innerWidth || document.body.clientWidth ) - 500 ) / 2,
      y: ( ( window.innerHeight || document.body.clientHeight ) - 400 ) / 2
    } ) );
  }, [ dispatch ] );

  useEffect( () => {
    window.addEventListener( "mousedown", handleMouseDown );
    window.addEventListener( "mousemove", handleMouseMove );
    window.addEventListener( "mouseup", handleMouseUp );
    window.addEventListener( "resize", handleResize );
    window.addEventListener( "wheel", handleWheel );
    return () => {
      window.removeEventListener( "mousedown", handleMouseDown );
      window.removeEventListener( "mousemove", handleMouseMove );
      window.removeEventListener( "mouseup", handleMouseUp );
      window.removeEventListener( "resize", handleResize );
      window.removeEventListener( "wheel", handleWheel );
    };
  }, [ dispatch, handleMouseDown, handleMouseMove, handleMouseUp, handleResize, handleWheel ] );

  return (
    <div>

      <SvgWrapper>
        <Artboard />
        <Pen />
        <Shapes />
      </SvgWrapper>

      <Drawer />
      <ArtboardOptions />

    </div>
  );

}

export default Home;

import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'

import { useCallback, useEffect } from 'react'
import { useAppDispatch as useDispatch } from '../hooks'
import { setArtboardDimensions, setOffset } from '../redux/artboardSlice'
import { setMouse, setMouseDown, setMouseUp, setClientDimensions } from '../redux/clientSlice'
import Artboard from './artboard'

import Drawer from './drawer'
import SvgWrapper from './svgWrapper'

const Home: NextPage = () => {
  
  const dispatch = useDispatch();

  const handleMouseDown = useCallback( ( { target, clientX, clientY } ) => {
    if ( target.tagName !== "BUTTON" ) {
      dispatch( setMouse( { x: clientX, y: clientY } ) );
      dispatch( setMouseDown( { coordinates: { x: clientX, y: clientY }, dataset: target.dataset } ) );
    }
  }, [ dispatch ] );

  const handleMouseUp = useCallback( () => dispatch( setMouseUp() ), [ dispatch ] );

  const handleMouseMove = useCallback( mouseMoveEvent => dispatch( setMouse( { x: mouseMoveEvent.clientX, y: mouseMoveEvent.clientY } ) ), [ dispatch ] );

  const handleResize = useCallback( resizeEvent => dispatch( setClientDimensions( { height: resizeEvent.target.innerHeight, width: resizeEvent.target.innerWidth } ) ), [ dispatch ] );

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
    window.addEventListener( "mousedown", handleMouseDown );
    window.addEventListener( "mousemove", handleMouseMove );
    window.addEventListener( "mouseup", handleMouseUp );
    window.addEventListener( "resize", handleResize );
    return () => {
      window.removeEventListener( "mousedown", handleMouseDown );
      window.removeEventListener( "mousemove", handleMouseMove );
      window.removeEventListener( "mouseup", handleMouseUp );
      window.removeEventListener( "resize", handleResize );
    };
  }, [ dispatch, handleMouseDown, handleMouseMove, handleMouseUp, handleResize ] );

  return (
    <div>

      <SvgWrapper>
        <Artboard />
      </SvgWrapper>

      <Drawer />

    </div>
  );

}

export default Home;

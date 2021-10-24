import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'

import { useCallback, useEffect } from 'react'
import { useAppDispatch as useDispatch } from '../hooks'
import { setOffset } from '../redux/artboardSlice'
import { setMouse, setMouseDown, setMouseUp, setClientDimensions } from '../redux/clientSlice'

import Drawer from './drawer'
import SvgWrapper from './svgWrapper'

const Home: NextPage = () => {
  
  const dispatch = useDispatch();

  const handleMouseDown = useCallback( ( { target, clientX, clientY } ) => {
    dispatch( setMouse( { x: clientX, y: clientY } ) );
    dispatch( setMouseDown( { coordinates: { x: clientX, y: clientY }, dataset: target.dataset } ) );
  }, [ dispatch ] );

  const handleMouseUp = useCallback( () => dispatch( setMouseUp() ), [ dispatch ] );

  const handleMouseMove = useCallback( mouseMoveEvent => dispatch( setMouse( { x: mouseMoveEvent.clientX, y: mouseMoveEvent.clientY } ) ), [ dispatch ] );

  const handleResize = useCallback( resizeEvent => dispatch( setClientDimensions( { height: resizeEvent.target.innerHeight, width: resizeEvent.target.innerWidth } ) ), [ dispatch ] );

  useEffect( () => {
    dispatch( setClientDimensions( {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    } ) );
    dispatch( setOffset( {
      x: ( document.documentElement.clientHeight - 800 ) / 2,
      y: ( document.documentElement.clientWidth - 1000 ) / 2
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
      </SvgWrapper>

      <Drawer />

    </div>
  );

}

export default Home;

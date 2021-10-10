import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'

import { useCallback, useEffect } from 'react'
import { useAppDispatch as useDispatch } from '../hooks'
import { setMouse, setMouseDown, setMouseUp, setDimensions } from '../redux/clientSlice'

import Pen from './pen'
import Drawer from './drawer'
import Shapes from './shapes'
import SvgWrapper from './svgWrapper'

const Home: NextPage = () => {
  
  const dispatch = useDispatch();

  const handleMouseDown = useCallback( mouseDownEvent => {
    if ( ![ "BUTTON", "path", "circle" ].includes( mouseDownEvent.target.tagName ) ) {
      dispatch( setMouse( { x: mouseDownEvent.clientX, y: mouseDownEvent.clientY } ) );
      dispatch( setMouseDown( { x: mouseDownEvent.clientX, y: mouseDownEvent.clientY } ) );
    }
  }, [ dispatch ] );

  const handleMouseUp = useCallback( () => dispatch( setMouseUp() ), [ dispatch ] );

  const handleMouseMove = useCallback( mouseMoveEvent => dispatch( setMouse( { x: mouseMoveEvent.clientX, y: mouseMoveEvent.clientY } ) ), [ dispatch ] );

  const handleResize = useCallback( resizeEvent => dispatch( setDimensions( { height: resizeEvent.target.innerHeight, width: resizeEvent.target.innerWidth } ) ), [ dispatch ] );

  useEffect( () => {
    dispatch( setDimensions( {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
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

      <Drawer />

      <SvgWrapper>
        <Pen />
        <Shapes />
      </SvgWrapper>

    </div>
  );

}

export default Home;

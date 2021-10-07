import { FunctionComponent, useEffect, useRef } from "react"

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../hooks";
import { addPoint } from "../redux/penSlice";

import styles from '../styles/Home.module.css'
import { Coordinates, CurvePoint } from "../types";

function pointsToPath( points: CurvePoint[] ) {
    return points.reduce( ( path, point, index ) => `${ path } ${ index ? `C ${ point.x1 } ${ point.y1 } ${ point.x2 } ${ point.y2 } ${ point.x } ${ point.y }` : `${ point.x } ${ point.y }` } `, "M" ) + "Z";
}

const Artboard: FunctionComponent = () => {

    const dispatch = useDispatch();

    const { dimensions, mouse, mouseDown } = useSelector( state => state.client );
    const { points } = useSelector( state => state.pen );

    const previousMouse = useRef<Coordinates>();
    const previousMouseDown = useRef<any>();

    useEffect( () => {
        if ( !mouseDown && previousMouseDown.current && previousMouse.current ) {
            dispatch( addPoint( {
                x1: previousMouse.current.x,
                y1: previousMouse.current.y,
                x2: previousMouseDown.current.x,
                y2: previousMouseDown.current.y,
                x: previousMouse.current.x,
                y: previousMouse.current.y
            } as CurvePoint ) );
            console.log( pointsToPath( points ) )
        }
        return () => {
            previousMouse.current = mouse;
            previousMouseDown.current = mouseDown;
            return;
        }
    }, [ dispatch, mouse, mouseDown ] );

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className={ styles.artboard }
            width={ dimensions?.width }
            height={ dimensions?.height }
            viewBox={ `0 0 ${ dimensions?.width } ${ dimensions?.height }` }
        >
            {/* { mouseDown && <circle cx={ mouse.x } cy={ mouse.y } r="10" fill="black"></circle> } */}
            { mouseDown && (
                <g>
                    <circle cx={ mouseDown.x } cy={ mouseDown.y } r="5" fill="#f00" />
                    <line x1={ mouseDown.x } y1={ mouseDown.y } x2={ mouse.x } y2={ mouse.y } stroke="#f00" />
                    <circle cx={ mouse.x } cy={ mouse.y } r="5" fill="#f00" />
                </g>
            ) }
            { points && (
                <g>
                    <path d={ pointsToPath( points ) } stroke="black" />
                    { points.map( point => <>
                        <circle cx={ point.x1 } cy={ point.y1 } r="5" fill="#f00" />
                        <line x1={ point.x1 } y1={ point.y1 } x2={ point.x2 } y2={ point.y2 } stroke="#f00" />
                        <circle cx={ point.x2 } cy={ point.y2 } r="5" fill="#f00" />                    
                    </> ) }
                </g>
            ) }
        </svg>
    );

}

export default Artboard;
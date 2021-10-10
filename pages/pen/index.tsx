import { FunctionComponent, useEffect, useRef } from "react"

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { selectMouse, selectMouseDown } from "../../redux/clientSlice";
import { addPoint, closePath, deactivateShapes, selectPoints } from "../../redux/penSlice";

import { Coordinates } from "../../types";

import { reflect, toPath } from "../../utilities";
import ClosePathButton from "./closePathButton";

const Pen: FunctionComponent = () => {

    const dispatch = useDispatch();

    const mouse = useSelector( selectMouse );
    const mouseDown = useSelector( selectMouseDown );
    const points = useSelector( selectPoints );

    const previousMouse = useRef<Coordinates>();
    const previousMouseDown = useRef<any>();

    useEffect( () => {
        if ( mouseDown ) dispatch( deactivateShapes() );
        if ( !mouseDown && previousMouseDown.current && previousMouse.current ) {
            if ( points.length ) dispatch( addPoint( { x: reflect( previousMouse.current.x, previousMouseDown.current.x ), y: reflect( previousMouse.current.y, previousMouseDown.current.y ) } ) );
            dispatch( addPoint( { x: previousMouseDown.current.x, y: previousMouseDown.current.y } ) );
            dispatch( addPoint( { x: previousMouse.current.x, y: previousMouse.current.y } ) );
        }
        return () => {
            previousMouse.current = mouse;
            previousMouseDown.current = mouseDown;
            return;
        }
    }, [ dispatch, points, mouse, mouseDown ] );

    return (
        <g>

            { mouseDown && <g>
                { points?.length && <circle cx={ reflect( mouse.x, mouseDown.x ) } cy={ reflect( mouse.y, mouseDown.y ) } r="5" fill="#f00" /> }
                <circle cx={ mouse.x } cy={ mouse.y } r="5" fill="#f00" />
                <circle cx={ mouseDown.x } cy={ mouseDown.y } r="5" fill="#f00" />
                <line
                    x1={ mouse.x }
                    y1={ mouse.y }
                    x2={ points?.length ? reflect( mouse.x, mouseDown.x ) : mouseDown.x }
                    y2={ points?.length ? reflect( mouse.y, mouseDown.y ) : mouseDown.y }
                    stroke="#f00"
                />
            </g> }

            { points?.length && <g>
                <path d={ toPath( points || [] ) } stroke="black" fill="none" />
                <g>
                    <circle cx={ points[ 1 ]?.x } cy={ points[ 1 ]?.y } r="5" fill="#f00" />
                    <line
                        x1={ points[ 0 ]?.x }
                        y1={ points[ 0 ]?.y }
                        x2={ points[ 1 ]?.x }
                        y2={ points[ 1 ]?.y }
                        stroke="#f00"
                    />
                    <ClosePathButton
                        cx={ points[ 0 ]?.x }
                        cy={ points[ 0 ]?.y }
                        closePath={ () => dispatch( closePath() ) }
                    />
                    { [ ...Array( points.length ) ].reduce( ( result, _, index ) => !( ( index - 2 ) % 3 ) ? [ ...result, index ] : result, [] ).map( ( pointIndex: number ): JSX.Element => <g key={ pointIndex }>
                        <circle cx={ points[ pointIndex ]?.x } cy={ points[ pointIndex ]?.y } r="5" fill="#f00" />
                        <circle cx={ points[ pointIndex + 1 ]?.x } cy={ points[ pointIndex + 1 ]?.y } r="5" fill="#f00" />
                        <circle cx={ points[ pointIndex + 2 ]?.x } cy={ points[ pointIndex + 2 ]?.y } r="5" fill="#f00" />
                        <line
                            x1={ points[ pointIndex ]?.x }
                            y1={ points[ pointIndex ]?.y }
                            x2={ points[ pointIndex + 2 ]?.x }
                            y2={ points[ pointIndex + 2 ]?.y }
                            stroke="#f00"
                        />
                    </g> ) }
                </g>
            </g> }

        </g>
    );

};

export default Pen;
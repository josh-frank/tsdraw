import { FunctionComponent, useEffect, useRef } from "react"

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { applyScaleAndOffset, unapplyScaleAndOffset, selectOffset, selectZoom, selectSnapToGrid, snapCoordinatesToGrid } from "../../redux/artboardSlice";

import { selectDragDistance, selectMouse, selectMouseDown } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";
import { addPoint, closePath, deactivateShapes, selectPoints } from "../../redux/penSlice";
import { Coordinates, MouseDown } from "../../types";
import { vectorAddition, reflect, toPath } from "../../utilities";
import ClosePathButton from "./closePathButton";

const Pen: FunctionComponent = () => {

    const dispatch = useDispatch();

    const mouse = useSelector( selectMouse );
    const mouseDown = useSelector( selectMouseDown );
    const mouseDistance = useSelector( selectDragDistance );

    const zoom = useSelector( selectZoom );
    const offset = useSelector( selectOffset );
    const snapToGrid = useSelector( selectSnapToGrid );

    const appMode = useSelector( selectAppMode );
    
    const points = useSelector( selectPoints );

    const previousMouse = useRef<Coordinates>();
    const previousMouseDown = useRef<MouseDown | null>();

    const scaleAndOffset = useSelector( applyScaleAndOffset );
    const unscaleAndUnoffset = useSelector( unapplyScaleAndOffset );
    const snapCoordinates = useSelector( snapCoordinatesToGrid );

    useEffect( () => {
        if ( mouseDown && mouseDown.dataset?.name === "shape" ) dispatch( deactivateShapes() );
        if ( appMode === "pen" && !mouseDown && previousMouseDown.current && previousMouse.current && !previousMouseDown.current.dataset?.shapeId && !previousMouseDown.current.dataset?.pointIndex && previousMouseDown.current.dataset?.name !== "close-path" ) {
            const reflectMouse = { x: reflect( previousMouse.current.x, previousMouseDown.current.coordinates.x ), y: reflect( previousMouse.current.y, previousMouseDown.current.coordinates.y ) }
            if ( points.length ) dispatch( addPoint( scaleAndOffset( reflectMouse ) ) );
            dispatch( addPoint( scaleAndOffset( previousMouseDown.current.coordinates ) ) );
            dispatch( addPoint( scaleAndOffset( previousMouse.current ) ) );
        }
        return () => {
            previousMouse.current = mouse;
            previousMouseDown.current = mouseDown;
        };
    }, [ dispatch, appMode, mouse, mouseDown, zoom, offset, points, scaleAndOffset ] );

    const unscaledPoints = points.map( unscaleAndUnoffset );

    const snappedMouse = mouse && snapCoordinates( mouse );
    const snappedMouseDown = mouseDown && snapCoordinates( mouseDown.coordinates );

    return (
        <g>

            { snappedMouse && <circle cx={ snappedMouse.x } cy={ snappedMouse.y } r="5" /> }
            { snappedMouseDown && <circle cx={ snappedMouseDown.x } cy={ snappedMouseDown.y } r="5" /> }

            { mouseDown && !mouseDown.dataset.pointIndex && appMode === "pen" && <g>
                { points?.length && <circle cx={ reflect( mouse.x, mouseDown.coordinates.x ) } cy={ reflect( mouse.y, mouseDown.coordinates.y ) } r="5" fill="#f00" /> }
                <circle cx={ mouse.x } cy={ mouse.y } r="5" fill="#f00" />
                <line
                    x1={ mouse.x }
                    y1={ mouse.y }
                    x2={ points?.length ? reflect( mouse.x, mouseDown.coordinates.x ) : mouseDown.coordinates.x }
                    y2={ points?.length ? reflect( mouse.y, mouseDown.coordinates.y ) : mouseDown.coordinates.y }
                    stroke="#f00"
                />
                <circle
                    cx={ mouseDown.coordinates.x }
                    cy={ mouseDown.coordinates.y }
                    r={ points?.length ? "5" : "7" }
                    fill={ points?.length ? "#f00" : "white" }
                    stroke={ points?.length ? "none" : "#f00" }
                />
            </g> }

            { points?.length && <g>
                <path d={ toPath( unscaledPoints.map( point => mouseDistance && appMode === "pan" ? vectorAddition( point, mouseDistance ) : point ) ) } stroke="black" fill="none" />
                <g>
                    <circle cx={ unscaledPoints[ 1 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) } cy={ unscaledPoints[ 1 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) } r="5" fill="#f00" />
                    <line
                        x1={ unscaledPoints[ 0 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                        y1={ unscaledPoints[ 0 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                        x2={ unscaledPoints[ 1 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                        y2={ unscaledPoints[ 1 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                        stroke="#f00"
                    />
                    <ClosePathButton
                        cx={ unscaledPoints[ 0 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                        cy={ unscaledPoints[ 0 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                        closePath={ () => dispatch( closePath() ) }
                    />
                    { [ ...Array( points.length ) ].reduce( ( result, _, index ) => !( ( index - 2 ) % 3 ) ? [ ...result, index ] : result, [] ).map( ( pointIndex: number ): JSX.Element => <g key={ pointIndex }>
                        <circle cx={ unscaledPoints[ pointIndex ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) } cy={ unscaledPoints[ pointIndex ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) } r="5" fill="#f00" />
                        <circle cx={ unscaledPoints[ pointIndex + 1 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) } cy={ unscaledPoints[ pointIndex + 1 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) } r="5" fill="#f00" />
                        <circle cx={ unscaledPoints[ pointIndex + 2 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) } cy={ unscaledPoints[ pointIndex + 2 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) } r="5" fill="#f00" />
                        <line
                            x1={ unscaledPoints[ pointIndex ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                            y1={ unscaledPoints[ pointIndex ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                            x2={ unscaledPoints[ pointIndex + 2 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                            y2={ unscaledPoints[ pointIndex + 2 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                            stroke="#f00"
                        />
                    </g> ) }
                </g>
            </g> }

        </g>
    );
    
};

export default Pen;

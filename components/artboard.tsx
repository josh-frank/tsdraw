import { EffectCallback, FunctionComponent, MutableRefObject, useEffect, useRef } from "react";

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../hooks";

import { selectArtboardDimensions, selectDisplayGrid, selectGridInterval, selectOffset, selectZoom, setOffset } from "../redux/artboardSlice";
import { selectDragDistance } from "../redux/clientSlice";
import { selectAppMode } from "../redux/modeSlice";

import styles from "../styles/Home.module.css"
import { Coordinates } from "../types";

const Artboard: FunctionComponent = () => {

    const dispatch = useDispatch();

    const mouseDistance = useSelector( selectDragDistance );
    const { width, height } = useSelector( selectArtboardDimensions );
    const zoom = useSelector( selectZoom );
    const offset = useSelector( selectOffset );
    const displayGrid = useSelector( selectDisplayGrid );
    const gridInterval = useSelector( selectGridInterval );
    const artboardOffset = useSelector( selectOffset );
    const appMode = useSelector( selectAppMode );
    
    const previousMouseDistance: MutableRefObject<Coordinates | null> = useRef( null );

    useEffect( (): ReturnType<EffectCallback> => {
        if ( appMode === "pan" && !mouseDistance && previousMouseDistance.current ) {
            dispatch( setOffset( { x: artboardOffset.x + previousMouseDistance.current.x, y: artboardOffset.y + previousMouseDistance.current.y } ) );
        }
        return () => { previousMouseDistance.current = mouseDistance };
    }, [ dispatch, appMode, artboardOffset, mouseDistance ] );

    const horizontalLines = gridLineSpacing( height, gridInterval ).map( line => {
        return <g key={ line }>
            { !!line && <text
                x={ ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                y={ ( line * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                fill="lightgray"
                fontFamily="Arial Narrow"
                fontSize={ `${ zoom / 33.3 }px`}
                letterSpacing="-0.2px"
                transform="translate( 0, -0.5 )"
            >
                { line }
            </text> }
            <line
                x1={ ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                y1={ ( line * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                x2={ ( width * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                y2={ ( line * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                stroke="lightgray"
                strokeWidth="0.5"
            />
        </g>;
    } );

    const verticalLines = gridLineSpacing( width, gridInterval ).map( line => {
        return <g key={ line }>
            { !!line && line < width && <text
                x={ ( ( zoom / 75 ) + line * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                y={ ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                fill="lightgray"
                writingMode="vertical-rl"
                fontFamily="Arial Narrow"
                fontSize={ `${ zoom / 33.3 }px`}
                letterSpacing="-0.2px"
                transform="translate( 2 )"
            >
                { line }
            </text> }
            <line
                x1={ ( line * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                y1={ ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                x2={ ( line * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                y2={ ( height * zoom / 100 ) + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                stroke="lightgray"
                strokeWidth="0.5"
            />
        </g>;
    } );

    return (
        <g>
            { displayGrid && horizontalLines }
            { displayGrid && verticalLines }
            <rect
                className={ styles.artboard }
                x={ mouseDistance && appMode === "pan" ? mouseDistance.x : 0 }
                y={ mouseDistance && appMode === "pan" ? mouseDistance.y : 0 }
                width={ width * zoom / 100 }
                height={ height * zoom / 100 }
                stroke={ displayGrid ? "none" : "lightgray" }
                fill="none"
            />
        </g>
    );

};

export default Artboard;

const gridLineSpacing = ( range: number, interval: number ): number[] => [ ...Array( Math.floor( range / interval ) + 1 ).keys() ].map( i => i * interval );

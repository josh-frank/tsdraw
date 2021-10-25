import { EffectCallback, FunctionComponent, MutableRefObject, useEffect, useRef } from "react";

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";

import { selectArtboardDimensions, selectOffset, setOffset } from "../../redux/artboardSlice";
import { selectDragDistance } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";

import styles from "../../styles/Home.module.css"
import { Coordinates } from "../../types";

const Artboard: FunctionComponent = () => {

    const dispatch = useDispatch();

    const mouseDistance = useSelector( selectDragDistance );
    const { width, height } = useSelector( selectArtboardDimensions );
    const artboardOffset = useSelector( selectOffset );
    const appMode = useSelector( selectAppMode );
    
    const previousMouseDistance: MutableRefObject<Coordinates | null> = useRef( null );

    useEffect( (): ReturnType<EffectCallback> => {
        if ( appMode === "pan" && !mouseDistance && previousMouseDistance.current ) {
            dispatch( setOffset( { x: artboardOffset.x + previousMouseDistance.current.x, y: artboardOffset.y + previousMouseDistance.current.y } ) );
        }
        return () => { previousMouseDistance.current = mouseDistance };
    }, [ dispatch, appMode, artboardOffset, mouseDistance ] );

    return (
        <rect
            className={ styles.artboard }
            x={ mouseDistance && appMode === "pan" ? artboardOffset.x + mouseDistance.x : artboardOffset.x }
            y={ mouseDistance && appMode === "pan" ? artboardOffset.y + mouseDistance.y : artboardOffset.y }
            width={ width }
            height={ height }
            fill="none"
        />
    );

};

export default Artboard;

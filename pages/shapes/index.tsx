import { FunctionComponent, useEffect, useRef } from "react";

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { applyScaleAndOffset } from "../../redux/artboardSlice";
import { selectMouse, selectMouseDown } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";
import { selectActiveShape, selectShapes, updateActiveShape } from "../../redux/penSlice";
import { Coordinates, MouseDown } from "../../types";

import Shape from "./shape";

const Shapes: FunctionComponent = () => {

    const dispatch = useDispatch();

    const mouse = useSelector( selectMouse );
    const mouseDown = useSelector( selectMouseDown );

    const scaleAndOffset = useSelector( applyScaleAndOffset );

    const shapes = useSelector( selectShapes );
    const activeShape = useSelector( selectActiveShape );

    const appMode = useSelector( selectAppMode );

    const previousMouse = useRef<Coordinates>();
    const previousMouseDown = useRef<MouseDown | null>();

    useEffect( () => { 
        return () => {
            previousMouse.current = mouse;
            previousMouseDown.current = mouseDown;
        }
    }, [ mouse, mouseDown ] );

    useEffect( () => {
        if ( appMode === "pen" && mouseDown && previousMouse.current && previousMouseDown.current && previousMouseDown.current.dataset ) {
            let updatedActiveShapePoints = [ ...( activeShape?.points || [] ) ];
            if ( mouseDown && previousMouseDown.current.dataset.pointIndex ) {
                updatedActiveShapePoints[ previousMouseDown.current.dataset.pointIndex ] = scaleAndOffset( previousMouse.current );
                dispatch( updateActiveShape( updatedActiveShapePoints ) );
            }
        }
    }, [ dispatch, appMode, mouse, mouseDown, activeShape, scaleAndOffset ] );

    return (
        <g>
            { activeShape && <Shape shape={ activeShape } /> }
            { shapes?.length && shapes?.map( shape =>
                <Shape
                    key={ shape.id }
                    shape={ shape }
                />
            ) }
        </g>
    );

};

export default Shapes;

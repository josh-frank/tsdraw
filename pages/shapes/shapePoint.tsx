import { useCallback } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { selectOffset, selectZoom } from "../../redux/artboardSlice";

import { selectDragDistance, selectMouseDown } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";
import { selectActiveShape, updateActiveShape } from "../../redux/penSlice";

import { Coordinates } from "../../types";

interface ShapePointProps {
    pointCoordinates: Coordinates;
    pointIndex: number;
}

const ShapePoint = ( { pointCoordinates, pointIndex }: ShapePointProps ): JSX.Element => {

    const dispatch = useDispatch();
    
    const mouseDown = useSelector( selectMouseDown );
    const mouseDistance = useSelector( selectDragDistance );

    const offset = useSelector( selectOffset );
    const zoom = useSelector( selectZoom );

    const appMode = useSelector( selectAppMode );

    const activeShape = useSelector( selectActiveShape );

    const adjustPoint = ( { clientX, clientY }: React.MouseEvent<SVGCircleElement> ) => {
        if ( mouseDown ) {
            const updatedActiveShapePoints = [ ...( activeShape?.points || [] ) ];
            if ( updatedActiveShapePoints ) {
                updatedActiveShapePoints[ pointIndex ] = scaleAndOffset( { x: clientX, y: clientY } );
                dispatch( updateActiveShape( updatedActiveShapePoints ) );
            }
        }
    };

    const scaleAndOffset = useCallback( ( coordinates: Coordinates ): Coordinates => ( { x: ( coordinates.x - offset.x ) / zoom * 100, y: ( coordinates.y - offset.y ) / zoom * 100 } ), [ offset, zoom ] );
    const unscaleAndUnoffset = useCallback( ( coordinates: Coordinates ): Coordinates => ( { x: offset.x + coordinates.x * zoom / 100, y: offset.y + coordinates.y * zoom / 100 } ), [ offset, zoom ] );

    return <circle
        data-point-index={ pointIndex }
        cx={ pointCoordinates.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
        cy={ pointCoordinates.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
        r="5"
        fill="#f00"
        onMouseMove={ adjustPoint }
    />;

};

export default ShapePoint;

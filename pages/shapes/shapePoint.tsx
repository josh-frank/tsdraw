import { useCallback } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { applyScaleAndOffset, selectOffset, selectZoom } from "../../redux/artboardSlice";

import { selectDragDistance, selectMouseDown } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";
import { selectActiveShape, updateActiveShape } from "../../redux/penSlice";

import { Coordinates } from "../../types";

interface ShapePointProps {
    shapeId: string;
    pointCoordinates: Coordinates;
    pointIndex: number;
}

const ShapePoint = ( { shapeId, pointCoordinates, pointIndex }: ShapePointProps ): JSX.Element => {

    const dispatch = useDispatch();
    
    const mouseDown = useSelector( selectMouseDown );
    const mouseDistance = useSelector( selectDragDistance );

    const appMode = useSelector( selectAppMode );

    const activeShape = useSelector( selectActiveShape );

    const scaleAndOffset = useSelector( applyScaleAndOffset );

    const adjustPoint = ( { clientX, clientY }: React.MouseEvent<SVGCircleElement> ) => {
        if ( mouseDown ) {
            const updatedActiveShapePoints = [ ...( activeShape?.points || [] ) ];
            if ( updatedActiveShapePoints ) {
                updatedActiveShapePoints[ pointIndex ] = scaleAndOffset( { x: clientX, y: clientY } );
                dispatch( updateActiveShape( updatedActiveShapePoints ) );
            }
        }
    };

    return <circle
        data-name="shape-point"
        data-shape-id={ shapeId }
        data-point-index={ pointIndex }
        cx={ pointCoordinates.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
        cy={ pointCoordinates.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
        r="5"
        fill="#f00"
        onMouseMove={ adjustPoint }
    />;

};

export default ShapePoint;

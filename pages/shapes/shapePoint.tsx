// import { useState } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { selectMouseDown } from "../../redux/clientSlice";
import { selectActiveShape, updateActiveShape } from "../../redux/penSlice";
import { Coordinates } from "../../types";

interface ShapePointProps {
    pointCoordinates: Coordinates;
    pointIndex: number;
}

const ShapePoint = ( { pointCoordinates, pointIndex }: ShapePointProps ): JSX.Element => {

    const dispatch = useDispatch();
    const activeShape = useSelector( selectActiveShape );
    const mouseDown = useSelector( selectMouseDown );

    const adjustPoint = ( { clientX, clientY }: React.MouseEvent<SVGCircleElement> ) => {
        if ( mouseDown && mouseDown.dataset ) {
            const updatedActiveShapePoints = [ ...( activeShape?.points || [] ) ];
            if ( updatedActiveShapePoints ) {
                updatedActiveShapePoints[ pointIndex ] = { x: clientX, y: clientY };
                dispatch( updateActiveShape( updatedActiveShapePoints ) );
            }
        }
    };

    return <circle
        data-point-index={ pointIndex }
        cx={ pointCoordinates.x }
        cy={ pointCoordinates.y }
        r="5"
        fill="#f00"
        onMouseMove={ adjustPoint }
    />;

};

export default ShapePoint;
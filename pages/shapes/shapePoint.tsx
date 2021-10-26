import { useAppSelector as useSelector } from "../../hooks";

import { selectDragDistance } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";

import { Coordinates } from "../../types";

interface ShapePointProps {
    shapeId: string;
    pointCoordinates: Coordinates;
    pointIndex: number;
}

const ShapePoint = ( { shapeId, pointCoordinates, pointIndex }: ShapePointProps ): JSX.Element => {

    const mouseDistance = useSelector( selectDragDistance );

    const appMode = useSelector( selectAppMode );

    return <circle
        data-name="shape-point"
        data-shape-id={ shapeId }
        data-point-index={ pointIndex }
        cx={ pointCoordinates.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
        cy={ pointCoordinates.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
        r="5"
        fill="#f00"
    />;

};

export default ShapePoint;

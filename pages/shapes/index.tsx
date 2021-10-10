import { FunctionComponent } from "react";

import { useAppSelector as useSelector } from "../../hooks";
import { selectShapes } from "../../redux/penSlice";

import Shape from "./shape";

const Shapes: FunctionComponent = () => {

    const shapes = useSelector( selectShapes );

    return (
        <g>
            { shapes?.length && shapes?.map( ( path, shapeIndex ) =>
                <Shape
                    key={ shapeIndex }
                    path={ path }
                    shapeIndex={ shapeIndex }
                />
            ) }
        </g>
    );

};

export default Shapes;
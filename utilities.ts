import { Coordinates } from "./types";

export const reflect = ( mouseDown: number, mouseCurrent: number ): number => mouseCurrent + ( mouseCurrent - mouseDown );

export const toPath = ( points: Coordinates[] ): string => `M ${ points[ 0 ]?.x } ${ points[ 0 ]?.y }` + points?.slice( 1, points.length - 1 ).reduce( ( path, point, index ) => `${ path } ${ index % 3 ? "" : "C " }${ point.x } ${ point.y }`, "" );

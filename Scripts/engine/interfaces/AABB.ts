import { Point2D } from "./Point2D.js";

export interface AABB {
	position: Point2D;
	offset: Point2D;
	width: number;
	height: number;
}
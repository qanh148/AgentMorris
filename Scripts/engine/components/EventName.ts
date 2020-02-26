export enum EventName {
	// GameObject
	GameObject_Init,
	GameObject_Update,

	// Transform
	Transform_PositionChange,

	// PlayerController
	PlayerController_MoveStart,
	PlayerController_MoveStop,

	// Collider
	Collider_CollisionEnter,
	Collider_CollisionExit,

	// Mover
	Mover_Moved,
}

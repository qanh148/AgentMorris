export enum EventName {
	/* eslint-disable @typescript-eslint/camelcase */

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
	Mover_Turned,
	Mover_StartWalk,
	Mover_StopWalk,

	/* eslint-enable @typescript-eslint/camelcase */
}

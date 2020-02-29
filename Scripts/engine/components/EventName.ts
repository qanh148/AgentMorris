export enum EventName {
	/* eslint-disable @typescript-eslint/camelcase */

	// GameObject
	GameObject_Init,
	GameObject_Update,
	GameObject_Destroy,

	// Transform
	Transform_PositionChange,

	// PlayerController
	PlayerController_MoveStart,
	PlayerController_MoveStop,

	// Collider
	Collider_CollisionEnter,
	Collider_CollisionExit,
	Collider_MoveRequestAccepted,
	Collider_MoveRequestDenied,

	// Mover
	Mover_RequestMove,
	Mover_Turned,
	Mover_StartWalk,
	Mover_StopWalk,

	/* eslint-enable @typescript-eslint/camelcase */
}

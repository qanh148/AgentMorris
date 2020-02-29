export var EventName;
(function (EventName) {
    /* eslint-disable @typescript-eslint/camelcase */
    // GameObject
    EventName[EventName["GameObject_Init"] = 0] = "GameObject_Init";
    EventName[EventName["GameObject_Update"] = 1] = "GameObject_Update";
    EventName[EventName["GameObject_Destroy"] = 2] = "GameObject_Destroy";
    // Transform
    EventName[EventName["Transform_PositionChange"] = 3] = "Transform_PositionChange";
    // PlayerController
    EventName[EventName["PlayerController_MoveStart"] = 4] = "PlayerController_MoveStart";
    EventName[EventName["PlayerController_MoveStop"] = 5] = "PlayerController_MoveStop";
    // Collider
    EventName[EventName["Collider_CollisionEnter"] = 6] = "Collider_CollisionEnter";
    EventName[EventName["Collider_CollisionExit"] = 7] = "Collider_CollisionExit";
    EventName[EventName["Collider_MoveRequestAccepted"] = 8] = "Collider_MoveRequestAccepted";
    EventName[EventName["Collider_MoveRequestDenied"] = 9] = "Collider_MoveRequestDenied";
    // Mover
    EventName[EventName["Mover_RequestMove"] = 10] = "Mover_RequestMove";
    EventName[EventName["Mover_Turned"] = 11] = "Mover_Turned";
    EventName[EventName["Mover_StartWalk"] = 12] = "Mover_StartWalk";
    EventName[EventName["Mover_StopWalk"] = 13] = "Mover_StopWalk";
    /* eslint-enable @typescript-eslint/camelcase */
})(EventName || (EventName = {}));
//# sourceMappingURL=EventName.js.map
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
    EventName[EventName["Collider_Collided"] = 6] = "Collider_Collided";
    EventName[EventName["Collider_MoveRequestAccepted"] = 7] = "Collider_MoveRequestAccepted";
    EventName[EventName["Collider_MoveRequestDenied"] = 8] = "Collider_MoveRequestDenied";
    EventName[EventName["Collider_TriggerEnter"] = 9] = "Collider_TriggerEnter";
    EventName[EventName["Collider_TriggerExit"] = 10] = "Collider_TriggerExit";
    // Mover
    EventName[EventName["Mover_RequestMove"] = 11] = "Mover_RequestMove";
    EventName[EventName["Mover_Turned"] = 12] = "Mover_Turned";
    EventName[EventName["Mover_StartWalk"] = 13] = "Mover_StartWalk";
    EventName[EventName["Mover_StopWalk"] = 14] = "Mover_StopWalk";
    /* eslint-enable @typescript-eslint/camelcase */
})(EventName || (EventName = {}));
//# sourceMappingURL=EventName.js.map
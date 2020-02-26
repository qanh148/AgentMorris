export var EventName;
(function (EventName) {
    /* eslint-disable @typescript-eslint/camelcase */
    // GameObject
    EventName[EventName["GameObject_Init"] = 0] = "GameObject_Init";
    EventName[EventName["GameObject_Update"] = 1] = "GameObject_Update";
    // Transform
    EventName[EventName["Transform_PositionChange"] = 2] = "Transform_PositionChange";
    // PlayerController
    EventName[EventName["PlayerController_MoveStart"] = 3] = "PlayerController_MoveStart";
    EventName[EventName["PlayerController_MoveStop"] = 4] = "PlayerController_MoveStop";
    // Collider
    EventName[EventName["Collider_CollisionEnter"] = 5] = "Collider_CollisionEnter";
    EventName[EventName["Collider_CollisionExit"] = 6] = "Collider_CollisionExit";
    // Mover
    EventName[EventName["Mover_Moved"] = 7] = "Mover_Moved";
    /* eslint-enable @typescript-eslint/camelcase */
})(EventName || (EventName = {}));
//# sourceMappingURL=EventName.js.map
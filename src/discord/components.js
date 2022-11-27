import { MessageComponentTypes, ButtonStyleTypes } from 'discord-interactions';

export class Button {
    constructor(id, label, style){
        this.type = MessageComponentTypes.BUTTON,
        this.label = label,
        this.style = style || ButtonStyleTypes.PRIMARY,
        this.custom_id = id
    }
}

export class ButtonComponent {
    constructor(id, label, style) {
        this.type = MessageComponentTypes.ACTION_ROW;
        this.components = [
            new Button(id, label, style)
        ]
    }
}
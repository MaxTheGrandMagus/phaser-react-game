import Phaser from 'phaser'

import { Subject } from 'rxjs'
const WHITE = 0xffffff;

export default class Button extends Phaser.GameObjects.Image
{
	clickSubject = new Subject();

	constructor(scene, x, y, texture, tint = WHITE) {
		super(scene, x, y, texture)

		this.setTint(tint)

		this.upTexture = texture
		this.upTint = tint
		this.downTexture = texture
		this.downTint = tint
		this.overTexture = texture
		this.overTint = tint
		this.disabledTexture = texture
		this.disabledTint = tint

		this.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleUp, this)
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handleOut, this)
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handleDown, this)
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.handleOver, this)
	}

	destroy(fromScene) {
		this.clickSubject.complete()

		super.destroy(fromScene)
	}

	onClick() {
		return this.clickSubject.asObservable()
	}

	setUpTexture(texture) {
		this.upTexture = texture
		return this
	}

	setUpTint(tint) {
		this.upTint = tint
		return this
	}

	setDownTexture(texture) {
		this.downTexture = texture
		return this
	}

	setDownTint(tint) {
		this.downTint = tint
		return this
	}

	setOverTexture(texture) {
		this.overTexture = texture
		return this
	}

	setOverTint(tint) {
		this.overTint = tint
		return this
	}

	setDisabledTexture(texture) {
		this.disabledTexture = texture
		return this
	}

	setDisabledTint(tint) {
		this.disabledTint = tint
		return this
	}

	setDisabled(disabled) {
		if (disabled)
		{
			this.setTexture(this.disabledTexture)
			this.setTint(this.disabledTint)
			this.disableInteractive()
			return this
		}

		this.setTexture(this.upTexture)
		this.setTint(this.disabledTint)
		this.setInteractive()

		return this
	}

	handleUp(pointer) {
		this.handleOver(pointer);
		this.clickSubject.next(pointer);
	}

	handleOut(pointer) {
		this.setTexture(this.upTexture)
		this.setTint(this.upTint)
	}

	handleDown(pointer) {
		this.setTexture(this.downTexture)
		this.setTint(this.downTint)
	}

	handleOver(pointer) {
		this.setTexture(this.overTexture)
		this.setTint(this.overTint)
	}
}
/**
 * (To be filled)
 */
export class DrawerBuilder {
  /**
   * Any element which has draw() method.
   */
  element: Drawable;

  /**
   * Parameter for drawing.
   */
  readonly drawParam: DrawParameter = {};

  protected readonly p: p5ex;

  constructor(p: p5ex) {
    this.p = p;
  }

  /**
   * @param element
   * @chainable
   */
  setElement(element: Drawable): DrawerBuilder {
    this.element = element;
    return this;
  }

  /**
   * @param positionRef
   * @chainable
   */
  setPositionRef(positionRef: p5.Vector): DrawerBuilder {
    this.drawParam.positionRef = positionRef;
    return this;
  }
  /**
   * @param rotationAngleRef
   * @chainable
   */
  setRotationAngleRef(rotationAngleRef: NumberContainer): DrawerBuilder {
    this.drawParam.rotationAngleRef = rotationAngleRef;
    return this;
  }
  /**
   * @param scaleFactorRef
   * @chainable
   */
  setScaleFactorRef(scaleFactorRef: ScaleFactor): DrawerBuilder {
    this.drawParam.scaleFactorRef = scaleFactorRef;
    return this;
  }
  /**
   * @param shapeColorRef
   * @chainable
   */
  setShapeColorRef(shapeColorRef: ShapeColor): DrawerBuilder {
    this.drawParam.shapeColorRef = shapeColorRef;
    return this;
  }
  /**
   * @param alphaChannelRef
   * @chainable
   */
  setAlphaChannelRef(alphaChannelRef: NumberContainer): DrawerBuilder {
    this.drawParam.alphaChannelRef = alphaChannelRef;
    return this;
  }
  /**
   * @param strokeWeightRef
   * @chainable
   */
  setStrokeWeightRef(strokeWeightRef: NumberContainer): DrawerBuilder {
    this.drawParam.strokeWeightRef = strokeWeightRef;
    return this;
  }

  /**
   * Builds a p5ex.Drawer instance.
   */
  build(): Drawer {
    return new Drawer(this.p, this.element, this.drawParam);
  }
}

export interface DrawParameter {
  positionRef?: p5.Vector;
  rotationAngleRef?: NumberContainer;
  scaleFactorRef?: ScaleFactor;
  shapeColorRef?: ShapeColor;
  alphaChannelRef?: NumberContainer;
  strokeWeightRef?: NumberContainer;
}

/**
 * (To be filled)
 */
export class Drawer implements Drawable {
  /**
   * (To be filled)
   */
  element: Drawable;
  /**
   * (To be filled)
   */
  position: p5.Vector;
  /**
   * (To be filled)
   */
  rotation: NumberContainer;
  /**
   * (To be filled)
   */
  scaleFactor: ScaleFactor;
  /**
   * (To be filled)
   */
  shapeColor: ShapeColor;
  /**
   * (To be filled)
   */
  alphaChannel: NumberContainer;
  /**
   * (To be filled)
   */
  strokeWeight: NumberContainer;

  protected readonly p: p5ex;
  private procedureList: ((drawer: Drawer) => void)[];
  private procedureListLength: number;

  constructor(p: p5ex, element: Drawable, drawParam: DrawParameter) {
    this.p = p;
    this.set(element, drawParam);
  }

  /**
   * (To be filled)
   * @param element
   * @param drawParam
   */
  set(element: Drawable, drawParam: DrawParameter): void {
    this.element = element;
    this.position = drawParam.positionRef || this.p.createVector();
    this.rotation = drawParam.rotationAngleRef || NumberContainer.NULL;
    this.scaleFactor = drawParam.scaleFactorRef || new ScaleFactor(this.p);
    this.shapeColor = drawParam.shapeColorRef || ShapeColor.UNDEFINED;
    this.alphaChannel = drawParam.alphaChannelRef || NumberContainer.NULL;
    this.strokeWeight = drawParam.strokeWeightRef || NumberContainer.NULL;
    this.procedureList = this.createProcedureList(drawParam);
    this.procedureListLength = this.procedureList.length;
  }

  /**
   * Draws the content.
   */
  draw(): void {
    for (let i = 0, len = this.procedureListLength; i < len; i += 1) {
      this.procedureList[i](this);
    }
  }

  protected drawElement(drawer: Drawer): void {
    drawer.element.draw();
  }

  protected createProcedureList(drawParam: DrawParameter): ((drawer: Drawer) => void)[] {
    const procedureList: ((drawer: Drawer) => void)[] = [];

    if (drawParam.shapeColorRef) {
      if (drawParam.alphaChannelRef) procedureList.push(this.alphaColor);
      else procedureList.push(this.color);
    }

    if (drawParam.strokeWeightRef) procedureList.push(this.applyStrokeWeight);

    if (drawParam.positionRef) procedureList.push(this.translate);

    if (drawParam.scaleFactorRef) procedureList.push(this.scale);

    if (drawParam.rotationAngleRef) procedureList.push(this.rotate);

    procedureList.push(this.drawElement);

    if (drawParam.rotationAngleRef) procedureList.push(this.cancelRotate);

    if (drawParam.scaleFactorRef) procedureList.push(this.cancelScale);

    if (drawParam.positionRef) procedureList.push(this.cancelTranslate);

    return procedureList;
  }

  private translate(drawer: Drawer): void {
    drawer.p.currentRenderer.translate(drawer.position.x, drawer.position.y);
  }

  private cancelTranslate(drawer: Drawer): void {
    drawer.p.currentRenderer.translate(-drawer.position.x, -drawer.position.y);
  }

  private rotate(drawer: Drawer): void {
    drawer.p.currentRenderer.rotate(drawer.rotation.value);
  }

  private cancelRotate(drawer: Drawer): void {
    drawer.p.currentRenderer.rotate(-drawer.rotation.value);
  }

  private scale(drawer: Drawer): void {
    if (drawer.scaleFactor.value === 1) return;
    drawer.scaleFactor.applyScale();
  }

  private cancelScale(drawer: Drawer): void {
    if (drawer.scaleFactor.value === 1) return;
    drawer.scaleFactor.cancel();
  }

  private color(drawer: Drawer): void {
    drawer.shapeColor.applyColor();
  }

  private alphaColor(drawer: Drawer): void {
    drawer.shapeColor.applyColor(drawer.alphaChannel.value);
  }

  private applyStrokeWeight(drawer: Drawer): void {
    drawer.p.currentRenderer.strokeWeight(drawer.strokeWeight.value);
  }
}

import { default as p5ex } from '../p5exInterface';
import { NumberContainer } from '../basic/NumberContainer';
import { Drawable } from '../loopables/Drawable';
import { ShapeColor } from '../color/ShapeColor';
import { ScaleFactor } from './ScaleFactor';

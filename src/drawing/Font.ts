import { default as p5ex } from '../p5exInterface';

/**
 * Font class.
 */
export class FontUnit {
  protected readonly p: p5ex;
  private readonly filePath: string | null;
  private textFontArgument: p5.Font | string;

  /**
   *
   * @param p - p5ex instance.
   * @param {string} name - The font name.
   * @param {string} [filePath] - The file path of the font.
   *     Not required if the font is already loaded (e.g. as a web font).
   */
  constructor(p: p5ex, name: string, filePath?: string) {
    this.p = p;
    this.filePath = filePath || null;
    this.textFontArgument = name;
  }

  /**
   * Loads the font file if the file path has been specified.
   */
  loadFile(): void {
    if (this.filePath) this.textFontArgument = this.p.loadFont(this.filePath);
  }

  /**
   * Applies the font to the current renderer.
   */
  applyFont(): void {
    this.p.currentRenderer.textFont(this.textFontArgument);
  }
}

/**
 * Manager class of FontUnit.
 */
export class FontManager {
  protected readonly p: p5ex;
  protected readonly fontMap: Map<string, FontUnit>;

  /**
   *
   * @param p - p5ex instance.
   */
  constructor(p: p5ex) {
    this.p = p;
    this.fontMap = new Map<string, FontUnit>();
  }

  /**
   * Registers a new font.
   * @param p
   * @param name
   * @param filePath
   * @chainable
   */
  register(name: string, filePath?: string): FontManager {
    this.fontMap.set(name, new FontUnit(this.p, name, filePath));
    return this;
  }

  /**
   * Calls loadFile() for each registered font. Should be called in preload().
   */
  loadAll(): void {
    for (const font of this.fontMap.values()) {
      font.loadFile();
    }
  }

  /**
   * Applies the specified font to the current renderer.
   * @param {string} name - The font name.
   */
  applyFont(name: string): void {
    const font = this.fontMap.get(name);
    if (font) font.applyFont();
  }
}

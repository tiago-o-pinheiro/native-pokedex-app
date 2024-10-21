export class Formatter {
  static capitalize(str: string, allWords: boolean = false) {
    if (allWords) {
      return str.replace(/\b\w/g, l => l.toUpperCase());
    } else {
      return str.replace(/\b\w/, l => l.toUpperCase());
    }
  }
  public static date(value?: Date): string {
    if (!value) {
      return '';
    }
    return new Intl.DateTimeFormat('en-US').format(value);
  }

  public static formatText(value: string): string {
    return value.replace(/[\n\f]/g, ' ');
  }
}

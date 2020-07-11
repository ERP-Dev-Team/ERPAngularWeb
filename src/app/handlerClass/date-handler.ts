export class DateHandler {
  constructor() {}

  convertTimeStampToDate(timeStamp: string): any {
    try {
      return new Date(Number.parseInt(timeStamp))
        .toISOString()
        .substring(0, 10);
    } catch (err) {
      console.log('TimeStamp Error ' + err);
    }
  }

  convertDatetoTimeStamp(date: any): string {
    return new Date(date).getTime() >= 0 ? '' + new Date(date).getTime() : null;
  }
}

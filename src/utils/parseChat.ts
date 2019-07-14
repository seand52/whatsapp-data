import moment from 'moment'

export interface IMessageData {
  date: string;
  name: string;
  message: string;
  announcement: boolean | null;
} 

export interface IPieChart {
  id: string
  label: string
  value: number
}

export interface IHeatMapChart {
  day: string
  value: number
}

export class Parser {
  private static messageData: IMessageData;

  public static formatLine(line: string) {
    if (!line || !line.length) {
      return;
    }

    let date = this.checkIfNull(line.match(/^\[(.*?)\]/), 1);
    if (date !== null) {
      date = date.split(",")[0];
    } else {
      date = this.checkIfNull(line.match(/^.\[(.*?)\]/), 1);
      if (date === null) {
        return;
      }
      date = date.split(",")[0];
    }
    const message = this.checkIfNull(line.match(/(?<=: ).*/), 0);
    const name = this.checkIfNull(line.match(/(?<=\] )(.*?)(?=\:)/), 0);

    this.messageData = { date: date.replace(new RegExp('/', 'g'), '-'), message, name, announcement: false };

    if (!message) {
      this.messageData.announcement = true;
    }

    return this.messageData;
  }

  private static checkIfNull(val: RegExpMatchArray, index: number) {
    if (val) {
      return val[index];
    }
    return null;
  }

  public static prepareChartData(messages: IMessageData[], property: 'name' | 'date' ) {
    const obj: {[key: string]: number} = {}
    messages.filter(item => item && !item.announcement).forEach(item => {
      if (item !== undefined && item[property]) {
        if (!obj.hasOwnProperty(item[property])) obj[item[property]] = 1;
        else if (obj.hasOwnProperty(item[property])) obj[item[property]]++;
      }
    });
    return obj    
  }

  public static getPieChartData(messages: IMessageData[]) {
    const data = this.prepareChartData(messages, 'name')
    const output: IPieChart[] = []
    for (let prop in data) output.push({
      id: prop,
      label: prop,
      value: data[prop]
    });
    return output
  }

  public static getHeapMapData(messages: IMessageData[]) {
    const data = this.prepareChartData(messages, 'date')
    const output: IHeatMapChart[] = []
    for (let prop in data) output.push({
      day: moment(prop, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      value: data[prop]
    });
    return output
  }
}

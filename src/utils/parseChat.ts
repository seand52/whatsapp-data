import moment from "moment";

export interface IMessageData {
  date: string;
  name: string;
  message: string;
  announcement: boolean | null;
  time: string;
}

export interface IPieChart {
  id: string;
  label: string;
  value: number;
}

export interface IHeatMapChart {
  day: string;
  value: number;
}

export interface IRadarChart {
  day: string;
  [key: string]: string;
}

export interface ILineGraphData {
  id: string;
  data: { x: string; y: number }[];
}
export class Parser {
  private static messageData: IMessageData;

  public static formatLine(line: string) {
    if (!line || !line.length) {
      return;
    }

    let fullDate = this.checkIfNull(line.match(/^\[(.*?)\]/), 1);
    let date;
    let time;
    if (fullDate !== null) {
      date = fullDate.split(",")[0];
      time = fullDate.split(",")[1].trim();
    } else {
      fullDate = this.checkIfNull(line.match(/^.\[(.*?)\]/), 1);
      if (fullDate === null) {
        return;
      }
      date = fullDate.split(",")[0];
      time = fullDate.split(",")[1].trim();
    }
    const message = this.checkIfNull(line.match(/(?<=: ).*/), 0);
    const name = this.checkIfNull(line.match(/(?<=\] )(.*?)(?=\:)/), 0);
    this.messageData = {
      date: date.replace(new RegExp("/", "g"), "-"),
      message,
      name,
      announcement: false,
      time
    };

    if (!message) {
      this.messageData.announcement = true;
    }
    return this.messageData;
  }

  private static getGroupParticpants(messages: IMessageData[]) {
    const people: string[] = [];
    messages.forEach(item => {
      if (item !== null && typeof item !== "undefined") {
        if (!people.includes(item.name)) {
          people.push(item.name);
        }
      }
    });
    return people.filter(item => item !== null);
  }

  private static checkIfNull(val: RegExpMatchArray, index: number) {
    if (val) {
      return val[index];
    }
    return null;
  }

  public static prepareChartData(
    messages: IMessageData[],
    property: "name" | "date"
  ) {
    const obj: { [key: string]: number } = {};
    messages
      .filter(item => item && !item.announcement)
      .forEach(item => {
        if (item !== undefined && item[property]) {
          if (!obj.hasOwnProperty(item[property])) obj[item[property]] = 1;
          else if (obj.hasOwnProperty(item[property])) obj[item[property]]++;
        }
      });
    return obj;
  }

  public static getPieChartData(messages: IMessageData[]) {
    const data = this.prepareChartData(messages, "name");
    const output: IPieChart[] = [];
    for (let prop in data)
      output.push({
        id: prop,
        label: prop,
        value: data[prop]
      });
    return output;
  }

  public static getHeapMapData(messages: IMessageData[]) {
    const data = this.prepareChartData(messages, "date");
    const output: IHeatMapChart[] = [];
    for (let prop in data)
      output.push({
        day: moment(prop, "DD-MM-YYYY").format("YYYY-MM-DD"),
        value: data[prop]
      });
    return output;
  }

  public static getRadarData(messages: IMessageData[]) {
    const people = this.getGroupParticpants(messages);
    const obj = {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    };
    for (let prop in obj) {
      const nestedObj = {};
      people.forEach(item => {
        nestedObj[item] = 0;
      });
      obj[prop] = nestedObj;
    }
    messages.forEach(item => {
      if (item) {
        const dayOfWeek = moment(item.date, "DD-MM-YYYY").format("dddd");
        for (let prop in obj[dayOfWeek]) {
          if (prop === item.name) {
            obj[dayOfWeek][prop] = obj[dayOfWeek][prop] + 1;
          }
        }
      }
    });
    const output: IRadarChart[] = [];
    for (let prop in obj) {
      output.push({
        ...obj[prop],
        day: prop
      });
    }
    return { radarData: output, people };
  }

  public static getLineGraphDataMonths(
    messages: IMessageData[],
    people: string[]
  ) {
    return people.map(person => {
      return {
        id: person,
        data: this.getCountByMonth(messages, person)
      };
    });
  }

  public static getLineGraphDataHour(
    messages: IMessageData[],
    people: string[]
  ) {
    return people.map(person => {
      return {
        id: person,
        data: this.getCountByHour(messages, person)
      };
    });
  }

  private static getCountByMonth(messages: IMessageData[], person: string) {
    const filteredMessages = messages.filter(item => {
      if (item) {
        return item && item.name === person;
      }
    });
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months.map(month => ({
      x: month,
      y: filteredMessages.filter(
        item => moment(item.date, "DD-MM-YYYY").format("MMMM") === month
      ).length
    }));
  }

  private static getCountByHour(messages: IMessageData[], person: string) {
    const filteredMessages = messages.filter(item => {
      if (item) {
        return item && item.name === person;
      }
    });
    const months = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ];
    return months.map(time => ({
      x: time,
      y: filteredMessages.filter(
        item => `${moment(item.time, "hh:mm:ss").format("HH")}:00` === time
      ).length
    }));
  }

  public static getTotals(messages: IMessageData[]): { [key: string]: number } {
    const totalDays = this.getTotalDays(messages);
    const totalMessages = messages.length;
    const { totalWords, totalCharacters } = this.getTotalWords(messages);
    return { totalDays, totalMessages, totalWords, totalCharacters };
  }

  public static getAverages(totals: {
    [key: string]: number;
  }): { [key: string]: string } {
    const { totalDays, totalMessages, totalWords, totalCharacters } = totals;
    const averageWordsPerMessage = (totalWords / totalMessages).toFixed(2);
    const averageLettersPerMessage = (totalCharacters / totalMessages).toFixed(2);
    const averageMessagesPerDay = (totalMessages / totalDays).toFixed(2);
    const averageLettersPerDay = (totalCharacters / totalDays).toFixed(2);
    return {
      averageWordsPerMessage,
      averageLettersPerMessage,
      averageMessagesPerDay,
      averageLettersPerDay
    };
  }

  private static getTotalDays(messages: IMessageData[]): number {
    const firstDay = moment(messages[0].date, "DD-MM-YYYY");
    const lastDay = moment(messages[messages.length - 2].date, "DD-MM-YYYY");
    const difference = lastDay.diff(firstDay, "days");
    return difference;
  }

  private static getTotalWords(
    messages: IMessageData[]
  ): { [key: string]: number } {
    let totalWords = 0;
    let totalCharacters = 0;
    messages.forEach(item => {
      if (item && item.message) {
        totalWords = totalWords + item.message.split(" ").length;
        totalCharacters = totalCharacters + item.message.length;
      }
    });
    return { totalWords, totalCharacters };
  }
}

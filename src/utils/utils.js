/* eslint-disable */

export default {
  isDateTimeString(str) {
    return /^\d{4}((\.|-|\/)(0[1-9]|1[0-2]))((\.|-|\/)(0[1-9]|[12][0-9]|3[0-1]))( ([01][0-9]|2[0-3]):([012345][0-9]))?$/.test(str);
  },
  isTimeString(str) {
    return /^([01][0-9]|2[0-3]):([012345][0-9])$/.test(str);
  },
  mentStr(str) {
    return (`${100 + ~~str}`).substr(1, 2);
  },
  getYearItems(config) {
    const years = [];
    const today = new Date();

    let start = today.getFullYear();
    let end = today.getFullYear() + 10;

    if (config.startYear !== 0) {
      start = ~~config.startYear;
    }

    if (config.endYear !== 0) {
      end = ~~config.endYear;
    }

    if (end < start) {
      end = start + 10;
    }

    if (config.startDate) {
      start = new Date(config.startDate.replace(/-/g, '/')).getFullYear();
    }

    if (config.endDate) {
      end = new Date(config.endDate.replace(/-/g, '/')).getFullYear();
    }

    while (start <= end) {
      years.push({ value: start, name: config.format.replace('{value}', start) });
      start++;
    }

    return years;
  },
  getMonthItems(config) {
    const months = [];
    let startMonth = 1;
    let endMonth = 12;

    if (config.startDate) {
      const startDate = new Date(config.startDate.replace(/-/g, '/'));
      if (startDate.getFullYear() === config.currentYear) {
        startMonth = startDate.getMonth() + 1;
        endMonth = 12;
      }
    }

    if (config.endDate) {
      const endDate = new Date(config.endDate.replace(/-/g, '/'));
      if (endDate.getFullYear() === config.currentYear) {
        startMonth = 1;
        endMonth = endDate.getMonth() + 1;
      }
    }

    while (startMonth <= endMonth) {
      const t = this.mentStr(startMonth);
      months.push({ value: t, name: config.format.replace('{value}', t) });
      startMonth++;
    }

    return months;
  },
  getDateItems(config) {
    const dates = [];
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    if (config.currentYear) year = ~~config.currentYear;

    if (config.currentMonth) month = ~~config.currentMonth - 1;

    let end = 30;

    if ([0, 2, 4, 6, 7, 9, 11].indexOf(month) > -1) {
      end = 31;
    } else if (month === 1) {
      end = year % 100 === 0 ? (year % 400 === 0 ? 29 : 28) : (year % 4 === 0 ? 29 : 28);
    }
    if (config.endDate) {
      const endDate = new Date(config.endDate.replace(/-/g, '/'));
      if (endDate.getMonth() + 1 === config.currentMonth && endDate.getFullYear() === config.currentYear && endDate.getDate() < end) {
        end = endDate.getDate();
      }
    }

    let d = 1;
    if (config.startDate) {
      const startDate = new Date(config.startDate.replace(/-/g, '/'));
      if (startDate.getMonth() + 1 === config.currentMonth && startDate.getFullYear() === config.currentYear) {
        d = startDate.getDate();
      }
    }

    while (d <= end) {
      const t = this.mentStr(d);
      dates.push({ value: t, name: config.format.replace('{value}', t) });
      d++;
    }

    return dates;
  },
  getHourItems(config) {
    const hours = [];
    let start = ~~config.startHour;
    let end = ~~config.endHour;

    if (end < start) {
      end = 23;
    }

    if (config.startDate) {
      const startDate = new Date(config.startDate.replace(/-/g, '/'));
      if (startDate.getFullYear() === config.currentYear && startDate.getMonth() + 1 === config.currentMonth && startDate.getDate() === config.currentDay) {
        start = startDate.getHours();
      }
    }

    if (config.endDate) {
      const endDate = new Date(config.endDate.replace(/-/g, '/'));
      if (endDate.getFullYear() === config.currentYear && endDate.getMonth() + 1 === config.currentMonth && endDate.getDate() === config.currentDay) {
        end = endDate.getHours();
      }
    }

    while (start <= end) {
      const t = this.mentStr(start);
      hours.push({ value: t, name: config.format.replace('{value}', t) });
      start++;
    }

    return hours;
  },
  getMinuteItems(config) {
    const minute = [];
    let start = ~~config.startMinute;
    let end = ~~config.endMinute;

    if (config.startDate) {
      const startDate = new Date(config.startDate.replace(/-/g, '/'));
      if (startDate.getFullYear() === config.currentYear && startDate.getMonth() + 1 === config.currentMonth && startDate.getDate() === config.currentDay && startDate.getHours() === config.currentHour) {
        start = startDate.getMinutes();
      }
    }

    if (config.endDate) {
      const endDate = new Date(config.endDate.replace(/-/g, '/'));
      if (endDate.getFullYear() === config.currentYear && endDate.getMonth() + 1 === config.currentMonth && endDate.getDate() === config.currentDay && endDate.getHours() === config.currentHour) {
        end = endDate.getMinutes();
      }
    }

    while (start <= end) {
      const t = this.mentStr(start);
      minute.push({ value: t, name: config.format.replace('{value}', t) });
      start += config.timeStep;
    }
    return minute;
  },
};

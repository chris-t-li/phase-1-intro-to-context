

// Your code here
function createEmployeeRecord(employeeArray) {
    const empObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return empObj;
};

function createEmployeeRecords(arrOfArrs) {
    const empArr = [];
    arrOfArrs.forEach(emp => empArr.push(createEmployeeRecord(emp)));
    return empArr
}

function createTimeInEvent(empObj, date) {
    const object = {
        type: "TimeIn",
        hour: parseInt(date.substring(11)),
        date: date.substring(0,10)
    };
    empObj.timeInEvents.push(object);
    return empObj;
}

function createTimeOutEvent(empObj, date) {
    const object = {
        type: "TimeOut",
        hour: parseInt(date.substring(11)),
        date: date.substring(0,10)
    };
    empObj.timeOutEvents.push(object);
    return empObj;
}

function hoursWorkedOnDate (empObj, dateRec) {
    const empTimeInRecord = empObj.timeInEvents.find(({date}) => date === dateRec.substring(0,10));
    const empTimeOutRecord = empObj.timeOutEvents.find(({date})=> date === dateRec.substring(0,10));
    if(!empTimeInRecord || !empTimeOutRecord) {
        return console.error("Error: Time In / Time out record does not exist");
    } else {
        return (empTimeOutRecord.hour - empTimeInRecord.hour)/100;
    }
}

function wagesEarnedOnDate(empObj, dateInput) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj, dateInput);
}

function allWagesFor(empObj) {
    return empObj.timeInEvents.map(timeEntry => wagesEarnedOnDate(empObj,timeEntry.date)).reduce((a,b)=> a+b)
}

function calculatePayroll(arrayOfEmp) {
    return arrayOfEmp.map(empObj => allWagesFor(empObj)).reduce((a,b)=>a+b)
}
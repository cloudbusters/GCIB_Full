startTime = "10:00";
prevStartTime = "10:00";
numberOfTees = 1;
prevNumberOfTees = 1;
timePerTee = 30;
endTime = "10:30";
totalDuration = "00:30"
TotalChangeInMinutes = 0;

function startTimeChange() {
    startTimeObject = document.getElementById('startTime');
    prevStartTime = startTime;
    startTime = startTimeObject.options[startTimeObject.selectedIndex].value;
    var timeArray1 = prevStartTime.split(":");
    var timeArray2 = startTime.split(":");
    var prevTimeinMinutes = parseInt(timeArray1[0])*60 + parseInt(timeArray1[1]);
    var currentTimeinMinutes = parseInt(timeArray2[0])*60 + parseInt(timeArray2[1]);
    TotalChangeInMinutes = currentTimeinMinutes - prevTimeinMinutes;
    changeTime();
    changeTotalTime();
   // alert(startTime);
}

function OnTeeChange() {    
    teeObject = document.getElementById('teeCounter');
    prevNumberOfTees = numberOfTees;
    numberOfTees = teeObject.options[teeObject.selectedIndex].value;
    TotalChangeInMinutes = numberOfTees*timePerTee - prevNumberOfTees*timePerTee;
    changeTime();  
    changeTotalTime();     
}

function OnTimePerTeeChange() {   
    perTeeObject = document.getElementById('timePerTeeCounter');
    prevTimePerTee = timePerTee;
    timePerTee = perTeeObject.options[perTeeObject.selectedIndex].value;
    TotalChangeInMinutes = numberOfTees*timePerTee - numberOfTees*prevTimePerTee;
    changeTime();
    changeTotalTime();
}

function changeTime() {
    var timeArray1 = endTime.split(":");
    if (TotalChangeInMinutes > 0) {
       var changeInHours = Math.floor(TotalChangeInMinutes/60);
       var changeInMinutes = TotalChangeInMinutes%60;       
       if (timeArray1[1] == "30" && changeInMinutes == 30) {
            changeInHours = changeInHours + 1;
            changeInMinutes = 0;
            timeArray1[1] = "00";           
        }
        
        if (parseInt(timeArray1[1]) + changeInMinutes == 0)
            endTime = ((parseInt(timeArray1[0]) + changeInHours) + ":" + "00").toString();
        else
            endTime = ((parseInt(timeArray1[0]) + changeInHours) + ":" + "30").toString();
       document.getElementById("endTime").innerHTML = endTime + " hrs";
    }
    else {
        TotalChangeInMinutes = -1*TotalChangeInMinutes;       
        var changeInHours = Math.floor(TotalChangeInMinutes/60);
        var changeInMinutes = TotalChangeInMinutes%60;      
        if (timeArray1[1] == "00" && changeInMinutes == 30) {
            changeInHours = changeInHours - 1;
            if (changeInHours < 0)
                changeInHours = -1*changeInHours;
        }
        
        if (parseInt(timeArray1[1]) - changeInMinutes == 0)
             endTime = ((parseInt(timeArray1[0]) - changeInHours) + ":" + "00").toString();
        else
             endTime = ((parseInt(timeArray1[0]) - changeInHours) + ":" + "30").toString();
        document.getElementById("endTime").innerHTML = endTime + " hrs";
    }
}

function changeTotalTime() {
    var startTimeInMinute = parseInt(startTime.split(":")[0])*60 + parseInt(startTime.split(":")[1]);
    var endTimeInMinute = parseInt(endTime.split(":")[0])*60 + parseInt(endTime.split(":")[1]);
    var TotalDurationInMinutes = endTimeInMinute - startTimeInMinute;
   
    var DurationInHour = Math.floor(TotalDurationInMinutes/60);
    var DurationInMinutes = TotalDurationInMinutes%60;
    
    if (DurationInHour < 10)
        DurationInHour = "0" + DurationInHour.toString();
    else
        DurationInHour = DurationInHour.toString();
    if (DurationInMinutes == 0)
        DurationInMinutes  = "00";
    else
        DurationInMinutes = DurationInMinutes.toString();
    
    document.getElementById("totalTime").innerHTML = DurationInHour + ":" + DurationInMinutes + " hrs"; 
}

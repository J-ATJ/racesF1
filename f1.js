var a = 1;
var places = [];
var grandPrix = "";

dataFunc = async() =>{
    try{
        const response = await fetch("https://ergast.com/api/f1/2022/"+a+"/results.json");
        datos = await response.json();

        if (response.status == 200){
            
            let circuitNameJS = datos.MRData.RaceTable.Races[0].Circuit.circuitName;
            document.getElementById("circuitName").innerHTML = circuitNameJS; 

            let countryJs = datos.MRData.RaceTable.Races[0].Circuit.Location.country;
            document.getElementById("country").innerHTML = countryJs;

            let resultsJS = datos.MRData.RaceTable.Races[0].Results; 

            let tableJS = document.querySelector("#tableBody");
            tableJS.innerHTML = "";
            resultsJS.forEach(element => {
                try{
                    tableJS.innerHTML += `
                    <tr>
                        <td>${element.position}</td>
                        <td>${element.number}</td>
                        <td>${element.Driver.familyName}</td>
                        <td>${element.Constructor.name}</td>
                        <td>${element.laps}</td>
                        <td>${element.Time.time}</td>
                        <td>${element.points}</td>
                    </tr>
                    `
                }
                catch {
                    tableJS.innerHTML += `
                    <tr>
                        <td>${element.position}</td>
                        <td>${element.number}</td>
                        <td>${element.Driver.familyName}</td>
                        <td>${element.Constructor.name}</td>
                        <td>${element.laps}</td>
                        <td>${element.status}</td>
                        <td>${element.points}</td>
                    </tr>
                    `
                };
            });
        }
    } catch(error){
        alert("No data for: " + grandPrix);
    };

    try{
        const response2 = await fetch("https://ergast.com/api/f1/2022.json");
        datos2 = await response2.json();

        if (response2.status == 200){
            let allRacesJS = datos2.MRData.RaceTable.Races;

            let raceDW = document.getElementById("selection");
            raceDW.innerHTML = "";

            allRacesJS.forEach(element2 => {
                places.push(element2.raceName);
                try{
                    raceDW.innerHTML += `
                            <option value="${element2.raceName}">${element2.raceName.slice(0,-10)}</option>
                    `
                } catch(error){
                    console.log(error);
                };
            });
        };
    }catch(error){
        console.log(error);
    };
};

function fselection(){
    let selectedRace = document.formPost.selection.value;
    a = places.indexOf(selectedRace)+1;
    grandPrix = selectedRace;
    dataFunc();
};

dataFunc();
fselection();
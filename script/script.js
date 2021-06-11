// all the data from the census
var census_data = data;
console.log(census_data.population);


//targeting html element for data display
let total_population = document.getElementById("total-population");
let total_female = document.getElementById("total-female");
let total_male = document.getElementById("total-male");

//Display all the data on the page
function displayData(){
    //total female
    let female = getTotalFemale();
    total_female.innerHTML = female;
    //total male
    let male = getTotalMale();
    total_male.innerHTML = male;

    //total population
    total_population.innerHTML = female + male;

    //all counties
    let all_counties = getCounties();
    // console.log(all_counties);
}

//calculate the total amount of female in the entire country
function getTotalFemale(){
    let total_amount_of_female = 0;
    
    census_data.population.forEach(ele => {
        total_amount_of_female += ele.female;
    });
    
    return total_amount_of_female;
}

//calculate the total amount of male in the entire country
function getTotalMale(){
    let total_amount_of_male = 0;
    
    census_data.population.forEach(ele => {
        total_amount_of_male += ele.male;
    });
    
    return total_amount_of_male;
}

//calculate the total population
function getTotalPopulation(amount_of_male, amount_of_female){
    let country_population = amount_of_female + amount_of_female;
    return country_population;
}

//get all the counties in the country
function getCounties(){
    let repeated_counties = [];
    census_data.population.forEach((ele)=>{
        repeated_counties.push(ele.county);
    })
    // console.log(counties);
    let needed_counties = repeated_counties.reduce(function (accumulator, current_value) {
        if (accumulator.indexOf(current_value) === -1) {
          accumulator.push(current_value)
        }
        return accumulator
      }, [])

    return needed_counties;
}

function getCountiesPopulation(county_array){
    let all_counties_population = {};
    census_data.population.reduce(function(accumulator, current_value){

        if(current_value.county !== all_counties_population[0]){
            all_counties_population[current_value["county"]] = current_value["male"];
            // console.log("not equal");
        }
        else if(current_value.county === all_counties_population[0])
        {
            // all_counties_population[current_value["county"]] += current_value["male"] + current_value["female"];
            console.log("working");
        }
    }, {})

    console.log(all_counties_population);
}

getCountiesPopulation();



displayData();




//implemention of population for all counties in the county using bar chart
let all_counties_ctx = document.getElementById('all-counties-bar-chart');

//feed chart with data
let all_counties_bar_chart = new Chart(all_counties_ctx, {
    type: "bar",
    data: {
        labels: getCounties(),
        datasets: [{
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 45, 12,20],
            backgroundColor: [
                 "#519872"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})

//implemention of population for all female and male in the country using dognut chart
let female_and_male_ctx = document.getElementById("dognut-chart");

//feed chart with data
let female_and_male_chart = new Chart(female_and_male_ctx, {
    type: "doughnut",
    data: {
        datasets: [{
            label: '# of Votes',
            data: [getTotalMale(), getTotalFemale()],
            backgroundColor: [
                "#B1D2C2",
                "#F0F2EF"
            ]
        }],
        labels: ["Male", "Female"],
    }
    
})

//implementation of district chart
let district_chart_ctx = document.getElementById('distract-chart');

// feed chart with data
let district_chart_data = new Chart(district_chart_ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//implementation of household population chart
let household_population_ctx = document.getElementById("household-population-chart");

//feed chart with data
let household_populationh_data = new Chart(household_population_ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});




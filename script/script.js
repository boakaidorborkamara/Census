// all the data from the census
var census_data = data;
console.log(census_data.population);


//targeting html element for data display
let total_population = document.getElementById("total-population");
let total_female = document.getElementById("total-female");
let total_male = document.getElementById("total-male");

//Display all the data on the page
function displayData(){
    let female = getTotalFemale();
    let male = getTotalMale();
    total_female.innerHTML = male;
    total_male.innerHTML = female;
    total_population.innerHTML = female + male;
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
    let counties = [];
    census_data.population.forEach((ele)=>{
        counties.push(ele.county);
    })
    console.log(counties);
}

getCounties();

displayData();




//implemention of population for all counties in the county using bar chart
let all_counties_ctx = document.getElementById('all-counties-bar-chart');

//feed chart with data
let all_counties_bar_chart = new Chart(all_counties_ctx, {
    type: "bar",
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
    type: "pie",
    data: {
        datasets: [{
            label: '# of Votes',
            data: [12, 19,],
            backgroundColor: [
                "white",
                "#519872"
            ]
        }],
        labels: ["Male", "Female"],
    }
    
})


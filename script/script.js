// all the data from the census
var census_data = data;
console.log(census_data.households);


//targeting html element for data display
let total_population = document.getElementById("total-population");
let total_female = document.getElementById("total-female");
let total_male = document.getElementById("total-male");

//A function that display all the data on the page
function displayData(){
    //total female
    let female_population = getTotalFemale();
    total_female.innerHTML = female_population;

    //total male
    let male_population = getTotalMale();
    total_male.innerHTML = male_population;

    //total population
    total_population.innerHTML = getTotalPopulation(female_population, male_population);

    //all counties
    let all_counties = getCounties();

    //counties population
    let population_of_counties = getCountiesPopulation();
   
    //total of male and female per county
    let sum = getSum(population_of_counties);

    //create and display bar chart for total population per counties
    createCountiesPopulationChart(all_counties, sum);

    //create dognut chart for female and male population
    createFemaleAndMaleDognut(male_population, female_population);

    //display district population
    displayDistrictPopulation(all_counties);
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
function getTotalPopulation(amount_of_female, amount_of_male){
    let country_population = amount_of_female + amount_of_male;
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

//get population of each county
function getCountiesPopulation(county_array){
    let all_counties_population = {};
    census_data.population.forEach((ele)=>{
        if(all_counties_population.hasOwnProperty(ele.county) === false){
            all_counties_population[ele.county] = {
                male: ele.male,
                female: ele.female,
                sum: ele.male + ele.female
            }
        }
        else
        {
            all_counties_population[ele.county].male += ele.male;
            all_counties_population[ele.county].female += ele.female;
            all_counties_population[ele.county].sum += ele.male + ele.female;
        }
        
    })
    
    return all_counties_population;
}

//get sum from county population object
function getSum(county_popu_obj){
    let sum_arr = [];

    let obj_arr = Object.values(county_popu_obj);

    obj_arr.forEach((ele)=>{
        sum_arr.push(ele.sum);
    })
    
    return sum_arr;
}


//display all counties in dropdown menu option
function diplayCountyInDropdown(counties_arr, parent_text_node){
    let counties_dropdown = parent_text_node;

    counties_arr.forEach((ele)=>{
        let new_option = document.createElement("option");
        let option_text = document.createTextNode(ele);
        new_option.appendChild(option_text);
        counties_dropdown.appendChild(new_option);
        // console.log(ele);
    })
}

//display district population per county
function displayDistrictPopulation(county_arr){
    //add counties to dropdown
    let select_dropdown = document.getElementById("county-select-dropdown");
    diplayCountyInDropdown(county_arr, select_dropdown);

    let county_district_arr = {};
    census_data.population.forEach((ele)=>{
        if(county_district_arr.hasOwnProperty(ele.county) === false){
            county_district_arr[ele.county] = [ele.district];
        }
        else{
            county_district_arr[ele.county].push(ele.district);
        }
    })

    console.log(county_district_arr);
    

}

//display household data per population
function displayHouseholdData(){
    let household_population = {};

    census_data.households.forEach((ele)=>{
        if(household_population.hasOwnProperty(ele.county) === false){
            household_population[ele.county] = {
                
            }
            
            household_population[ele.county][ele.settlement]={
                male: ele.male,
                female: ele.female
            };
            // console.log(household_population[ele.county]);
        }
        else{
            household_population[ele.county][ele.settlement]={
                male: ele.male,
                female: ele.female
            };

            // household_population[ele.county][ele.settlement].male + ele.male;
            // household_population[ele.county][ele.settlement].female_and_male_chart + ele.female;
            
        }
    })

    console.log(household_population);
}

displayHouseholdData();








/*Below are functions implementing
the creation of different charts for
data visualization */


//implemention of population for all counties in the county using bar chart
function createCountiesPopulationChart(county_names, arr){
    let all_counties_ctx = document.getElementById('all-counties-bar-chart');

    
    
    //feed chart with data
    let all_counties_bar_chart = new Chart(all_counties_ctx, {
        type: "bar",
        data: {
            labels: county_names,
            datasets: [{
                data: arr,
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
}


//implemention of population for all female and male in the country using dognut chart
function createFemaleAndMaleDognut(population_of_male, population_of_female){
    let female_and_male_ctx = document.getElementById("dognut-chart");

    //feed chart with data
    let female_and_male_chart = new Chart(female_and_male_ctx, {
        type: "doughnut",
        data: {
            datasets: [{
                label: '# of Votes',
                data: [population_of_male, population_of_female],
                backgroundColor: [
                    "#B1D2C2",
                    "#F0F2EF"
                ]
            }],
            labels: ["Male", "Female"],
        }
        
    })
}


// calling of main function 
displayData();






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
                "#519872"
            ],
            borderColor: [
                "#F0F2EF"
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
                "#519872"
            ],
            borderColor: [
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
});




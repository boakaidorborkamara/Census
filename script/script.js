// all the data from the census
var census_data = data;
// console.log(census_data.population);
// console.log(census_data.households);


//targeting html element for data display
let total_population = document.getElementById("total-population");
let total_female = document.getElementById("total-female");
let total_male = document.getElementById("total-male");
let district_chart_ctx = document.getElementById('distract-chart');
let district_chart_data;
let household_populationh_data;

//A function that display all the data on the page by calling other functions
function displayData(){
    //display total female in html
    let female_population = getTotalFemale();
    total_female.innerHTML = new Intl.NumberFormat().format(female_population);

    //display total male in html
    let male_population = getTotalMale();
    total_male.innerHTML = new Intl.NumberFormat().format(male_population);

    //display total population in html
    let country_population = getTotalPopulation(female_population, male_population);
    total_population.innerHTML = new Intl.NumberFormat().format(country_population);

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

    //data of districts for all counties
    let districts_data = getDistrictDetails();

    //details of a districts from selected county
    let selected_county_districts_data = selectDistrictBaseOnCountySelected(all_counties, districts_data);
    // console.log(selected_county_districts_data);

    //create bar chart for district population chart
    // createDistrictPopulationChart(selected_county_districts_data);

    //data of household for all counties
    let households_data = getHouseholdDetails();

    // details of household from selected county
    let selected_county_household_data =  selectHouseholdDataBaseOnCountySelected(all_counties, households_data);
    // console.log(selected_county_household_data);

    //create bar chart for household population chart
    // createHouseholdPopulationChart(selected_county_household_data);
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

//accept all counties and create a dropdown menu
function createCountiesDropdown(array_of_counties, parent_text_node){
    //add counties to dropdown
    let counties_dropdown = parent_text_node;

    //create new options in the dropdown menu base on the counties array length
    array_of_counties.forEach((ele)=>{
        let new_option = document.createElement("option");
        let option_text = document.createTextNode(ele);
        let options_attribute = document.createAttribute("value");
        options_attribute.value = ele;
        new_option.setAttributeNode(options_attribute);
        new_option.appendChild(option_text);
        counties_dropdown.appendChild(new_option);
    })
}

//get all the counties district details
function getDistrictDetails(){

    let county_district_arr = {};

    census_data.population.forEach((ele)=>{
        if(county_district_arr.hasOwnProperty(ele.county) === false){
            county_district_arr[ele.county] = {};
            county_district_arr[ele.county][ele.district] = {
                male: ele.male,
                female: ele.female
            };
           
            county_district_arr[ele.county]["Districts"] = [
                ele.district
            ];

            
        }
        else{
            county_district_arr[ele.county][ele.district] = {
                male: ele.male,
                female: ele.female
            };
            
            county_district_arr[ele.county]["Districts"].push(ele.district);
        }
    })

    return county_district_arr;
}

//select all the districts and details of a selected counties
function selectDistrictBaseOnCountySelected(counties_arr, district_object){
    //create dropdown menu
    let counties_dropdown = document.getElementById("county-select-dropdown");
    createCountiesDropdown(counties_arr, counties_dropdown);

    //default selected county
    selected_county = "Bomi";
    // console.log(selected_county);
    

     //variable to store districts details for a selected county
     selected_county_district_data = district_object[selected_county];

    //select a dropdown option when clicked
    counties_dropdown.onchange = function(){
        selected_county = counties_dropdown.value;
        selected_county_district_data = district_object[selected_county];

        // console.log(selected_county);
        console.log(selected_county_district_data);
        district_chart_data.destroy();
        createDistrictPopulationChart(selected_county_district_data);
        return selected_county_district_data;
    };  

    createDistrictPopulationChart(selected_county_district_data);
    // console.log(selected_county_district_data);
    return selected_county_district_data;
}

//get household data for all counties
function getHouseholdDetails(){

    let household_population_data = {};

    census_data.households.forEach((ele)=>{
        if(household_population_data.hasOwnProperty(ele.county) === false){
            household_population_data[ele.county] = {};
            
            household_population_data[ele.county][ele.settlement]={
                male: ele.male,
                female: ele.female,
                household_number: ele.household_number
            };
        }
        else{
            household_population_data[ele.county][ele.settlement]={
                male: ele.male,
                female: ele.female,
                household_number: ele.household_number
            };            
        }
    })

   
    return household_population_data;

}

//select all the household data and details of a selected counties
function selectHouseholdDataBaseOnCountySelected(all_counties_arr, household_object){
    // create all counties dropdown menu
    let household_dropdown = document.getElementById("house-hold-dropdown");
    createCountiesDropdown(all_counties_arr, household_dropdown);
    
     //default selected county
     let selected_county_in_household_dropdown = "Bomi";
     // console.log(selected_county);

    //variable to store districts details for a selected county
    let selected_county_household_data = household_object[selected_county_in_household_dropdown];

    //select a dropdown option when clicked
    household_dropdown.onchange = function(){
        selected_county_in_household_dropdown = household_dropdown.value;
        selected_county_household_data = household_object[selected_county_in_household_dropdown];

        // console.log(selected_county_in_household_dropdown);
        console.log(selected_county_household_data);
        household_populationh_data.destroy();
        createHouseholdPopulationChart(selected_county_household_data);
        return selected_county_household_data;
    };  

    createHouseholdPopulationChart(selected_county_household_data);
    // console.log(selected_county_household_data);
    return selected_county_household_data;

}

function getCountiesWithMostMaleAndFemale(){
    let all_counties_male_and_female_obj = {};
    census_data.population.forEach((ele)=>{
        if(all_counties_male_and_female_obj.hasOwnProperty(ele.county) === false){
            all_counties_male_and_female_obj[ele.county] = {
                male: ele.male,
                female: ele.female
            };
            
        }
    })

    console.log("counties male and female", "male and female obj", all_counties_male_and_female_obj);
}

//Update the data in a chart base on a selected county
// function updateChartData(chart, label, data){
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

// getCountiesWithMostMaleAndFemale();



/*Below are functions implementing the creation of different charts for
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
                label: 'Counties Population',
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


//implementation of population for all female and male in the country using dognut chart
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

//implementation of District Population Chart
function createDistrictPopulationChart(district_data_object){

    // let try_var = district_data_object;
    // console.log(try_var);

    //array for chart dataset usage
    let district_array = district_data_object["Districts"];
    let male_array = [];
    let female_array = [];

    //remove district array from the district data object
    let data_for_chart_use = district_data_object;
    delete data_for_chart_use["Districts"];

    //convert the object to and arry
    data_for_chart_use = Object.values(data_for_chart_use);

    //add values to male and female array
    for(let i = 0; i < data_for_chart_use.length; i++){
        male_array.push(data_for_chart_use[i].male);
        female_array.push(data_for_chart_use[i].female);
    }

    

    // feed chart with data
    district_chart_data = new Chart(district_chart_ctx, {
        type: 'bar',
        data: {
          labels: district_array,
          datasets: [
            {
              label: "Male",
              backgroundColor: "#519872",
              data: male_array
            }, {
              label: "Female",
              backgroundColor: "#B1D2C2",
              data: female_array
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
    });
}


//implementationh of household population
function createHouseholdPopulationChart(selected_county_household_data_obj){

    //array for chart dataset usage
    let settlement_array = Object.keys(selected_county_household_data_obj);
    let household_male_array = [];
    let household_female_array = [];
    let household_number_array = [];

    //convert the object to and array
    let data_to_display_in_chart = Object.values(selected_county_household_data_obj);
    // console.log(data_to_display_in_chart);

    // add values to male and female array
    for(let i = 0; i < data_to_display_in_chart.length; i++){
        household_male_array.push(data_to_display_in_chart[i].male);
        household_female_array.push(data_to_display_in_chart[i].female);
        household_number_array.push(data_to_display_in_chart[i].household_number);
    }

    //implementation of household population chart
    let household_population_ctx = document.getElementById("household-population-chart");

    //feed chart with data
    household_populationh_data = new Chart(household_population_ctx, {
        type: 'bar',
        data: {
          labels: settlement_array,
          datasets: [
            {
              label: "Male",
              backgroundColor: "#519872",
              data: household_male_array
            }, {
              label: "Female",
              backgroundColor: "#B1D2C2",
              data: household_female_array
            },
            {
                label: "Household Number",
                backgroundColor: "#2E3138",
                data: household_number_array
              }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
    });
}




// calling of main function 
displayData();













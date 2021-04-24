// Function to make chart based on age data, per region
function makeByAgeChart(region) {
    // Read in Flask route that has age data
    d3.json(`/age/${region}`).then(data => {
        var newArray = []
        var sets = Object.entries(data[0])
        // Exclude code, entity, and year so they aren't included in the chart
        sets.forEach(function([type, value]){
                if (type !== "code") {
                    if (type !== "entity") {
                        if (type !== "year") {
                            newArray.push({"type": type, "value": value});                    
                    }
                }
            }
        });
        // Sort the array in descending order by value, then map each type to its respective value
        newArray.sort((a,b) => a.value-b.value);
        types_list = newArray.map(d => d.type);
        values_list = newArray.map(d => d.value);
        // Create the trace and layout for the chart, then plot it
        var trace = [{
            x: values_list,
            y: types_list,
            mode: "markers",
            marker: {
                color: values_list,
                colorscale: "Blues",
                reversescale: true
            },
            orientation: "h",
            type: "bar"
        }]
        var layout = {
            xaxis: {
                automargin: true,
                title: {
                    text: "Prevalence of Neoplasms (%)"
                }
            },
            yaxis: {
                automargin: true,
                title: {
                    text: "Age Group",
                    standoff: 20 
                  },
                }
             }
        Plotly.newPlot("byage", trace, layout);
    });
}

// Function to make chart based on type data, per region. Same process as above
function makeByTypeChart(region) {
    d3.json(`/type/${region}`).then(data => {
        var newArray2 = []
        var sets2 = Object.entries(data[0])
        sets2.forEach(function([type, value]){
                if (type !== "code") {
                    if (type !== "entity") {
                        if (type !== "year") {
                            newArray2.push({"type": type, "value": value});                    
                    }
                }
            }
        });

        newArray2.sort((a,b) => a.value-b.value);

        types_list2 = newArray2.map(d => d.type);
        values_list2 = newArray2.map(d => d.value);
        
        var trace2 = [{
            x: values_list2,
            y: types_list2,
            mode: "markers",
            marker: {
                color: values_list2,
                colorscale: "Blues",
                reversescale: true
            },
            orientation: "h",
            type: "bar"
        }]
        var layout2 = {
            xaxis: {
                automargin: true,
                title: {
                    text: "Prevalence of Neoplasms (%)"
                }
            },
            yaxis: {
            automargin: true,
            tickmode: "linear",
                title: {
                    text: "Cancer Type",
                    standoff: 20 
                  },
                }
             }
        Plotly.newPlot("bytype", trace2, layout2);
    });
}

// Function to make chart based on death by type data, per region. Same process as above
function makeDeathByTypeChart(region) {
    d3.json(`/death/${region}`).then(data => {
        var newArray3 = []
        var sets3 = Object.entries(data[0])
        sets3.forEach(function([type, value]){
                if (type !== "code") {
                    if (type !== "entity") {
                        if (type !== "year") {
                            newArray3.push({"type": type, "value": value});                    
                    }
                }
            }
        });

        newArray3.sort((a,b) => a.value-b.value);

        types_list3 = newArray3.map(d => d.type);
        values_list3 = newArray3.map(d => d.value);
        
        var trace3 = [{
            x: values_list3,
            y: types_list3,
            mode: "markers",
            marker: {
                color: values_list3,
                colorscale: "Blues",
                reversescale: true
            },
            orientation: "h",
            type: "bar"
        }]
        var layout3 = {
            xaxis: {
                automargin: true,
                title: {
                    text: "Cancer Deaths"
                }
            },
            yaxis: {
            automargin: true,
            tickmode: "linear",
                title: {
                    text: "Cancer Type",
                    standoff: 20 
                  },
                }
             }
        Plotly.newPlot("deathbytype", trace3, layout3);          
        });
    };

// Function that runs to display desired home page
function initSelection() {
    d3.json("/regions").then(data => {
        var regions_list = Object.values(data);
        var regions_list2 = regions_list[0];
        // Add "World" to the front of the list, then remove it from its original position so it appears first in dropdown
        regions_list2.unshift("World")
        regions_list2.splice(228, 1)
        // Set "World" as a variable
        var world_default = regions_list2[0];
        // Select individual dropdowns per chart, append the data and their values
        d3.select("#selDataset").selectAll("option")
            .data(regions_list2)
            .enter()
            .append("option")
            .attr("value",d=>d)
            .text(d=>d);
        d3.select("#selDataset2").selectAll("option")
            .data(regions_list2)
            .enter()
            .append("option")
            .attr("value",d=>d)
            .text(d=>d);
        d3.select("#selDataset3").selectAll("option")
            .data(regions_list2)
            .enter()
            .append("option")
            .attr("value",d=>d)
            .text(d=>d);
        
        // Run each chart function starting with "World"
        makeByAgeChart(world_default);
        makeByTypeChart(world_default);
        makeDeathByTypeChart(world_default);
    })
}
    


// Run a function for each chart that registers a change in dropdown option, which runs the respective chart function for the selection
function optionChanged(newRegion) {
    makeByAgeChart(newRegion);
};

function optionChanged2(newRegion2) {
    makeByTypeChart(newRegion2);
};

function optionChanged3(newRegion3) {
    makeDeathByTypeChart(newRegion3);
};

// Run the function that creates the home page, starting point
initSelection();
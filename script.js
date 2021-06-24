fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${'45.5051'}&lon=${'122.6750'}&exclude=${'part'}&appid=${'79c4e88b02ee3027f96b1890e0cf8c02'}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
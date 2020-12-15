//抓取JSON資料
fetch('/food.json', { method: 'get' })
    .then(function (response) {
        return response.json();
    }).then(function (foods) {
        let txt = '';
        for (let i = 0; i < foods.length; i++) {
            txt += "<div class='foodeffect'><img class='foodpic' src='" + foods[i].PicURL + "'/><span class='foodcity'>" + foods[i].City + "</span><span class='foodtown'>" + foods[i].Town + "</span><span class='foodname'>" + foods[i].Name + "</span><span class='foodline'>▂▂▂</span><p class='foodword'>" + foods[i].HostWords + "</p></div>";
        }
        let str = "<option>請選擇行政區域...</option>";
        let CityArray = [];
        for (let i = 0; i < foods.length; i++) {
            let flag = true;
            CityArray.forEach(ele => {
                if (ele == foods[i].City) {
                    flag = false;
                }
            });
            if (flag) {
                CityArray.push(foods[i].City);
                str = str + `<option value=${foods[i].City}>${foods[i].City}</option>`;
            }

        }
        document.getElementById("City").innerHTML = str;
        document.getElementById("food").innerHTML = txt;
        document.getElementById("Town").innerHTML = "<option>請選擇鄉鎮區...</option>";
    })

//選取City
document.getElementById("City").addEventListener("change", function () {
    fetch('/food.json', { method: 'get' })
        .then(function (response) {
            return response.json();
        }).then(function (foods) {
            let str = "<option>請選擇鄉鎮區...</option>";
            let TownArray = [];
            let txt = "";
            for (let i = 0; i < foods.length; i++) {
                let flag = true;
                TownArray.forEach(ele => {
                    if (ele == foods[i].Town) {
                        flag = false;
                    }
                });
                if (flag && foods[i].City == document.getElementById("City").value) {
                    TownArray.push(foods[i].Town);
                    str += `<option value=${foods[i].Town}>${foods[i].Town}</option>`;
                }
                if (foods[i].City == document.getElementById("City").value) {
                    txt += "<div class='foodeffect'><img class='foodpic' src='" + foods[i].PicURL + "'/><span class='foodcity'>" + foods[i].City + "</span><span class='foodtown'>" + foods[i].Town + "</span><span class='foodname'>" + foods[i].Name + "</span><span class='foodline'>▂▂▂</span><p class='foodword'>" + foods[i].HostWords + "</p></div>";
                }
            }
            document.getElementById("Town").innerHTML = str;
            document.getElementById("food").innerHTML = txt;
        })
});

//選取Town
document.getElementById("Town").addEventListener("change", function () {
    console.log(document.getElementById("Town").value);
    fetch('/food.json', { method: 'get' })
        .then(function (response) {
            return response.json();
        }).then(function (foods) {
            let txt = "";
            for (let i = 0; i < foods.length; i++) {
                if (foods[i].Town == document.getElementById("Town").value) {
                    txt += "<div class='foodeffect'><img class='foodpic' src='" + foods[i].PicURL + "'/><span class='foodcity'>" + foods[i].City + "</span><span class='foodtown'>" + foods[i].Town + "</span><span class='foodname'>" + foods[i].Name + "</span><span class='foodline'>▂▂▂</span><p class='foodword'>" + foods[i].HostWords + "</p></div>";
                }
            }
            document.getElementById("food").innerHTML = txt;
        })
});


// 載入完成後loading gif隱藏
window.onload = setTimeout(function () {
    document.getElementById("loading").style.display = "none"
}, 3000)
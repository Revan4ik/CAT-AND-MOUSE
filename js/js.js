var img = document.createElement("img"),
    img2 = document.createElement("img"),
    body = document.body,
    y = 0,
    x = 0,
    z = 0,
    y2 = 0,
    x2 = 0,
    arr = [],
    sec = 0,
    min = 0,
    p = document.createElement("p")
body.appendChild(p)
p.innerHTML = "00:00"
body.appendChild(img)
body.appendChild(img2)
img.src = "../source/1.png"
img2.src = "../source/2.png"
img2.style.width = "90px"
img2.style.height = "90px"
img2.style.top = "200px"
img2.style.left = "200px"
img.style.top = "300px"
img.style.left = "550px"


// рандом
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// коор мышки
body.addEventListener("mousemove", function (e) {
    x = e.clientX
    y = e.clientY
    if (x > window.innerWidth - img2.width + 60 
        || y > window.innerHeight - img2.height + 60) return
    if (z == 0)
        arr.push(x - 50, y - 50)
    var target = e.target.closest("div")
    if (target) {
        z++
    } else {
        z = 0
    }
    if (z == 0) {
        img2.style.top = y - 50 + "px"
        img2.style.left = x - 50 + "px"
    }


// коор кошке с задержков в 2с
    setTimeout(function () {
        y2 = arr[1] - 30
        x2 = arr[0] - 30
        if (arr[1] > window.innerHeight - img.height 
            || arr[0] > window.innerWidth - img.width) {
            arr[1] -= 75
            arr[0] -= 75
        }
        img.style.top = arr[1] + "px"
        img.style.left = arr[0] + "px"
        arr.shift()
        arr.shift()

    }, 2000)
    if (y >= y2 && y2 + img.height >= y && x >= x2 && x2 + img.height >= x || 
        img.style.top == img2.style.top && img.style.left == img2.style.left) {
        document.querySelector(".gameover").style.visibility = "visible"
        img.style.visibility = "hidden"
        img2.style.visibility = "hidden"
        for (var i = 1; i < document.querySelectorAll("div").length; i++) {
            document.querySelectorAll("div")[i].style.visibility = "hidden"
        }
    }
})


// создаем новый квадрат каждые 5 с
setInterval(function () {
    if (document.querySelector(".gameover").style.visibility == "visible") return
    var div = body.appendChild(document.createElement("div")),
        widthr = getRandom(50, 150),
        heightr = getRandom(50, 150),
        topr = getRandom(0, window.innerHeight - heightr),
        leftr = getRandom(0, window.innerWidth - widthr)
    div.style.width = widthr + "px"
    div.style.height = heightr + "px"
    div.style.top = topr + "px"
    div.style.left = leftr + "px"
}, 5000)


//ставим таймер
setInterval(function () {
    if (document.querySelector(".gameover").style.visibility == "visible") return
    sec++
    if (sec == 60) {
        sec = 0
        min++
    }
    if (sec < 10) {
        p.innerHTM0L = min + ":" + "0" + sec
        if (min < 10) {
            p.innerHTML = "0" + min + ":" + "0" + sec
            return
        }
    } else {
        if (min < 10) {
            p.innerHTML = "0" + min + ":" + sec
            return
        }
        p.innerHTML = min + ":" + sec
    }
}, 1000)
var cont = document.getElementById("container")

var ps = document.getElementById("pow-start")

var check = document.getElementById("check")
var add = document.getElementById("add")
var plot = document.getElementById("plot")
var prnt = document.getElementById("print")
var prnt = document.getElementById("print")
var reset = document.getElementById("reset")
var myPlot = document.getElementById("myPlot")

var vtable = document.getElementById("valTable")

var r1val = document.getElementById("r1val")
var r2val = document.getElementById("r2val")
var r3val = document.getElementById("r3val")

var PSval = document.getElementById("PSval")
var PSdis = document.getElementById("PSdis")

var tIR1 = document.getElementById("textInputR1")
var tIR2 = document.getElementById("textInputR2")
var tIR3 = document.getElementById("textInputR3")

var ndl1 = document.getElementById("ndl1")
var ndl2 = document.getElementById("ndl2")
var ndl3 = document.getElementById("ndl3")

var vp = document.getElementById("vp")
var vn = document.getElementById("vn")
var v1p = document.getElementById("v1p")
var v1n = document.getElementById("v1n")
var v2p = document.getElementById("v2p")
var v2n = document.getElementById("v2n")
var v3p = document.getElementById("v3p")
var v3n = document.getElementById("v3n")

var cvp = document.getElementById("c-vp")
var cvn = document.getElementById("c-vn")
var cv1p = document.getElementById("c-v1p")
var cv1n = document.getElementById("c-v1n")
var cv2p = document.getElementById("c-v2p")
var cv2n = document.getElementById("c-v2n")
var cv3p = document.getElementById("c-v3p")
var cv3n = document.getElementById("c-v3n")

var steps = document.getElementById("steps")

var index = 1
var voltageVal = []
var I1Val = []
var I2Val = []
var I3Val = []

var validConn = [vp, cvp, vn, cvn, v1p, cv1p, v1n, cv1n, v2p, cv2p, v2n, cv2n, v3p, cv3p, v3n, cv3n,
    v1p, cv2p, v1n, cv2n, v1p, cv3p, v1n, cv3n, v2p, cv1p, v2n, cv1n, v2p, cv3p, v2n, cv3n, v3p, cv1p, v3n, cv1n, v3p, cv2p, v3n, cv2n,]
var arrChk = []
var arrChkStore = []
var tableArr = [ndl1, ndl2, ndl3]

var state = 0;

var flags3 = 0;
var flags4 = 0;
var flags5 = 0;
var flags6 = 0;
var flags7 = 0;

const instance = jsPlumb.getInstance({
    container: cont
})

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 3.5 }
        },
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 3.5 }
        }
    })
    instance.addEndpoint([vp, v1p, v2p, v3p], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true
    })

    instance.addEndpoint([vn, v1n, v2n, v3n], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
    })

    instance.addEndpoint([cvp, cv1p, cv2p, cv3p], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([cvn, cv1n, cv2n, cv3n], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10
    })

})

reset.onclick = function reset_conn() {
    window.location.reload()
}

check.onclick = function MyCheck() {

    flags3 = 1;

    for (let i = 0; i < 39; i++) {
        if (instance.getConnections({ source: [validConn[i]], target: [validConn[i + 1]] })[0] != undefined) {
            if (i % 2 == 0) {
                arrChk.push(instance.getConnections({ source: [validConn[i]], target: [validConn[i + 1]] })[0])

                try {
                    if ((instance.getConnections({ source: [validConn[i + 2]], target: [validConn[i + 3]] })[0] == undefined) & (i % 4 == 0)) {
                        if ((instance.getConnections({ source: [validConn[i + 3]], target: [validConn[i + 2]] })[0] == undefined) & (i % 4 == 0)) {
                            arrChk.pop();
                        }
                    }
                }

                catch {
                    continue;
                }
            }
        }

        else if ((instance.getConnections({ source: [validConn[i + 1]], target: [validConn[i]] })[0] != undefined)) {
            if (i % 2 == 0) {
                arrChk.push(instance.getConnections({ source: [validConn[i + 1]], target: [validConn[i]] })[0])

                try {
                    if ((instance.getConnections({ source: [validConn[i + 2]], target: [validConn[i + 3]] })[0] == undefined) & (i % 4 == 0)) {
                        if ((instance.getConnections({ source: [validConn[i + 3]], target: [validConn[i + 2]] })[0] == undefined) & (i % 4 == 0)) {
                            arrChk.pop();
                        }
                    }
                }

                catch {
                    continue;
                }
            }
        }
    }

    if ((arrChk.length == 8) && (instance.getAllConnections().length == 8)) {
        window.alert("Right connections! Please choose the resistance values")

        if (voltageVal.length == 0) {
            r1val.disabled = false
            r2val.disabled = false
            r3val.disabled = false
        }

        arrChkStore = arrChk;
        arrChk = [];
    }

    else if (arrChk.length == 0) {
        window.alert("Please make connections")
    }

    else {
        window.alert("Invalid connections!")
        window.location.reload()
    }
}

ps.onclick = function toggle() {

    flags5 = 1;

    if (state == 0) {
        document.getElementById('power-supply').src = '../Assets/PowerSupplyOn.png'
        PSval.disabled = false;
        PSdis.disabled = false;
        state = 1;
    }
    else if (state == 1) {
        document.getElementById('power-supply').src = '../Assets/PowerSupplyOff.png'
        PSval.disabled = true;
        PSdis.disabled = true;
        PSdis.value = 0;
        PSval.value = 0;
        state = 0;
    }
}

var x = 0.8181;
function updateAmmeters() {


    r1 = parseFloat(r1val.value);
    r2 = parseFloat(r2val.value);
    r3 = parseFloat(r3val.value);
    ps = parseFloat(PSval.value);

    var Re = (r2 * r3) / (r2 + r3);

    var R = parseFloat(Re);

    // var I1 = parseFloat(ps / R);
    // var I2 = parseFloat((r3 / (r2 + r3)) * I1);
    // var I3 = parseFloat((r2 / (r2 + r3)) * I1);

    var V1 = parseFloat(ps*r1 / (r1 + R));
    var V2 = parseFloat(ps*R / (r1 + R));
    var V3 = parseFloat(ps*R / (r1 + R));

    var d1 = V1 * x;
    var d2 = V2 * x;
    var d3 = V3 * x;

    if (instance.getConnections({ source: [validConn[4]], target: [validConn[5]] })[0] == undefined) {
        if (instance.getConnections({ source: [validConn[16]], target: [validConn[17]] })[0] != undefined) {
            d1 = V2 * x
            tableArr = [ndl2, ndl1, ndl3]
        }
        else if (instance.getConnections({ source: [validConn[20]], target: [validConn[21]] })[0] != undefined) {
            d1 = V3 * x
            tableArr = [ndl3, ndl2, ndl1]
        }
    }

    if (instance.getConnections({ source: [validConn[8]], target: [validConn[9]] })[0] == undefined) {
        if (instance.getConnections({ source: [validConn[24]], target: [validConn[25]] })[0] != undefined) {
            d2 = V1 * x
            tableArr = [ndl2, ndl1, ndl3]
        }
        else if (instance.getConnections({ source: [validConn[28]], target: [validConn[29]] })[0] != undefined) {
            d2 = V3 * x
            tableArr = [ndl1, ndl3, ndl2]
        }
    }

    if (instance.getConnections({ source: [validConn[12]], target: [validConn[13]] })[0] == undefined) {
        if (instance.getConnections({ source: [validConn[32]], target: [validConn[33]] })[0] != undefined) {
            d3 = V1 * x
            tableArr = [ndl3, ndl2, ndl1]
        }
        else if (instance.getConnections({ source: [validConn[36]], target: [validConn[37]] })[0] != undefined) {
            d3 = V2 * x
            tableArr = [ndl1, ndl3, ndl2]
        }
    }

    ndl1.style.transform = "rotate(" + d1 + "deg)"
    ndl2.style.transform = "rotate(" + d2 + "deg)"
    ndl3.style.transform = "rotate(" + d3 + "deg)"
}

r1val.oninput = function fill1() {
    tIR1.value = r1val.value;
    flags4 = 1;
    ps.disabled = false
    //updateAmmeters();
}

r2val.oninput = function fill2() {
    tIR2.value = r2val.value;
    flags4 = 1;
    ps.disabled = false
    //updateAmmeters();
}

r3val.oninput = function fill3() {
    tIR3.value = r3val.value;
    flags4 = 1;
    ps.disabled = false
    //updateAmmeters();
}

PSval.oninput = function update() {

    add.disabled = false

    r1val.disabled = true;
    r2val.disabled = true;
    r3val.disabled = true;

    PSdis.value = PSval.value + ' V';

    if (arrChkStore.length == 8) {
        updateAmmeters();
    }
}

add.onclick = function AddToTable() {

    plot.disabled = false

    if (voltageVal.length < 10) {
        flags6 = flags6 + 1;

        let row = vtable.insertRow(index);

        let SNo = row.insertCell(0);
        let voltage = row.insertCell(1);
        let i1 = row.insertCell(2);
        let i2 = row.insertCell(3);
        let i3 = row.insertCell(4);

        SNo.innerHTML = index;
        voltage.innerHTML = PSval.value;

        i1.innerHTML = ((tableArr[0].style.transform.substring(7, ndl1.style.transform.indexOf("d"))) / 0.8181).toPrecision(3);
        i2.innerHTML = ((tableArr[1].style.transform.substring(7, ndl2.style.transform.indexOf("d"))) / 0.8181).toPrecision(3);
        i3.innerHTML = ((tableArr[2].style.transform.substring(7, ndl3.style.transform.indexOf("d"))) / 0.8181).toPrecision(3);
        index = index + 1;

        voltageVal.push(voltage.innerHTML)
        I1Val.push(i1.innerHTML)
        I2Val.push(i2.innerHTML)
        I3Val.push(i3.innerHTML)
    }
}

plot.onclick = function plotVal() {

    flags7 = 1;

    if (voltageVal.length >= 6) {

        prnt.disabled = false

        var temp1 = document.getElementById("plotContiner")
        var temp2 = temp1.innerHTML
        temp1.innerHTML = temp2
        window.scrollTo({
            top: 750,
            left: 0,
            behavior: 'smooth'
        });



        new Chart("myPlot", {
            type: "line",

            data: {
                labels: voltageVal,
                datasets: [{
                    label: "V1",
                    fill: false,
                    lineTension: 0.3,
                    borderColor: "blue",
                    data: I1Val
                },
                {
                    label: "V2",
                    fill: false,
                    lineTension: 0.3,
                    borderColor: "green",
                    data: I2Val
                },
                {
                    label: "V3",
                    fill: false,
                    lineTension: 0.3,
                    borderColor: "yellow",
                    data: I3Val,

                }]
            },

            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Voltages"
                        }
                    },
                    x: {
                        beginAtZero: true,
                        //suggestedMax:10,
                        type: "linear",
                        title: {
                            display: true,
                            text: "Voltage (Power Supply)"
                        }
                    }
                }
            }
        });
    }
    else {
        window.alert("Please enter atleast 6 obseravtions to the table.")
    }
}

prnt.onclick = function prntScr() {
    window.print()
}

function disconnect(num) {
    let nodes_list = [vp, vn, v1p, v1n, v2p, v2n, v3p, v3n, cvp, cvn, cv1p, cv1n, cv2p, cv2n, cv3p, cv3n]
    instance.deleteConnectionsForElement(nodes_list[num])
}

window.onload = function setJsPlumb() {
    setTimeout(() => {
        instance.connect({ source: vp, target: vn })
        instance.deleteEveryConnection()
    }, 50);
}

function highlight() {
    s1 = document.getElementById("s1");
    s2 = document.getElementById("s2");
    s3 = document.getElementById("s3");
    s4 = document.getElementById("s4");
    s5 = document.getElementById("s5");
    s6 = document.getElementById("s6");
    s7 = document.getElementById("s7");

    s1.style.color = "red";

    let conn = instance.getConnections();

    if (conn.length == 8) {
        s1.style.color = "black";
        s2.style.color = "red";
    }

    if (flags3 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";
    }

    if (flags4 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "red";
    }

    if (flags5 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "red";
    }

    if (flags6 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "red";
    }

    if (flags6 > 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "red";

    }
}

window.setInterval(highlight, 100);
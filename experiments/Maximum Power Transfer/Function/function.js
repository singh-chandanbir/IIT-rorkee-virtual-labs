var cont = document.getElementById("container")
var CHECK_BUTTON = document.getElementById("check")
var VOLTMETER_POSITIVE = document.getElementById("p_v")
var VOLTMETER_NEGATIVE = document.getElementById("n_v")
var AMMETER_POSITIVE = document.getElementById("p_a")
var AMMETER_NEGATIVE = document.getElementById("n_a")
var MULTIMETER_POSITIVE = document.getElementById("p_m")
var MULTIMETER_NEGATIVE = document.getElementById("n_m")
var POWER_POSITIVE = document.getElementById("p_p")
var POWER_NEGATIVE = document.getElementById("n_p")
var POWER_ON = document.getElementById("p_on")
var CIRCUIT_POWER_POSITIVE = document.getElementById("c_p_p")
var CIRCUIT_POWER_NEGATIVE = document.getElementById("c_p_n")
var CIRCUIT_AMMETER_POSITIVE = document.getElementById("c_a_p")
var CIRCUIT_AMMETER_NEGATIVE = document.getElementById("c_a_n")
var CIRCUIT_VOLTMETER_POSITIVE = document.getElementById("c_v_p")
var CIRCUIT_VOLTMETER_NEGATIVE = document.getElementById("c_v_n")
var MCB_SWITCH = document.getElementById("mcb_switch")
var MM_DISPLAY = document.getElementById("Mlt_DISPLAY")
var VOLTAGE_POINTER = document.getElementById("P_V")
var AMMETER_POINTER = document.getElementById("P_A")
var PLOT_BUTTON = document.getElementById("plot")
var RESET_BUTTON = document.getElementById("reset")
var PRINT_BUTTON = document.getElementById("print")
var POWER_IMG = document.getElementById("power")
var MCB_IMG = document.getElementById("mcb")

var myPlot = document.getElementById("myPlot")

var toggle = false
var validConn = [
    POWER_POSITIVE, CIRCUIT_POWER_POSITIVE,
    POWER_NEGATIVE, CIRCUIT_POWER_NEGATIVE,
    VOLTMETER_POSITIVE, CIRCUIT_VOLTMETER_POSITIVE,
    VOLTMETER_NEGATIVE, CIRCUIT_VOLTMETER_NEGATIVE,
    MULTIMETER_POSITIVE, CIRCUIT_VOLTMETER_POSITIVE,
    MULTIMETER_NEGATIVE, CIRCUIT_VOLTMETER_NEGATIVE,
    AMMETER_POSITIVE, CIRCUIT_AMMETER_POSITIVE,
    AMMETER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE
]

var s1 = document.getElementById("s1")
var s2 = document.getElementById("s2")
var s3 = document.getElementById("s3")
var s4 = document.getElementById("s4")
var s5 = document.getElementById("s5")
var s6 = document.getElementById("s6")
var s7 = document.getElementById("s7")

var flag_s2 = 0;
var flag_s3 = 0;
var flag_s5 = 0;
var flag_s6 = 0;

var arrChk = 0
var arrChkStore = 0
var CONNECTIONS_CHECK_BOOL = true;
var L = 200;
var POWER_STATE = 0
var MCB_STATE = 0

var POWER_SUPPLY = document.getElementById("PSslider")
var R1_SLIDER = document.getElementById("R1")
var RL_SLIDER = document.getElementById("RL")
var TABLE = document.getElementById("valTable")
var TABLE_COUNT = 0
var ADD_BUTTON = document.getElementById("add")

var powerVal = []
var R1Val = []

const instance = jsPlumb.getInstance({
    container: cont
});

//TOGGLE BUTTONS

POWER_ON.onclick = function toggle_power() {
    if (POWER_STATE == 0) {
        POWER_IMG.src = "../Assets/PowerSupplyOn.png"
        POWER_STATE = 1
        POWER_SUPPLY.disabled = false
    }
    else if (POWER_STATE == 1) {
        POWER_IMG.src = "../Assets/PowerSupplyOff.png"
        POWER_STATE = 0
        POWER_SUPPLY.disabled = true
    }
}

MCB_SWITCH.onclick = function toggle_mcb() {
    if (MCB_STATE == 0) {
        MCB_IMG.src = "../Assets/MCB_On.png"
        MCB_SWITCH.style.transform = "translate(0px, -55px)"
        MCB_STATE = 1
        POWER_ON.disabled = false
    }
    else if (MCB_STATE == 1) {
        MCB_IMG.src = "../Assets/MCB_Off.png"
        MCB_SWITCH.style.transform = "translate(0px, 0px)"
        MCB_STATE = 0
        POWER_ON.disabled = true
    }
}

//ON-CLICK / ON-INPUT TRIGGERS BELOW---------------------------------------------

POWER_SUPPLY.oninput = function () {
    document.getElementById("PS_DISPLAY").value = this.value;
    updateAmmeter(calcAmmeter(this, R1_SLIDER, RL_SLIDER))
    updateVoltmeter(calcVoltmeter(this, R1_SLIDER, RL_SLIDER))
    R1_SLIDER.disabled = false
}
R1_SLIDER.oninput = function () {
    document.getElementById("R1_DISPLAY").value = this.value;
    updateAmmeter(calcAmmeter(POWER_SUPPLY, this, RL_SLIDER))
    updateVoltmeter(calcVoltmeter(POWER_SUPPLY, this, RL_SLIDER))
    POWER_SUPPLY.disabled = true
    ADD_BUTTON.disabled = false
    PLOT_BUTTON.disabled = false
    flag_s5 = flag_s5 + 1;
}
RL_SLIDER.oninput = function () {
    document.getElementById("Rl_DISPLAY").value = this.value;
    updateAmmeter(calcAmmeter(POWER_SUPPLY, R1_SLIDER, this))
    updateVoltmeter(calcVoltmeter(POWER_SUPPLY, R1_SLIDER, this))
    flag_s2 = 1
}
ADD_BUTTON.onclick = function () {
    addValuesToTable();
}
//ON-CLICK / ON-INPUT TRIGGERS END -------------------------------------------------

instance.bind("ready", function () {
    createConnections();
});

CHECK_BUTTON.onclick = function checkConnections() {
    for (let i = 0; i < validConn.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: validConn[i], target: validConn[i + 1] })[0] != undefined) || (instance.getConnections({ source: validConn[i + 1], target: validConn[i] })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }
    }

    if ((arrChk == 8) && (instance.getAllConnections().length == 8)) {
        alert("Right connections! Please turn on the MCB and choose resistance values.")

        MCB_SWITCH.disabled = false
        flag_s3 = 1
        arrChk = 0;
        MM_DISPLAY.value = RL_SLIDER.value
    }

    else if (instance.getAllConnections().length == 0) {
        alert("Please make connections")
    }

    else {
        alert("Invalid connections!! Please re-check your connections")
        window.location.reload()
    }
}

PLOT_BUTTON.onclick = function plotVal() {

    if (powerVal.length >= 6) {

        PRINT_BUTTON.disabled = false

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
                labels: R1Val,
                datasets: [{
                    label: "POWER-TRANSFERED",
                    fill: false,
                    lineTension: 0.3,
                    borderColor: "blue",
                    data: powerVal
                }]
            },

            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Power Transfered"
                        }
                    },
                    x: {
                        beginAtZero: true,
                        type: "linear",
                        title: {
                            display: true,
                            text: "R1 values"
                        }
                    }
                }
            }
        });
    }
    else {
        window.alert("Please take atleast 6 readings")
    }

}

//document.addEventListener('contextmenu', event => event.preventDefault());

//function to make connections
function createConnections() {
    instance.registerConnectionTypes({
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        }
    });

    instance.addEndpoint([VOLTMETER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -100 }]
    }),

        instance.addEndpoint([VOLTMETER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -60 }]
        }),

        instance.addEndpoint([AMMETER_POSITIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(97,106,229)" },
            connectionType: "positive",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["Bezier", { curviness: 40 }]
        }),

        instance.addEndpoint([AMMETER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["Bezier", { curviness: 40 }]
        }),

        instance.addEndpoint([MULTIMETER_POSITIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(97,106,229)" },
            connectionType: "positive",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -100 }],
        }),

        instance.addEndpoint([MULTIMETER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -80 }],
        }),

        instance.addEndpoint([POWER_POSITIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(97,106,229)" },
            connectionType: "positive",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -60 }]
        }),

        instance.addEndpoint([POWER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -60 }]
        }),

        instance.addEndpoint([CIRCUIT_POWER_POSITIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(97,106,229)" },
            connectionType: "positive",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -60 }]
        }),

        instance.addEndpoint([CIRCUIT_POWER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -60 }]
        }),

        instance.addEndpoint([CIRCUIT_AMMETER_POSITIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(97,106,229)" },
            connectionType: "positive",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["Bezier", { curviness: 40 }]
        }),

        instance.addEndpoint([CIRCUIT_AMMETER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["Bezier", { curviness: 40 }]
        }),

        instance.addEndpoint([CIRCUIT_VOLTMETER_POSITIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(97,106,229)" },
            connectionType: "positive",
            maxConnections: 10,
            connector: ["StateMachine", { curviness: -100 }],
            connectionsDetachable: true
        }),

        instance.addEndpoint([CIRCUIT_VOLTMETER_NEGATIVE], {
            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            paintStyle: { fill: "rgb(299,106,97)" },
            connectionType: "negative",
            maxConnections: 10,
            connectionsDetachable: true,
            connector: ["StateMachine", { curviness: -60 }]
        })
}

function disconnect(num) {
    let nodes_list = [VOLTMETER_POSITIVE, VOLTMETER_NEGATIVE, AMMETER_POINTER, AMMETER_NEGATIVE, MULTIMETER_POSITIVE, MULTIMETER_NEGATIVE, POWER_POSITIVE, POWER_NEGATIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_POWER_NEGATIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_AMMETER_NEGATIVE, CIRCUIT_VOLTMETER_POSITIVE, CIRCUIT_VOLTMETER_NEGATIVE]
    instance.deleteConnectionsForElement(nodes_list[num])

}

function addValuesToTable() {

    if (TABLE_COUNT < 8) {
        flag_s6 = 1
        var row = TABLE.insertRow(-1)

        var S_NO = row.insertCell(0)
        var POWER_VALUE = row.insertCell(1)
        var R1 = row.insertCell(2)
        var LOAD_RESISTANCE = row.insertCell(3)
        var VOLTAGE = row.insertCell(4)
        var AMMETER = row.insertCell(5)
        var POWER = row.insertCell(6)
        TABLE_COUNT = TABLE_COUNT + 1
        var AMMETER_READING = calcAmmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER)
        var VOLTMETER_READING = calcVoltmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER)

        S_NO.innerHTML = parseFloat(TABLE_COUNT)
        POWER_VALUE.innerHTML = parseFloat(POWER_SUPPLY.value).toFixed(2)
        R1.innerHTML = parseFloat(R1_SLIDER.value).toFixed(2)
        LOAD_RESISTANCE.innerHTML = parseFloat(RL_SLIDER.value).toFixed(2)
        VOLTAGE.innerHTML = parseFloat(VOLTMETER_READING).toFixed(2)
        AMMETER.innerHTML = parseFloat(AMMETER_READING).toFixed(2)
        POWER.innerHTML = parseFloat(VOLTMETER_READING * AMMETER_READING).toFixed(2)

        if ((R1.innerHTML == LOAD_RESISTANCE.innerHTML) && (flag_s5 != 0) && (POWER.innerHTML != 0)) {
            TABLE.rows[TABLE_COUNT].style.backgroundColor = "yellow"
        }

        powerVal.push(POWER.innerHTML);
        R1Val.push(R1.innerHTML)
    }
}

function calcAmmeter(PS, R1, RL) {
    return parseFloat(PS.value) / (parseFloat(R1.value) + parseFloat(RL.value))
}

function calcVoltmeter(PS, R1, RL) {
    return calcAmmeter(PS, R1, RL) * parseFloat(R1.value)
}

function updateAmmeter() {
    let d = calcAmmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER) * (180/50);
    AMMETER_POINTER.style.transform = "rotate(" + d + "deg)"
}

function updateVoltmeter() {
    let d = calcVoltmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER) * (180/10);
    VOLTAGE_POINTER.style.transform = "rotate(" + d + "deg)"
}

window.onload = function setJsPlumb() {
    setTimeout(() => {
        instance.connect({ source: POWER_NEGATIVE, target: POWER_POSITIVE })
        instance.deleteEveryConnection()
    }, 50);
}

function highlight() {

    let conn = instance.getConnections();

    if ((flag_s2 == 0) && (conn.length != 0)) {
        flag_s2 = 0
        instance.deleteEveryConnection();
        window.alert("Please choose resitance values first")
        window.location.reload()
    }

    if (flag_s2 == 1) {
        s1.style.color = "black";
        s2.style.color = "red";

    }

    if ((conn.length != 0)) {
        RL_SLIDER.disabled = true
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";
    }

    if ((flag_s3 == 1)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "red";
    }

    if (MCB_STATE == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "red";
    }

    if (POWER_STATE == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "red";
    }

    if (flag_s5 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "red";
    }

    if (flag_s6 == 3) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "black";
        s8.style.color = "red";
    }

    if (flag_s5 > 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "black";
        s8.style.color = "black";
        s9.style.color = "red";
    }
}

window.setInterval(highlight, 100);
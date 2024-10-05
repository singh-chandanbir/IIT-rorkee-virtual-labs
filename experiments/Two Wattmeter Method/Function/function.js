var cont = document.getElementById("container")

var check = document.getElementById("check")
var add = document.getElementById("add")
var reset = document.getElementById("reset")
var prnt = document.getElementById("print")
var calculate = document.getElementById("calculate")
var MCB = document.getElementById("on_power")
var MCB_image = document.getElementById("M")

var VoltmeterPositive = document.getElementById("p_v")
var VoltmeterNegative = document.getElementById("n_v")

var AmmeterPositive = document.getElementById("p_a")
var AmmeterNegative = document.getElementById("n_a")

var Watt_1_V = document.getElementById("v_w1")
var Watt_1_L = document.getElementById("l_w1")
var Watt_1_M = document.getElementById("m_w1")
var Watt_1_C = document.getElementById("c_w1")

var Watt_2_V = document.getElementById("v_w2")
var Watt_2_L = document.getElementById("l_w2")
var Watt_2_M = document.getElementById("m_w2")
var Watt_2_C = document.getElementById("c_w2")

var MCB_Red = document.getElementById("mcb_r")
var MCB_Yel = document.getElementById("mcb_b")
var MCB_Blu = document.getElementById("mcb_y")

var A0 = document.getElementById("r_start")
var A1 = document.getElementById("r_end")

var B0 = document.getElementById("y_start")
var B1 = document.getElementById("y_end")

var C0 = document.getElementById("b_start")
var C1 = document.getElementById("b_end")

var PointerVoltmeter = document.getElementById("P_V")
var PointerAmmeter = document.getElementById("P_A")
var PointerWatt1 = document.getElementById("P_W1")
var PointerWatt2 = document.getElementById("P_W2")

var VLStar = document.getElementById("VLStar")
var ILStar = document.getElementById("ILStar")
var cosStar = document.getElementById("cosStar")
var powtar = document.getElementById("powStar")

var VLDelta = document.getElementById("VLDelta")
var ILDelta = document.getElementById("ILDelta")
var cosDelta = document.getElementById("cosDelta")
var powDelta = document.getElementById("powDelta")

var RLamp = document.getElementById("R-lamp")
var YLamp = document.getElementById("Y-lamp")
var BLamp = document.getElementById("B-lamp")

var VoltageSlider = 0

var ObsTable = document.getElementById("valTable")

var s1 = document.getElementById("s1")
var s2 = document.getElementById("s2")
var s3 = document.getElementById("s3")
var s4 = document.getElementById("s4")
var s5 = document.getElementById("s5")
var s6 = document.getElementById("s6")

var flags5 = 0
var flags4 = 0

var config_nodes = [A0, A1, B0, B1, C0, C1] //read only

var WV1 = Watt_1_V
var WL1 = Watt_1_L
var WM1 = Watt_1_M
var WC1 = Watt_1_C

var WV2 = Watt_2_V
var WL2 = Watt_2_L
var WM2 = Watt_2_M
var WC2 = Watt_2_C

var MCB_state = 0;

var connArrnagment = 0
var connHistory = []

var index = 0;
var current = 0;
var power1 = 0;
var power2 = 0;

var SpecialNode;

const instance = jsPlumb.getInstance({
    container: cont
});

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "blue": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "red": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        },

        "blue0": {
            paintStyle: { stroke: "blue", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "blue", strokeWidth: 2.5 }
        },
        "red0": {
            paintStyle: { stroke: "red", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "red", strokeWidth: 2.5 }
        },
        "yellow0": {
            paintStyle: { stroke: "yellow", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "yellow", strokeWidth: 2.5 }
        }
    })

    instance.addEndpoint([MCB_Red], {
        endpoint: "Dot",
        anchor: [["Center"]],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red0",
        paintStyle: { fill: "red", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([MCB_Blu], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue0",
        paintStyle: { fill: "blue", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([MCB_Yel], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "yellow0",
        paintStyle: { fill: "yellow", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([AmmeterPositive, VoltmeterPositive], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([VoltmeterNegative, Watt_1_L, Watt_1_V, Watt_2_M, Watt_2_C, Watt_2_L], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([Watt_1_C, Watt_1_M], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -50 }]
    })

    instance.addEndpoint([AmmeterNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -50 }]
    })

    instance.addEndpoint([Watt_2_V], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([A1, A0, B1, B0, C1, C0], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10,
        connector: ["StateMachine", { curviness: 40, proximityLimit: 10 }]
    })

})

window.onload = function setPage() {
    instance.connect({ source: VoltmeterNegative, target: VoltmeterPositive })
    instance.deleteEveryConnection()
}

if ((instance.getConnections({ source: AmmeterNegative, target: Watt_2_C })[0] != undefined) || (instance.getConnections({ source: Watt_2_C, target: AmmeterNegative })[0] != undefined)) {
    if ((instance.getConnections({ source: AmmeterNegative, target: Watt_2_M })[0] != undefined) || (instance.getConnections({ source: Watt_2_M, target: AmmeterNegative })[0] != undefined)) {
        WV1 = Watt_2_V
        WL1 = Watt_2_L
        WM1 = Watt_2_M
        WC1 = Watt_2_C
        WV2 = Watt_1_V
        WL2 = Watt_1_L
        WM2 = Watt_1_M
        WC2 = Watt_1_C
    }
}

VALID_CONNECTIONS = [
    WC2,
    WM2,

    VoltmeterPositive,
    WV1,
    WV2,

    VoltmeterNegative,
    AmmeterPositive,

    AmmeterNegative, WM1,
    AmmeterNegative, WC1,

    WM1, AmmeterNegative, 
    WM1, WC1, 

    WC1, WM1, 
    WC1, AmmeterNegative
]

function numOfConnections(node) { //counts total number of connections to and from a node

    let MyCounter = 0;

    MyCounter = (instance.getConnections({ source: node }).length + instance.getConnections({ target: node }).length)

    return MyCounter;
}

function connInNodes(node) { // returns number of connections made with load nodes

    let MyCounter = 0;

    for (let i = 0; i < config_nodes.length; i++) {
        if ((instance.getConnections({ source: node, target: config_nodes[i] })[0] != undefined) || (instance.getConnections({ source: config_nodes[i], target: node })[0] != undefined)) {
            MyCounter = MyCounter + 1;
        }
    }

    return MyCounter;
}

function check_delta() { //check delta config

    let in_nodes = []

    for (let i = 0; i < config_nodes.length; i++) {
        in_nodes[i] = config_nodes[i];
    }

    let out_nodes = []

    let MyCounter = 0;

    for (let i = 0; i < config_nodes.length; i++) {

        if (numOfConnections(config_nodes[i]) == 2) { //saperate out in_nodes and out_nodes

            if (connInNodes(config_nodes[i]) == 1) {

                let targetIndex = in_nodes.indexOf(config_nodes[i])
                in_nodes.splice(targetIndex, 1);

                out_nodes.push(config_nodes[i]);
            }
        }

        else if (numOfConnections(config_nodes[i]) == 3) { //saperate out in_nodes and out_nodes

            SpecialNode = config_nodes[i]

            if (connInNodes(config_nodes[i]) == 1) {

                let targetIndex = in_nodes.indexOf(config_nodes[i])
                in_nodes.splice(targetIndex, 1);

                out_nodes.push(config_nodes[i]);
            }
        }
    }

    for (let i = 0; i < out_nodes.length; i++) { //check if any two out_nodes are connected
        for (let j = 0; j < out_nodes.length; j++) {
            if ((instance.getConnections({ source: out_nodes[i], target: out_nodes[j] })[0] != undefined) || (instance.getConnections({ source: out_nodes[j], target: out_nodes[i] })[0] != undefined)) {
                MyCounter = MyCounter + 1; //counter will overshoot resulting in false
            }
        }
    }

    for (let i = 0; i < out_nodes.length; i++) { //check if all in_nodes have one-to-one connections with all out_nodes
        for (let j = 0; j < in_nodes.length; j++) {
            if ((instance.getConnections({ source: out_nodes[i], target: in_nodes[j] })[0] != undefined) || (instance.getConnections({ source: in_nodes[j], target: out_nodes[i] })[0] != undefined)) {
                MyCounter = MyCounter + 1;
            }
        }
    }

    if (MyCounter == 3) {
        return true;
    }

    else {
        return false;
    }
}

function check_star() { //check star config

    let in_nodes = [];

    for (let i = 0; i < config_nodes.length; i++) {
        in_nodes[i] = config_nodes[i];
    }

    let out_nodes = [];

    let MyCounter = 0;

    for (let i = 0; i < config_nodes.length; i++) {

        if (numOfConnections(config_nodes[i]) == 1) {

            if (connInNodes(config_nodes[i]) == 0) {

                let targetIndex = in_nodes.indexOf(config_nodes[i])
                in_nodes.splice(targetIndex, 1);

                out_nodes.push(config_nodes[i]);
            }
        }
        else if (numOfConnections(config_nodes[i]) == 2) {

            SpecialNode = config_nodes[i]

            if (connInNodes(config_nodes[i]) == 0) {

                let targetIndex = in_nodes.indexOf(config_nodes[i])
                in_nodes.splice(targetIndex, 1);

                out_nodes.push(config_nodes[i]);
            }
        }
    }

    for (let i = 0; i < out_nodes.length; i++) { //checking connections between in_nodes and out_nodes
        for (let j = 0; j < in_nodes.length; j++) {
            if ((instance.getConnections({ source: out_nodes[i], target: in_nodes[j] })[0] != undefined) || (instance.getConnections({ source: in_nodes[j], target: out_nodes[i] })[0] != undefined)) {
                MyCounter = MyCounter + 1;
            }
        }
    }

    if ((MyCounter == 0) && (in_nodes.length == 3) && (out_nodes.length == 3)) { //no connections in in_nodes and out_nodes
        let indexes = [1, 2, 4]

        let index_tracker = 0; //checking connections between in_nodes
        for (let i = 0; i < in_nodes.length; i++) {
            for (let j = 0; j < in_nodes.length; j++) {
                if ((instance.getConnections({ source: in_nodes[i], target: in_nodes[j] })[0] != undefined) || (instance.getConnections({ source: in_nodes[j], target: in_nodes[i] })[0] != undefined)) {
                    index_tracker = index_tracker + (indexes[i] + indexes[j]);
                }
            }
        }

        if ((index_tracker / 2 == 8) || (index_tracker / 2 == 11) || (index_tracker / 2 == 9) || (index_tracker / 2 == 14)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function check_basic_loads() { //checks if main circuit is connected to nodes returns true only if those nodes are connected to some load nodes

    if ((connInNodes(WL1) == 1) && (connInNodes(WL2) == 1)) {
        if ((instance.getConnections({ source: SpecialNode, target: WV1 })[0] != undefined) || (instance.getConnections({ source: WV1, target: SpecialNode })[0] != undefined)) {
            if ((instance.getConnections({ source: SpecialNode, target: WV2 })[0] != undefined) || (instance.getConnections({ source: WV2, target: SpecialNode })[0] != undefined))
                return true;
        }
    }
}

function check_basic(port1, port2, port3) {

    let arrChk = 0;
    let amv = 0;

    for (let i = 0; i < VALID_CONNECTIONS.length; i++) {

        if (i <= 1) {
            if ((instance.getConnections({ source: port1, target: VALID_CONNECTIONS[i] })[0] != undefined) || (instance.getConnections({ source: VALID_CONNECTIONS[i], target: port1 })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }

        else if ((i > 1) && (i <= 4)) {
            if ((instance.getConnections({ source: port2, target: VALID_CONNECTIONS[i] })[0] != undefined) || (instance.getConnections({ source: VALID_CONNECTIONS[i], target: port2 })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }

        else if ((i > 4) && (i <= 6)) {
            if ((instance.getConnections({ source: port3, target: VALID_CONNECTIONS[i] })[0] != undefined) || (instance.getConnections({ source: VALID_CONNECTIONS[i], target: port3 })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }

        else if (i > 6) {
            if (i % 2 != 0) {
                if ((instance.getConnections({ source: VALID_CONNECTIONS[i + 1], target: VALID_CONNECTIONS[i] })[0] != undefined) || (instance.getConnections({ source: VALID_CONNECTIONS[i], target: VALID_CONNECTIONS[i + 1] })[0] != undefined)) {
                    amv = amv + 1;
                }
            }
        }
    }

    if ((arrChk == 7)&&(amv == 4)) {
        return true;
    }
    else {
        return false;
    }
}

function check_permutations() {
    var MCB_list = [MCB_Blu, MCB_Red, MCB_Yel]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if ((i != j) && (j != k) && (k != i)) {
                    if (check_basic(MCB_list[i], MCB_list[j], MCB_list[k])) {
                        return true;
                    }
                }
            }
        }
    }
}

check.onclick = function giveResult() {
    if (check_permutations()) {
        if (check_basic_loads() && check_delta() && (instance.getAllConnections().length == 15)) {
            window.alert("Valid connections, loads are in DELTA configuration")
            connArrnagment = 1
            MCB.disabled = false
        }
        else if (check_basic_loads() && check_star() && (instance.getAllConnections().length == 14)) {
            window.alert("Valid connections, loads are in STAR configuration")
            connArrnagment = 2
            MCB.disabled = false
        }
        else {
            window.alert("Invalid Connections!")
        }
    }
    else if (instance.getAllConnections().length == 0) {
        window.alert("Please make connections")
    }
    else {
        window.alert("Invalid Connections!")
    }
    SpecialNode = undefined;
    connHistory.push(connArrnagment)
}

reset.onclick = function resetExp() {
    window.location.reload();
}

MCB.onclick = function toggle_MCB() {
    flags4 = 1
    if (MCB_state == 1) {
        MCB_state = 0;
        MCB_image.src = "../Assets/MCB_Off.png"
        MCB.style.transform = "translate(0px, 0px)"
        VoltageSlider = 0
        trigger()

        RLamp.src = "../Assets/r_off.png"
        YLamp.src = "../Assets/y_off.png"
        BLamp.src = "../Assets/b_off.png"
    }
    else if (MCB_state == 0) {
        MCB_state = 1;
        MCB_image.src = "../Assets/MCB_ON.png"
        MCB.style.transform = "translate(0px, -60px)"
        VoltageSlider = 408
        trigger();
    }
}

function trigger() {
    flags5 = 1
    add.disabled = false
    updateMeters();
}

function updateMeters() {

    RLamp.src = "../Assets/r_on.png"
    YLamp.src = "../Assets/y_on.png"
    BLamp.src = "../Assets/b_on.png"

    if (connArrnagment == 1) {
        rotateNeedle(PointerVoltmeter, VoltageSlider * (180 / 500));

        current = VoltageSlider * (0.5 / 408)
        rotateNeedle(PointerAmmeter, current * (180 / 10))

        power1 = VoltageSlider * (180 / 408)
        rotateNeedle(PointerWatt1, power1 * (90 / 1500))

        power2 = VoltageSlider * (180 / 408)
        rotateNeedle(PointerWatt2, power2 * (90 / 1500))
    }

    else if (connArrnagment == 2) {
        rotateNeedle(PointerVoltmeter, VoltageSlider * (108 / 500));

        current = VoltageSlider * (1.2 / 408)
        rotateNeedle(PointerAmmeter, current * (180 / 10))

        power1 = VoltageSlider * (520 / 408)
        rotateNeedle(PointerWatt1, power1 * (90 / 1500))

        power2 = VoltageSlider * (320 / 408)
        rotateNeedle(PointerWatt2, power2 * (90 / 1500))
    }
}

function rotateNeedle(needle, angle) {
    needle.style.transform = "rotate(" + angle + "deg)"
}

add.onclick = function addToTable() {

    updateMeters();
    let row = ObsTable.insertRow(index + 1);

    index = index + 1

    let SNo = row.insertCell(0);
    let load = row.insertCell(1)
    let volt = row.insertCell(2);
    let curnt = row.insertCell(3);
    let pow1 = row.insertCell(4);
    let pow2 = row.insertCell(5);
    let pow = row.insertCell(6);

    SNo.innerHTML = index
    volt.innerHTML = VoltageSlider
    curnt.innerHTML = current.toFixed(2)
    pow1.innerHTML = power1.toFixed(2)
    pow2.innerHTML = power2.toFixed(2)
    pow.innerHTML = parseFloat(power1.toFixed(2)) + parseFloat(power2.toFixed(2))

    if (connArrnagment == 2) {
        load.innerHTML = "Star"
    }
    else if (connArrnagment == 1) {
        load.innerHTML = "Delta"
    }

    if ((connHistory.indexOf(1) >= 0) && (connHistory.indexOf(2) >= 0)) {
        document.getElementById("verify1").disabled = false
        document.getElementById("verify2").disabled = false
    }

    VoltageSlider = 0

    MCB_state = 0;
    MCB_image.src = "../Assets/MCB_Off.png"
    MCB.style.transform = "translate(0px, 0px)"
    trigger()
    RLamp.src = "../Assets/r_off.png"
    YLamp.src = "../Assets/y_off.png"
    BLamp.src = "../Assets/b_off.png"
    add.disabled = true;
    prnt.disabled = false
}

function disconnect(num) {
    let nodes_list = [MCB_Red, MCB_Yel, MCB_Blu, VoltmeterPositive, VoltmeterNegative, AmmeterPositive, AmmeterNegative, WV1, WL1, WM1, WC1, WV2, WL2, WM2, WC2, A0, A1, B0, B1, C0, C1]
    instance.deleteConnectionsForElement(nodes_list[num])
}

function multiplyStar() {
    var num1 = 1.732;
    var num2 = document.getElementById('VLStar').value;
    var num3 = document.getElementById('ILStar').value;
    var num4 = document.getElementById('cosStar').value;

    var myResult = num1 * num2 * num3 * num4;

    document.getElementById('powStar').value = myResult.toFixed(2);
}

function multiplyDelta() {

    var num1 = 1.732;

    var num2 = document.getElementById('VLDelta').value;
    var num3 = document.getElementById('ILDelta').value;
    var num4 = document.getElementById('cosDelta').value;

    var myResult = num1 * num2 * num3 * num4;

    document.getElementById('powDelta').value = myResult.toFixed(2);
}

function highlight() {

    let conn = instance.getConnections();

    if (conn.length >= 1) {
        s1.style.color = "black";
        s2.style.color = "red";

    }

    if (connInNodes() != 0) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";
    }

    if (connArrnagment == 2) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "red";
    }

    if ((flags4 == 1) && (connArrnagment == 2)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "red";
    }

    if ((flags5 == 1) && connArrnagment == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "red";
    }

    if (connArrnagment == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "red";
    }

    if ((MCB_state == 1) && (connArrnagment == 1)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "black";
        s8.style.color = "red";
    }
}

window.setInterval(highlight, 100);
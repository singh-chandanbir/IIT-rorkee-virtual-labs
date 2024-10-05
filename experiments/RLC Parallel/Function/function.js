var cont = document.getElementById("container")

var check = document.getElementById("check")
var add = document.getElementById("add")
var reset = document.getElementById("reset")
var calculate = document.getElementById("calculate")
var plot = document.getElementById("plot")
var prnt = document.getElementById("print")

var MCB_image = document.getElementById("mcb")
var MCB = document.getElementById("mcb_switch")
var MCB_Positive = document.getElementById("mcb_p")
var MCB_Negative = document.getElementById("mcb_n")

var MainVoltmeterPositive = document.getElementById("Mp_v")
var MainVoltmeterNegative = document.getElementById("Mn_v")

var MainAmmeterPositive = document.getElementById("Mp_a")
var MainAmmeterNegative = document.getElementById("Mn_a")

var WattmeterV = document.getElementById("w_v")
var WattmeterL = document.getElementById("w_l")
var WattmeterM = document.getElementById("w_m")
var WattmeterC = document.getElementById("w_c")

var TopAmmeterPositive = document.getElementById("Tp_a")
var TopAmmeterNegative = document.getElementById("Tn_a")

var SecAmmeterPositive = document.getElementById("Sp_a")
var SecAmmeterNegative = document.getElementById("Sn_a")

var BotAmmeterPositive = document.getElementById("Bp_a")
var BotAmmeterNegative = document.getElementById("Bn_a")

var VariacInPositive = document.getElementById("t_a")
var VariacInNegative = document.getElementById("t_b")
var VariacOutPositive = document.getElementById("t_c")
var VariacOutNegative = document.getElementById("t_d")
var Variac = document.getElementById("t_on")
var Var_image = document.getElementById("transformer")
var knob = document.getElementById("knob")

var InductorPositive = document.getElementById("i_p")
var InductorNegative = document.getElementById("i_n")

var ResistorPositive = document.getElementById("rh_p")
var ResistorNegative = document.getElementById("rh_n")

var CapacitorPositive = document.getElementById("c_n")
var CapacitorNegative = document.getElementById("c_p")

var MainAmmeterNeedle = document.getElementById("P_A")
var MainVoltmeterNeedle = document.getElementById("P_V")

var TopAmmeterNeedle = document.getElementById("TP_A")
var SecAmmeterNeedle = document.getElementById("SP_A")
var BotAmmeterNeedle = document.getElementById("BP_A")
var WattmeterNeedle = document.getElementById("P_W")

var vtable = document.getElementById("valTable")

var s1 = document.getElementById("s1")
var s2 = document.getElementById("s2")
var s3 = document.getElementById("s3")
var s4 = document.getElementById("s4")
var s5 = document.getElementById("s5")
var s6 = document.getElementById("s6")

var Rcalc = document.getElementById("R")
var XLcalc = document.getElementById("XL")
var XCcalc = document.getElementById("XC")
var Lcalc = document.getElementById("L")
var Ccalc = document.getElementById("C")
var Zcalc = document.getElementById("Z")
var coscalc = document.getElementById("cos")
var Pcalc = document.getElementById("P")
var Qcalc = document.getElementById("Q")
var verify = document.getElementById("verify")

var mcb_state = 0
var variac_state = 0

var var_voltage = 0
var angle = 0
var angle_inc = 3.6
var volt_inc = 2.2

var Mamm = 0
var Mvol = 0
var Watt = 0
var amm1 = 0
var amm2 = 0
var amm3 = 0

var flags2 = 0
var flags3 = 0
var flags4 = 0
var flags5 = 0
var flags6 = 0

var rindex = 0

var connList = []
var LList = []
var VList = []

var ammeterT = [TopAmmeterPositive, TopAmmeterNegative]
var ammeterS = [SecAmmeterPositive, SecAmmeterNegative]
var ammeterB = [BotAmmeterPositive, BotAmmeterNegative]

var inductor = [InductorPositive, InductorNegative]
var resistor = [ResistorPositive, ResistorNegative]
var capacitor = [CapacitorPositive, CapacitorNegative]

var ammeterList = [ammeterT, ammeterS, ammeterB]
var loadList = [inductor, resistor, capacitor]

function disconnect(num) {
    let node_list = [
        MCB_Positive, MCB_Negative,
        MainVoltmeterPositive, MainVoltmeterNegative,
        MainAmmeterPositive, MainAmmeterNegative,
        WattmeterV, WattmeterL, WattmeterM, WattmeterC,
        TopAmmeterPositive, TopAmmeterNegative,
        SecAmmeterPositive, SecAmmeterNegative,
        BotAmmeterPositive, BotAmmeterNegative,
        ResistorPositive, ResistorNegative,
        InductorPositive, InductorNegative,
        CapacitorPositive, CapacitorNegative,
        VariacInPositive, VariacInNegative,
        VariacOutPositive, VariacOutNegative
    ]
    instance.deleteConnectionsForElement(node_list[num])
}

var ValidConn = [MCB_Positive, VariacInPositive, MCB_Negative, VariacInNegative, VariacOutPositive, MainVoltmeterPositive, VariacOutNegative, MainVoltmeterNegative]

const instance = jsPlumb.getInstance({
    container: cont
})

function isConnected(node1, node2) {
    if ((instance.getConnections({ source: node1, target: node2 })[0] != undefined) || (instance.getConnections({ source: node2, target: node1 })[0] != undefined)) {
        return true;
    }
    else {
        return false;
    }
}

function numConnect(node) {
    return instance.getConnections({ source: node }).length + instance.getConnections({ target: node }).length
}

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

    instance.addEndpoint([MainVoltmeterPositive, MainAmmeterPositive, MCB_Positive, VariacInPositive, VariacOutPositive, WattmeterM, WattmeterC], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true
    })

    instance.addEndpoint([MainVoltmeterNegative, MainAmmeterNegative, MCB_Negative, VariacInNegative, VariacOutNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)" },
        connectionType: "negative",
        maxConnections: 10,
        connectionsDetachable: true
    })

    instance.addEndpoint([MainAmmeterNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)" },
        connectionType: "negative",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -40, proximityLimit: 10 }]
    })

    instance.addEndpoint([WattmeterC, WattmeterM, ResistorPositive, InductorPositive, CapacitorPositive], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -40, proximityLimit: 10 }]
    })

    instance.addEndpoint([ResistorNegative, CapacitorNegative, InductorNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)" },
        connectionType: "negative",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -40, proximityLimit: 10 }]
    })

    instance.addEndpoint([TopAmmeterPositive, SecAmmeterPositive, BotAmmeterPositive], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -30, proximityLimit: 20 }]
    })

    instance.addEndpoint([TopAmmeterNegative, SecAmmeterNegative, BotAmmeterNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)" },
        connectionType: "negative",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -30, proximityLimit: 20 }]
    })

    instance.addEndpoint([WattmeterV, WattmeterL], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
    })
})

function ThreeNodes(node1, node2, node3) {
    let TriList = [node1, node2, node3]
    let index_tracker = 0
    let indexes = [1, 2, 4]
    for (let i = 0; i < TriList.length; i++) {
        for (let j = 0; j < TriList.length; j++) {
            if (isConnected(TriList[i], TriList[j])) {
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

function conjNum(num) {
    return Math.abs(num - 1)
}

function staticConn() {
    let VarOut = [VariacOutPositive, VariacOutNegative]
    let Ammeter = [MainAmmeterPositive, MainAmmeterNegative]

    let conn = 0;
    for (let i = 0; i < ValidConn.length; i++) {
        if (i % 2 == 0) {
            if (isConnected(ValidConn[i], ValidConn[i + 1])) {
                conn = conn + 1
            }
        }
    }

    for (let i = 0; i < ValidConn.length; i++) {
        if (i % 4 == 0) {
            if (isConnected(ValidConn[i], ValidConn[i + 3])) {
                conn = conn + 1
            }
            if (isConnected(ValidConn[i + 1], ValidConn[i + 2])) {
                conn = conn + 1
            }
        }
    }

    for (let i = 0; i < 2; i++) {
        if (isConnected(WattmeterV, VarOut[i])) {
            if (isConnected(Ammeter[i], VarOut[conjNum(i)])) {
                if (ThreeNodes(Ammeter[conjNum(i)], WattmeterC, WattmeterM) && (conn == 4)) {
                    return true
                }
            }
            else if (isConnected(Ammeter[conjNum(i)], VarOut[conjNum(i)])) {
                if (ThreeNodes(Ammeter[i], WattmeterC, WattmeterM) && (conn == 4)) {
                    return true
                }
            }
        }
    }
}

function checkNodes(ammeter, load) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if (isConnected(ammeter[i], load[j])) {
                VList.push(load[conjNum(j)])
                LList.push(ammeter[conjNum(i)])
                return true
            }
        }
    }
}

function AmmeterToLoad() {
    VList = []
    LList = []
    for (let i = 0; i < ammeterList.length; i++) {
        for (let j = 0; j < loadList.length; j++) {
            if (checkNodes(ammeterList[i], loadList[j])) {
                connList.push(j)
            }
        }
    }
}

function ThreeToOne(node, list) {
    let count = 0
    for (let i = 0; i < list.length; i++) {
        if (isConnected(list[i], node)) {
            count = count + 1
        }
    }
    if (count == 1) {
        return true
    }
    else {
        false
    }
}

function ResolveVandL() {
    if (ThreeNodes(VList[0], VList[1], VList[2])) {
        if (ThreeNodes(LList[0], LList[1], LList[2])) {

            return (ThreeToOne(WattmeterV, VList) && ThreeToOne(WattmeterL, LList))

        }
    }
}

function PolarityCheck() {
    let indcAmm = ammeterList[connList.indexOf(2)]
    return ((indcAmm[0], InductorPositive) || (indcAmm[1], InductorNegative))
}

check.onclick = function checkConn() {
    if (staticConn()) {

        AmmeterToLoad()

        if (PolarityCheck()) {
            if (ResolveVandL() && (instance.getAllConnections().length == 17)) {
                MCB.disabled = false
                window.alert("Right connections! ")
            }
            else {
                window.alert("Invalid connections! ")
            }
        }
        else if (instance.getAllConnections().length == 0) {
            window.alert("Please make connections!")
        }
        else {
            window.alert("Invalid connections! ")
        }
    }
    else if (instance.getAllConnections().length == 0) {
        window.alert("Please make connections!")
    }
    else {
        window.alert("Invalid connections! ")
    }
}

MCB.onclick = function toggleMCB() {
    flags3 = 1
    if (mcb_state == 1) {
        mcb_state = 0
        MCB_image.src = '../Assets/MCB_off.png'
        MCB.style.transform = "translate(0px, 0px)"
        Var_image.src = '../Assets/Variac_OFF.png'
        Variac.disabled = true
        variac_state = 0
        setZero()
    }
    else if (mcb_state == 0) {
        mcb_state = 1
        MCB_image.src = '../Assets/MCB_ON.png'
        MCB.style.transform = "translate(0px, -49px)"
        Variac.disabled = false
        if (variac_state == 1) {
            updateMeters()
        }
    }
}

Variac.onclick = function () {
    flags4 = 1
    if (variac_state == 1) {
        variac_state = 0
        Var_image.src = '../Assets/Variac_OFF.png'
        setZero()
    }
    else if (variac_state == 0) {
        variac_state = 1
        Var_image.src = '../Assets/Variac_ON.png'
        if (mcb_state == 1) {
            updateMeters()
        }
    }
}

add.onclick = function () {
    if (vtable.rows.length <= 6) {
        flags6 = 1

        let row = vtable.insertRow(rindex + 1);
        rindex = rindex + 1;

        let SNo = row.insertCell(0);
        let voltage = row.insertCell(1)
        let current = row.insertCell(2);
        let ai = row.insertCell(3);
        let ar = row.insertCell(4);
        let ac = row.insertCell(5);
        let pow = row.insertCell(6);

        SNo.innerHTML = rindex
        voltage.innerHTML = 220
        current.innerHTML = 34.97
        ai.innerHTML = 35.03
        ar.innerHTML = 4.4
        ac.innerHTML = 0.33
        pow.innerHTML = 984


        verify.disabled = false
    }
}

function task(i, x, y) {
    setTimeout(function () {
        angle = angle + x
        var_voltage = var_voltage + y

        knob.style.transform = "rotate(" + angle + "deg)"
        updateMeters()

    }, 20 * i);
}

knob.onclick = function () {

    if (variac_state == 1) {
        flags5 = 1
        for (let i = 0; i < 100; i++) {
            task(i, angle_inc, volt_inc);
        }

        if (angle_inc == -3.6) {
            angle_inc = 3.6
            volt_inc = 2.2
            add.disabled = true
        }
        else if (angle_inc == 3.6) {
            angle_inc = -3.6
            volt_inc = -2.2
            add.disabled = false
        }

    }
}

function rotate_element(deg, elemnt) {
    elemnt.style.transform = "rotate(" + deg + "deg)"
}

function calculateVars() {

    Mamm = (var_voltage / 220) * 34.97
    Mvol = (var_voltage / 220) * 220
    Watt = (var_voltage / 220) * 984

    let loadValueList = [36.03, 4.4, 0.33]
    amm1 = (var_voltage / 220) * loadValueList[connList[0]]
    amm2 = (var_voltage / 220) * loadValueList[connList[1]]
    amm3 = (var_voltage / 220) * loadValueList[connList[2]]
}

function updateMeters() {
    calculateVars()

    rotate_element(Mamm * (180 / 50), MainAmmeterNeedle)
    rotate_element(Mvol * (180 / 220), MainVoltmeterNeedle)
    rotate_element(amm1 * (180 / 50), TopAmmeterNeedle)
    rotate_element(amm2 * (180 / 50), SecAmmeterNeedle)
    rotate_element(amm3 * (180 / 50), BotAmmeterNeedle)
    rotate_element(Watt * (90 / 1500), WattmeterNeedle)
}

function setZero() {
    rotate_element(0, MainAmmeterNeedle)
    rotate_element(0, MainVoltmeterNeedle)
    rotate_element(0, TopAmmeterNeedle)
    rotate_element(0, SecAmmeterNeedle)
    rotate_element(0, BotAmmeterNeedle)
    rotate_element(0, WattmeterNeedle)
}

verify.onclick = function verify() {
    let ansList = [50, 6.28, 626.94, 20, 5, 6.41, 0.128, 7.7, 7.63]
    let usrList = [Rcalc, XLcalc, XCcalc, Lcalc, Ccalc, Zcalc, coscalc, Pcalc, Qcalc]
    let marks = 0
    for (let i = 0; i < ansList.length; i++) {
        if (ansList[i] == parseFloat(usrList[i].value)) {
            marks = marks + 1
            usrList[i].style.backgroundColor = "white"
        }
        else {
            usrList[i].style.backgroundColor = "red"
        }
    }
    if (marks == 9) {
        window.alert("values are correct!")
    }
    else {
        window.alert("Incorrect values")
    }
}

window.onload = function setJsPlumb() {
    setTimeout(() => {
        instance.connect({ source: MCB_Positive, target: MCB_Negative })
        instance.deleteEveryConnection()
    }, 50);
}

function highlight() {

    let conn = instance.getConnections();

    if (conn.length >= 1) {
        s1.style.color = "black";
        s2.style.color = "red";

    }

    if (flags2 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";
    }

    if (flags3 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "red";
    }

    if ((flags4 == 1)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "red";
    }

    if ((flags5 == 1)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "red";
    }

    if (flags6 == 1) {
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


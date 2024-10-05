var cont = document.getElementById("container")

var check = document.getElementById("check")
var add = document.getElementById("add")
var reset = document.getElementById("reset")
var calculate = document.getElementById("calculate")
var plot = document.getElementById("plot")

var MCB_image = document.getElementById("mcb")
var MCB = document.getElementById("mcb_switch")
var MCB_Positive = document.getElementById("mcb_p")
var MCB_Negative = document.getElementById("mcb_n")

var VoltmeterPositive = document.getElementById("p_v")
var VoltmeterNegative = document.getElementById("n_v")

var AmmeterPositive = document.getElementById("p_a")
var AmmeterNegative = document.getElementById("n_a")

var InductorPositive = document.getElementById("i_p")
var InductorNegative = document.getElementById("i_n")

var ResistorPositive = document.getElementById("rh_p")
var ResistorNegative = document.getElementById("rh_n")

var CapacitorPositive = document.getElementById("c_n")
var CapacitorNegative = document.getElementById("c_p")

var FunctionGene = document.getElementById("fg_on")
var FunctGeneA = document.getElementById("fg_a")
var FunctGeneB = document.getElementById("fg_b")
var FunctGeneC = document.getElementById("fg_c")
var FunctGeneD = document.getElementById("fg_d")
var FunctGeneDis = document.getElementById("fg_dis")
var FunctG_image = document.getElementById("transformer")
var FreqSlider = document.getElementById("RL")

var AmmeterNeedle = document.getElementById("P_A")
var VoltmeterNeedle = document.getElementById("P_V")

var vtable = document.getElementById("valTable")

var fr = document.getElementById("fr")
var QF = document.getElementById("QF")
var verify = document.getElementById("verify")

var mcb_state = 0;
var funcGen_state = 0;

var Mamm = 0
var Mvol = 0

var flagS = 1
var flags2 = 0
var flags3 = 0
var flags4 = 0
var flags5 = 0
var flags6 = 0

var rindex = 0

var ValidConn = [MCB_Positive, FunctGeneA, MCB_Negative, FunctGeneB, FunctGeneC, VoltmeterPositive, FunctGeneD, VoltmeterNegative]

function disconnect(num) {
    let node_list = [
        MCB_Positive, MCB_Negative,
        VoltmeterPositive, VoltmeterNegative,
        AmmeterPositive, AmmeterNegative,
        ResistorPositive, ResistorNegative,
        InductorPositive, InductorNegative,
        CapacitorPositive, CapacitorNegative,
        FunctGeneA, FunctGeneB, FunctGeneC, FunctGeneD

    ]
    instance.deleteConnectionsForElement(node_list[num])
}

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

    instance.addEndpoint([VoltmeterPositive, AmmeterPositive, MCB_Positive, InductorPositive, ResistorPositive, CapacitorPositive, FunctGeneA, FunctGeneB, FunctGeneC, FunctGeneD], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true
    })

    instance.addEndpoint([VoltmeterNegative, AmmeterNegative, MCB_Negative, InductorNegative, ResistorNegative, CapacitorNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)" },
        connectionType: "negative",
        maxConnections: 10,
        connectionsDetachable: true
    })

})

FreqSlider.oninput = function () {
    flagS = 1
    FunctGeneDis.value = "Fq = " + FreqSlider.value + " Hz"
    calculateVars()
    updateMeters()
    add.disabled = false
}

function conjNum(num) {
    return Math.abs(num - 1)
}

function ToLoads(ammNode, funNode) {
    let inductor = [InductorPositive, InductorNegative]
    let resistor = [ResistorPositive, ResistorNegative]
    let capacitor = [CapacitorPositive, CapacitorNegative]

    let loadsList = [inductor, resistor, capacitor]
    let arrange = []
    let index = [inductor, resistor, capacitor]

    for (let i = 0; i < loadsList.length; i++) {
        if (isConnected(loadsList[i][0], ammNode)) {
            arrange.push(loadsList[i][0])
            arrange.push(loadsList[i][1])
            index.splice(index.indexOf(loadsList[i]), 1)
        }
        else if (isConnected(loadsList[i][1], ammNode)) {
            arrange.push(loadsList[i][1])
            arrange.push(loadsList[i][0])
            index.splice(index.indexOf(loadsList[i]), 1)
        }
    }

    for (let i = 0; i < loadsList.length; i++) {
        if (isConnected(loadsList[i][0], funNode)) {
            arrange.push(loadsList[i][1])
            arrange.push(loadsList[i][0])
            index.splice(index.indexOf(loadsList[i]), 1)
        }
        else if (isConnected(loadsList[i][1], funNode)) {
            arrange.push(loadsList[i][0])
            arrange.push(loadsList[i][1])
            index.splice(index.indexOf(loadsList[i]), 1)
        }
    }

    temp = arrange.splice(2, 3)
    arrange.push(index[0][0])
    arrange.push(index[0][1])
    arrange = arrange.concat(temp)

    if ((isConnected(arrange[1], arrange[2])) && (isConnected(arrange[3], arrange[4]))) {
        return true
    }
    else if ((isConnected(arrange[1], arrange[3])) && (isConnected(arrange[2], arrange[4]))) {
        return true
    }
    else {
        return false
    }
}

function staticConn() {
    let VarOut = [FunctGeneC, FunctGeneD]
    let Ammeter = [AmmeterPositive, AmmeterNegative]

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

    console.log(conn)

    for (let i = 0; i < 2; i++) {
        if (isConnected(Ammeter[i], VarOut[i])) {
            if (ToLoads(Ammeter[conjNum(i)], VarOut[conjNum(i)])) {
                return true
            }
        }
        else if (isConnected(Ammeter[i], VarOut[conjNum(i)])) {
            if (ToLoads(Ammeter[conjNum(i)], VarOut[i])) {
                return true
            }
        }
    }
}

check.onclick = function checkConn() {
    flags2 = 1

    if (staticConn()) {
        MCB.disabled = false
        window.alert("Right connections!")
    }
    else {
        window.alert("Invalid connections!")
    }
}

function isConnected(node1, node2) {
    if ((instance.getConnections({ source: node1, target: node2 })[0] != undefined) || (instance.getConnections({ source: node2, target: node1 })[0] != undefined)) {
        return true;
    }
    else {
        return false;
    }
}

function rotate_element(deg, elemnt) {
    elemnt.style.transform = "rotate(" + deg + "deg)"
}

function setZero() {
    rotate_element(0, AmmeterNeedle)
    rotate_element(0, VoltmeterNeedle)
}

function calculateVars() {
    let freqList = [1, 2, 3, 4, 5, 6, 7, 8]
    let currList = [3.6, 7.0, 10, 8.8, 7.2, 6, 5.2, 4.6]

    Mamm = currList[freqList.indexOf(parseInt(FreqSlider.value))]
    Mvol = 10
}

function updateMeters() {
    calculateVars()

    rotate_element(Mamm * (180 / 10), AmmeterNeedle)
    rotate_element(Mvol * (180 / 220), VoltmeterNeedle)

}

MCB.onclick = function () {
    flags3 = 1
    console.log("workgin")
    if (mcb_state == 1) {
        mcb_state = 0
        MCB_image.src = '../Assets/MCB_off.png'
        MCB.style.transform = "translate(0px, 0px)"
        FunctG_image.src = '../Assets/function-generator-off.png'
        FunctionGene.disabled = true
        funcGen_state = 0
        setZero()
    }
    else if (mcb_state == 0) {
        mcb_state = 1
        MCB_image.src = '../Assets/MCB_ON.png'
        MCB.style.transform = "translate(0px, -49px)"
        FunctionGene.disabled = false
        if (funcGen_state == 1) {
            updateMeters()
        }
    }
}

FunctionGene.onclick = function () {
    flags4 = 1
    if (funcGen_state == 1) {
        funcGen_state = 0
        FunctG_image.src = '../Assets/function-generator-off.png'
        FreqSlider.disabled = true
        setZero()
    }
    else if (funcGen_state == 0) {
        funcGen_state = 1
        FunctG_image.src = '../Assets/function-generator-on.png'
        FreqSlider.disabled = false
        if (mcb_state == 1) {
            updateMeters()
        }
    }
}

add.onclick = function () {
    if (vtable.rows.length <= 6) {
        flags6 = 1

        let row = vtable.insertRow(rindex + 1);
        rindex = rindex + 1
        let SNo = row.insertCell(0);
        let voltage = row.insertCell(1);
        let current = row.insertCell(2);
        let freqency = row.insertCell(3);

        SNo.innerHTML = rindex;
        voltage.innerHTML = 10
        current.innerHTML = Mamm
        freqency.innerHTML = FreqSlider.value

        if ((FreqSlider.value == '3') && (flagS != 0) && (funcGen_state != 0)) {
            vtable.rows[rindex].style.backgroundColor = "yellow"
        }

        if (vtable.rows.length > 6) {
            verify.disabled = false
        }
    }
}

verify.onclick = function checkUsr() {
    let marks = 0
    if (parseFloat(fr.value) == 3) {
        marks = marks+1
        fr.style.backgroundColor = "white"
    }
    else {
        fr.style.backgroundColor = "red"
    }

    if (parseFloat(QF.value) == 2.34) {
        marks = marks + 1
        QF.style.backgroundColor = "white"
    }
    else {
        QF.style.backgroundColor = "red"
    }

    if(marks == 2){
        window.alert("Values are Verified!")
    }
    else{
        window.alert("Incorrect Values")
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
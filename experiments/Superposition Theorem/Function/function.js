var cont = document.getElementById("container")

var check = document.getElementById("check")
var add = document.getElementById("add")
var calculate = document.getElementById("calculate")
var prnt = document.getElementById("print")

var A1reading = document.getElementById("A1reading")
var A2reading = document.getElementById("A2reading")
var A3reading = document.getElementById("A3reading")

//var mcb_switch = document.getElementById("on_mcb")
var var_switch = document.getElementById("var_on")
var onOff_switch = document.getElementById("switch")

var on_power1 = document.getElementById("on_power1")
var on_power2 = document.getElementById("on_power2")

var vtable = document.getElementById("valTable")

var P_A1 = document.getElementById("P_A1")
var P_A2 = document.getElementById("P_A2")
var P_A3 = document.getElementById("P_A3")

var R1 = document.getElementById("R1")
var R2 = document.getElementById("R2")
var R3 = document.getElementById("R3")

var P1 = document.getElementById("P1")
var P2 = document.getElementById("P2")

var R1D = document.getElementById("R1Display")
var R2D = document.getElementById("R2Display")
var R3D = document.getElementById("R3Display")
var PS1D = document.getElementById("PS1Display")
var PS2D = document.getElementById("PS2Display")

var p_a1 = document.getElementById("p_a1")
var n_a1 = document.getElementById("n_a1")
var p_a2 = document.getElementById("p_a2")
var n_a2 = document.getElementById("n_a2")
var p_a3 = document.getElementById("p_a3")
var n_a3 = document.getElementById("n_a3")
var c_p_a1 = document.getElementById("c_p_a1")
var c_n_a1 = document.getElementById("c_n_a1")
var c_p_a2 = document.getElementById("c_p_a2")
var c_n_a2 = document.getElementById("c_n_a2")
var c_p_a3 = document.getElementById("c_p_a3")
var c_n_a3 = document.getElementById("c_n_a3")

var c_p_power1 = document.getElementById("c_p_power1")
var c_n_power1 = document.getElementById("c_n_power1")
var c_p_power2 = document.getElementById("c_p_power2")
var c_n_power2 = document.getElementById("c_n_power2")

var p_power1 = document.getElementById("p_power1")
var n_power1 = document.getElementById("n_power1")
var p_power2 = document.getElementById("p_power2")
var n_power2 = document.getElementById("n_power2")

var R1C = document.getElementById("R1C")
var R2C = document.getElementById("R2C")
var R3C = document.getElementById("R3C")
var csC = document.getElementById("currentSupplyC")
var vsC = document.getElementById("voltageSupplyC")
var R1cs = document.getElementById("R1_cs")
var R2cs = document.getElementById("R2_cs")
var R3cs = document.getElementById("R3_cs")
var R1vs = document.getElementById("R1_vs")
var R2vs = document.getElementById("R2_vs")
var R3vs = document.getElementById("R3_vs")
var R1cv = document.getElementById("R1_cv")
var R2cv = document.getElementById("R2_cv")
var R3cv = document.getElementById("R3_cv")
var R1cvU = document.getElementById("R1_cvU")
var R2cvU = document.getElementById("R2_cvU")
var R3cvU = document.getElementById("R3_cvU")

var sign1 = document.getElementById("sign1")
var sign2 = document.getElementById("sign2")
var sign3 = document.getElementById("sign3")

var s1 = document.getElementById("s1")
var s2 = document.getElementById("s2")
var s3 = document.getElementById("s3")
var s4 = document.getElementById("s4")
var s5 = document.getElementById("s5")
var s6 = document.getElementById("s6")
var s7 = document.getElementById("s7")

var connFlag = 0;

//var mcb_state = 0;
var power1_state = 0;
var power2_state = 0;
var onOff_state = 0;

var flagsCP1 = 0;
var flagsCP2 = 0;

var valConn = [
    p_a1, c_p_a1, n_a1, c_n_a1,
    p_a1, c_p_a2, n_a1, c_n_a2,
    p_a1, c_p_a3, n_a1, c_n_a3,

    p_a2, c_p_a1, n_a2, c_n_a1,
    p_a2, c_p_a2, n_a2, c_n_a2,
    p_a2, c_p_a3, n_a2, c_n_a3,

    p_a3, c_p_a1, n_a3, c_n_a1,
    p_a3, c_p_a2, n_a3, c_n_a2,
    p_a3, c_p_a3, n_a3, c_n_a3,
]
var valConn_case1 = [
    p_power1, c_p_power1, n_power1, c_n_power1,
    p_power2, c_p_power2, n_power2, c_n_power2,
]
var valConn_case2 = [
    p_power1, c_p_power1, n_power1, c_n_power1,

]
var arrChk = 0
var arrChk1 = 0
var arrChk2 = 0
var arrChk3 = 0

var checkflag1 = 0;
var checkflag2 = 0;
var flag_case = 0;
var flag_s2 = 0;
var flag_s3 = 0;
var flag_s4 = 0;
var flag_s5 = 0;

var I_r1_v = 0;
var I_r2_v = 0;
var I_r3_v = 0;

var I_r1_a = 0;
var I_r2_a = 0;
var I_r3_a = 0;

var I_r1 = 0;
var I_r2 = 0;
var I_r3 = 0;

var ndlList = [];
var connData = [];
var pointerArr = [P_A1, P_A2, P_A3];

var case_list = []

var index = 0;


R1.oninput = function R1input() {
    flag_s2 = 1;
    R1D.value = this.value
}

R2.oninput = function R2input() {
    flag_s2 = 1;
    R2D.value = this.value
}

R3.oninput = function R3input() {
    flag_s2 = 1;
    R3D.value = this.value
}

P1.oninput = function P1input() {
    flag_s2 = 1;
    flagsCP1 = 1;
    PS1D.value = this.value + ' A'
}

P2.oninput = function P2input() {
    flag_s2 = 1;
    flagsCP2 = 1;
    PS2D.value = this.value + ' V'
}

const instance = jsPlumb.getInstance({
    container: cont
});

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        },
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
    })

    instance.addEndpoint([p_a1, p_a2, p_a3, c_p_a1, c_p_a2, c_p_a3], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([c_p_power1, c_p_power2, p_power1, p_power2], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -70 }]
    })

    instance.addEndpoint([n_a1, n_a2, n_a3, c_n_a1, c_n_a2, c_n_a3], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([c_n_power1, c_n_power2, n_power1, n_power2], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -70 }]
    })

})

function disconnect(num) {
    let node_list = [p_a1, n_a1, p_a2, n_a2, p_a3, n_a3, p_power1, n_power1, c_p_power1, c_n_power1, c_p_a1, c_n_a1, c_p_a2, c_n_a2, c_p_a3, c_n_a3, c_p_power2, c_n_power2, p_power2, n_power2]
    instance.deleteConnectionsForElement(node_list[num])
}

function changeSign(sighID) {

    if (document.getElementById(sighID).innerHTML == "±") {
        document.getElementById(sighID).innerHTML = " + ";
    }
    else if (document.getElementById(sighID).innerHTML == " + ") {
        document.getElementById(sighID).innerHTML = " - ";
    }
    else if (document.getElementById(sighID).innerHTML == " - ") {
        document.getElementById(sighID).innerHTML = " + ";
    }
}

check.onclick = function chkConn() {

    //mcb_switch.disabled = false

    connData = []

    flag_s4 = 1

    instance.addEndpoint([p_a1, p_a2, p_a3, c_p_a1, c_p_a2, c_p_a3], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: false,
        maxConnections: 1
    })

    instance.addEndpoint([n_a1, n_a2, n_a3, c_n_a1, c_n_a2, c_n_a3], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: false,
        maxConnections: 1
    })

    for (var i = 0; i < valConn.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: valConn[i], target: valConn[i + 1] })[0] != undefined) || (instance.getConnections({ source: valConn[i + 1], target: valConn[i] })[0] != undefined)) {
                arrChk = arrChk + 1;

                if (i % 4 == 0) {
                    try {
                        if ((instance.getConnections({ source: valConn[i + 2], target: valConn[i + 3] })[0] == undefined) && (instance.getConnections({ source: valConn[i + 3], target: valConn[i + 2] })[0] == undefined)) {
                            arrChk = arrChk - 1;
                        }
                        else {
                            connData.push(i)
                        }
                    }
                    catch {
                        continue
                    }
                }
            }
        }
    }

    //case 1
    for (var i = 0; i < valConn_case1.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: valConn_case1[i], target: valConn_case1[i + 1] })[0] != undefined) || (instance.getConnections({ source: valConn_case1[i + 1], target: valConn_case1[i] })[0] != undefined)) {
                arrChk1 = arrChk1 + 1;
            }
        }
    }

    //case 2 voltage source connected
    for (var i = 0; i < valConn_case1.length; i++) {
        if ((i % 2 == 0) && (i > 3)) {
            if ((instance.getConnections({ source: valConn_case1[i], target: valConn_case1[i + 1] })[0] != undefined) || (instance.getConnections({ source: valConn_case1[i + 1], target: valConn_case1[i] })[0] != undefined)) {
                arrChk2 = arrChk2 + 1;
            }
        }
        else if (i <= 3) {
            if ((instance.getConnections({ source: valConn_case1[i] })[0] == undefined)) {
                arrChk2 = arrChk2 + 1;
            }
        }
    }

    // case 3 current source connected
    for (var i = 0; i < valConn_case2.length; i++) {
        if ((i % 2 == 0) && (i <= 3)) {
            if ((instance.getConnections({ source: valConn_case2[i], target: valConn_case2[i + 1] })[0] != undefined) || (instance.getConnections({ source: valConn_case2[i + 1], target: valConn_case2[i] })[0] != undefined)) {
                arrChk3 = arrChk3 + 1;
            }
        }
    }
    if ((instance.getConnections({ source: c_p_power2, target: c_n_power2 })[0] != undefined) || (instance.getConnections({ source: c_n_power2, target: c_p_power2 })[0] != undefined)) {
        arrChk3 = arrChk3 + 1;
    }

    if ((arrChk == 6) && (arrChk1 == 4) && (instance.getAllConnections().length == 10)) {
        window.alert("Right Connections, both Power Supplies are connected.")
        flag_case = 1;

        arrChk = 0;
        arrChk1 = 0;
        arrChk2 = 0;
        arrChk3 = 0;

        // P1.disabled = true
        // P2.disabled = true
        on_power1.disabled = false
        on_power2.disabled = false
        checkflag1 = 1;
        checkflag2 = 1;
        updateAmmeters();

    }

    else if ((arrChk == 6) && (arrChk2 == 6) && (instance.getAllConnections().length == 8)) {
        window.alert("Right Connections, only voltage supply is connected.")
        flag_case = 2;

        arrChk = 0;
        arrChk1 = 0;
        arrChk2 = 0;
        arrChk3 = 0;
        checkflag1 = 1
        checkflag2 = 0
        // P1.disabled = true
        // P2.disabled = true
        on_power1.disabled = false
        on_power2.disabled = false

        updateAmmeters();

    }

    else if ((arrChk == 6) && (arrChk3 == 3) && (instance.getAllConnections().length == 9)) {
        window.alert("Right Connections, only current supply is connected.")
        flag_case = 3;

        arrChk = 0;
        arrChk1 = 0;
        arrChk2 = 0;
        arrChk3 = 0;
        checkflag1 = 0
        checkflag2 = 1;
        // P1.disabled = true
        // P2.disabled = true
        on_power1.disabled = false
        on_power2.disabled = false

        updateAmmeters();

    }

    else if (instance.getConnections().length == 0) {
        window.alert("Please make connections")

        arrChk = 0;
        arrChk1 = 0;
        arrChk2 = 0;
        arrChk3 = 0;

        flag_case = 0;

        setZero();
    }

    else {
        window.alert("Invalid Connections")

        arrChk = 0;
        arrChk1 = 0;
        arrChk2 = 0;
        arrChk3 = 0;

        flag_case = 0;

        setZero();
        window.location.reload()
    }
}

function setZero() {

    P_A1.style.transform = "rotate(0deg)"
    P_A2.style.transform = "rotate(0deg)"
    P_A3.style.transform = "rotate(0deg)"
}

function updateAmmeters() {

    if ((((flag_case == 1) && (power1_state == 1) && (power2_state == 1)) || ((flag_case == 2) && (power2_state == 1)) || ((flag_case == 3) && (power1_state == 1)))) {

        var r1 = parseFloat(R1.value);
        var r2 = parseFloat(R2.value);
        var r3 = parseFloat(R3.value);

        var V = parseFloat(P2.value);
        var I = parseFloat(P1.value);

        var R = r3 + r2

        I_r1_v = 0;
        I_r2_v = parseFloat(V / R);
        I_r3_v = parseFloat(V / R);

        var case_2 = [I_r1_v, I_r2_v, I_r3_v]

        var t = (I * r3) / (r2 + r3);

        I_r1_a = I;
        I_r2_a = t;
        I_r3_a = I - t;

        var case_3 = [I_r1_a, I_r2_a, I_r3_a]

        I_r1 = I_r1_v - I_r1_a
        I_r2 = I_r2_v + I_r2_a
        I_r3 = I_r3_v - I_r3_a

        var case_1 = [I_r1, I_r2, I_r3]

        for (var j = 0; j < connData.length; j++) {

            if (flag_case == 1) {
                var d = case_1[(connData[j] / 4) - j * 3] * 3;
                pointerArr[j].style.transform = "rotate(" + Math.abs(d) + "deg)";
            }

            else if (flag_case == 2) {
                var d = case_2[(connData[j] / 4) - j * 3] * 3;
                pointerArr[j].style.transform = "rotate(" + Math.abs(d) + "deg)";
            }

            else if (flag_case == 3) {
                var d = case_3[(connData[j] / 4) - j * 3] * 3;
                pointerArr[j].style.transform = "rotate(" + Math.abs(d) + "deg)";
            }
        }
    }
}

window.onload = function setSize() {
    document.body.style.zoom = "89%"
}

// mcb_switch.onclick = function toggle_mcb() {
//     if (mcb_state == 0) {
//         mcb_state = 1;
//         document.getElementById("MCB").src = "../Assets/MCB_ON.png";
//         mcb_switch.style.transform = "translate(0px, -50px)"
//         P1.value = 0
//         P2.value = 0
//         PS1D.value = "0 A"
//         PS2D.value = "0 V"
//         updateAmmeters();
//     }
//     else if (mcb_state == 1) {
//         mcb_state = 0
//         document.getElementById("MCB").src = "../Assets/MCB_Off.png";
//         mcb_switch.style.transform = "translate(0px, 0px)"

//         power1_state = 0;
//         document.getElementById("power_1").src = "../Assets/current_src _off.png";
//         P1.value = 0
//         P2.value = 0
//         PS1D.value = "0 A"
//         PS2D.value = "0 V"
//         P1.disabled = true
//         P2.disabled = true

//         power2_state = 0;
//         document.getElementById("power_2").src = "../Assets/voltage_src _off.png";

//         setZero();
//     }
// }

on_power1.onclick = function toggle_onOff1() {

    add.disabled = false

    if ((power1_state == 0)) {
        power1_state = 1;
        document.getElementById("power_1").src = "../Assets/current_src _on.png";
        if ((checkflag2 == 1)&&(flagsCP1 == 0)) {
            P1.value = 0;
            PS1D.value = "0 A"
            P1.disabled = false;
        }
    }
    else if (power1_state == 1) {
        power1_state = 0;
        document.getElementById("power_1").src = "../Assets/current_src _off.png";
        if ((checkflag2 == 1)&&(flagsCP1 == 0)) {
            P1.value = 0;
            PS1D.value = "0 A"
            P1.disabled = true;
        }

        setZero();
    }
}

on_power2.onclick = function toggle_onOff2() {

    add.disabled = false

    if ((power2_state == 0)) {
        power2_state = 1;
        document.getElementById("power_2").src = "../Assets/voltage_src _on.png";
        if ((checkflag1 == 1)&&(flagsCP2 == 0)) {
            P2.value = 0;
            PS2D.value = "0 V"
            P2.disabled = false;
        }
    }
    else if (power2_state == 1) {
        power2_state = 0;
        document.getElementById("power_2").src = "../Assets/voltage_src _off.png";
        if ((checkflag1 == 1)&&(flagsCP2 == 0)) {
            P2.value = 0;
            PS2D.value = "0 V"
            P2.disabled = true;
        }
        setZero();
    }
}

add.onclick = function addToTable() {

    flag_s5 = flag_s5 + 1;

    if ((((flag_case == 1) && (power1_state == 1) && (power2_state == 1)) || ((flag_case == 2) && (power2_state == 1)) || ((flag_case == 3) && (power1_state == 1)))) {

        let row = vtable.insertRow(index + 1);

        index = index + 1;

        let SNo = row.insertCell(0);
        let i1 = row.insertCell(1);
        let i2 = row.insertCell(2);
        let i3 = row.insertCell(3);

        SNo.innerHTML = index

        if (flag_case == 1) {
            i1.innerHTML = I_r1.toPrecision(3)
            i2.innerHTML = I_r2.toPrecision(3)
            i3.innerHTML = I_r3.toPrecision(3)

            case_list.push(flag_case)
        }

        else if (flag_case == 2) {
            i1.innerHTML = I_r1_v.toPrecision(3)
            i2.innerHTML = I_r2_v.toPrecision(3)
            i3.innerHTML = I_r3_v.toPrecision(3)

            case_list.push(flag_case)
        }

        else if (flag_case == 3) {
            i1.innerHTML = I_r1_a.toPrecision(3)
            i2.innerHTML = I_r2_a.toPrecision(3)
            i3.innerHTML = I_r3_a.toPrecision(3)

            case_list.push(flag_case)
        }

        // mcb_state = 0
        // document.getElementById("MCB").src = "../Assets/MCB_Off.png";
        // mcb_switch.style.transform = "translate(0px, 0px)"

        if (checkflag2 == 1) {
            power1_state = 0;
            document.getElementById("power_1").src = "../Assets/current_src _off.png";
            //PS1D.value = '0 A'
            //P1.value = 0
            P1.disabled = true
        }

        if (checkflag1 == 1) {
            power2_state = 0;
            document.getElementById("power_2").src = "../Assets/voltage_src _off.png";
            //PS2D.value = '0 V'
            //P2.value = 0
            P2.disabled = true
        }

        setZero();

        if ((case_list.indexOf(1) >= 0) && (case_list.indexOf(2) >= 0) && (case_list.indexOf(3) >= 0) && (case_list.length >= 3)) {
            calculate.disabled = false;
        }

        this.disabled = true
    }
    else {
        window.alert("Please turn on the connected power supplies!")
    }
}

calculate.onclick = function doCalc() {

    if ((sign1.innerHTML != "±") && (sign3.innerHTML != "±") && (sign2.innerHTML != "±")) {

        window.scrollTo({
            top: 750,
            left: 0,
            behavior: 'smooth'
        });

        R1C.value = R1.value
        R2C.value = R2.value
        R3C.value = R3.value

        csC.value = P1.value
        vsC.value = P2.value

        R1cs.value = I_r1_v
        R2cs.value = I_r2_v
        R3cs.value = I_r3_v

        R1vs.value = I_r1_a
        R2vs.value = I_r2_a
        R3vs.value = I_r3_a

        if (sign1.innerHTML == " + ") {
            R1cv.value = (I_r1_a + I_r1_v).toPrecision(3)
        }
        else if (sign1.innerHTML == " - ") {
            R1cv.value = (I_r1_v - I_r1_a).toPrecision(3)
        }

        if (sign2.innerHTML == " + ") {
            R2cv.value = (I_r2_a + I_r2_v).toPrecision(3)
        }
        else if (sign2.innerHTML == " - ") {
            R2cv.value = (I_r2_v - I_r2_a).toPrecision(3)
        }

        if (sign3.innerHTML == " + ") {
            R3cv.value = (I_r3_a + I_r3_v).toPrecision(3)
        }
        else if (sign3.innerHTML == " - ") {
            R3cv.value = (I_r3_v - I_r3_a).toPrecision(3)
        }

        document.getElementById("verify").disabled = false
    }
    else {
        window.alert("Choose calculation signs first!")
    }
}

function VerifyUser() {

    if ((parseFloat(R1cv.value) == parseFloat(R1cvU.value)) && (parseFloat(R1cv.value) == I_r1.toPrecision(3))) {
        if ((parseFloat(R2cv.value) == parseFloat(R2cvU.value)) && (parseFloat(R2cv.value) == I_r2.toPrecision(3))) {
            if ((parseFloat(R3cv.value) == parseFloat(R3cvU.value)) && (parseFloat(R3cv.value) == I_r3.toPrecision(3))) {
                window.alert("Observations match the calculations! Super Position Priciple is verified")
                prnt.disabled = false
            }
            else {
                window.alert("I3 value is wrong")
            }
        }
        else {
            window.alert("I2 value is wrong")
        }
    }
    else {
        window.alert("I1 value is wrong")
    }
}

window.onload = function setJsPlumb() {
    setTimeout(() => {
        instance.connect({ source: n_power1, target: p_power1 })
        instance.deleteEveryConnection()
    }, 50);
}

function highlight() {

    let conn = instance.getConnections();

    if (flag_s2 == 0 && (conn.length != 0)) {
        flag_s2 = 0
        instance.deleteEveryConnection();
        window.alert("Please choose resitance values first")
    }

    // if ((flagsCP1 == 0) && (instance.getAllConnections().length != 0)) {

    //     if (((instance.getConnections({ source: p_power1 })[0] != undefined) || (instance.getConnections({ target: p_power1 })[0] != undefined) || (instance.getConnections({ source: n_power1 })[0] != undefined) || (instance.getConnections({ target: n_power1 })[0] != undefined))) {
    //         window.alert("Please choose current value first")
    //         instance.deleteConnectionsForElement(p_power1)
    //         instance.deleteConnectionsForElement(n_power1)
    //     }
    // }

    // if ((flagsCP2 == 0) && (instance.getAllConnections().length != 0)) {

    //     if (((instance.getConnections({ source: p_power2 })[0] != undefined) || (instance.getConnections({ target: p_power2 })[0] != undefined) || (instance.getConnections({ source: n_power2 })[0] != undefined) || (instance.getConnections({ target: n_power2 })[0] != undefined))) {
    //         window.alert("Please choose voltage value first")
    //         instance.deleteConnectionsForElement(p_power2)
    //         instance.deleteConnectionsForElement(n_power2)
    //     }
    // }

    if (flag_s2 == 1) {
        s1.style.color = "black";
        s2.style.color = "red";
        flag_s2 = 2
    }

    if ((conn.length != 0) && (flag_case == 0) && (flag_s2 == 2)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";

        R1.disabled = true;
        R2.disabled = true;
        R3.disabled = true;
    }

    if ((flag_case == 2) && (flag_s4 == 1)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "red";
    }

    if (((flag_case == 1) &&(power1_state == 1))) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "red";
    }

    if (flag_s5 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "red";
    }

    if (((flag_case == 2) && (power2_state == 1))) {
        flag_s5 = 2
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "red";
    }

    if ((flag_s5 > 1) && (flag_case == 3)) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "black";
        s8.style.color = "red";
    }

    if ((flag_s5 > 1) && (flag_case == 3)) {
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

window.setInterval(updateAmmeters, 100);
var cont = document.getElementById("container")

var add = document.getElementById("add")
var check = document.getElementById("check")
var calculate = document.getElementById("calculate")
var prnt = document.getElementById("print")

var loadImg = document.getElementById("loadImg")

var vtable = document.getElementById("valTable")

var P_V = document.getElementById("P_V")
var P_A = document.getElementById("P_A")
var P_M = document.getElementById("P_M")

var p_v = document.getElementById("p_v")
var n_v = document.getElementById("n_v")
var p_a = document.getElementById("p_a")
var n_a = document.getElementById("n_a")
var p_pow = document.getElementById("p_power")
var n_pow = document.getElementById("n_power")
var c_p_pow = document.getElementById("c_p_power1")
var c_n_pow = document.getElementById("c_n_power1")
var c_ul = document.getElementById("c_ul")
var c_ur = document.getElementById("c_ur")
var c_ll = document.getElementById("c_ll")
var c_lr = document.getElementById("c_lr")
var p_mul = document.getElementById("p_mul")
var n_mul = document.getElementById("n_mul")

var R1 = document.getElementById("R1")
var R2 = document.getElementById("R2")
var R3 = document.getElementById("R3")
var Rls = document.getElementById("Rls")

var RlD = document.getElementById("RlDisplay")
var R1D = document.getElementById("R1Display")
var R2D = document.getElementById("R2Display")
var R3D = document.getElementById("R3Display")
var PSD = document.getElementById("PSDisplay")
var MMD = document.getElementById("MMDisplay")

var VC = document.getElementById("VthC")
var RC = document.getElementById("RthC")
var RlC = document.getElementById("RlC")
var nu = document.getElementById("numerator")
var de1 = document.getElementById("denominator1")
var de2 = document.getElementById("denominator2")
var IlC = document.getElementById("IlC")
var Ilc = document.getElementById("IlC_calc")
var Ilo = document.getElementById("IlC_obsv")

var on_pow = document.getElementById("on_power")

var variacSlider = document.getElementById("variacSlider")

var pow_state = 0
var R;
var V;
var I;

var valconn1 = [c_p_pow, c_n_pow, p_mul, c_ul, n_mul, c_ll]
var valconn2 = [p_pow, c_p_pow, n_pow, c_n_pow, p_v, c_ul, n_v, c_ll]
var valconn3 = [p_pow, c_p_pow, n_pow, c_n_pow, c_lr, c_ll, p_a, c_ul, n_a, c_ur]

var conn = []

var obs = 0;
var case_checks = []
var caseVal;

var checkflag = 0;
var flags1 = 0
var flags1_2 = 0
var flags4 = 0
var flags5 = 0
var iter = []
var knob_state = 2000

window.onload = function setSize() {
    document.body.style.zoom = "89%"
}

const instance = jsPlumb.getInstance({
    container: cont
});

R1.oninput = function updateR1() {
    flags1 = 1
    R1D.value = this.value
}
R2.oninput = function updateR2() {
    flags1 = 1
    R2D.value = this.value
}
R3.oninput = function updateR3() {
    flags1 = 1
    R3D.value = this.value
}
Rls.oninput = function updateRls() {
    flags1 = 1
    RlD.value = this.value
}
variacSlider.oninput = function updateVS() {
    flags1_2 = 1
    PSD.value = this.value + ' V'
    updateAmmeters(caseVal)
}

// P_M.onclick = function rotateKnob() {
//     if (knob_state == 2000) {
//         knob_state = 200
//         this.style.transform = "rotate(-10deg)"
//     }
//     else if (knob_state == 200) {
//         knob_state = 2000
//         this.style.transform = "rotate(0deg)"
//     }
// }

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "negative": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "positive": {
            paintStyle: { stroke: "rgb(229, 106, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 106, 97)", strokeWidth: 2.5 }
        },
    })

    instance.addEndpoint([p_v, p_a, p_pow, c_ul, c_ur, c_p_pow, p_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(97, 106, 229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([n_v, n_a, n_pow, c_n_pow, n_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(229,97,97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([c_ll, c_lr], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(229,97,97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -40, proximityLimit: 10 }]
    })

    instance.addEndpoint([p_pow, c_p_pow], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(97, 106, 229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -40 }]
    })

    instance.addEndpoint([n_pow, c_n_pow], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(229,97,97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -40 }]
    })

})

function disconnect(num) {
    let node_list = [p_v, n_v, p_a, n_a, p_mul, n_mul, p_pow, n_pow, c_p_pow, c_n_pow, c_ul, c_ur, c_ll, c_lr]
    instance.deleteConnectionsForElement(node_list[num])
}

function checkcon(l) {
    var arrChk = 0;
    for (var i = 0; i < l.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: l[i], target: l[i + 1] })[0] != undefined) || (instance.getConnections({ source: l[i + 1], target: l[i] })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }
    }
    return arrChk;
}

function updateAmmeters(n) {
    var r1 = parseFloat(R1.value);
    var r2 = parseFloat(R2.value);
    var r3 = parseFloat(R3.value);
    var Rl = parseFloat(Rls.value)

    R = (r2 * r1) / (r1 + r2) + r3;

    V = (variacSlider.value * r2) / (r1 + r2)

    I = V / (R + Rl)

    if (n == 1) {
        MMD.value = R.toFixed(2)
        // if (knob_state == 200) {

        // }
        // else {
        //     window.alert("Please correct the multimeter settings and check again")
        //     MMD.value = "ERR!"
        // }
    }
    else if (n == 2) {
        var d = V * (220/180)
        P_V.style.transform = "rotate(" + Math.abs(d) + "deg)"
    }
    else if (n == 3) {
        var d = I * (180/10)
        P_A.style.transform = "rotate(" + Math.abs(d) + "deg)"
    }
}

check.onclick = function callCheck() {

    add.disabled = false

    var valList = [valconn1, valconn2, valconn3]

    if (instance.getAllConnections().length == 0) {
        window.alert("Please make connections")
        window.location.reload()
    }

    for (var i = 0; i < 3; i++) {
        if ((i == 0) && (checkcon(valList[i]) == 3) && (instance.getAllConnections().length == 3)) {
            window.alert("Multimeter connected")
            case_checks.push(1)
            caseVal = 1;
            break;
        }
        else if ((i == 1) && (checkcon(valList[i]) == 4) && (instance.getAllConnections().length == 4)) {
            window.alert("Voltmeter connected Please turn on the power supply")
            case_checks.push(2)
            variacSlider.disabled = true
            checkflag = 1;
            caseVal = 2;
            on_pow.disabled = false
            break;
        }
        else if ((i == 2) && (checkcon(valList[i]) == 5) && (instance.getAllConnections().length == 5)) {
            window.alert("Load connected Please turn on the power supply")
            case_checks.push(3)
            variacSlider.disabled = true
            checkflag = 1
            caseVal = 3;
            on_pow.disabled = false
            break;
        }
        else if ((i == 2)) {
            window.alert("Invalid connections")
            window.location.reload()
        }
    }
    iter.push(caseVal)

    // if ((iter.indexOf(1) >= 0) && (iter.indexOf(2) >= 0) && (iter.indexOf(3) >= 0)) {
    //     add.disabled = false
    // }

    updateAmmeters(caseVal)
}

on_pow.onclick = function toggle() {
    if (pow_state == 0) {
        document.getElementById("power").src = "../Assets/voltage_src _on.png"
        updateAmmeters();
        if (flags1_2 == 0) {
            variacSlider.disabled = false
        }
        pow_state = 1;
    }
    else if (pow_state == 1) {
        document.getElementById("power").src = "../Assets/voltage_src _off.png"
        variacSlider.disabled = true
        pow_state = 0
        P_A.style.transform = "rotate(0deg)"   
    }
}

add.onclick = function AddToTable() {

    flags4 = 1

    let row

    let SNo;
    let V_th;
    let R_th;
    let R_load;
    let Reading;

    if ((vtable.rows[vtable.rows.length - 1].cells[1] == '-') || (vtable.rows[vtable.rows.length - 1].cells[2] == '-') || (vtable.rows[vtable.rows.length - 1].cells[3] == '-')) {
        row = vtable.insertRow(obs + 1);

        SNo = row.insertCell(0);
        V_th = row.insertCell(1);
        R_th = row.insertCell(2);
        R_load = row.insertCell(3)
        Reading = row.insertCell(4);

        obs = obs + 1;
    }

    else {
        row = vtable.rows[obs + 1];

        SNo = row.cells[0];
        V_th = row.cells[1];
        R_th = row.cells[2];
        R_load = row.cells[3]
        Reading = row.cells[4];
    }

    SNo.innerHTML = obs + 1;
    if (caseVal == 2) {
        V_th.innerHTML = (V).toPrecision(2);
    }
    if (caseVal == 1) {
        R_th.innerHTML = (R).toPrecision(2);
    }
    if (caseVal == 3) {
        Reading.innerHTML = (I).toPrecision(2);
    }

    R_load.innerHTML = document.getElementById("Rls").value
    document.getElementById("power").src = "../Assets/voltage_src _off.png"
    variacSlider.disabled = true
    pow_state = 0
    variacSlider.disabled = true

    if ((vtable.rows[vtable.rows.length - 1].cells[1] != '-') || (vtable.rows[vtable.rows.length - 1].cells[2] != '-') || (vtable.rows[vtable.rows.length - 1].cells[3] != '-')) {
        calculate.disabled = false
    }
}

calculate.onclick = function doCalc() {

    window.scrollTo({
        top: 750,
        left: 0,
        behavior: 'smooth'
    });

    R1.disabled = false;
    R2.disabled = false;
    R3.disabled = false;
    Rls.disabled = false;
    variacSlider.disabled = false;

    VC.value = V
    RC.value = R
    RlC.value = Rls.value

    nu.value = V.toPrecision(3);
    de1.value = R.toPrecision(3);
    de2.value = Rls.value

    IlC.value = I.toPrecision(3);

    Ilc.value = I.toPrecision(3);
    document.getElementById("verifyButton").disabled = false
}

function verifyUser() {
    if (document.getElementById('IlC_obsv').value == "") {
        window.alert("Please enter the value to verify.")
    }

    else if (document.getElementById('IlC_calc').value == document.getElementById('IlC_obsv').value) {
        prnt.disabled = false
        window.alert("Observed Value is equal to calculated value. Hence, Thevenin's Theorem is verified");
    }

    else {

        window.alert("Observed value is not equal to calculated value.");

    }
}

window.onload = function setJsPlumb() {
    setTimeout(() => {
        instance.connect({ source: p_a, target: n_a })
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

    if ((flags1 == 0) && (instance.getAllConnections().length != 0)) {
        window.alert("Please choose resistance values first")
        instance.deleteEveryConnection();
    }

    // if ((flags1_2 == 0) && (instance.getAllConnections().length != 0)) {
    //     if (!((instance.getConnections({ source: p_pow })[0] == undefined) && (instance.getConnections({ target: p_pow })[0] == undefined) && (instance.getConnections({ source: n_pow })[0] == undefined) && (instance.getConnections({ source: n_pow })[0] == undefined))) {
    //         window.alert("Please choose voltage value first")
    //         instance.deleteConnectionsForElement(p_pow)
    //         instance.deleteConnectionsForElement(n_pow)
    //     }
    // }

    if (flags1 == 1) {
        s1.style.color = "black";
        s2.style.color = "red";
    }

    conn = instance.getConnections();

    if (conn.length >= 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";

        R1.disabled = true;
        R2.disabled = true;
        R3.disabled = true;
        Rls.disabled = true;
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


}

window.setInterval(highlight, 100);
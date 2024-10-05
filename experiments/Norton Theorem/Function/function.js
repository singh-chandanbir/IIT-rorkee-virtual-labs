var cont = document.getElementById("container")

var add = document.getElementById("add")
var check = document.getElementById("check")
var calculate = document.getElementById("calculate")
var verify = document.getElementById("verify")
var reset = document.getElementById("reset")
var prnt = document.getElementById("print")

var V1reading = document.getElementById("V1reading")
var A1reading = document.getElementById("A1reading")
var W1reading = document.getElementById("W1reading")
var answer = document.getElementById("answer")

var loadImg = document.getElementById("loadImg")

var vtable = document.getElementById("valTable")

var P_V = document.getElementById("P_V")
var P_A = document.getElementById("P_A")

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

var R1D = document.getElementById("R1Display")
var R2D = document.getElementById("R2Display")
var R3D = document.getElementById("R3Display")
var RlsD = document.getElementById("RlDisplay")
var PSD = document.getElementById("PSDisplay")
var MMD = document.getElementById("MMDisplay")

var IscC = document.getElementById("IscC")
var ReqC = document.getElementById("ReqC")
var RlC = document.getElementById("RlC")
var ReqC2 = document.getElementById("ReqC2")
var RlC2 = document.getElementById("RlC2")
var IlC = document.getElementById("IlC")
var num1 = document.getElementById("numeriator1")
var num2 = document.getElementById("numeriator2")
var newcell = document.getElementById("newcell")
var user = document.getElementById("user")

var on_pow = document.getElementById("on_power")

var variacSlider = document.getElementById("variacSlider")

var pow_state = 0
var R;
var Isc;
var Il;

var valconn1 = [c_p_pow, c_n_pow, p_mul, c_ul, n_mul, c_ll]
var valconn2 = [p_pow, c_p_pow, n_pow, c_n_pow, p_a, c_ul, n_a, c_ll]
var valconn3 = [p_pow, c_p_pow, n_pow, c_n_pow, c_lr, c_ll, c_ul, p_a, c_ur, n_a]

var conn = []

var obs = 0;
var case_checks = [];
var caseVal;

var iter = []
var flags1 = 0
var flags1_2 = 0
var flags4 = 0
var flags5 = 0
var flagADD = 0

window.onload = function setSize() {
    document.body.style.zoom = "89%"
}

const instance = jsPlumb.getInstance({
    container: cont
});

R1.oninput = function updateR1() {
    R1D.value = this.value
    flags1 = 1
}
R2.oninput = function updateR2() {
    R2D.value = this.value
    flags1 = 1
}
R3.oninput = function updateR3() {
    R3D.value = this.value
    flags1 = 1
}
Rls.oninput = function updateRls() {
    RlsD.value = this.value
    flags1 = 1
}
variacSlider.oninput = function updateVS() {
    PSD.value = this.value + " V"
    flags1_2 = 1
    add.disabled = false
    updateAmmeters(caseVal)
}

reset.onclick = function resetConn() {
    window.location.reload();
}

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        },
    })

    instance.addEndpoint([p_a, c_ul, c_ur, p_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([p_pow, c_p_pow], {
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

    instance.addEndpoint([n_a, c_lr, n_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([n_pow, c_n_pow], {
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

    instance.addEndpoint([c_ur], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([c_lr], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -40 }]
    })

    instance.addEndpoint([c_ll], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -40 }]
    })

})

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
    var Rl = parseFloat(Rls.value);
    var V = parseFloat(variacSlider.value)

    R = (r2 * r3) / (r3 + r2) + r1;

    Isc = (r2 / (r2 + r3)) * (V / R)

    Il = Isc * (R / (R + Rl))

    if (n == 1) {
        MMD.value = R.toFixed(2)
    }

    if (pow_state == 1) {
        if (n == 2) {
            var d = Isc * (180/220)
            P_A.style.transform = "rotate(" + Math.abs(d) + "deg)"
        }
        else if (n == 3) {
            var d = Il * (180/220)
            P_A.style.transform = "rotate(" + Math.abs(d) + "deg)"
        }
    }
}

check.onclick = function callCheck() {
    on_pow.disabled = false
    caseVal = 0;
    var valList = [valconn1, valconn2, valconn3]

    for (var i = 0; i < 3; i++) {
        if ((i == 0) && (checkcon(valList[i])) == 3) {
            window.alert("Multimeter connected")
            case_checks.push(1)
            caseVal = 1;
            add.disabled = false
        }
        else if ((i == 1) && (checkcon(valList[i])) == 4) {
            window.alert("Ammeter connected, please turn on the power supply")
            variacSlider.disabled = true;
            // on_pow.disabled = true;
            case_checks.push(2)
            caseVal = 2;
        }
        else if ((i == 2) && (checkcon(valList[i])) == 5) {
            window.alert("Load and Ammeter connected, please turn on the power supply")
            variacSlider.disabled = true;
            // on_pow.disabled = true;
            case_checks.push(3)
            caseVal = 3;
        }
    }

    if (instance.getAllConnections().length == 0) {
        window.alert("Please make connections")
    }

    else if (caseVal == 0) {
        window.alert("Invalid Connectios")
        window.location.reload()
    }

    iter.push(caseVal)

    // if ((iter.indexOf(1) >= 0) && (iter.indexOf(2) >= 0) && (iter.indexOf(3) >= 0)) {
    //     add.disabled = false
    // }

    updateAmmeters(caseVal)
}

on_pow.onclick = function toggle() {
    if (pow_state == 0) {
        document.getElementById("power").src = "../Assets/PowerSupplyOn.png"
        updateAmmeters()
        pow_state = 1;
        add.disabled = false

        if (flagADD == 0) {
            variacSlider.disabled = false
        }
    }
    else if (pow_state == 1) {
        document.getElementById("power").src = "../Assets/PowerSupplyOff.png"
        variacSlider.disabled = true
        updateAmmeters()
        pow_state = 0;
    }
}

add.onclick = function AddToTable() {

    document.getElementById("power").src = "../Assets/PowerSupplyOff.png"
    pow_state = 0;
    P_A.style.transform = "rotate(0deg)"

    variacSlider.disabled = true
    if (caseVal != 1) {
        flagADD = 1
    }

    calculate.disabled = false

    let row

    let SNo
    let tabPSvalu
    let tabIsc
    let tabR_n
    let tabIL
    let tabRl


    if ((vtable.rows[vtable.rows.length - 1].cells[2].innerHTML != '-') && (vtable.rows[vtable.rows.length - 1].cells[3].innerHTML != '-') && (vtable.rows[vtable.rows.length - 1].cells[4].innerHTML != '-')) {
        row = vtable.insertRow(obs + 1);

        SNo = row.insertCell(0);
        tabPSvalu = row.insertCell(1);
        tabIsc = row.insertCell(2);
        tabR_n = row.insertCell(3)
        tabIL = row.insertCell(4);
        tabRl = row.insertCell(5);

        obs = obs + 1;
    }
    else {
        row = vtable.rows[obs + 1]

        SNo = row.cells[0];
        tabPSvalu = row.cells[1];
        tabIsc = row.cells[2];
        tabR_n = row.cells[3]
        tabIL = row.cells[4];
        tabRl = row.cells[5];
    }

    SNo.innerHTML = obs + 1;

    tabPSvalu.innerHTML = variacSlider.value;

    if (caseVal == 3) {
        tabIL.innerHTML = Il.toFixed(2);
    }
    if (caseVal == 1) {
        tabR_n.innerHTML = R.toFixed(2);
    }
    if (caseVal == 2) {
        tabIsc.innerHTML = Isc.toFixed(2);
    }

    tabRl.innerHTML = document.getElementById("Rls").value;

    calculate.disabled = false
    add.disabled = true
}

calculate.onclick = function doCalc() {
    if ((case_checks.indexOf(1) != -1) && (case_checks.indexOf(2) != -1) && (case_checks.indexOf(3) != -1)) {

        window.scrollTo({
            top: 750,
            left: 0,
            behavior: 'smooth'
        });

        flags4 = 1

        IscC.value = Isc.toFixed(3)
        ReqC.value = R.toFixed(3)
        ReqC2.value = R.toFixed(3)
        RlC.value = Rls.value
        RlC2.value = Rls.value
        num1.value = Isc.toFixed(3)
        newcell.value = R.toFixed(3)
        num2.value = Il.toFixed(3)
        IlC.value = Il.toFixed(3)

        verify.disabled = false
    }
    else {
        window.alert("Please perform all the steps")
    }

}

verify.onclick = function verifyVal() {
    if (IlC.innerHTML == user.innerHTML) {
        window.alert("Observed value and calculated values are equal, Norton's Theorem is verified")
        prnt.disabled = false
    }
}

function disconnect(node) {
    var node_list = [p_a, n_a, p_mul, n_mul, p_pow, n_pow, c_p_pow, c_n_pow, c_ul, c_ur, c_ll, c_lr]
    instance.deleteConnectionsForElement(node_list[node])
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
        instance.deleteEveryConnection()
    }

    // if ((flags1_2 == 0) && (instance.getAllConnections().length != 0)) {

    //     if (!((instance.getConnections({ source: p_pow })[0] == undefined) && (instance.getConnections({ target: p_pow })[0] == undefined) && (instance.getConnections({ source: n_pow })[0] == undefined) && (instance.getConnections({ source: p_pow })[0] == undefined))) {
    //         window.alert("Please choose voltage value first")
    //         instance.deleteConnectionsForElement(p_pow);
    //         instance.deleteConnectionsForElement(n_pow);
    //     }
    // }

    if (flags1 == 1) {
        s1.style.color = "black";
        s2.style.color = "red";
    }

    conn = instance.getConnections();

    if ((conn.length >= 1) && (case_checks.indexOf(1) != -1) && (case_checks.indexOf(2) != -1) && (case_checks.indexOf(3) != -1)) {
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

}

window.setInterval(highlight, 100);

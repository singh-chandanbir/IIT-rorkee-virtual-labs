
var cont = document.getElementById("container")

var check = document.getElementById("check")
var add = document.getElementById("add")
var plot = document.getElementById("plot")
var prnt = document.getElementById("print")
var reset = document.getElementById("reset")

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

var p_mcb = document.getElementById("p_mcb")
var n_mcb = document.getElementById("n_mcb")
var p_v = document.getElementById("p_v")
var n_v = document.getElementById("n_v")
var p_a = document.getElementById("p_a")
var n_a = document.getElementById("n_a")
var v_w = document.getElementById("v_w")
var l_w = document.getElementById("l_w")
var m_w = document.getElementById("m_w")
var c_w = document.getElementById("c_w")
var a_var = document.getElementById("a_var")
var b_var = document.getElementById("b_var")
var c_var = document.getElementById("c_var")
var d_var = document.getElementById("d_var")

var transformer_a = document.getElementById("transformer_a")
var transformer_b = document.getElementById("transformer_b")
var transformer_c = document.getElementById("transformer_c")
var transformer_d = document.getElementById("transformer_d")
var lamp_load_a = document.getElementById("lamp_load_a")
var lamp_load_b = document.getElementById("lamp_load_b")
var output_p_v = document.getElementById("output_p_v")
var output_n_v = document.getElementById("output_n_v")

var output_p_a = document.getElementById("output_p_a")
var output_n_a = document.getElementById("output_n_a")

var output_v_var = document.getElementById("output_v_var")
var output_l_var = document.getElementById("output_l_var")
var output_m_var = document.getElementById("output_m_var")
var output_c_var = document.getElementById("output_c_var")

var knob = document.getElementById("Var_Knob")

var swit1 = document.getElementById("Switch1")
var swit2 = document.getElementById("Switch2")
var swit3 = document.getElementById("Switch3")

var Load1 = document.getElementById("R-lamp")
var Load2 = document.getElementById("Y-lamp")
var Load3 = document.getElementById("B-lamp")

var v1pointer = document.getElementById("P_V")
var a1pointer = document.getElementById("P_A")
var w1pointer = document.getElementById("P_W")

var v2pointer = document.getElementById("output_P_V")
var a2pointer = document.getElementById("output_P_A")
var w2pointer = document.getElementById("output_P_W")

var index = 6

var validConn = [
    p_mcb, a_var,
    n_mcb, b_var,
    c_var, p_v,
    d_var, n_v,
    p_v, p_a,
    n_a, m_w,
    m_w, c_w,
    l_w, transformer_a,
    n_v, v_w,
    v_w, transformer_b,
    transformer_c, output_p_v,
    transformer_d, output_n_v,
    output_p_v, output_p_a,
    output_n_a, output_m_var,
    output_m_var, output_c_var,
    output_n_v, output_v_var,
    lamp_load_a, output_l_var,
    lamp_load_b, output_v_var
]

var arrChk = []
var arrChkStore = []

var mcb_state = 0
var var_state = 0
var mcb_disabled = 1
var var_disabled = 1

var swtState = 0

var sw1_disabled = 1
var sw2_disabled = 1
var sw3_disabled = 1

var switch1 = document.getElementById("switch1")
var switch2 = document.getElementById("switch2")
var switch3 = document.getElementById("switch3")

var knob_state = 0;

var var_voltage = 0
var angle = 0
var angle_inc = 3.6
var volt_inc = 2.2

var v1val = 0
var a1val = 0
var w1val = 0
var v2val = 0
var a2val = 0
var w2val = 0
var eff = 0
var reg = 0

var effList = []
var regList = []
var PowList = []

function task(i, x, y) {
    setTimeout(function () {
        angle = angle + x
        var_voltage = var_voltage + y

        knob.style.transform = "rotate(" + angle + "deg)"
        updateAmmeters()

    }, 20 * i);
}

knob.onclick = function () {
    if (var_disabled == 0) {
        for (let i = 0; i < 100; i++) {
            task(i, angle_inc, volt_inc);
        }

        if (angle_inc == -3.6) {
            angle_inc = 3.6
            volt_inc = 2.2
            add.disabled = true
            sw1_disabled = 1
            sw2_disabled = 1
            sw3_disabled = 1

        }
        else if (angle_inc == 3.6) {
            angle_inc = -3.6
            volt_inc = -2.2
            add.disabled = false
        }
    }

}


const instance = jsPlumb.getInstance({
    container: cont
})

check.disabled = false

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
    instance.addEndpoint([p_mcb, m_w, output_p_a], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true
    })

    instance.addEndpoint([p_v, p_a], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -40 }]
    })
    instance.addEndpoint([c_var, l_w], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -50 }]
    })


    instance.addEndpoint([m_w, c_w], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["Bezier", { curviness: 150 }]
    })

    instance.addEndpoint([output_p_v], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["StateMachine", { curviness: -50 }]
    })

    instance.addEndpoint([v_w], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)" },
        connectionType: "negative",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["Bezier", { curviness: 150 }]
    })



    instance.addEndpoint([output_n_v, output_n_a], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,

    })

    instance.addEndpoint([n_a], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: 10 }]

    })


    instance.addEndpoint([n_v], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -60 }]

    })


    instance.addEndpoint([n_mcb], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: 50 }]

    })

    instance.addEndpoint([d_var], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -20 }]

    })

    instance.addEndpoint([output_n_a], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -50 }]

    })


    instance.addEndpoint([output_n_v], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -100 }]

    })

    instance.addEndpoint([transformer_d], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["Bezier", { curviness: 180 }]

    })

    instance.addEndpoint([transformer_c], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)" },
        connectionType: "positive",
        maxConnections: 10,
        connectionsDetachable: true,
        connector: ["Bezier", { curviness: 90 }]
    })

    instance.addEndpoint([a_var, transformer_a, lamp_load_a, output_l_var, output_m_var, output_c_var], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 10,
    })

    instance.addEndpoint([b_var, transformer_b, transformer_d, lamp_load_b, output_v_var], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([lamp_load_b], {

        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 10,
        connector: ["StateMachine", { curviness: -230 }]
    })

})


function isConnected(node1, node2) {
    if ((instance.getConnections({ source: node1, target: node2 })[0] != undefined) || (instance.getConnections({ source: node2, target: node1 })[0] != undefined)) {
        return true;
    }
    else {
        return false;
    }
}

check.onclick = function MyCheck() {

    flags3 = 1;

    for (var i = 0; i < validConn.length; i++) {

        if (i % 2 == 0) {
            console.log(isConnected(validConn[i], validConn[i + 1]))
            if (isConnected(validConn[i], validConn[i + 1])) {
                arrChk.push(isConnected(validConn[i], validConn[i + 1]))
            }
        }
    }

    if (arrChk.length == 18) {
        window.alert("Right Connections")
        arrChk = arrChkStore
        arrChk = []
        mcb_disabled = 0
        //code for the case when connections are correct
    }

    else {
        window.alert("Invalid Connnections")
        window.location.reload()
    }
}


function disconnect(num) {

    let node_list = [p_mcb, n_mcb, a_var, b_var, c_var, d_var, p_v, n_v, p_a, n_a, v_w, l_w, m_w, c_w, transformer_a, transformer_b, transformer_c, transformer_d, lamp_load_a, lamp_load_b,
        output_p_v, output_n_v, output_p_a, output_n_a, output_v_var, output_l_var, output_m_var, output_c_var]

    instance.deleteConnectionsForElement(node_list[num])

}

MCB.onclick = function togglemcb() {
    if (mcb_disabled == 0) {
        if (mcb_state == 0) {
            this.src = "../Assets/MCB_ON.png"
            mcb_state = 1;
            var_disabled = 0
        }

        else if (mcb_state == 1) {
            this.src = "../Assets/MCB_Off.png"
            mcb_state = 0;
            var_disabled = 1
            Var.src = "../Assets/Variac_OFF.png"
        }
    }
}

Var.onclick = function togglevar() {
    if (var_disabled == 0) {
        if (var_state == 0) {
            this.src = "../Assets/Variac_ON.png"
            var_state = 1
        }
        else if (var_state == 1) {
            this.src = "../Assets/Variac_OFF.png"
            var_state = 0
        }
    }
}

swit1.onclick = function call1() {
    if (sw1_disabled == 0) {
        toggleS1(1)
        toggleS2(0)
        toggleS3(0)
        swtState = 1
        updateAmmeters()
        sw2_disabled = 1
        add.disabled = false
    }
}

function toggleS1(num) {
    if (num == 0) {
        swit1.src = '../Assets/Switch_Off.png'
        Load1.src = '../Assets/r_off.png'
    }
    else if (num == 1) {
        swit1.src = '../Assets/Switch_On.png'
        Load1.src = '../Assets/r_on.png'
    }
}

swit2.onclick = function call1() {
    if ((sw2_disabled == 0)) {
        toggleS1(0)
        toggleS2(1)
        toggleS3(0)
        swtState = 2
        sw1_disabled = 1
        add.disabled = false
        sw3_disabled = 1
        updateAmmeters()
    }
}

function toggleS2(num) {
    if (num == 0) {
        swit2.src = '../Assets/Switch_Off.png'
        Load2.src = '../Assets/y_off.png'
    }
    else if (num == 1) {
        swit2.src = '../Assets/Switch_On.png'
        Load2.src = '../Assets/y_on.png'
    }

}

swit3.onclick = function call1() {
    if (sw3_disabled == 0) {
        toggleS1(0)
        toggleS2(0)
        toggleS3(1)
        swtState = 3
        sw1_disabled = 1
        sw2_disabled = 1
        add.disabled = false
        updateAmmeters()
    }
}

function toggleS3(num) {
    if (num == 0) {
        swit3.src = '../Assets/Switch_Off.png'
        Load3.src = '../Assets/b_off.png'
    }
    else if (num == 1) {
        swit3.src = '../Assets/Switch_On.png'
        Load3.src = '../Assets/b_on.png'
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

function rotateNeedle(needle, angle) {
    needle.style.transform = "rotate(" + angle + "deg)"
}


function updateAmmeters() {

    if (swtState == 0) {
        v1val = 220 * (var_voltage / 220)
        a1val = 0.1 * (var_voltage / 220)
        w1val = 25 * (var_voltage / 220)
        v2val = 108 * (var_voltage / 220)
        a2val = 0 * (var_voltage / 220)
        w2val = 0 * (var_voltage / 220)
        eff = 0
        reg =0
    }
    else if (swtState == 1) {
        v1val = 218 * (var_voltage / 220)
        a1val = 0.8 * (var_voltage / 220)
        w1val = 70 * (var_voltage / 220)
        v2val = 105 * (var_voltage / 220)
        a2val = 1 * (var_voltage / 220)
        w2val = 10 * (var_voltage / 220)
        eff = 29
        reg = 2.77
    }
    else if (swtState == 2) {
        v1val = 217 * (var_voltage / 220)
        a1val = 1.4 * (var_voltage / 220)
        w1val = 130 * (var_voltage / 220)
        v2val = 104 * (var_voltage / 220)
        a2val = 2 * (var_voltage / 220)
        w2val = 40 * (var_voltage / 220)
        eff = 62
        reg = 3.7
    }
    else if (swtState == 3) {
        v1val = 216 * (var_voltage / 220)
        a1val = 1.7 * (var_voltage / 220)
        w1val = 185 * (var_voltage / 220)
        v2val = 102 * (var_voltage / 220)
        a2val = 2.9 * (var_voltage / 220)
        w2val = 80 * (var_voltage / 220)
        eff = 86
        reg = 5.55
    }
    rotateNeedle(v1pointer, v1val * (180 / 220))
    rotateNeedle(a1pointer, a1val * (180 / 10))
    rotateNeedle(w1pointer, w1val * (90 / 1500))
    rotateNeedle(v2pointer, v2val * (180 / 220))
    rotateNeedle(a2pointer, a2val * (180 / 10))
    rotateNeedle(w2pointer, w2val * (90 / 1500))

}



add.onclick = function AddToTable() {
    let row = vtable.insertRow(index);

    let Sno = row.insertCell(0);
    let V1 = row.insertCell(1);
    let A1 = row.insertCell(2);
    let W1 = row.insertCell(3);
    let V2 = row.insertCell(4);
    let A2 = row.insertCell(5);
    let W2 = row.insertCell(6);
    let EFF = row.insertCell(7);
    let REG = row.insertCell(8);

    Sno.innerHTML = index - 6
    V1.innerHTML = v1val.toFixed(0)
    A1.innerHTML = a1val.toFixed(1)
    W1.innerHTML = w1val.toFixed(0)
    V2.innerHTML = v2val.toFixed(0)
    A2.innerHTML = a2val.toFixed(0)
    W2.innerHTML = w2val.toFixed(0)
    EFF.innerHTML = eff
    REG.innerHTML = reg
    index = index + 1

    effList.push(eff)
    regList.push(reg)
    PowList.push(w2val.toFixed(0))

    if(swtState == 0){
        sw1_disabled = 0
        sw2_disabled = 1
        sw3_disabled = 1
        switch1.style.color = 'red'
        switch2.style.color = 'white'
        switch3.style.color = 'white'
    }
    if(swtState == 1){
        sw1_disabled = 1
        sw2_disabled = 0
        sw3_disabled = 1
        switch1.style.color = 'white'
        switch2.style.color = 'red'
        switch3.style.color = 'white'
    }
    if(swtState == 2){
        sw1_disabled = 1
        sw2_disabled = 1
        sw3_disabled = 0
        switch1.style.color = 'white'
        switch2.style.color = 'white'
        switch3.style.color = 'red'
    }
    if(swtState == 3){
        sw1_disabled = 1
        sw2_disabled = 1
        sw3_disabled = 1
    }
    this.disabled = true

}


prnt.onclick = function prntScr() {
    window.print();
}

plot.onclick = function (){
    if (vtable.rows.length >= 4) {

        prnt.disabled = false

        var temp1 = document.getElementById("chart-container")
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
                labels: PowList,
                datasets: [{
                    label: "Efficiency",
                    fill: false,
                    lineTension: 0.3,
                    borderColor: "blue",
                    data: effList
                },
                {
                    label: "Regulation",
                    fill: false,
                    lineTension: 0.3,
                    borderColor: "green",
                    data: regList
                }]
            },

            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Percent (%)"
                        }
                    },
                    x: {
                        beginAtZero: true,
                        type: "linear",
                        title: {
                            display: true,
                            text: "Output Power"
                        }
                    }
                }
            }
        });
    }
    else{
        window.alert("Please enter atleast 4 obseravtions to the table.")
    }
}

// plot.onclick = function (){
//     console.log("i am alive")
    // if (vtable.ariaRowSpan.length >= 4) {

    //     prnt.disabled = false

    //     var temp1 = document.getElementById("chart-container")
    //     var temp2 = temp1.innerHTML
    //     temp1.innerHTML = temp2
        
    //     window.scrollTo({
    //         top: 750,
    //         left: 0,
    //         behavior: 'smooth'
    //     });

    //     new Chart("myPlot", {
    //         type: "line",
    //         data: {
    //             labels: PowList,
    //             datasets: [{
    //                 label: "I1",
    //                 fill: false,
    //                 lineTension: 0.3,
    //                 borderColor: "blue",
    //                 data: effList
    //             },
    //             {
    //                 label: "I2",
    //                 fill: false,
    //                 lineTension: 0.3,
    //                 borderColor: "green",
    //                 data: regList
    //             }]
    //         },

    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                     title: {
    //                         display: true,
    //                         text: "Current Values"
    //                     }
    //                 },
    //                 x: {
    //                     beginAtZero: true,
    //                     type: "linear",
    //                     title: {
    //                         display: true,
    //                         text: "Voltage (Power Supply)"
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }
    // else{
    //     window.alert("Please enter atleast 4 obseravtions to the table.")
    // }
// }
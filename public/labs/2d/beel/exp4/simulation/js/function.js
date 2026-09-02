
var cont = document.getElementById("container")

var add = document.getElementById("add")
var calculate = document.getElementById("calculate")
var prnt = document.getElementById("print")
var reset = document.getElementById("reset")

var mcb_switch = document.getElementById("on_mcb")
var var_switch = document.getElementById("var_on")
var knob = document.getElementById("Var_Knob")
var onOff_switch = document.getElementById("switch")

var up = document.getElementById("up")
var loadImg = document.getElementById("loadImg")

vtable = document.getElementById("valTable")

var P_V = document.getElementById("P_V")
var P_A = document.getElementById("P_A")
var P_W = document.getElementById("P_W")

var loadCon = document.getElementById("loadContain")

var p_mcb = document.getElementById("p_mcb")
var n_mcb = document.getElementById("n_mcb")
var on_mcb = document.getElementById("on_mcb")
var p_fuse = document.getElementById("p_fuse")
var n_fuse = document.getElementById("n_fuse")
var p_switch = document.getElementById("p_switch")
var n_switch = document.getElementById("n_switch")
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
var var_on = document.getElementById("var_on")
var p_l = document.getElementById("p_l")
var n_l = document.getElementById("n_l")
var str_l = document.getElementById("starter_l")
var str_r = document.getElementById("starter_r")
var chk_l = document.getElementById("choke_l")
var chk_r = document.getElementById("choke_r")

var DC1 = document.getElementById("DeviceC1")
var DC2 = document.getElementById("DeviceC2")
var VrC = document.getElementById("VariacValC")
var VC = document.getElementById("VoltmeterC")
var AC = document.getElementById("AmmeterC")
var WC = document.getElementById("WattmeterC")
var nu = document.getElementById("numerator")
var de1 = document.getElementById("denominator1")
var de2 = document.getElementById("denominator2")
var pf = document.getElementById("powerfactor")
var equalto = document.getElementById("equalto")

var s1 = document.getElementById("s1")
var s2 = document.getElementById("s2")
var s3 = document.getElementById("s3")
var s4 = document.getElementById("s4")
var s5 = document.getElementById("s5")
var s6 = document.getElementById("s6")
var s7 = document.getElementById("s7")

var Lstr_l = document.getElementById("label21")
var Lstr_r = document.getElementById("label22")
var Lchk_l = document.getElementById("label23")
var Lchk_r = document.getElementById("label24")

var valConn = [
    p_mcb, a_var,
    n_mcb, b_var,
    c_var, p_v,
    d_var, n_v,
    d_var, v_w,
    l_w, p_l,
    v_w, n_l,
]
var valList = [c_var, p_fuse, n_fuse, p_switch, n_switch, p_a];

var arrChk = 0

var index = -1;
var obs = 1;

var flags3 = 0;
var flags4 = 0;
var flags5 = 0;
var flags6 = 0;
var flags7 = 0;

var d1, d2, d3, d4;

var mcb_state = 0;
var var_state = 0;
var onOff_state = 0;
var load_state = 0;
var knob_state = 0;

var imgClicked = false
var mouseDown = false;

var var_voltage = 0
var angle = 0
var angle_inc = 3.6
var volt_inc = 2.3


function rotate_element(deg, elemnt) {

    elemnt.style.transform = "rotate(" + deg + "deg)"
}

window.onload = function setSize() {

    document.body.style.zoom = "99%"
    buildNodes(true)
}

const instance = jsPlumb.getInstance({

    container: cont
});

function disconnect(num) {

    let node_list = [p_mcb, n_mcb, p_v, n_v, p_a, n_a, v_w, l_w, m_w, c_w, a_var, b_var, c_var, d_var, p_fuse, n_fuse, p_switch, n_switch, p_l, n_l, str_l, str_r, chk_l, chk_r]
    instance.deleteConnectionsForElement(node_list[num])
}

function buildNodes(state_value) {

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

            "grey": {

                paintStyle: { stroke: "#525252", strokeWidth: 2.5 },
                hoverPaintStyle: { stroke: "#525252", strokeWidth: 2.5 }
            }
        })

        instance.addEndpoint([p_mcb, a_var], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 1,
            connector: ["StateMachine", { curviness: 20 }]

        })

        instance.addEndpoint([n_mcb, b_var], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 1,
            connector: ["StateMachine", { curviness: 20 }]

        })

        instance.addEndpoint([c_var], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 2,
            
            connector: ["StateMachine", { curviness: -50 }]

        })

        instance.addEndpoint([d_var, n_v], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 2,
            connector: ["StateMachine", { curviness: -50 }]

        })

        instance.addEndpoint([p_v], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 1,
            connector: ["StateMachine", { curviness: -50 }]

        })

        instance.addEndpoint([n_fuse, n_switch, p_fuse, p_switch], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "grey",
            paintStyle: { fill: "#525252", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 2,
            connector: ["StateMachine", { curviness: -20 }]

        })

        instance.addEndpoint([p_a], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 1,
            connector: ["StateMachine", { curviness: -20 }]

        })

        instance.addEndpoint([n_a], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 10,
            connector: ["StateMachine", { proxymityLimit: 0, curviness: -40 }]

        })

        instance.addEndpoint([m_w, c_w], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 10,
            connector: ["StateMachine", { curviness: -40 }]

        })

        instance.addEndpoint([l_w], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 10,
            connector: ["Bezier", { curviness: 20 }]

        })

        instance.addEndpoint([n_l], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 10,
            connector: ["Bezier", { curviness: 20 }]

        })

        instance.addEndpoint([v_w], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 10,
            connector: ["Bezier", { curviness: 20 }]

        })

        var test = instance.addEndpoint([p_l], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 10,
            connector: ["Bezier", { curviness: 20 }],
            uudi: "fuck"
        })

    })
}


function showTLLabel() {

    Lchk_l.style.opacity = 1;
    Lchk_r.style.opacity = 1;
    Lstr_l.style.opacity = 1;
    Lstr_r.style.opacity = 1;
}

function hideTLLabel() {

    Lchk_l.style.opacity = 0;
    Lchk_r.style.opacity = 0;
    Lstr_l.style.opacity = 0;
    Lstr_r.style.opacity = 0;
}

up.onclick = function GoUp() {

    check.disabled = false
    flags4 = 1;
    switch (index) {
        case -1:
            index = 1;
        case 3:
            loadImg.src = 'images/Loads/cfl off.jpeg';
            index = 0;
            instance.deleteEveryEndpoint();
            buildNodes(false);
            
            break;
        case 0:
            loadImg.src = 'images/Loads/lamp off.jpeg';
            index = 1;

            break;
        case 1:
            loadImg.src = 'images/Loads/led off.jpeg';
            index = 2;

            break;
        case 2:
            loadImg.src = 'images/Loads/tubelight off.jpeg';
            index = 3;
            flagCycle = 1

            
            break;
    }
    updateVals();
}

reset.onclick = function restConn() {
    window.location.reload();
}

check.onclick = function chkConn() {

    
    flags3 = 1


    for (var i = 0; i < valConn.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: valConn[i], target: valConn[i + 1] })[0] != undefined) || (instance.getConnections({ source: valConn[i + 1], target: valConn[i] })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }
    }
    console.log(arrChk)

    for (var i = 0; i < valList.length; i++) {
        if (((instance.getConnections({ source: valList[i] })[0] != undefined)) || ((instance.getConnections({ target: valList[i] })[0] != undefined))) {
            arrChk = arrChk + 1;
        }
    }
    console.log(arrChk)
    

    let conn_nodes = [n_a, m_w, c_w]
    let indexes = [1, 2, 4]

    let ThreeNode = false;
    let counter = 0;
    for (let i = 0; i < conn_nodes.length; i++) {
        for (let j = 0; j < conn_nodes.length; j++) {

            if ((instance.getConnections({ source: conn_nodes[i], target: conn_nodes[j] })[0] != undefined) || (instance.getConnections({ source: conn_nodes[j], target: conn_nodes[i] })[0] != undefined)) {
                counter = counter + (indexes[i] + indexes[j]);
            }
        }
    }

    if ((counter / 2 == 9) || (counter / 2 == 8) || (counter / 2 == 11) || (counter / 2 == 14)) {
        ThreeNode = true;
    }

    if ((arrChk == 13) && (instance.getAllConnections().length == 12) && (ThreeNode)) {
        window.alert("Right Connections!");
        check.disabled=1;

        document.getElementById("p_mcb").style.pointerEvents='none';
        document.getElementById("n_mcb").style.pointerEvents='none';
        document.getElementById("p_fuse").style.pointerEvents='none';
        document.getElementById("n_fuse").style.pointerEvents='none';
        document.getElementById("p_switch").style.pointerEvents='none';
        document.getElementById("n_switch").style.pointerEvents='none';
        document.getElementById("p_v").style.pointerEvents='none';
        document.getElementById("n_v").style.pointerEvents='none';
        document.getElementById("p_a").style.pointerEvents='none';
        document.getElementById("n_a").style.pointerEvents='none';
        document.getElementById("v_w").style.pointerEvents='none';
        document.getElementById("l_w").style.pointerEvents='none';
        document.getElementById("m_w").style.pointerEvents='none';
        document.getElementById("c_w").style.pointerEvents='none';
        document.getElementById("a_var").style.pointerEvents='none';
        document.getElementById("b_var").style.pointerEvents='none';
        document.getElementById("c_var").style.pointerEvents='none';
        document.getElementById("d_var").style.pointerEvents='none';
        document.getElementById("p_l").style.pointerEvents='none';
        document.getElementById("n_l").style.pointerEvents='none';


        instance.addEndpoint([p_mcb, a_var], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: 20 }]

        })

        instance.addEndpoint([n_mcb, b_var], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: 20 }]

        })

        instance.addEndpoint([c_var], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            
            connector: ["StateMachine", { curviness: -50 }]

        })

        instance.addEndpoint([d_var, n_v], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: -50 }]

        })

        instance.addEndpoint([p_v], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: -50 }]

        })

        instance.addEndpoint([n_fuse, n_switch, p_fuse, p_switch], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "grey",
            paintStyle: { fill: "#525252", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: -20 }]

        })

        instance.addEndpoint([p_a], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: -20 }]

        })

        instance.addEndpoint([n_a], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { proxymityLimit: 0, curviness: -40 }]

        })

        instance.addEndpoint([m_w, c_w], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["StateMachine", { curviness: -40 }]

        })

        instance.addEndpoint([l_w], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["Bezier", { curviness: 20 }]

        })

        instance.addEndpoint([n_l], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["Bezier", { curviness: 20 }]

        })

        instance.addEndpoint([v_w], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "negative",
            paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["Bezier", { curviness: 20 }]

        })

        var test = instance.addEndpoint([p_l], {

            endpoint: "Dot",
            anchor: ["Center"],
            isSource: true,
            isTarget: true,
            connectionType: "positive",
            paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
            connectionsDetachable: state_value,
            maxConnections: 0,
            connector: ["Bezier", { curviness: 20 }],
            uudi: "fuck"
        })



        up.disabled = true;
        arrChk = 0;
        check.disabled = true;
        mcb_switch.style.pointerEvents='auto';
        var_switch.style.pointerEvents='auto';

    }

    

    else if (instance.getConnections().length == 0) {

        window.alert("Please make the connections!");
        mcb_switch.style.pointerEvents='none';
        knob.style.pointerEvents='none';
        
    }

    else {

        window.alert("Invalid Connections!");
        window.location.reload();
        console.log(arrChk);
        console.log(ThreeNode);

        
    }

mcb_switch.onclick = function toggle_mcb() {

    flags5 = 1

    if (mcb_state == 0) {

        document.getElementById('MCB').src = 'images/MCB_ON.png'; 
        mcb_state = 1;
        mcb_switch.style.transform = "translate(0px, -49px)";
        mcb_switch.style.pointerEvents='none';
        onOff_switch.style.pointerEvents='none';
        

        onOff_switch.onclick = function toggle_switch() {

            if (onOff_state == 0) {
        
                document.getElementById('switch').src = 'images/Switch_On.png'; 
                onOff_state = 1;
                add.disabled=0;
                
               
               onOff_switch.style.pointerEvents='auto';
        
                if ((mcb_state == 1) && (var_state == 1) && (Math.abs(var_voltage).toFixed(0) != '0')) {
                    toggle_load_on();
                }
                updateVals();
            }
        
            else if (onOff_state == 1) {
        
                document.getElementById('switch').src = 'images/Switch_Off.png'; 
                onOff_state = 0;
                toggle_load_off();
                setZero();
                add.disabled=1;
                
               
            }
        }

        if ((var_state == 1) && (onOff_state == 1) && (Math.abs(var_voltage).toFixed(0) != '0')) {

            toggle_load_on();
            updateVals();
        }
    }
    else if (mcb_state == 1) {

        document.getElementById('MCB').src = 'images/MCB_off.png' 
        document.getElementById('Var').src = 'images/Variac_OFF.png';
        var_voltage = 0;
        var_voltage = 0;
        mcb_state = 0;
        mcb_switch.style.transform = "translate(0px, 0px)";

        toggle_load_off();

        setZero();
    }
}

    function toggle_load_off() {
        switch (index) {
            case 0:
                loadImg.src = 'images/Loads/cfl off.jpeg';
                break;
            case 1:
                loadImg.src = 'images/Loads/lamp off.jpeg';
                
                
                break;
            case 2:
                loadImg.src = 'images/Loads/led off.jpeg';
               
                break;
            case 3:
                loadImg.src = 'images/Loads/tubelight off.jpeg';
               
                break;
        }
    }
    
    function toggle_load_on() {
        if (var_voltage != 0) {
            switch (index) {
                case 0:
                    loadImg.src = 'images/Loads/cfl on.jpeg';
                    break;
                case 1:
                    loadImg.src = 'images/Loads/lamp on.jpeg';
                    up.disabled=true;
                    onOff_switch.style.pointerEvents='none';
                   
                    break;
                case 2:
                    loadImg.src = 'images/Loads/led on.jpeg';
                    up.disabled=true;
                    onOff_switch.style.pointerEvents='none';
                    break;
                case 3:
                    loadImg.src = 'images/Loads/tubelight on.jpeg';
                    up.disabled=true;
                    onOff_switch.style.pointerEvents='none';
                    break;
            }
        }
    }


    var_switch.onclick = function toggle_var() {

        if (mcb_state == 1) {
    
            if (var_state == 0) {
    
                document.getElementById('Var').src = 'images/Variac_ON.png'; 
                add.disabled = false;
                var_state = 1;
                add.disabled=1;
                var_switch.style.pointerEvents='none';
                
                

                if(var_state == 1 )   {
    
                   onOff_switch.style.pointerEvents = "auto";

                }

         

     function task(i, x, y) {

        setTimeout(function () {
    
            angle = angle + x;
            var_voltage = var_voltage + y;
    
            knob.style.transform = "rotate(" + angle + "deg)"
    
            if((flags3 == 1)&&(mcb_state==1)&&(onOff_state==1)&&(var_state==1)) {
                updateVals();
                if(Math.abs(var_voltage).toFixed(0) != '0'){
    
                    toggle_load_on();
                }
                else if(Math.abs(var_voltage).toFixed(0) == '0'){
    
                    toggle_load_off();
                    setZero();
                }
            }
    
        }, 20 * i);
    }
    
    knob.onclick = function () {

        knob.style.pointerEvents='none';
       
    
        for (let i = 0; i < 100; i++) {
            
            task(i, angle_inc, volt_inc);
        }
    
        if(angle_inc == -3.6) {
    
            angle_inc = 3.6;
            volt_inc = 2.3;
           
            
    
        }
    
        else if(angle_inc == 3.6) {
    
            angle_inc = -3.6;
            volt_inc = -2.3;
           
        }
    
        
    
        

    }

    
                if ((onOff_state == 1)&&(Math.abs(var_voltage).toFixed(0) != '0')) {
    
                    toggle_load_on();
                }
    
                updateVals();
            }
            else if (var_state == 1) {
    
                document.getElementById('Var').src = 'images/Variac_OFF.png'; 
    
                var_voltage = 0;
                var_state = 0;
                angle_inc = 3.6;
                volt_inc = 2.3;
    
                toggle_load_off();
                setZero();
            }
        }
    }
    
    
    
}
     

function setZero() {

    P_V.style.transform = "rotate(0deg)";
    P_A.style.transform = "rotate(0deg)";
    P_W.style.transform = "rotate(0deg)";
}

function updateVals() {

    d2 = var_voltage * 0.6;

    if ((mcb_state == 1) && (onOff_state == 1) && (var_state == 1)) {
        P_V.style.transform = "rotate(" + Math.abs(d2) + "deg)"

        if (index == 0) {
            d3 = var_voltage * 0.1175 / 230
            d4 = var_voltage *  24 / 230

            P_A.style.transform = "rotate(" + Math.abs(d3 * (180 / 500)) + "deg)"
            P_W.style.transform = "rotate(" + Math.abs(d4 * (90 / 100)) + "deg)"
        }
        if (index == 1) {
            d3 = var_voltage * 0.27 / 230
            d4 = var_voltage * 59.8/ 230

            P_A.style.transform = "rotate(" + Math.abs(d3 * (180 / 500)) + "deg)"
            P_W.style.transform = "rotate(" + Math.abs(d4 * (90 / 100)) + "deg)"
        }
        if (index == 2) {
            d3 = var_voltage * 0.045 / 230
            d4 = var_voltage * 8 / 230

            P_A.style.transform = "rotate(" + Math.abs(d3 * (180 / 500)) + "deg)"
            P_W.style.transform = "rotate(" + Math.abs(d4 * (90 / 100)) + "deg)"
        }
        if (index == 3) {
            d3 = var_voltage * 0.325 / 230
            d4 = var_voltage * 52.8 / 230

            P_A.style.transform = "rotate(" + Math.abs(d3 * (180 / 500)) + "deg)"
            P_W.style.transform = "rotate(" + Math.abs(d4 * (90 / 100)) + "deg)"
        }
    }
}


add.onclick = function AddToTable() {

    add.disabled=1;

    if (obs < 8) {

        flags6 = 1;

        let row = vtable.insertRow(obs);

        let SNo = row.insertCell(0);
        let volt = row.insertCell(1);
        let amps = row.insertCell(2);
        let watts = row.insertCell(3);
        let Pf = row.insertCell(4);

        SNo.innerHTML = obs;

        volt.innerHTML = (var_voltage).toFixed(0);
        amps.innerHTML = (d3).toFixed(3);
        watts.innerHTML = (d4).toFixed(3);
        obs = obs + 1;

        calculate.disabled = false;
    }
}

calculate.onclick = function doCalc() {

    flags7 = 1;

    mcb_state = 0;
    onOff_state = 0;
    var_state = 0;
    document.getElementById('MCB').src = 'images/MCB_off.png'; 
    mcb_switch.style.transform = "translate(0px, 0px)";
    document.getElementById('Var').src = 'images/Variac_OFF.png';
    document.getElementById('switch').src = 'images/Switch_Off.png';


    function toggle_load_off() {

        switch (index) {
            case 0:
                loadImg.src = 'images/Loads/cfl off.jpeg';
                break;
            case 1:
                loadImg.src = 'images/Loads/lamp off.jpeg';
                break;
            case 2:
                loadImg.src = 'images/Loads/led off.jpeg';
                break;
            case 3:
                loadImg.src = 'images/Loads/tubelight off.jpeg';
                break;
        }

        
    }

    toggle_load_off();

    setZero();
     up.disabled=false;
    add.disabled = true;
    calculate.disabled = true;
    check.disabled = true;

    if (obs > 0) {

        if (index == 0) {

            vtable.rows[obs - 1].cells[4].innerHTML = 0.880;
        }
        else if (index == 1) {

            vtable.rows[obs - 1].cells[4].innerHTML = 0.960;
        }
        else if (index == 2) {

            vtable.rows[obs - 1].cells[4].innerHTML = 0.770;
        }
        else if (index == 3) {

            vtable.rows[obs - 1].cells[4].innerHTML = 0.707;
        }
    }

    switch (index) {
        case 0:
            DC1.value = "CFL"
            DC2.value = "CFL"
            equalto.value = 0.880
            break;
        case 1:
            DC1.value = "Lamp"
            DC2.value = "Lamp"
            equalto.value = 0.960
            break;
        case 2:
            DC1.value = "LED"
            DC2.value = "LED"
            equalto.value = 0.770
            break;
        case 3:
            DC1.value = "Tubelight"
            DC2.value = "Tubelight"
            equalto.value = 0.707
            break;
    }

    pf.value=""

    VrC.value = vtable.rows[obs - 1].cells[1].innerHTML

    VC.value = vtable.rows[obs - 1].cells[1].innerHTML
    AC.value = vtable.rows[obs - 1].cells[2].innerHTML
    WC.value = vtable.rows[obs - 1].cells[3].innerHTML

    nu.value = vtable.rows[obs - 1].cells[3].innerHTML
    de1.value = vtable.rows[obs - 1].cells[2].innerHTML
    de2.value = vtable.rows[obs - 1].cells[1].innerHTML
}

function verify_inputs() {

    if(equalto.value == "") {

        window.alert("First please enter the values");
    }

      else if((equalto.value == pf.value&&(equalto.value !=""))) {

          window.alert("The observations are verified!");

         }

    else {

        window.alert("The power factor of the load is not correct.");
     
    }

}



























































 

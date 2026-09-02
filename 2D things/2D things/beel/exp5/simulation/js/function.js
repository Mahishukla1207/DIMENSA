cont = document.getElementById("container")

check = document.getElementById("check")
add = document.getElementById("add")
plot = document.getElementById("plot")
prnt = document.getElementById("print")

MCB_image = document.getElementById("M")
MCB = document.getElementById("on_power")

       

MCB_Blue = document.getElementById("mcb_b")
MCB_Yellow = document.getElementById("mcb_y")   
MCB_Red = document.getElementById("mcb_r")

StarterInRed = document.getElementById("i_r")
StarterInYel = document.getElementById("i_y")
StarterInBlu = document.getElementById("i_b")
StarterOutRed = document.getElementById("o_r")
StarterOutYel = document.getElementById("o_y")
StarterOutBlu = document.getElementById("o_b")

MotorInRed = document.getElementById("motor-1")
MotorInYel = document.getElementById("motor-2")
MotorInBlu = document.getElementById("motor-3")




VoltmeterPositive = document.getElementById("p_v")
VoltmeterNegative = document.getElementById("n_v")
AmmeterPositive = document.getElementById("p_a")
AmmeterNegative = document.getElementById("n_a")

         

rotor = document.getElementById("rotor2")
VoltmeterNeedle = document.getElementById("P_V")
AmmeterNeedle = document.getElementById("P_A")
vtable = document.getElementById("valTable")

w1 = document.getElementById("w1_motor")
w2 = document.getElementById("w2_motor")

var StarterNodeEmpty;
var MotorNodeEmpty;

var countRotations = 0

var MCB_state = 0

var Torque = 0;
var Current = 0;
var MTSpeed = 0;
var mtspeed = 0;

var SpeedList = []
var TorqueList = []
var index = 1

var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var s4 = document.getElementById("s4");
var s5 = document.getElementById("s5");
var s6 = document.getElementById("s6");

var flags2 = 0;
var flags3 = 0;
var flags4 = 0;
var flags5 = 0;
var flags6 = 0;


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
        maxConnections: 1,
        connector: ["StateMachine", { curviness: 30 }]
    })

    instance.addEndpoint([MCB_Blue], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue0",
        paintStyle: { fill: "blue", strokeWidth: 2.5 },
        maxConnections: 1
    })

    instance.addEndpoint([MCB_Yellow], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "yellow0",
        paintStyle: { fill: "yellow", strokeWidth: 2.5 },
        maxConnections: 1
    })

    instance.addEndpoint([StarterInBlu, StarterInRed, StarterInYel, StarterOutYel, MotorInBlu, MotorInRed, MotorInYel], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 1
    })


instance.addEndpoint([StarterOutRed], {
  endpoint: "Dot",
  anchor: ["Center"],
  isSource: true,
  isTarget: true,
  connectionsDetachable: true,
  connectionType: "red",
  paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
  maxConnections: 2,
  connector: ["StateMachine", { curviness: -110 }],
});


    instance.addEndpoint([StarterOutBlu], {

      endpoint: "Dot",
      anchor: ["Center"],
      isSource: true,
      isTarget: true,
      connectionsDetachable: true,
      connectionType: "red",
      paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
      maxConnections: 2,
      connector: ["StateMachine", { curviness: -110 }],

    });
    
    
    
    
    
    
    
    
    
    
    

    instance.addEndpoint([VoltmeterNegative, AmmeterNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue",
        paintStyle: { fill: "rgb(97, 97, 229)", strokeWidth: 2.5 },
        maxConnections: 1,
        connector: ["StateMachine", { curviness: -30 }]
    })

    instance.addEndpoint([VoltmeterPositive, AmmeterPositive], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 1,
        connector: ["StateMachine", { curviness: -30 }]
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

function MCBToStarter() {

    let MCB_nodes = [MCB_Red, MCB_Blue, MCB_Yellow]
    let Starter_nodes = [StarterInRed, StarterInBlu, StarterInYel]
    let counter = 0;

    for (let i = 0; i < MCB_nodes.length; i++) {

        for (let j = 0; j < Starter_nodes.length; j++) {

            if (isConnected(MCB_nodes[i], Starter_nodes[j])) {

                counter = counter + 1;
            }
        }
    }

    if (counter == 3) {

        return true;
    }
    else {

        return false;

    }
}

function StarterToMotor() {
    let Starter_nodes = [StarterOutBlu, StarterOutRed, StarterOutYel]
    let MotorInNodes = [MotorInRed, MotorInYel, MotorInBlu]
    let counter = 0;
    let motor_connected_r = 0;
    let motor_connected_b = 0;
    let motor_connected_y = 0;

    for (let i = 0; i < Starter_nodes.length; i++) {
        let starter_connected = 0;
        for (let j = 0; j < MotorInNodes.length; j++) {
            if (isConnected(Starter_nodes[i], MotorInNodes[j])) {
                counter = counter + 1;
                starter_connected = starter_connected + 1;
                switch (j) {
                    case 0:
                        motor_connected_r = motor_connected_r + 1
                        break;
                    case 1:
                        motor_connected_y = motor_connected_y + 1
                        break;
                    case 2:
                        motor_connected_b = motor_connected_b + 1
                        break;
                }
                
                break;
            }
        }

        if (starter_connected == 0) {
            StarterNodeEmpty = Starter_nodes[i];
        }
    }

    if (motor_connected_b == 0) {
        MotorNodeEmpty = MotorInBlu
    }
    else if (motor_connected_y == 0) {
        MotorNodeEmpty = MotorInYel
    }
    else if (motor_connected_r == 0) {
        MotorNodeEmpty = MotorInRed
    }

    if (counter == 2) {
        return true;
    }
    else {
        return false;
    }
}















































function checkVoltmeter() {
    let connected
    let unconnected
    let strt_nodes = [StarterOutBlu, StarterOutRed, StarterOutYel]

    if (isConnected(StarterNodeEmpty, VoltmeterPositive)) {
        connected = VoltmeterPositive
        unconnected = VoltmeterNegative
        strt_nodes.splice(strt_nodes.indexOf(StarterNodeEmpty), 1)
        if (isConnected(unconnected, strt_nodes[0]) || isConnected(unconnected, strt_nodes[1])) {
            return true
        }
    }

    else if (isConnected(StarterNodeEmpty, VoltmeterNegative)) {
        connected = VoltmeterNegative
        unconnected = VoltmeterPositive
        strt_nodes.splice(strt_nodes.indexOf(StarterNodeEmpty), 1)
        if (isConnected(unconnected, strt_nodes[0]) || isConnected(unconnected, strt_nodes[1])) {
            return true
        }
    }

}

function checkAmmeter() {

    if ((isConnected(StarterNodeEmpty, AmmeterNegative) && isConnected(MotorNodeEmpty, AmmeterPositive)) || (isConnected(StarterNodeEmpty, AmmeterPositive) && (isConnected(MotorNodeEmpty, AmmeterNegative)))) {
        return true
    }

}

check.onclick = function checkConn() {

    if (MCBToStarter() && StarterToMotor()) {
        
        if (checkAmmeter() && checkVoltmeter() && (instance.getAllConnections().length == 9)) {

            window.alert("Right Connections! Please Select weights and then turn on the MCB");

            check.disabled = true;
            flags2 = 1
            w1.disabled = false
            w1.style.border = '3px solid red'
            w2.disabled = false
            w2.style.border = '3px solid red'


            document.getElementById("label1").style.pointerEvents='none';
            document.getElementById("label2").style.pointerEvents='none';
            document.getElementById("label3").style.pointerEvents='none';
            document.getElementById("label4").style.pointerEvents='none';
            document.getElementById("label5").style.pointerEvents='none';
            document.getElementById("label6").style.pointerEvents='none';
            document.getElementById("label7").style.pointerEvents='none';
            document.getElementById("label8").style.pointerEvents='none';
            document.getElementById("label9").style.pointerEvents='none';
            document.getElementById("label10").style.pointerEvents='none';
            document.getElementById("label11").style.pointerEvents='none';
            document.getElementById("label12").style.pointerEvents='none';
            document.getElementById("label13").style.pointerEvents='none';
            document.getElementById("label14").style.pointerEvents='none';
            document.getElementById("label15").style.pointerEvents='none';
            document.getElementById("label16").style.pointerEvents='none';


            instance.addEndpoint([MCB_Red], {

                endpoint: "Dot",
                anchor: [["Center"]],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "red0",
                paintStyle: { fill: "red", strokeWidth: 2.5 },
                maxConnections: 0,
                connector: ["StateMachine", { curviness: 50 }]
            })
        
            instance.addEndpoint([MCB_Blue], {

                endpoint: "Dot",
                anchor: ["Center"],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "blue0",
                paintStyle: { fill: "blue", strokeWidth: 2.5 },
                maxConnections: 0
            })
        
            instance.addEndpoint([MCB_Yellow], {
                
                endpoint: "Dot",
                anchor: ["Center"],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "yellow0",
                paintStyle: { fill: "yellow", strokeWidth: 2.5 },
                maxConnections: 0
            })
        
            instance.addEndpoint([StarterInBlu, StarterInRed, StarterInYel, StarterOutYel, MotorInBlu, MotorInRed, MotorInYel], {
                endpoint: "Dot",
                anchor: ["Center"],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "red",
                paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
                maxConnections: 0
            })
        
        
        instance.addEndpoint([StarterOutRed,StarterOutBlu], {
                endpoint: "Dot",
                anchor: ["Center"],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "red",
                paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
                maxConnections: 0
            })



            instance.addEndpoint([VoltmeterNegative, AmmeterNegative], {
                endpoint: "Dot",
                anchor: ["Center"],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "blue",
                paintStyle: { fill: "rgb(97, 97, 229)", strokeWidth: 2.5 },
                maxConnections: 0,
                connector: ["StateMachine", { curviness: -30 }]
            })
        
            instance.addEndpoint([VoltmeterPositive, AmmeterPositive], {
                endpoint: "Dot",
                anchor: ["Center"],
                isSource: true,
                isTarget: true,
                connectionsDetachable: true,
                connectionType: "red",
                paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
                maxConnections: 0,
                connector: ["StateMachine", { curviness: -30 }]
            })
           
        }
       
        
    }

    else if(instance.getConnections().length == 0) {

        window.alert("Please make all the connections!");
    }  

    else {

        window.alert("Invalid Connections!");

    }
}

function calculateTorque() {
    if (w1.selectedIndex != 0) {

        let torqueOptions = [NaN, 0, 1.030, 2.648, 4.561, 5.297, 6.180]
        Torque = torqueOptions[w1.selectedIndex]

        let speedOptions = [NaN, 1492, 1450, 1420, 1380, 1330, 1300]
        MTSpeed = speedOptions[w1.selectedIndex]

        let currentOptions = [NaN, 0.5, 1, 1.5, 2, 2.5, 3]
        Current = currentOptions[w1.selectedIndex]

        prnt.disabled = false;
    }
    else {
        window.alert("Please select values of weights w1 and w2");
    }
}

function disconnect(num) {
    let nodes_list = [MCB_Red, MCB_Blue, MCB_Yellow, StarterInRed, StarterInBlu, StarterInYel, StarterOutRed, StarterOutBlu, StarterOutYel, VoltmeterPositive, VoltmeterNegative, AmmeterPositive, AmmeterNegative, MotorInRed, MotorInYel, MotorInBlu]
    instance.deleteConnectionsForElement(nodes_list[num])
}

function setMeters() {
    if (w1.selectedIndex != 0) {
        calculateTorque()
        VoltmeterNeedle.style.transform = "rotate(" + 144 + "deg)"
        AmmeterNeedle.style.transform = "rotate(" + Current * 18 + "deg)"
    }
}

function setZero() {
    AmmeterNeedle.style.transform = "rotate(0deg)"
    VoltmeterNeedle.style.transform = "rotate(0deg)"
    setSpeed(20000000)
}

function refresh() {

    calculateTorque()
    setMeters()

    let speedOptions = [NaN, 1, 1.333, 1.666, 2, 2.333, 2.666]
    mtspeed = speedOptions[w1.selectedIndex]
    setSpeed(mtspeed)
}

w1.oninput = function () {
    
    flags4 = 1
    w2.selectedIndex = w1.selectedIndex;
    w1.style.border = '0px solid red'
    w2.style.border = '0px solid red'
    MCB.disabled = false

    if (MCB_state == 1) {
        refresh()
       add.disabled=0;

    }
}
w2.oninput = function () {
    
    flags4 = 1
    w1.selectedIndex = w2.selectedIndex;
    w1.style.border = '0px solid red'
    w2.style.border = '0px solid red'
    MCB.disabled = false

    if(index.length == 6) {

        w2.style.pointerEvents='none';

    }

    if (MCB_state == 1) {
        refresh()
        add.disabled=0;
    }
    
}

MCB.onclick = function toggle_MCB() {

    if (MCB_state == 1) {
        MCB_state = 0;
        MCB_image.src = "images/MCB_Off.png"
        MCB.style.transform = "translate(0px, 0px)"
        setZero()
        allow = 0
    }
    else if (MCB_state == 0) {
        MCB_state = 1;
        MCB_image.src = "images/MCB_ON.png"
        MCB.style.transform = "translate(0px, -50px)"
        add.disabled = false
        setMeters()
        refresh()
        allow = 1
        flags3 = 1
        add.disabled=0;
        MCB.style.pointerEvents='none';
        
    }
}

add.onclick = function AddToTable() {

    if (index <= 6) {
        
        calculateTorque()
        var torque = Torque;
        var speed = MTSpeed;

        let row = vtable.insertRow(index);

        let Sno = row.insertCell(0)
        let volt = row.insertCell(1)
        let curr = row.insertCell(2)
        let w1Val = row.insertCell(3)
        let w2Val = row.insertCell(4)
        let tqVal = row.insertCell(5)
        let spVal = row.insertCell(6)

        Sno.innerHTML = index
        volt.innerHTML = 400
        setMeters()
        curr.innerHTML = Current.toFixed(2)
        w1Val.innerHTML = w1.value
        w2Val.innerHTML = w2.value
        tqVal.innerHTML = torque.toFixed(2)
        spVal.innerHTML = speed.toFixed(3)

        TorqueList.push(torque)
        SpeedList.push(speed)
        index = index + 1

        if (index > 6) {
            plot.disabled = false;
            
        }

        if(index == 7 ){

            w1.style.pointerEvents='none';
    
        }

        if(index == 7) {

            w2.style.pointerEvents='none';
        }

        add.disabled=1;
    }

}

plot.onclick = function plotGraph() {

    prnt.disabled = false

    flags6 = 1
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
            labels: TorqueList,
            datasets: [{
                label: "TORQUE-SPEED CHARACTERISTICS",
                fill: false,
                lineTension: 0,
                borderColor: "blue",
                data: SpeedList
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Speed (RPM)",
                        color:"black"
                    }
                },
                x: {
                    beginAtZero: true,
                    type: "linear",
                    title: {
                        display: true,
                        text: "Torque(N-m)",
                        color:"black"
                    }
                }
            }
        }
    });

    plot.disabled=1;
}










function setSpeed(value) {
    rotor.style.animation = "App-logo-spin infinite " + value + "s linear"
    
    
    
}




















window.onload = function setJsPlumb() {
    setTimeout(() => {
        instance.connect({ source: MCB_Red, target: MCB_Blue })
        instance.deleteEveryConnection()
    }, 50);
}










































window.setInterval(highlight, 100);
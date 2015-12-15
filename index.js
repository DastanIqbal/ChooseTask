var menu = require('node-menu');
var fs = require('fs');

//Setting Header
menu.customHeader(function () {
    process.stdout.write("\n\n\t\x1b[31m     JINEEEE\n\tCommand me Dastan\n\n\x1b[0m");
});
menu.addDelimiter('-', 40, '\x1b[32mDastan,What do you want to do?\x1b[0m');

var cmdJson = fs.readFileSync('auto_programs.json', 'utf8');
if (cmdJson.length == 0) {
    menu.addItem("\x1b[31mSorry!! Dastan I don\'t have your active program list\x1b[0m");
} else {
    JSON.parse(cmdJson).map(function (item) {
        menu.addItem(
            "\x1b[32m"+item.name+"\x1b[0m",
            function () {
                if(item.path.length!=0){
                    run_cmd(item.path, item.args);
                }else{
                    getMyIP();
                }
            })
    });
    menu.addDelimiter('-',40);
    menu.addItem("\x1b[31mHibernate the system\x1b[0m",function(){
        run_cmd("shutdown",["/h","/t","30"]);
    });

}
menu.addDelimiter('*', 40);
menu.start();

function run_cmd(cmd, args) {
    var spawn_ps = require('child_process').spawn,
    ps = spawn_ps(cmd, args, {
        detached: true
    });
    ps.stdout.on('data', function (data) {
        console.log('ps stdout: \x1b[32m' + data+"\x1b[0m");
    });

    ps.stderr.on('data', function (data) {
        console.log('ps stderr: \x1b[36m' + data+"\x1b[0m");
    });
}

function getMyIP() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = {};
    for (var k in interfaces) {
        if (k === "Wi-Fi") {
            //console.log(interfaces[k]);
            addresses.mac=interfaces[k][0].mac;
            for (var k2 in interfaces[k]) {
                var interfaceInfo = interfaces[k][k2];
                if (interfaceInfo.family === 'IPv6' && !interfaceInfo.internal) {
                    addresses.ipv6=interfaceInfo.address;
                }else if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                    addresses.ipv4=interfaceInfo.address;
                }
            }
        }
    }
    console.log("Dastan your IPv4 Address is \x1b[36m"+addresses.ipv4+"\x1b[0m");
    console.log("Dastan your IPv6 Address is \x1b[36m"+addresses.ipv6+"\x1b[0m");
    console.log("Dastan your MAC  Address is \x1b[36m"+addresses.mac+"\x1b[0m");
    //console.log("Sorry Dsatan this functionality is not available right now. But we are working hard");
}

/*
function getMyIP(){
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
   // console.log("Dastan your IPv4 Address is "+addresses);
   //console.log("Sorry Dsatan this functionality is not available right now. But we are working hard");
}*/

var inquirer = require('inquirer');
var fs = require('fs');
var json = fs.readFileSync("auto_programs.json", "utf8");

if (json.length == 0) {
    inquirer.prompt([
        {
            type: "input",
            name: "cofirm",
            message: "Sorry!! Dastan I don't have your active program list",
        }
    ], function (answers) {
            process.exit(0);
    });
} else {

    var jsonArray = JSON.parse(json);
    if (jsonArray.length != 0) {
        var jinee_choices = jsonArray.map(function (item) {
            return item.name;
        });

        inquirer.prompt([
            {
                type: "rawlist",
                name: "active_program",
                message: "What do you want to do Dastan?",
                choices: jinee_choices
            }
        ], function (answer) {
            var arrfind = jsonArray.filter(function (item) {
                return item.name == answer.active_program;
            });
            run_cmd(arrfind[0].path, arrfind[0].args);
        });
    } else {
        inquirer.prompt([
            {
                type: "confirm",
                name: "cofirm",
                message: "Sorry Dastan I don't have your active program list",
            }
        ], function (answers) {
            process.exit(0);
        });
    }
}


function run_cmd(cmd, args) {
    var spawn_ps = require('child_process').spawn,
        ps = spawn_ps(cmd, args, {
            detached: true
        });
    ps.stdout.on('data', function (data) {
        console.log('ps stdout: ' + data);
    });

    ps.stderr.on('data', function (data) {
        console.log('ps stderr: ' + data);
    });
}

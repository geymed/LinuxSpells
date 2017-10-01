var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

exec('which wget', function(err,stdout,stderr){
	if(err){
		console.log('wget is required to install this module');
		exec('which apt-get', function(err,stdout,stderr){
			if(!stdout){
				console.log('Automatic installation isn\'t supported on your system');
				console.log('Please install wget using your package manager');
				process.exit(1);
			}
			else{
				console.log('wget can be automatically installed on your system using apt-get');
				console.log('You may need to enter your password');
				rl.question('Would you like to install wget? [Y/n]', function(answer){
					if (answer.match(/^y/i)){
						var installation = spawn('sudo', ['apt-get', 'install', 'wget', '-y']);
						installation.stdout.on('data', function(data){
							process.stdout.write(data);
						});
						installation.stderr.on('data', function(data){
								process.stdout.write(data);
						});
						installation.on('close', function(code){
							console.log('wget installed successfully');
							process.exit(0);
						});
					}
				});
			}
		});
	}
	else{
		process.exit(0);
	}
});

var CronJob = Meteor.npmRequire('cron').CronJob;
var spawn = Meteor.npmRequire('child_process').spawn;

S3.config = {
    key: process.env.AWS_KEY_ID,
    secret: process.env.AWS_KEY_SECRET,
    bucket: 'gtb-backups'
};

var prefix = 'mongodb://';
var parse = function(url) {
  if (url.indexOf(prefix) != 0) throw Error('Invalid mongodb URL');
  url = url.replace(prefix, '');

  var parsed = {};

  // Get the database
  var split = url.split('/');
  url = split[0];
  parsed.database = split[1];

  // Split out username/password
  var split = url.split('@');
  if (split.length > 1) {
    url = split[1];
    var split = split[0].split(':');
    parsed.username = split[0];
    parsed.password = split[1];
  }

  // Split out host/port
  var split = url.split(':');
  parsed.host = split[0];
  parsed.port = split[1];

  return parsed;
}

Meteor.startup(function() {
  if (process.env.BACKUP) {
    var job = new CronJob('0 0 * * * *', function(){
      console.log('Backup started...');
      BackupDatabase();
      console.log('...backup complete');
    }, null, true);
    console.log("Scheduled backup sucessfully");
  } else {
    console.log("Refusing to schedule backup on devel");
  }
});

BackupDatabase = Meteor.bindEnvironment(function() {
  var config = {
    tmpDirectory: '/tmp',
    mongo: parse(process.env.MONGO_URL),
  };
  var steps = [function mongodump(done) {
    // Determine the command line arguments for the dump
    var args = [];
    args.push('--host', this.mongo.host + ':' + this.mongo.port);
    args.push('--db', this.mongo.database);
    args.push('-o', this.tmpDirectory);
    if (this.mongo.username && this.mongo.password) {
      args.push('-u', this.mongo.username);
      args.push('-p', this.mongo.password);
    }
    this.dumpDirectory = this.tmpDirectory + '/' + this.mongo.database;
    var mongodump = spawn('mongodump', args);
    mongodump.on('exit', function (code) {
      console.log('Mongodump done');
      done(null);
    });
  }, function zip(done) {
    var timestamp = new Date().toISOString().replace(/\..+/g, '').replace(/[-:]/g, '').replace(/T/g, '-');
    var basename = this.mongo.database + '-' + timestamp + '.tar.gz';
    var filename = this.tmpDirectory + '/' + basename;

    var args = ['-zcvf', filename, '-C', this.dumpDirectory, '.'];
    var tar = spawn('tar', args);
    this.basename = basename;
    this.filename = filename;
    tar.on('exit', function (code) {
      console.log('tar done');
      done(null);
    });
  }, function cleanDump(done) {
    var args = ['-r', this.dumpDirectory];
    var rm = spawn('rm', args);
    rm.on('exit', function (code) {
      console.log('Clean dir done');
      done(null);
    });
  }, function uploadToAws(done) {
    console.log('Starting upload');
    S3.knox.putFile(this.filename, this.basename, function(err, data) {
      console.log('Upload done');
      done(err);
    });
  }, function cleanZip(done) {
    var args = [this.filename];
    var rm = spawn('rm', args);
    rm.on('exit', function (code) {
      console.log('Clean zip done');
      done(null);
    });
  }];

  steps.forEach(function(step) {
    Async.runSync(step.bind(config));
  });
});

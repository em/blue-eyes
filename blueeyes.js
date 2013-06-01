var allEyeColors = 'blue,blue,blue,brown,brown,brown';
var curDay = 0;
var numDaysToWitness = 10; 
var dayOfAnnouncement = 5;
var numDead = 0;
var numDiedToday = 0;
var everyoneCountsBlueEyes = false;
//  ^ Specifically, everyone counts blue eyes,
//  AND everyone knows that everyone counts blue eyes
//  (it's global after all)

var islanders = allEyeColors.split(',').map(function(eyeColor) {
  return new Islander(eyeColor);
});

while(curDay <= numDaysToWitness) {

  // THE PROBLEM (affirming the consequent)
  if(dayOfAnnouncement == curDay) {
    everyoneCountsBlueEyes = true;

    // I initially called this variable
    // "blueEyesAreCommonKnowledge"
    // and having to change it per what
    // is happening made the problem obvious.

    // The puzzle gives no reason for this to change
    // It only changes the common knowledge of any
    // blue eyes. But the counting behavior must change
    // for the solution to be accurate.
    // If it had always been true they
    // would have already died.
 
    // The same problem applies to n == 1
    // We would have to assume the 1 person
    // with blue eyes looks around to count
    // a total of 0 other blue eye after the
    // announcement.
  }

  islanders.forEach(function(i) {
    if(!i.dead) {
      i.doReligion();
    }
  });

  printStats();

  numDead += numDiedToday;
  curDay++;
  numDiedToday = 0;
}

function Islander(eyeColor) {
  var self = this;
  self.eyeColor = eyeColor; // Only looked at by others
  self.dead = false;

  self.commitSuicide = function() {
    self.dead = true;
    numDiedToday++;
  }

  self.doReligion = function() {
    if(self.knowsOwnEyeColor()) {
      self.commitSuicide();
    }
  }

  self.forEveryOtherIslander = function(fn) {
    islanders.forEach(function(i) {
      if(i !== self) {
        fn(i);
      }
    });
  }

  self.numBlueEyesSeen = function() {
    var numBlue = 0;
    self.forEveryOtherIslander(function(i) {
      if(i.eyeColor === 'blue') {
        numBlue++;
      }
    });
    return numBlue;
  }

  self.knowsOwnEyeColor = function() {
    if(everyoneCountsBlueEyes) {
      var myCount = self.numBlueEyesSeen();
      if(curDay-dayOfAnnouncement === myCount) {
        if(numDead === 0) {
          // Fuck. They are all waiting on me
          // (thought by all blues simultaneously, ad-infinitum)
          return true;
        }
      }
    }

    return false;
  }
}

function printStats() {
    console.log('day:',
      pad(curDay-dayOfAnnouncement,3),
      '   dead:', pad(numDead,3),
      curDay === dayOfAnnouncement ? ' (announcement)' : '');

  function pad(n, width, z) {
    z = z || ' ';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

(function() {
  'use strict';

 //TODO put variables in a config file.
  var domainPath = 'somePath',
      clientId = 'yourClientId',
      teamId= 'yourteamId';

    //Initialize teamsnap
    teamsnap.init(clientId);
    //Check if token is stored in sessionStorage, authenticate and load data
    if (teamsnap.hasSession()) {
    teamsnap.auth();
    teamsnap.loadCollections(function(err) {
      if (err) {
        alert('Error loading TeamSnap SDK');
        return;
      }
      else {
        loadData();
      }
    });
  }
  else {
    var redirect = domainPath;
    var scopes = ['read', 'write'];
    teamsnap.startBrowserAuth(redirect, scopes, function(err) {
      if (err) {
        alert('Error loading TeamSnap SDK');
        return;
      }
      else {
        loadData();
      }
    });
  };

  function loadData() {
    teamsnap.loadTeam(teamId).then(function(item) {
      item.loadItems('members').then(function(member) {
        $(member).each(function() {
          $('table').append('<tr data-href='+ this.href + '><td>' + this.firstName + " " + this.lastName+ '</td><td><button class="btn btn-default remove">Remove</button></tr>');
        });
      });
    }).done(function() {
      $('p').remove();
    });
  };

  $('table').on('click', '.remove', function(e) {
    e.preventDefault();
    teamsnap.deleteMember($(this).closest('tr').attr('data-href'), function() {
      window.location.reload(true);
    });
  });
})();

angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function(moment, alert, calendarConfig) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    vm.events = [];

    var countries = ['US', 'VN', 'TW']
    // adding fetch calendar
    async function fetchCalendar(country) {
      const response = await fetch('https://calendarific.com/api/v2/holidays?&api_key=96f8f6e15400fc7e2ac19f502c3a3726c6169dcb&country='+country+'&year=2019');
      const text = await response.json();
      return text;
    }

    let temp;
    for (var c in countries) {
      fetchCalendar(countries[c]).then(text => temp = text.response).then(function() {console.log(temp.holidays.length)})
      .then(function() {
      for (var i = 0; i<temp.holidays.length; i++){
        vm.events.push(
        {
          title: 'This is every year',
          color: calendarConfig.colorTypes.important,
          startsAt: moment(temp.holidays[i].date.iso).startOf('day').toDate(),
          endsAt: moment(temp.holidays[i].date.iso).endOf('day').toDate(),
          recursOn: 'year',
          draggable: true,
          resizable: true,
          actions: actions
        }
        )}
      });}
    
    
    vm.cellIsOpen = true;
      
    vm.addEvent = function() {
      vm.events.push({
        title: 'New event',
        startsAt: moment(vm.viewDate).startOf('day').toDate(),
        endsAt: moment(vm.viewDate).endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true,
        actions: actions
      });
    };

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  });

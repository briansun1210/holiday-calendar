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
      const response = await fetch('https://calendarific.com/api/v2/holidays?&api_key=c694e798937f5e5a37d37b63b5d02eabd17d7c32&country='+country+'&year=2019');
      const text = await response.json();
      return text;
    }

    let temp;
    let colors = [calendarConfig.colorTypes.info, calendarConfig.colorTypes.warning, 
      calendarConfig.colorTypes.inverse, calendarConfig.colorTypes.special,
      calendarConfig.colorTypes.success, calendarConfig.colorTypes.important]
    for (var c in countries) {
      let tempc = colors[c];
      fetchCalendar(countries[c]).then(text => temp = text.response).then(function() {console.log(temp.holidays.length)})
      .then(function() {
      for (var i = 0; i<temp.holidays.length; i++){
        vm.events.push(
        {
          title: temp.holidays[i].name + ' - '+ temp.holidays[i].country.name,
          color: tempc,
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
      vm.events.unshift({
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

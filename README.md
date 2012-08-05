SimpleCounter
========
A simple counter that counts how much time remains/passed from a spcified date and time.
The class was inspired by a joomla pugin called util_counter, which can be found [here](http://www.ultijoomla.com/downloads?func=fileinfo&id=2)


![Screenshot](http://github.com/arieh/SimpleCounter/raw/master/screenshot.png)


How to use
----------
	
	#HTML
	<div id='res'></div>

Then the JS:
	
	#JS
	var counter = new SimpleCounter('res',new Date(2011,12,1));

Arguments
----------
	
1. element (`String` element id _or_ `Element`) : An element to inject the counter into.
2. time (`Integer` target timestamp _or_ `Date` target date): A traget date to cout to/from. *NOTE: timestamp provided must be in seconds, and not miliseconds*.
3. options - (`Object`: optional) See below:
Options
---------

1. format (`string`) : In what way to format the counter (see more below). default is `[D] [H] [M] [S]`.
2. lang (`object`): Alternative words to use or counter. for more detail see source code.
3. leadingZero (`bool`): whether to add a leading zero to numbers smaller than 10. default is `true`.
4. continue (`bool`) : whether to start countng upwards when countdown is done. default is `false`.

Date Format:
-------------

The class identifies 5 letters: `W` (weeks), `D`(days), `H`(hours), `M`(minutes), `S`(seconds) surounded by curly bracets. If the letters are capital, the unit's name will be used allongside the unit's number.
Else, if a smal letter is used, only the unit's number will be used.

Examples:

	#JS
	'{D} {h}:{m}:{s}' // 14 Days 10:34:15
	'{W}, {D}, {H} and {M}' // 5 Weeks, 14 Days, 10 Hours and 34 Minutes

Events
------

 * `done` : Fires when countdown is done
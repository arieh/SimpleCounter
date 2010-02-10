Class: SimpleCounter {#SimpleCounter}
==========================================
The Tree-Acordion takes a tree structured HTML element and adds the effects needed to make it use an accordion effect on its branches.
the class also provides keybard accessible interface.

SimpleCounter Method: constructor {#SimpleCounter:constructor}
---------------------------------
### Syntax:

	var counter = new SimpleCounter(element,time,options);

### Arguments:

1. element (`String` element id _or_ `Element`) : An element to inject the counter into.
2. time (`Integer` target timestamp _or_ `Date` target date): A traget date to cout to/from. NOTE: timestamp provided must be in seconds, and not miliseconds.
3. options - (`Object`: optional) See below:

### Options:

1. format (`string`) : In what way to format the counter (see more below). default is `[D] [H] [M] [S]`.
2. lang (`object`): Alternative words to use or counter. for more detail see source code.
3. leadingZero (`bool`): whether to add a leading zero to numbers smaller than 10. default is `true`. 
4. continue (`bool`) : whether to start countng upwards when countdown is done. default is `false`.

#### Date Format:

The class identifies 4 letters: `D`(days), `H`(hours), `M`(minutes), `S`(seconds) surounded by curly bracets. If the letters are capital, the unit's name will be used allongside the unit's number.
Else, if a smal letter is used, only the unit's number will be used.

### Example:

	'{D} {h}:{m}:{s}' // 14 Days 10:34:15
	'{D}, {H} and {M}' // 14 Days, 10 Hours and 34 Minutes
	
SimpleCounter Method : Start {#SimpleCounter:start}
---------------------
Will start the counter.

### Syntax:

	counter.start(time)

### Arguments:

1. time (`Integer` target timestamp _or_ `Date` target date. optional) : a new target time (see more details in constructor)

SimpleCounter Method : Stop {#SimpleCounter:stop}
-------------------
Will stop the counter.

### Syntax:
	
	counter.stop()
	
SimpleCounter: CSS-Class {#SimpleCounter:CSS}
--------------------
The Class uses the following CSS classes:
 
 * `counter_container` : the counter container.
 * `number` : the counter's unit numbers
 * `word` : the counter`s unit names
 
SimpleCounter: Events {#SimpleCounter:Events}
---------------------

 * `done` : Fires when countdown is done

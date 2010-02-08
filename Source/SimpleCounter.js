/*
---
description: a simple counter that counts how much time remains/passed from a spcified date and time

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Class, Class.Extras, Element]

provides: SimpleCounter

...
*/
/*!
Copyright (c) 2009 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/
var SimpleCounter = new Class({
	Implements : [Options, Events],
	options : {
		format : "[D] [H] [M] [S]", //how to format date output
		lang : {
			d:{single:'Day',plural:'Days'},
			h:{single:'Hour',plural:'Hours'},
			m:{single:'Minute',plural:'Minutes'},
			s:{single:'Second',plural:'Seconds'}
		},
		leadingZero : true, //whether or not to add a leading zero to counters
		'continue' : false
	},
	time :{d:0,h:0,m:0,s:0},
	stopTime : {d:false,h:false,m:false,s:false},
	currentTime : 0,
	handle : null,
	container : null,
	format:[],
	countDown : false,
	initialize : function(el,target_time,options){
		this.setOptions(options);
		
		this.format = this.options.format.split(/(\[M]|\[H]|\[D]|\[S]|\[m]|\[d]|\[h]|\[s])/);
		
		this.container = new Element('div',{'class':'counter_container'}).inject($(el));
		
		this.setTargetTime(target_time);
		
		this.setClock = this.setClock.bind(this);
		
		this.start();
	},
	setTargetTime : function(target_time){
		this.currentTime = (  ($type(target_time)=='date') ? ((target_time-new Date())/1000) : target_time-(new Date()/1000)  ).toInt();
		this.countDown = this.currentTime>0;
		if (this.currentTime<0) this.currentTime = this.currentTime*-1;
		
		var timeleft = this.currentTime,
			seconds,minutes,days,hours,i;
		
		seconds  =  timeleft%60;
		timeleft -= seconds;
		timeleft =  timeleft/60;
		
		minutes  =  timeleft%60;
		timeleft -= minutes;
		timeleft =  timeleft/60;
		
		hours    =  timeleft%24;
		timeleft -= hours;
		
		days     =  timeleft/24;
		
		if (days == 0 ) this.stopTime.d = true;
		if (hours == 0 ) this.stopTime.h = true;
		if (minutes == 0 ) this.stopTime.m = true;
		if (seconds == 0 ) this.stopTime.s = true;
		
		this.time = {d:days,h:hours,m:minutes,s:seconds};
	},
	setClock : function(){
		
		if (this.countDown) this.decrementTime();
		else this.incrementTime();
		
		var self = this,
			text ='',
			zero = this.options.leadingZero,
			seconds = (zero) ? ( (this.time.s<10) ? '0' + this.time.s : this.time.s ) : this.time.s,
			minutes = (zero) ? ( (this.time.m<10) ? '0' + this.time.m : this.time.m ) : this.time.m,
			hours   = (zero) ? ( (this.time.h<10) ? '0' + this.time.h : this.time.h ) : this.time.h,
			days    = (zero) ? ( (this.time.d<10) ? '0' + this.time.d : this.time.d ) : this.time.d;
		
		this.format.each(function(f){
			switch(f){
				case '[D]':
					text += "<span class='number'>" + days + "</span> <span class='word'>"    + self.options.lang.d[(days==1)    ? 'single' : 'plural'] + "</span>";
				break;
				case '[H]':
					text += "<span class='number'>" + hours + "</span> <span class='word'>"   + self.options.lang.h[(hours==1)   ? 'single' : 'plural'] + "</span>";
				break;
				case '[M]':
					text += "<span class='number'>" + minutes + "</span> <span class='word'>" + self.options.lang.m[(minutes==1) ? 'single' : 'plural'] + "</span>";
				break;
				case '[S]':
					text += "<span class='number'>" + seconds + "</span> <span class='word'>" + self.options.lang.s[(seconds==1) ? 'single' : 'plural'] + "</span>";
				break;
				case '[d]':
					text +="<span class='number'>" + days + "</span>"
				break;
				case '[h]':
					text +="<span class='number'>" + hours + "</span>"
				break;
				case '[m]':
					text +="<span class='number'>" + minutes + "</span>"
				break;
				case '[s]':
					text += "<span class='number'>" + seconds + "</span>"
				break;
				default:
					text += f;
				break;
			}
		});
		
		this.container.set('html',text);
	},
	decrementTime : function(){
		this.time.s--;
		if (this.time.s<0){
			this.time.s = this.stopTime.d ? 0 : 59;
			
			if (!this.stopTime.s && this.time.s ==0 ) this.stopTime.s = true;
			else this.time.m--;	
			
			if (this.time.m<0){
				this.time.m = (this.stopTime.h) ? 0 : 59;
				
				if (!this.stopTime.m && this.time.m ==0) this.stopTime.m = true;
				else this.time.h--;
				
				if (this.time.h<0){
					this.time.h = (this.stopTime.d) ? 0 : 23;
					
					if (!this.stopTime.h && this.time.h == 0) this.stopTime.h = true;
					else this.time.d--;
									
					if (!this.stopTime.d && this.time.d == 0) this.stopTime.d = true;
				}
			}
		}
		
		if (this.stopTime.s){
			this.fireEvent('done');
			if (this.options.continue) this.countDown = false;
			else this.stop();
		}
	},
	incrementTime : function(){
		this.time.s++;
		if (this.time.s>59){
			this.time.s=0;
			this.time.m++;
			
			if (this.time.m>59){
				this.time.m=0;
				this.time.h++;
				
				if (this.time.h>23){
					this.time.h = 0;
					this.time.d++
				}
			}
		}
	},
	start : function(target_time){
		if (target_time) this.setTargetTime(target_time);
		
		this.setClock();
		this.handle = this.setClock.periodical(1000);
	},
	stop : function(){
		$clear(this.handle);
	},
	toElement: function(){return this.container;}
});

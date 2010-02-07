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
	Implements : [Options],
	options : {
		format : "[D] [H] [M] [S]", //how to format date output
		lang : {
			d:{single:'Day',plural:'Days'},
			h:{single:'Hour',plural:'Hours'},
			m:{single:'Minute',plural:'Minutes'},
			s:{single:'Second',plural:'Seconds'}
		},
		leadingZero : true //whether or not to add a leading zero to counters
	},
	currentTime : '',
	handle : null,
	container : null,
	format:[],
	countDown : false,
	initialize : function(el,target_time,options){
		this.setOptions(options);
		this.format = this.options.format.split(/(\[M]|\[H]|\[D]|\[S]|\[m]|\[d]|\[h]|\[s])/);
		this.container = new Element('div',{'class':'counter_container'}).inject($(el));
		this.currentTime = ($type(target_time)=='date') ? ((target_time-new Date())/1000).toInt() : target_time-(new Date()/1000).toInt();
		this.countDown = this.currentTime>0;
		if (this.currentTime<0) this.currentTime = this.currentTime*-1;
		this.start();
	},
	setClock : function(){
		var timeleft = this.currentTime,
			text = '',
			self = this,
			seconds,minutes,days,hours,i;
			
		seconds = timeleft%60;
		timeleft -= seconds;
		timeleft = timeleft/60;
		
		minutes = timeleft%60;
		timeleft -= minutes;
		timeleft = timeleft/60;
		
		hours = timeleft%24;
		timeleft -= hours;
		
		days = timeleft/24;
		
		if (this.options.leadingZero) {
			if (seconds < 10) {
				seconds = '0'+seconds; 
			}
			if (minutes < 10) {
				minutes = '0'+minutes; 
			}
			if (hours < 10) {
				hours = '0'+hours; 
			}
		}		
		
		this.format.each(function(f){
			switch(f){
				case '[D]':
					text+="<span class='number'>"+days+"</span> <span class='word'>"+ self.options.lang.d[(days==1) ? 'single' : 'plural'] + "</span>";
				break;
				case '[H]':
					text+="<span class='number'>"+hours+"</span> <span class='word'>"+ self.options.lang.h[(hours==1) ? 'single' : 'plural'] + "</span>";
				break;
				case '[M]':
					text+="<span class='number'>"+minutes+"</span> <span class='word'>"+ self.options.lang.m[(minutes==1) ? 'single' : 'plural'] + "</span>";
				break;
				case '[S]':
					text+="<span class='number'>"+seconds+"</span> <span class='word'>"+ self.options.lang.s[(seconds==1) ? 'single' : 'plural'] + "</span>";
				break;
				case '[d]':
					text+="<span class='number'>"+days+"</span>"
				break;
				case '[h]':
					text+="<span class='number'>"+hours+"</span>"
				break;
				case '[m]':
					text+="<span class='number'>"+minutes+"</span>"
				break;
				case '[s]':
					text+="<span class='number'>"+seconds+"</span>"
				break;
				default:
					text+=f;
				break;
			}
		});
		
		this.container.set('html',text);
		if (this.countDown) this.currentTime--;
		else this.currentTime++;
		if (this.currentTime === 0) this.stop();
	},
	start : function(target_time){
		if (target_time){
			this.currentTime = ($type(target_time)=='date') ? ((target_time-new Date())/1000).toInt() : target_time-(new Date()/1000).toInt();
			this.countDown = this.currentTime>0;
			if (this.currentTime<0) this.currentTime = this.currentTime*-1;
		}
		this.setClock();
		this.handle = this.setClock.bind(this).periodical(1000);
	},
	stop : function(){
		$clear(this.handle);
	},
	toElement: function(){return this.container;}
});

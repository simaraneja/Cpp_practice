#include<iostream>
using std::cout;
using std::endl;

#include<iomanip>
using std::setfill;
using std::setw;

#include"Time.h"

Time::Time()
{
	hour = second = minute = 0;
}

void Time::setTime(int h, int m, int s)
{
	hour = (h >= 0 && h <= 23) ? h : 0;
	minute = (m >= 0 && m <= 60) ? m : 0;
	second =  (s >= 0 && s <= 60) ? s : 0;	
}

void Time::printUniversal()
{
	cout << setfill('0') << setw(2) << hour << ":" << setw(2) << minute << ":" << setw(2) << second;
}

void Time::printStandard()
{
	cout << ( (hour == 0 || hour == 12)? 12 : (hour % 12)) << ":" << setfill('0') << setw(2) << minute << ":" << setw(2) << second << " " <<( (hour < 12)? "AM" : "PM") << endl;
}

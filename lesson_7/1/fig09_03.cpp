#include <iostream>
using std::cout;
using std::cin;
using std::endl;


#include "Time.h"

int main()
{
	Time t;
	
	cout << "The initial Universal time is "; 
	t.printUniversal(); 
	cout << endl;
	cout << "The initial Standard time is "; 
	t.printStandard(); 
	cout << endl;

	t.setTime(14,5,16);

	cout << "The initial Universal time is ";
	t.printUniversal();
	cout << endl;
	cout << "The initial Standard time is ";
	t.printStandard();
	cout << endl;
	
	t.setTime(84,85,90); // invalid time setting.

	cout << "After Invalid time setting, The initial Universal time is ";
	t.printUniversal();
	cout << endl;
	cout << "After Invalid time setting, The initial Standard time is ";
	t.printStandard();
	cout << endl;
}

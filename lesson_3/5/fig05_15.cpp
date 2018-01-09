
#include<iostream>
using std::cout;
using std::endl;
using std::boolalpha; // it is also a sticky stream manipulator and causes 0 and 1 to print as true and false

int main()
{

	cout << boolalpha << "Logical AND (&&)" <<
	"\nfalse && false: " << (false && false) <<
	"\ntrue && false: " << (true && false) <<
	"\nfalse && true: " << (false && true) <<
	"\ntrue && true: " << (true && true) << endl;
	

	cout << boolalpha << "Logical OR (||)" <<
	"\nfalse || false: " << (false || false) <<
	"\ntrue || false: " << (true || false) <<
	"\nfalse || true: " << (false || true) <<
	"\ntrue || true: " << (true || true) << endl;

	cout << boolalpha << "Logical NOT (!)" <<
	"\n !false: " << (!false) <<
	"\n !true:  " << (!true) << endl;

	return 0;
}

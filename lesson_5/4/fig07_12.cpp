#include<iomanip>

#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::setw;
using std::setprecision;



int main()
{
	char string1[20];
	char string2[] = "string literal";

	cout << " Enter the string \"Hello there, World!!\" ";
	cin >> string1;

	cout << "String 1 is "<< string1 << " String 2 is " << string2 << endl;

	//printing using array indices

	cout << " string 1 with spaces is " << endl;
	for(int i = 0; string1[i] != '\0' ; i++ )
		cout << string1[i] << " " ;
	
	cout << endl;

	//remaining string printing
		cin >> string1;
		cout << "Remaining string is " << string1 << endl;
		cin >> string1;
		cout << "Still more remaining string is " << string1 << endl;

	return 0;
}


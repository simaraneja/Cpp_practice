#include<iomanip>

#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::fixed;
using std::setprecision;

#include "maximum.h"


int main()
{
	int var1,var2,var3;
	cout << "Enter Three integers"; 
	cin >> var1 >> var2 >> var3;
	cout << "Maximum number of all three numbers is " << maximum(var1,var2,var3) << endl; 
	
	double var11,var22,var33;
	cout << "Enter Three Doubles" ;
	cin >> var11 >> var22 >> var33;
	cout << "Maximum number of all three numbers is " << maximum(var11,var22,var33) << endl; 

	char var111,var222,var333;
	cout << "Enter Three Chars" ;
	cin >> var111 >> var222 >> var333;
	cout << "Maximum number of all three numbers is " << maximum(var111,var222,var333) << endl; 
	

	return 0;
}


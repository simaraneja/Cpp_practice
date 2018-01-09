
#include <iostream>
using std::cout;
using std::cin;
using std::endl;

#include <string>
using std::string;

#include <iomanip>
using std::fixed;
using std::setprecision;
using std::setw;

#include <cmath>
using std::pow;

int main()
{
	double interest_rate = 0.05;
	double principal = 1000.00;
	double total_amount;
	
	//set right aligned precision
	cout << "YEAR" << setw(21) << "Amount on Deposit" << endl;
	
	//set floating decimal trailing position
	cout << fixed << setprecision(2);

	for(int year = 1; year <= 10; year++)
	{
		total_amount = principal * pow(1.0 + interest_rate,year);

		//display year and amount with intend
		cout << setw(4) << year << setw(21) << total_amount << endl;

	}
	
	int test;
		test = pow(2,4);
		cout << test ;
		cout << endl ;
	return 0;
}

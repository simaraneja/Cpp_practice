#include<string>
using std::string;

#include<vector>
using std::vector;

#include<iostream>
using std::cin;
using std::cout;
using std::endl;
using std::fixed;

#include<iomanip>
using std::setw;

void outputVector( const vector< int > & );
void inputVector( vector< int > & );


int main()
{
	vector<int> integer1(7);
	vector<int> integer2(10);

	cout << "\nSize of vector 1 is :" << integer1.size() << "\nVector after initialization :" << endl;
	outputVector(integer1);
 

	cout << "\nSize of vector 2 is :" << integer2.size() << "\nVector after initialization :" << endl;
	outputVector(integer2);

	
	cout << "Enter 17 integers" <<endl;
	inputVector(integer1);
	inputVector(integer2);
	
	cout << "\nVector 1 values after Input" << endl;
	outputVector(integer1);
	cout << "\nVector 2 values after Input" << endl;
	outputVector(integer2);

	if(integer1 != integer2)
		cout << "\nBoth int 1 and 2 vector are not equal" << endl;
	
	vector <int> integer3(integer2);//copy constructor
	
	if(integer2 == integer3)
		cout << "\nBoth int 2 and int 3 vector are equal" << endl;

		
	integer1[5] = 1000;
	outputVector(integer1);
	cout << endl;

	cout << "Attempting overflow bound checks \n";
	integer1.at(15) = 2000;

	return 0;	
	
	
	
}

void outputVector(const vector<int> &int1)
{
	size_t size;
		
	for(size = 0; size < int1.size(); size++)
	{
		cout << setw(12) << int1[size];
		if((size + 1) % 4 == 0)
			cout << endl;
	}
	if((size + 1) % 4 != 0)
		cout << endl;

	return;
}

void inputVector(vector<int> &int2)
{
	for(size_t size = 0;size < int2.size(); size++)
		cin >> int2[size];

	return;
}

#include<iomanip>

#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::setw;
using std::setprecision;



int main()
{
	int arr[10];
	
	//initialize
	
	for(int i = 0;i < 10;i++) { arr[i] = 0; }

	//print value of arr

	cout << "Element" << setw(13) << "value" << endl;

	for (int j = 0; j < 10; j++) { cout << setw(7) << j << setw(13) << arr[j] << endl; }

	return 0;
}


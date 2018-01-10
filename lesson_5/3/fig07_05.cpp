#include<iomanip>

#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::setw;
using std::setprecision;



int main()
{
	//initializer list

	int arr[10] = {10,20,30,40,50,60,70,80,90,100};

	//print value of arr

	cout << "Element" << setw(13) << "value" << endl;

	for (int j = 0; j < 10; j++) { cout << setw(7) << j << setw(13) << arr[j] << endl; }

	return 0;
}


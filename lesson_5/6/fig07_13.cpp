
#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<iomanip>
using std::setw;

int modifyElement(int e) {

	cout << "The value of element after modifying in function is: " << (e *=2) << endl;
	return 0;
}

int modifyArray(int b[],int size) {
	
	for (int j = 0;j<size;j++) {
		b[j] *= 2;
	}
	return 0;
}

int main()
{

	const int arraysize = 5;

	int arr[arraysize] = { 0,1,2,3,4 };

	cout << "Value of entire array before modify: " << endl;
	
	for (int i = 0; i < arraysize; i++) {
		cout << "At Index: " << i << setw(20) << "Value is: " << arr[i] << endl;
	}	

	modifyArray(arr,arraysize);

	cout << "Value of entire array after modify: " << endl;
	
	for (int i = 0; i < arraysize; i++) {
		cout << "At Index: " << i << setw(20) << "Value is: " << arr[i] << endl;
	}
	

	modifyElement(arr[2]);
		cout << "At Index 2, After modifying value second time: " << setw(20) << "Value is: " << arr[2] << endl;

	return 0;
}

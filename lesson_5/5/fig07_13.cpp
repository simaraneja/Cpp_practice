
#include<iostream>
using std::cout;
using std::cin;
using std::endl;





int staticinitarray()
{
	static int arr[3];

	for(int i = 0; i < 3; i++) { cout << __func__ << "arr [" << i << "] = " << arr[i] << endl; }
//lets add somthing to that

	for(int i = 0; i < 3; i++) { cout << __func__  << "arr [" << i << "] = " << (arr[i] += 5) << endl; }
}

int autoinitarray()
{
	int arr[3] = {1,2,3};

	for(int i = 0; i < 3; i++) { cout << __func__ << "arr [" << i << "] = " << arr[i] << endl ; }

//lets add somthing to that

	for(int i = 0; i < 3; i++) { cout << __func__ << "arr [" << i << "] = " << (arr[i] += 5) << endl; }
}
int main()
{

	cout << "Value of array after First Call" << endl;
	
	staticinitarray();
	autoinitarray();

	cout << "Value of array after Second Call" << endl;
	
	staticinitarray();
	autoinitarray();

	return 0;
}

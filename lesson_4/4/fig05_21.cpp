
#include<iostream>
using std::cout;
using std::endl;


int volOfTriangle(int x=1 , int y=1, int z=1); // default parameters


int main()
{
	cout << "value returned by function is " << volOfTriangle() << endl;
	cout << "value returned by function is " << volOfTriangle(10) << endl;
	cout << "value returned by function is " << volOfTriangle(10,5) << endl;
	cout << "value returned by function is " << volOfTriangle(10,5,2) << endl;
	
	return 0;
}

int volOfTriangle(int x, int y, int z)
{
	return x*y*z;
	
}


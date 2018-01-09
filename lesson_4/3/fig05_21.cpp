
#include<iostream>
using std::cout;
using std::endl;


int squareByValue(int );
void squareByRef(int &);


int main()
{
	int x = 2;
	int z = 5;

	cout << "value of x is " << x << endl;
	squareByValue(x);// will make the copy of argument and change its value, keep the original value as it is.
	cout << "value of x is " << x << endl;
	

	cout << "value of z is " << z << endl;
	squareByRef(z); // this will change the value of z in memory, not making copy of argument.
	cout << "value of z is " << z << endl;
	
	return 0;
}

int squareByValue(int x)
{
	x *= x;
	cout << "value of x in function is " << x << endl;
	return x;
}

void squareByRef(int &z)
{
	z *= z;
	cout << "value of x in function is " << z << endl;
	//no need of return the ref value as it has been changed in the memory address.
}

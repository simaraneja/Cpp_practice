#include<iostream>
using std::cout;
using std::endl;


int main()
{
	int x = 40;
	int y = 10;

	//int * const ptr = &x;
	const int *ptr = &x;

	*ptr = 100;

	cout << x ;
	cout << endl;
	
	//ptr = &y;
	//y = 200;	

	//cout << y ;
	//cout << endl;
	
	return 0;
	
}


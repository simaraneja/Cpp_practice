#include<iomanip>
#include<iostream>
using std::cout;
using std::endl;
using std::fixed;
using std::setprecision;

int x = 4;

//int square(int);
double square(double);

int main()
{
	double x = 7.5;
	cout << fixed << setprecision(2);
	cout << "value of a in int functions is " <<  square(8)<< endl;
	cout << "value of a in double function is "<< square(7.5) << endl;
	return 0;
}

//int square(int a)
//{
//	a = a*a;
//	return a;
//}
double square(double a)
{
	a = a*a;
	return a;
}

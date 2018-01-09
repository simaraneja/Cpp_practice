
#include<iostream>
using std::cout;
using std::endl;

int x = 25;

void useLocal();
void useStaticLocal();
void useGlobal();


int main()
{
	cout << "Value of Global X = " << x << endl;

	int x = 10;
	cout << "Value of Main Local X = " << x << endl;

	{
		int x = 20;
		cout << "Value of Main Local Inner X = " << x << endl;
	}

	cout << "Value of Main Local X = " << x << endl;

	useLocal();
	useStaticLocal();
	useGlobal();

	useLocal();
	useStaticLocal();
	useGlobal();

	cout << "Value of Main Local X = " << x << endl;

	return 0;
}

void useLocal()
{
	int x = 40;
	cout << "Value of Function Local X =  " << x << " " << __func__ << endl;
	x++;
	cout << "Value of Function Local X =  " << x << " " << __func__ << endl;		
	cout <<endl;
	return;
}

void useStaticLocal()
{
	static int x = 60;
	cout << "Value of Function Static Local X =  " << x << " " <<__func__ << endl;
	x++;
	cout << "Value of Function Static Local X =  " << x << " " << __func__ << endl;		
	cout <<endl;
	return;
}

void useGlobal()
{
	cout << "Value of Function Global X =  " << x << " " << __func__ << endl;
	x *= 10;
	cout << "Value of Function Global X =  " << x << " " << __func__ << endl;
	cout <<endl;
	return;
}

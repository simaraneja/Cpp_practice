#include <iostream>
using std::cout;
using std::cin;
using std::endl;

#include<iomanip>
using std::setw;


void ascending( int b)
{
	cout << "Pressed " << b+1 << ", Entered in function " << __func__ <<endl;
}

void descending(int b)
{
	cout << "Pressed " << b+1 << ", Entered in function " << __func__ <<endl;
}

void selectionSort(int b)
{
	cout << "Pressed " << b+1 << ", Entered in function " << __func__ <<endl;
}

int main()
{

	void (*func[3])(int) = {ascending,descending,selectionSort};
	int choice = 1;
		
	while(choice >= 1 && choice <= 3)
	{
		cout << "Enter your choice from 1 to 3, Press 0 to exit: " << endl;	
		cin >> choice;
		if (choice == 0)
			break;
			
		(*(func + (choice-1)))(choice-1);
		
	
	}

	cout << "Program Completed \n";
	return 0;	
}


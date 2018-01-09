#define BREAK 1

#include<iostream>
using std::cout;
using std::endl;

int main()
{
	int counter = 1;
#if BREAK
	for (counter;counter <= 10; counter++)
	{
		
		if (counter == 5) {  break; }

			cout << "Printing " << counter << " " ;
		cout << "Will it print this " << endl;
	}

	
	cout << "Got Break Point at counter value " << counter << endl;

#else

	for (counter;counter <= 10; counter++)
	{
		
		if (counter == 5) {
			cout << "Got continue at counter value " << counter << endl;
			continue;
		}

		cout << counter << " " ;
	}

	
	
#endif

	return 0;
}

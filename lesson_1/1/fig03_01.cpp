//Define class GradeBook with a member function displayMessage;
//Create a GradeBook object and call its displayMessage function;


#include<iostream>
using std::cout;
using std::endl;

class GradeBook 
{
	public:
		void displayMessage()
		{
			cout << "Welcome to the Grade Book!!" << endl;
			cout << endl ;
		}
};

int main()
{
	GradeBook myGradeBook;
	myGradeBook.displayMessage();

	return 0;
}

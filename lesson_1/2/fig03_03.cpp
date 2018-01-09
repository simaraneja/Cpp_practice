//Define class GradeBook with a member function displayMessage that takes a parameter;
//Create a GradeBook object and call its displayMessage function;


#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<string>
using std::string;
using std::getline;



class GradeBook 
{
/*
	private: 
		void testing_func()
		{
			cout << "This function should not get called by other" << "!!" << endl;

		}
*/
	public:
		void displayMessage(string courseName)
		{
			cout << "Welcome to the Grade Book for \n" << courseName << "!!"<< endl;
//			testing_func();
			cout << endl ;
		}
};

int main()
{
	string text;
	GradeBook myGradeBook;
	
	cout << "Please enter the course name !!" <<endl;
	getline(cin,text);
	myGradeBook.displayMessage(text);

//	myGradeBook.testing_func();
	

	return 0;
}

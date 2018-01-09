//Define class GradeBook that contains a courseName data member
//and member function to get and set its value;
//Create and manipulate a GradeBook object ;


#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<string>
using std::string;
using std::getline;

#include<cstring>


class GradeBook 
{
	public:
		void setCourseName(string Name)
		{
			courseName = Name;
		}
		
		string getCourseName()
		{
			return courseName;
		}
		void displayMessage()
		{
			cout << "Welcome to the Grade Book for \n" << courseName << "!!"<< endl;
			cout << endl ;
		}
		
	private:
		string courseName;
};

int main()
{
	string text;
	GradeBook myGradeBook;
		
	cout << "Initial course name is" << myGradeBook.getCourseName() << "!!" <<endl;
	
	cout << "Please enter the course name !!" <<endl;
	getline(cin,text);
	myGradeBook.setCourseName(text);
	myGradeBook.displayMessage();
	

	return 0;
}

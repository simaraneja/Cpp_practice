//including class GradeBook from file gradebook.h for use in main().

#include <iostream>
using std::cout;
using std::cin;
using std::endl;

#include <string>
using std::string;

#include "GradeBook.h"

int main()
{
	string text;
	
	GradeBook mygradebook1("CS101 Introduction to C++ Programming" );
	GradeBook mygradebook2("CS102 Data Structures in C++");
	
	cout << " Grade Book 1 created for " <<mygradebook1.getCourseName() << "!!" <<endl;
	cout << " Grade Book 2 created for " <<mygradebook2.getCourseName() << "!!" <<endl;
	
//	cout << "Initial course name is" << myGradeBook.getCourseName() << "!!" <<endl;
	
	cout << "Please enter the course name !!" <<endl;
	getline(cin,text);
	
	return 0;
}

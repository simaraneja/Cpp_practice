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
	GradeBook mygradebook2("CS102 C++ Data Structures");
	
	cout << " Grade 1 Book initial name is " <<mygradebook1.getCourseName() << "!!" <<endl;
	cout << " Grade 2 Book initial name is " <<mygradebook2.getCourseName() << "!!" <<endl;
	
//	cout << "Initial course name is" << myGradeBook.getCourseName() << "!!" <<endl;
	
	cout << "Please enter the course name below (25) characters!!" <<endl;
	getline(cin,text);
	mygradebook1.setCourseName(text);
	

	cout << "Grade 1 book name is " << mygradebook1.getCourseName() << endl;
	cout << "Grade 2 book name is " << mygradebook2.getCourseName() << endl;
	
	
	return 0;
}

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
	
	GradeBook mygradebook("CS101 C++ Programming" );

	mygradebook.displayMessage();
	
//	mygradebook.determineClassAverage();	
	
	mygradebook.inputGrades();
	mygradebook.displayGradeReport();	
	
	return 0;
}

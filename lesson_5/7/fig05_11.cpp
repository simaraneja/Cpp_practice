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
	int gradesArray[GradeBook::students] = { 89,90,99,100,97,75,87,82,73,94 };
	
	GradeBook mygradebook("CS101 C++ Programming",gradesArray );

	mygradebook.displayMessage();
	mygradebook.processGrades();	
	
	return 0;
}

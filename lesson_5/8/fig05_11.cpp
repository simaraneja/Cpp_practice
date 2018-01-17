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
	int gradesArray[GradeBook::students][GradeBook::tests] = 
	{ {89,90,99},
	  {100,97,75},
	  {87,82,73},
	  {33,97,94},
	  {55,66,77},
	  {77,88,99},
	  {44,45,87},
	  {77,75,43},
          {88,66,33},
	  {96,87,89} };
	
	GradeBook mygradebook("CS101 C++ Programming",gradesArray );

	mygradebook.displayMessage();
	mygradebook.processGrades();	
	
	return 0;
}

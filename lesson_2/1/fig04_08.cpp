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
	int totalGrades = 0;
	
	GradeBook mygradebook("CS101 C++ Programming" );

	mygradebook.displayMessage();
	
	cout << "Enter total number of Grades: \n" ;
	cin >> totalGrades;
	mygradebook.determineClassAverage(totalGrades);	
	
	return 0;
}

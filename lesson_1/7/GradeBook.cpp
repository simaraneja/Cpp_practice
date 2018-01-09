#include<iostream>
using std::cout;
using std::endl;

#include<string>
using std::string;

#include "GradeBook.h"

GradeBook::GradeBook(string name)
{
	setCourseName(name);
}
void GradeBook::setCourseName(string Name)
{
	if(Name.length() <= 25)
		courseName = Name;
	if(Name.length() > 25)
	{
		courseName = Name.substr(0,25);
		cout << "Name " << Name << " exceeds the max name limit of 25 \n Limiting the course name to 25" << endl;
		cout << courseName << "!!" << endl;
	} 
}
string GradeBook::getCourseName()
{
	return courseName;
}
void GradeBook::displayMessage()
{
	cout << "Welcome to the Grade Book for \n" << courseName << "!!"<< endl;
	cout << endl ;
}

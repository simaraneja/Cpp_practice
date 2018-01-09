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
		courseName = Name;
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

#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::fixed;

#include<string>
using std::string;

#include<iomanip>
using std::setprecision;
#include "GradeBook.h"

GradeBook::GradeBook(string name)
{
	setCourseName(name);
}

void GradeBook::setCourseName(string name)
{
	if(name.length() <= 25)
		courseName = name;
	if(name.length() > 25)
	{
		courseName = name.substr(0,25);
		cout << "Name " << name << " exceeds the max name limit of 25 \n Limiting the course name to 25" << endl;
		cout << courseName << "!!" << endl;
	} 
}

string GradeBook::getCourseName()
{
	return courseName;
}

void GradeBook::displayMessage()
{
	cout << "Welcome to the Grade Book for \n" << getCourseName() << "!!"<< endl;
	cout << endl ;
}

void GradeBook::determineClassAverage()
{
	int total;
	int gradeCounter;
	int gradeScore;
	double average;

	total  		= 0;
	gradeCounter 	= 0;
	average 	= 0;
	gradeScore = 0;	

	cout << "Enter the Grades or Enter -1 to quit \t ";
	cin >> gradeScore;

	while (gradeScore != -1)
	{


		total = total + gradeScore;

		cout << "Enter the Grades or Enter -1 to quit \t ";
		cin >> gradeScore;

		gradeCounter++;
	}

	if(gradeCounter != 0)
	{
		average = static_cast< double > (total) / gradeCounter;
		cout << "Total of all grade scores is: " << total << "\nAverage of " << gradeCounter << " grade scores is: " << setprecision(5) << fixed << average << endl;
	}
	else
		cout << "No Grades Entered !!" << endl;
	return;
}


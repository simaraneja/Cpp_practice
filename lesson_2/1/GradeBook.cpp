#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<string>
using std::string;

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

void GradeBook::determineClassAverage(int totalGrades)
{
	int total;
	int gradeCounter;
	int gradeScore;
	int average;

	total  = 0;
	gradeCounter = 1;

	while (gradeCounter <= totalGrades)
	{
		cout << "Enter Grade Score : ";
		cin >> gradeScore;

		total = total + gradeScore;
		gradeCounter++;
	}

	average = total / totalGrades;
	
	cout << "Total of all grade scores is: " << total << "\nAverage of 10 grade scores is: " << average << endl;

}


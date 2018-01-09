#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::fixed;

#include<string>
using std::string;

#include<iomanip>
using std::setprecision;

#include<stdio.h>

#include "GradeBook.h"

GradeBook::GradeBook(string name)
{
	setCourseName(name);
	aGrade = 0;
	bGrade = 0;
	cGrade = 0;
	dGrade = 0;
	fGrade = 0;

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

void GradeBook::inputGrades()
{
	int grade;

	cout << " Enter the Grades " << endl 	
		<< "Enter EOF to exit " << endl;

	while ((grade = cin.get()) != EOF)
	{
		switch(grade)
		{
			case 'A':
			case 'a':
				aGrade++;
				break;

			case 'B':
			case 'b':
				bGrade++;
				break;

			case 'c':
			case 'C':
				cGrade++;
				break;

			case 'D':
			case 'd':
				dGrade++;
				break;

			case 'F':
			case 'f':
				fGrade++;
				break;

			case '\n':
			case '\t':
			case ' ':
				break;

			default:
				cout << "Incorrect Grade Entered " << endl
					<< "Enter the Grade Again" << endl ;
				break;
		}
	}
	return;
}

void GradeBook::displayGradeReport()
{
	cout << "Displaying Grade Report :" << endl;
	cout << "Students with A Grade : " << aGrade << endl;
	cout << "Students with B Grade : " << bGrade << endl;
	cout << "Students with C Grade : " << cGrade << endl;
	cout << "Students with D Grade : " << dGrade << endl;
	cout << "Students with F Grade : " << fGrade << endl;

	return;
}

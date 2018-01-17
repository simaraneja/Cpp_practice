#include<iostream>
using std::cout;
using std::cin;
using std::endl;
using std::fixed;

#include<string>
using std::string;

#include<iomanip>
using std::setprecision;
using std::setw;

#include<stdio.h>

#include "GradeBook.h"

GradeBook::GradeBook(string name,const int gradesArray[])
{
	setCourseName(name);
	for(int i = 0;i<students;i++)
		grades[i] = gradesArray[i];
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

int GradeBook::getMinimum()
{
	int min = 100;
	for (int grade = 0;grade<students;grade++)
	{
		if(grades[grade] < min)
		{
			min = grades[grade];
		}		

	}
	return min;

}

int GradeBook::getMaximum()
{
	int max = 0;
	for (int grade = 0;grade<students;grade++)
	{
		if(grades[grade] > max)
		{
			max = grades[grade];
		}		
	}
	return max;
}

double GradeBook::getAverage()
{
	int total;

	for(int i = 0; i < students;i++) { total += grades[i]; }
	
	total = total/students;

	return static_cast<double>(total);
}

void GradeBook::outputBarchart()
{
	const static int freqSize = 11;
	int freq[freqSize] = {};

	for(int grade = 0; grade < students;grade++) { freq[ grades[grade] / 10 ]++; }

	for (int disp = 0; disp < freqSize; disp++)
	{
		if (disp == 0)
			cout << "0-9 :";
		else if(disp == 10)
			cout << "100 :";
		else
			cout << (disp * 10) << "-" << ((disp * 10)+9) << " :";

	//print stars
		for(int star = 0;star < freq[disp];star++) { cout << setw(3); cout  << "*" ; }
			
		cout << endl;
	}

}

void GradeBook::outputGrades()
{
	cout << "Class Grades are :" << endl;
	for (int student= 0;student<students;student++) { cout << "Student "<< setw(3) << student << ":" << setw(3) << grades[student] << endl; }

}

void GradeBook::processGrades()
{
	outputGrades();

	cout << "Class Average is:" << setprecision(2) << fixed << getAverage() << endl << "Lowest Grade is: " << getMinimum() << endl << "Maximum Grade is: " << getMaximum() << endl;

	outputBarchart();
}


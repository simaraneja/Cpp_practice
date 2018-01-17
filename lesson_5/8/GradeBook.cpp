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

GradeBook::GradeBook(string name,const int gradesArray[][tests])
{
	setCourseName(name);

	for(int i = 0;i<students;i++) 
	{ 
		for(int j = 0; j<tests;j++) 
		{ 
			grades[i][j] = gradesArray[i][j]; 
		}
	}
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
		for(int test = 0;test<tests;test++)
		{
			if(grades[grade][test] < min)
			{
				min = grades[grade][test];
			}
		}		
	}
	return min;
}

int GradeBook::getMaximum()
{
	int max = 0;
	for (int grade = 0;grade<students;grade++)
	{
		for(int test=0;test<tests;test++)
		{
			if(grades[grade][test] > max)
			{
				max = grades[grade][test];
			}
		}		
	}
	return max;
}

double GradeBook::getAverage(const int setofGrades[], const int test)
{
	int total;
	
	for (int i = 0;i<test;i++)
	{
		total += setofGrades[i];	
	}
	total = total/test;

	return static_cast<double>(total);
}

void GradeBook::outputBarchart()
{
	const static int freqSize = 11;
	int freq[freqSize] = {};

	for(int grade = 0; grade < students;grade++) 
	{ 
		for(int test= 0;test<tests;test++)
		{
			freq[ grades[grade][test] / 10 ]++; 
		}
	}

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
	cout << endl;

	for (int test= 0;test<tests;test++) 
		cout << "Test" << test+1 << " " ;
	
	cout  << "Average" << endl;

	for (int student= 0;student<students;student++) 
	{ 
		cout << "Student "<< setw(3) << student+1;
		for(int test = 0; test<tests; test++)
		{
			cout << setw(8) << grades[student][test]; 
		}
		cout << setw(9) << setprecision(2) << fixed << getAverage(grades[student],tests) <<endl;
	}

}
void GradeBook::processGrades()
{
	outputGrades();

	cout << "Lowest Grade is: " << getMinimum() << endl << "Maximum Grade is: " << getMaximum() << endl;

	outputBarchart();
}


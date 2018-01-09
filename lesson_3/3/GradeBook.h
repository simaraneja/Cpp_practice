#include<iostream>
using std::cout;
using std::endl;

#include<string>
using std::string;


class GradeBook
{
	public:
//Declare a constructor 
		GradeBook(string name);

		void setCourseName(string Name);
		string getCourseName();
		void displayMessage();
		void determineClassAverage();
		void inputGrades();
		void displayGradeReport();

	private:
		string courseName;
		int aGrade;
		int bGrade;
		int cGrade;
		int dGrade;
		int fGrade;
		
};

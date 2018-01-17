#include<iostream>
using std::cout;
using std::endl;

#include<string>
using std::string;


class GradeBook
{

	public:
		const static int students = 10;
//Declare a constructor 
		GradeBook(string name, const int []);

		void setCourseName(string Name);
		string getCourseName();
		void displayMessage();
		int getMinimum();
		int getMaximum();
		void processGrades();
		double getAverage();
		void outputBarchart();
		void outputGrades();
		

	private:
		string courseName;
		int grades[students];	
};

#include<iostream>
using std::cout;
using std::endl;

#include<string>
using std::string;


class GradeBook
{

	public:
		const static int students	= 10;
		const static int tests 		= 3;
//Declare a constructor 
		GradeBook(string name, const int [][tests]);

		void setCourseName(string Name);
		string getCourseName();
		void displayMessage();
		int getMinimum();
		int getMaximum();
		void processGrades();
		double getAverage(const int [],const int);
		void outputBarchart();
		void outputGrades();
		

	private:
		string courseName;
		int grades[students][tests];	
};

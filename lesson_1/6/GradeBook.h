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

	private:
		string courseName;
};

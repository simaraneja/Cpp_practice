#include<iostream>
using std::cout;
using std::endl;

#include<string>
using std::string;


class GradeBook
{
	public:

//Declare a constructor 
		GradeBook(string name)
		{
			setCourseName(name);
		}

		void setCourseName(string Name)
		{
			courseName = Name;
		}

		string getCourseName()
		{
			return courseName;
		}
		void displayMessage()
		{
			cout << "Welcome to the Grade Book for \n" << courseName << "!!"<< endl;
			cout << endl ;
		}

	private:
		string courseName;
};

//instantiating multiple objects of the GradeBook class 
//and using the GradeBook constructor to specify the 
//course name when each object is created;

#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<string>
using std::string;


class GradeBook 
{
	
//constructor can have any number of parameters. if we dont declare a constructor, then calss will autmatically declare one default constructor 
//of the class. Class and constructor must have the same name.

	
	public:

//Declare a constructor 
		GradeBook(string name)
		{
			setCourseName(name);
		}

//construtor end...
	
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

int main()
{
	string text;
	
	GradeBook mygradebook1("CS101 Introduction to C++ Programming" );
	GradeBook mygradebook2("CS102 Data Structures in C++");
	
	cout << " Grade Book 1 created for " <<mygradebook1.getCourseName() << "!!" <<endl;
	cout << " Grade Book 2 created for " <<mygradebook2.getCourseName() << "!!" <<endl;
	
//	cout << "Initial course name is" << myGradeBook.getCourseName() << "!!" <<endl;
	
	cout << "Please enter the course name !!" <<endl;
	getline(cin,text);
	
	return 0;

}

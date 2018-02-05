#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<cctype>
using std::islower;
using std::toupper;

#include <string>
using std::string;

void ConvertUpper(char *);

int main()
{
	char text[256];
	//string text;
	cout << "Enter the string: " << endl;
	cin.getline(text,255);

	ConvertUpper(text);

	cout << "Updated string is: " << text << endl;
	return 0;

}

void ConvertUpper(char *tex)
{
	while (*tex != '\0')
	{
		if  (islower(*(tex)) )
			*tex = toupper(*tex);
		tex++;
	}

}

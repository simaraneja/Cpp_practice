#include<iostream>
using std::cout;
using std::endl;

void printCharacters(const char *sptr)
{
	for (; *sptr != '\0'; sptr++)
		cout << *sptr;
}

int main()
{
	const char phrase[] = "This is the test String";
	
	cout << "The string is : " << endl;
	printCharacters(phrase);
	cout << endl;
	return 0;
	
}


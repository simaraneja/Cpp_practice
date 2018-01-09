
#include<iostream>
using std::cout;
using std::cin;
using std::endl;

#include<cstdlib>
using std::rand;
using std::srand;

#include<ctime>
using std::time;

int rollDice();

int main()
{
	enum Status{CONTINUE, WON, LOSE};

	int myPoint;
	Status gameStatus;

	srand( time( 0 ) );
	
	int sumOfDice = rollDice();
	
	switch(sumOfDice)
	{
		case 7:
		case 11:
			gameStatus = WON;
			break;

		case 2:
		case 3:
		case 12:
			gameStatus = LOSE;
			break;

		default:	
			gameStatus = CONTINUE;
			myPoint = sumOfDice;
			cout << "Point is " << myPoint << endl;
			break;

	}

	while (gameStatus == CONTINUE)
	{
		sumOfDice = rollDice();
		if( sumOfDice == myPoint)
			gameStatus = WON;
		else
			if(sumOfDice == 7)
				gameStatus = LOSE;
	}

	if (gameStatus == WON)
		cout << "Player Wins :)" << endl;
	else
		cout << "Player Loses :(" << endl;

	return 0;
}

int rollDice ()
{
	int sum;
	int dice1 = 0,dice2 = 0;

	dice1 = (1 + rand() % 6); 
	dice2 = (1 + rand() % 6); 

	sum = dice1 + dice2;

	cout << "Player Rolled " << dice1 << "+" << dice2 << "=" << sum << endl;

	return sum;
}

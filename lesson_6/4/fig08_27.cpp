#include <iostream>
using std::cout;
using std::cin;
using std::endl;

#include<iomanip>
using std::setw;

bool ascending(int , int);
bool descending(int , int);
void swap(int * const, int * const);
void selectionSort(int [],const size_t, bool (*)(int,int)); //function pointer

int main()
{
	int order;
	int arr[] = {2,4,3,8,5,9,6,3,7,2};

	size_t size = (sizeof(arr)/sizeof(arr[0]));

	cout << "Printing original array with size :" << size << endl;
	for (unsigned int i = 0; i < size; i++)
		cout << setw(5) << arr[i];

	cout << endl;

	cout << "Enter the order for sorting\n Press 1 for ascending \n Press 2 for descending : " ;
	cin >> order;
	if(order == 1)
	{
		selectionSort(arr,size,ascending);
		cout << " Data items in ascending order" << endl;	
		cout << endl;
	}
	else if (order == 2)
	{
		selectionSort(arr,size,descending);
		cout << " Data items in descending order" << endl;	
		cout << endl;
	}
	else
	{
		cout << "Enter only 1 or 2" << endl;
		return 0;
	}
	
	for (unsigned int i = 0; i < size; i++)
		cout << setw(5) <<arr[i];

	cout << endl;
	return 0;	
}

void swap(int * const ptr1,int * const ptr2)
{
	if (*ptr1 != *ptr2)
	{
		*ptr1 = *ptr1 + *ptr2;
		*ptr2 = *ptr1 - *ptr2;
		*ptr1 = *ptr1 - *ptr2;
	}
}

bool ascending(int a , int b)
{
	return a < b;
}

bool descending(int a, int b)
{
	return a > b;
}

void selectionSort(int arr[],size_t size,bool (*compare)(int a,int b))
{
	int tempIndex;
		
	for(unsigned int i = 0; i < size-1;i++)
	{
		tempIndex = i;
		
		for(unsigned int index = tempIndex+1;index < size; index++)
			if(!(*compare)(arr[tempIndex],arr[index]))
				tempIndex = index;
		
		swap(arr + tempIndex,arr + i);
	}
}

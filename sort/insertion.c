#include<stdio.h>

void swapVar(int *a, int *b)
{
	*a = *a + *b;
	*b = *a - *b;
	*a = *a - *b;
}

void print_arr(int *arr, size_t n)
{
	int i;
	for( i = 0; i<n; i++)
		printf("value at %d index is %d\n",i, arr[i]);
}

void insertion_sort(int *arr, size_t n)
{
	int i,j;
	int key;
	for(i = 1; i<n; i++)
	{
		j = i;
		while( j>0 && arr[j]<arr[j-1])
		{
			swapVar(arr + j,arr + (j-1));
			j =j-1;
		}
	}
}
int main()
{
	int arr[] = {10,7,6,4,3,2};
	size_t size = sizeof(arr)/sizeof(arr[0]);
	
	print_arr(arr,size);
	insertion_sort(arr,size);
	print_arr(arr,size);
		
	return 0;
}

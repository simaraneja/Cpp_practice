#include<stdio.h>

void swapVar(int *a, int *b)
{
	if(*a != *b)
	{	
		*a = *a + *b;
		*b = *a - *b;
		*a = *a - *b;
	}
}
void print_arr(int *arr, size_t n)
{
	int i;
	for( i = 0; i<n; i++)
		printf("value at %d index is %d\n",i, arr[i]);
}

void selection_sort(int *arr, size_t n)
{
	int i,j,temp_index;

	for(i = 0; i<n-1; i++)
	{
		temp_index = i;
		for(j = i+1;j < n;j++)
			if(arr[j] < arr[temp_index])
				swapVar(arr+temp_index,arr+j);
	}
}
int main()
{
	int arr[] = {10,6,6,3,3,2,5,8,9};
	size_t size = sizeof(arr)/sizeof(arr[0]);
	
	print_arr(arr,size);
	selection_sort(arr,size);
	print_arr(arr,size);
		
	return 0;
}

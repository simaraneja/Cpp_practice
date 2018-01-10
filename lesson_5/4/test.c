#include <stdio.h>
int main()
{
	char string1[20];

	printf("please enter string\n");
	scanf("%s",string1);

	printf("value of string is %s\n",string1);
	
	scanf("%s",string1);
	printf("value of string is %s\n",string1);
	return 0;
}

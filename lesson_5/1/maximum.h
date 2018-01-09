/**********************************************************************
	A header file to declare the template function
	which will be the general function for all the 
	types.
**********************************************************************/

template <typename T> //or <class T>

T maximum(T value1, T value2, T value3)
{
	T max = value1;

	if (max < value2)
		max = value2;

	if(max < value3)
		max = value3;

	return max;
} 

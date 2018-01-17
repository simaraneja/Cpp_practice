# the compiler: gcc for C program, define as g++ for C++

CC = g++
OUTNAME = GradeBook
PRG_SUFFIX_FLAG := 0

# compiler flags:
#  -g    adds debugging information to the executable file
#  -Wall turns on most, but not all, compiler warnings

CXXFLAGS  = -g -Wall

# the build target executable:

SRCS := $(wildcard *.cpp)
PRGS := $(patsubst %.cpp,%,$(SRCS))
PRG_SUFFIX=.exe

## OBJS are automagically compiled by make.

OBJS := $(patsubst %,%.o,$(PRGS))


 $(info $(OBJS))

##
all : $(OUTNAME)
##

## Compile the executables
$(OUTNAME) : $(OBJS)
	$(CC) $(OBJS)  $(CXXFLAGS) -o $(OUTNAME)

##
## $(OBJS) should be automagically removed right after linking.
##

clean:
ifeq ($(PRG_SUFFIX_FLAG),0)
	$(RM) $(PRGS) $(OBJS)
else
	$(RM) $(BINS) $(OBJS)
endif

##

rebuild: clean all

##


## eof Generic_Multi_Main_PWD.makefile

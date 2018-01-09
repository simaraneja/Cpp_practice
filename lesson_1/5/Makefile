
CXX = g++

PRG_SUFFIX_FLAG := 0

# compiler flags:
#  -g    adds debugging information to the executable file
#  -Wall turns on most, but not all, compiler warnings

CFLAGS  = -g -Wall
print-%  : ; @echo $* = $($*)
# the build target executable:

SRCS := $(wildcard *.cpp)
PRGS := $(patsubst %.cpp,%,$(SRCS))

## OBJS are automagically compiled by make.
OBJS := $(patsubst %,%.o,$(PRGS))

all : $(PRGS)

% : %$(OBJS)
	$(CXX) $(LDFLAGS) -o $(BIN)

clean:
	$(RM) $(PRGS)
##
rebuild: clean all
##
## eof Generic_Multi_Main_PWD.makefile

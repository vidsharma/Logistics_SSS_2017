---
title: Setup
layout: default
---

## Setup 
Please make sure to install everything before the start of your workshop and
run the tests.  Participants must bring and use their own laptops to insure the
proper setup of tools for an efficient workflow once you leave the workshop.

Please note that if you decide not to follow the below instructions and use
local installs of your software it is not guaranteed that the summer school team
can assist in debugging any issues that may arise.

---

## Conda
Conda is an open source package management system and environment management
system for installing multiple versions of software packages and their
dependencies and switching easily between them. It works on Linux, OS X and
Windows, and was created for Python programs but can package and distribute any
software.

To install conda please run the following commands from a bash shell. If you
already have conda installed please run `conda update conda` and move on to the
next step.

Mac instructions:
```
curl https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -O
bash Miniconda3-latest-MacOSX-x86_64.sh -b -p $HOME/miniconda
echo PATH="\$HOME/miniconda/bin:\$PATH" >> ~/.bash_profile
```

Linux instructions (or Windows Ubuntu shell):
```
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh
bash miniconda.sh -b -p $HOME/miniconda
echo PATH="\$HOME/miniconda/bin:\$PATH" >> ~/.bashrc
```

---

## The Software Summer School environment
To make a great deal of compilation and installation simpler we will create a
conda environment. This environment isolates the software summer school stack
from the rest of the dependencies on your laptop and avoid compilation of code.

### Mac conda environment
First run:
```
sysctl machdep | grep features | grep -o AVX2
```

If the above returns "AVX2" please use the following lines:
```
conda create -n sss python=3.5 psi4 numpy lawrap gnu cmake jupyter scipy numexpr mkl-include gcc-5-mp -c intel -c psi4/label/dev -c psi4
```

otherwise use the below:
```
conda create -n sss python=3.5 psi4 numpy lawrap gnu cmake jupyter scipy numexpr mkl-include gcc-5-mp sse41 -c intel -c psi4/label/dev -c psi4
```


### Linux conda environment
```
conda create -n sss python=3.5 psi4 numpy lawrap cmake jupyter scipy numexpr mkl-include gcc-5-mp -c intel -c psi4/label/dev -c psi4
```

---

## Testing
Please ensure that the installation was successful by trying out both of the tests below. 


### Test the Psi4 installation
Test the installation:
```
source activate sss
python -c 'import psi4; psi4.test()'
```

> As long as there are no tests that end with a `Failed!` the installation was
> successful. Note `xfailed` is fine (an expected fail).

### Test the compilers
First download the following test C++ file from [here][1] (right click to download linked file).

Mac compile line:
> In order for the mac compilers to work correctly xcode command line tools need
> to be installed.  Before compiling the below please run
> `xcode-select --install`.

```
g++ -o thread_test -fopenmp thread_test.cpp -Wl,-rpath,${CONDA_PREFIX}/lib/
```

Linux compile line:
```
g++ -o thread_test -fopenmp thread_test.cpp
```

You can then run this compiled executable and you should see the following
(number ordering may change):
```bash
user:~/tests ./thread_test
tid = 2
Hello World!
tid = 0
Hello World!
tid = 3
Hello World!
tid = 1
Hello World!
```

---

## Acknowledgements
The above work could not have been possible without the help from many
open-source projects. In particular, most of the above ecosystem is based of
(and supported by) the excellent work of Lori Burns at the Georgia Institute of
Technology.

[1]:{{ site.url }}/data/thread_test.cpp

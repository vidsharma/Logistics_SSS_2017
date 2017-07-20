---
title: Setup
---

[Home](README.html) | [Setup](Setup.html) | [Logistics](Logistics.html) | [Map](Map.html) | [Useful Links](Links.html)

## Setup 
Please make sure to install everything (or at least to download the installers) before the start of your workshop. Participants should bring and use their own laptops to insure the proper setup of tools for an efficient workflow once you leave the workshop.

First open a new bash window and run the following command:

Mac instructions:
```
curl https://repo.continuum.io/miniconda/Miniconda3-latest-OSX-x86_64.sh -O
bash Miniconda3-latest-OSX-x86_64.sh -b -p $HOME/miniconda
echo PATH="\$HOME/miniconda/bin:\$PATH" >> ~/.bashrc
conda create -n sss python=3.5 psi4 numpy lawrap gnu cmake jupyter scipy numexpr sse41 -c intel -c psi4/label/dev -c psi4
```

Linux instructions (or Windows Ubuntu shell):
```
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh
bash miniconda.sh -b -p $HOME/miniconda
echo PATH="\$HOME/miniconda/bin:\$PATH" >> ~/.bashrc
conda create -n sss python=3.5 psi4 numpy lawrap cmake jupyter scipy numexpr -c psi4/label/dev -c psi4
```

Test the installation:
```
source activate sss
psi4 -c “import psi4; psi4.test()”
```

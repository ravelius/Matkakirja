#!/bin/zsh
source $SCRATCH/ajo.env
cd $S
./alusta.sh > alusta.out 2>&1
echo "$(date +%T) alusta valmis" >> ajo.log
(perl -MPOSIX -e 'setsid(); exec @ARGV' zsh ./rec.sh > rec.log 2>&1 &)
zsh ./avaa3.sh

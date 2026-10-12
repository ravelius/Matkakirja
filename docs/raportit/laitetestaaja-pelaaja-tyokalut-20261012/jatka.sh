#!/bin/zsh
source $SCRATCH/ajo.env
xcrun simctl terminate $U app.matkakirja.proto3d
sleep 3
xcrun simctl launch --stdout=$S/konsoli.log --stderr=$S/konsoli-err.log $U app.matkakirja.proto3d

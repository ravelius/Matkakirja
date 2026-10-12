#!/bin/zsh
source $SCRATCH/ajo.env
exec xcrun simctl io $U recordVideo --codec h264 --force $SCRATCH/retki.mp4

#!/bin/zsh
# Käännöspalvelun kopio: proto-gitin worktree + pääkopion Library APFS-kloonina (cp -c, ei vie tilaa ennen muutoksia).
# Odottaa, ettei pääkopiossa ole Unity-käännöstä (lukko /tmp/matkakirja-proto-kaannos.lukko), ja pitää lukon kloonauksen ajan.
PAA=/Users/Shared/Claude/proto-3d/Matkakirja-proto; KOPIO=/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos
LUKKO=/tmp/matkakirja-proto-kaannos.lukko
[[ -e $KOPIO ]] && { echo "kopio on jo: $KOPIO"; exit 1; }
until mkdir $LUKKO 2>/dev/null; do sleep 5; done; echo $$ > $LUKKO/pid; trap "rm -rf $LUKKO" EXIT
while pgrep -f "Unity.app/Contents/MacOS/Unity .*-projectPath \. " >/dev/null && [[ "$(lsof -a -p $(pgrep -f 'Unity.app/Contents/MacOS/Unity' | head -1) -d cwd -Fn 2>/dev/null | grep ^n)" == "n$PAA" ]]; do sleep 5; done
git -C $PAA worktree add -q --detach $KOPIO master || exit 1
cp -c -R $PAA/Library $KOPIO/Library || exit 1
rm -f $KOPIO/Library/*.lock $KOPIO/Temp/UnityLockfile 2>/dev/null
mkdir -p $KOPIO/tulokset
echo "KOPIO VALMIS $(git -C $KOPIO rev-parse --short HEAD) $(date +%H:%M)"; df -h /Users/Shared | tail -1

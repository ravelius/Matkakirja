#!/bin/zsh
# Versioi käännöspalvelun ja junan työkalut: kopioi ajossa olevat tiedostot (/Users/Shared/Claude/proto-3d/tyokalut/ ja
# ~/Library/LaunchAgents/fi.matkakirja.*, app.matkakirja.*) tähän kansioon. Ajettavat polut pysyvät ennallaan, koska
# launchd ja sessiot kutsuvat niitä, ja pääkopion työpuu vaihtaa haaraa testikäännöksissä. Muutoksen jälkeen:
#   tyokalut/palvelu/synkkaa.sh && git add tyokalut/palvelu && git commit -m "Palvelutyökalut: …"
# Lokit (*.log) ja GitHub-runnerin plistit eivät kuulu tänne.
set -e
cd "$(dirname "$0")"
cp /Users/Shared/Claude/proto-3d/tyokalut/*.sh /Users/Shared/Claude/proto-3d/tyokalut/*.py .
mkdir -p launchd
for f in ~/Library/LaunchAgents/fi.matkakirja.juna*.plist ~/Library/LaunchAgents/app.matkakirja.*.plist; do cp "$f" launchd/; done
git status --short .

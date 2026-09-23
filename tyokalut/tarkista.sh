#!/bin/zsh
# Peli-testit/unity-tarkistus.sh, mutta paluukoodi 1, jos virheitä > 0 (alkuperäinen palauttaa aina 0).
# Lisäksi USS-tiedostojen aaltosulut: merge voi pudottaa }-merkin, jolloin Unity hylkää koko tyylitiedoston
# (24.9.2026: Lehti.uss, koko lehti ilman tyylejä).
cd "$(dirname "$0")/.."
T=$(bash Peli-testit/unity-tarkistus.sh 2>&1)
print -r -- "$T" | grep -E "error CS" | sort -u | head -10
print -r -- "$T" | tail -1
python3 tyokalut/uss-tarkistus.py || exit 1
print -r -- "$T" | tail -1 | grep -q "virheitä yhteensä 0"

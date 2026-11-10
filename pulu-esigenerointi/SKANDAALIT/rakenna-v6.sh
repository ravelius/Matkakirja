#!/bin/sh
set -e
V=/Users/Shared/Claude/proto-3d/_valmiit
U=$V/${PULU_PAKETTI:-pulu-v6-skandaalit-20261110-2}   # -2: KK:n luku 10.11. 03.20 (MUUTOKSET-KK.md)
W=/Users/Shared/Claude/wt/pulu-kaupungit-maat
Y=$W/tools/pulu-esigenerointi/yhdista-mallinostot.mjs
D=$U/pulu/vastaukset/v6
test ! -e "$U"
mkdir -p "$D"
cp -p $V/pulu-v5-hetket-20261110-4/pulu/vastaukset/v5/*.json "$D/"
PULU_KORVAA=1 PULU_VERSIO=v6 node $Y $W/pulu-esigenerointi/MALLINOSTOT "$D" "$U"
PULU_KORVAA=1 PULU_VERSIO=v6 node $Y $W/pulu-esigenerointi/LONTOO-MALLINOSTOT "$D" "$U"
PULU_VERSIO=v6 PULU_MERKINTA=skandaalit node $Y $W/pulu-esigenerointi/SKANDAALIT "$D" "$U"
# KK:n lukukorjaukset (myös v5-pohjasta tulleet jäänteet): jokainen kohta odotetulla osumamäärällä, vanhaa muotoa ei jää
python3 $W/tools/pulu-esigenerointi/korjaa-paketti.py $W/pulu-esigenerointi/SKANDAALIT/MUUTOKSET-KK.md --tarkka "$D/FRA.json" "$D/GBR.json"
cd "$U"
cat > LAHTEET.md <<'T'
Lisenssi: oma teksti (Matkakirja, tekoälyllä esigeneroitu ja tarkistettu).
# Pulun valmiit vastaukset v6 (PK 10.11.2026; skandaalien ja syvennysten Pulu-kysymykset #6532 ca7406df9 + lähdetarkistuksen korjaukset v3/v4-kohtiin; EI VIENTIÄ ennen KK:n lukua)
Vienti: kaikki tiedostot polkuun pulu/vastaukset/v6/. Tarkistus: shasum -a 256 -c SHA256SUMS.
Sisältö: v5 (pulu-v5-hetket-20261110-4, ämpärissä) + 8 korttia kohdissa skandaali:<id> (FRA 2, GBR 1) ja syvennys:<kaupunki>-<täky> (pariisi 3, lontoo 2):
16 kysymysvastausta + 48 "Kerro lisää" (Sonnet-agentit; PK faktatarkistus 8 korjausta; kaksi Opus-lähdetarkistajaa faktat-1/2.md, 14 korjausta).
Lisäksi korvattu korjatuilla: Pariisin kohdekartta (v3, 4 kohdetta, 10 korjausta MALLINOSTOT/faktat-1.md) ja Lontoon kohdekartta (v4, 14 kohdetta,
18 korjausta LONTOO-MALLINOSTOT/faktat-1/2.md). Muutokset ennen/jälkeen: kunkin kansion MUUTOKSET-FAKTAT.md.
KK:n luku 10.11. 03.20 (osa A, 10 kohtaa: kaksi kahdennusta, kielivirhe, kirjoitusasu, vanhojen muotojen jäänteet): SKANDAALIT/MUUTOKSET-KK.md. Muut kohdat tavulleen v5:n mukaiset.
Lähde: Matkakirja pelikoodari/pulu-kaupungit-maat (pulu-esigenerointi/SKANDAALIT, MALLINOSTOT, LONTOO-MALLINOSTOT). Natiivi: PuluValmiitLataus.Kohta
skandaali:/syvennys: (NUI a970b0d1c); version polku v4 → v6 natiivissa vielä tekemättä.
T
find pulu -type f -name '*.json' | sort | xargs shasum -a 256 > SHA256SUMS
shasum -a 256 -c SHA256SUMS | grep -c ': OK'

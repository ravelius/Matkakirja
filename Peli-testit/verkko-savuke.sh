#!/bin/zsh
# VERKKO-ODOTUSSAVUKE (Pelikoodari 25.9.2026, Fablen erä "esilatauksen nykytila ja mittari").
# Kylmä käynnistys (sovellus poistetaan ja asennetaan: Documents, sisältö-, kuva-, ääni- ja laattavälimuisti tyhjiä)
# → aloitusnäkymä → uusi-matka ateena → saapuminen ja luenta → kaksi karttanostoa (kahdesti: kylmä ja lämmin)
# → radio- ja satelliittilinssi → yhteenveto. Mittari: Assets/Matkakirja/Kartta/VerkkoOdotus.cs.
#
#   Peli-testit/verkko-savuke.sh <Matkakirja3D.app> <UDID> <tuloskansio>
#   LAMMIN=1 Peli-testit/verkko-savuke.sh …   lämmin käynnistys (välimuistit edellisestä ajosta)
#
# Tulos: <tuloskansio>/{verkko-odotus.jsonl, verkko-yhteenveto.json, konsoli.log, RAPORTTI.txt}. Vain omiin
# simulaattoreihin (Raamattu, SIMULAATTORIEN OMISTUS); simulaattori sammutetaan lopuksi, jos se ei ollut päällä.
setopt null_glob
APP=${1:?app}; UDID=${2:?UDID}; OUT=${3:?tuloskansio}
BID=app.matkakirja.proto3d
mkdir -p $OUT; OUT=${OUT:A}
oli_paalla=$(xcrun simctl list devices booted | grep -c $UDID)
xcrun simctl boot $UDID 2>/dev/null; xcrun simctl bootstatus $UDID -b >/dev/null
xcrun simctl terminate $UDID $BID 2>/dev/null
if [[ -z $LAMMIN ]]; then
  xcrun simctl uninstall $UDID $BID 2>/dev/null
  xcrun simctl install $UDID $APP || { echo "VIKA: asennus"; exit 1; }
else
  # LAMMIN=1: välimuistit jäävät (edellinen ajo); vain edellisen ajon mittaritiedostot pois.
  D0=$(xcrun simctl get_app_container $UDID $BID data)/Documents
  rm -f $D0/verkko-odotus.jsonl $D0/verkko-yhteenveto.json
fi
: > $OUT/konsoli.log
T0=$(date +%s)
for i in 1 2 3; do
  xcrun simctl launch --console-pty $UDID $BID > $OUT/konsoli.log 2>&1 &
  LPID=$!; sleep 3; kill -0 $LPID 2>/dev/null && break
done
for i in {1..120}; do grep -q "aloitusnäkymä" $OUT/konsoli.log && break; sleep 1; done
echo "aloitusnäkymä $(( $(date +%s)-T0 )) s"
DOC=$(xcrun simctl get_app_container $UDID $BID data)/Documents
peli() { print -r -- "$1" > $DOC/peli-komento.txt; sleep ${2:-2}; }
ui() { print -r -- "$1" > $DOC/ui-komento.txt; sleep ${2:-2}; }
linssi() { print -r -- "$1" > $DOC/linssi-komento.txt; sleep ${2:-2}; }
odota_loki() { for i in {1..${2:-60}}; do grep -q "$1" $OUT/konsoli.log && return 0; sleep 1; done; echo "ei lokiriviä: $1"; }

# Aloitusverho mitataan loppuun ennen matkaa (Natiiviseppä 25.9.: uusi-matka kesken verhon mittasi lennon mustaa).
odota_loki "aloitusverho: pois" 30
sleep 1
peli "uusi-matka ateena" 3
odota_loki "aloituslento: musta" 90
odota_loki "luento matkakirja:ateena" 90
sleep 35                                   # luenta ja pulun kommentti
ui "ui nosto kohde:olympos" 6;       ui "ui sulje" 2
ui "ui nosto kohde:thessaloniki" 6;  ui "ui sulje" 2
ui "ui nosto kohde:olympos" 4;       ui "ui sulje" 2      # toinen avaus: välimuistista
linssi "linssi radio" 10;            linssi "linssi pois" 3
linssi "linssi satelliitti" 12;      linssi "linssi pois" 3
peli "verkko" 3
cp $DOC/verkko-odotus.jsonl $DOC/verkko-yhteenveto.json $DOC/peli-loki.txt $DOC/ui-loki.txt $DOC/linssi-loki.txt $OUT/ 2>/dev/null
kill $LPID 2>/dev/null
xcrun simctl terminate $UDID $BID 2>/dev/null
(( oli_paalla )) || xcrun simctl shutdown $UDID

python3 - "$OUT" <<'EOF' | tee "$OUT/RAPORTTI.txt"
import json, sys, os
out = sys.argv[1]
rivit = [json.loads(l) for l in open(os.path.join(out, "verkko-odotus.jsonl")) if l.strip()] if os.path.exists(os.path.join(out, "verkko-odotus.jsonl")) else []
print("ODOTUKSET (pelaaja odotti; haut = verkkohakuja odotuksen aikana)")
for r in rivit:
    print(f"  {r['t']:7.1f} s  {r['vaihe']:<11} {r['ms']:>6} ms  haut {r.get('haut','-'):>3}  {r['mita']}" + (f"  [{r['tulos']}]" if 'tulos' in r else ""))
p = os.path.join(out, "verkko-yhteenveto.json")
if os.path.exists(p):
    y = json.load(open(p))
    print("\nODOTUKSET VAIHEITTAIN (summa / max / kpl)")
    for k, s in y["odotukset"].items(): print(f"  {k:<11} {s['ms']:>7} ms  max {s['max']:>6}  n {s['n']}")
    print("\nVERKKOHAUT VAIHEITTAIN JA LÄHTEITTÄIN (kpl, summa-aika, max, kt)")
    for k, s in y["haut"].items(): print(f"  {k:<22} n {s['n']:>4}  {s['ms']:>8} ms  max {s['max']:>6}  {s['kt']:>7} kt")
EOF

#!/bin/zsh
# VERKKO-ODOTUSSAVUKE (Pelikoodari 25.9.2026, Fablen erä "esilatauksen nykytila ja mittari").
# Kylmä käynnistys (sovellus poistetaan ja asennetaan: Documents, sisältö-, kuva-, ääni- ja laattavälimuisti tyhjiä)
# → aloitusnäkymä → uusi-matka ateena → saapuminen ja luenta → kaksi karttanostoa (kahdesti: kylmä ja lämmin)
# → radio- ja satelliittilinssi → yhteenveto. Mittari: Assets/Matkakirja/Kartta/VerkkoOdotus.cs.
#
#   Peli-testit/verkko-savuke.sh <Matkakirja3D.app> <UDID> <tuloskansio>
#   LAMMIN=1 Peli-testit/verkko-savuke.sh …   lämmin käynnistys (välimuistit edellisestä ajosta)
#   ENNAKOINTI=1 …   lisäksi Esilataaja erä 3: joutilas kaupungissa (kohta 4) ja liftauksen siirtokohteet (kohta 5)
#
# Tulos: <tuloskansio>/{verkko-odotus.jsonl, verkko-yhteenveto.json, konsoli.log, RAPORTTI.txt}. RAPORTTI:n
# "ESILATAAJA OSUMA-% … ODOTUS ms …" on esilataajan oma mittari (Kartta/EsilataajaMittari.cs), vaiheittain alla. Vain omiin
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
if [[ -n $ENNAKOINTI ]]; then
  sleep 4                                  # kohta 4: 2 s ilman liikettä, jonoa ja laattahakuja
  odota_loki "esilataaja: joutilas" 40
  sleep 25                                 # joutilaan esilataukset (puheet, nostojen kuvat, nopan päässä olevat)
  # Kohta 5: siirtokohteet kartalle → kohdekaupungit heti. Noppa voi antaa vain reitin varren pisteitä:
  # silloin siirrytään ensimmäiseen ja heitetään uudelleen (enintään 4 kertaa).
  for yritys in 1 2 3 4; do
    peli "kulkutapa liftaus" 8
    odota_loki "ennakointi (siirtokohteet)" 20
    grep "ennakointi (siirtokohteet)" $OUT/konsoli.log | grep -qv "ei kaupunkeja" && break
    peli "rivi 0" 14
  done
  sleep 15
fi
peli "levy" 3                              # erä 4: purettujen kuvien muisti (LRU) ja levyvälimuistin koko
peli "verkko raja" 2                     # sovelluksen oma vartija (sama sääntö kuin alla, laitteella ilman Macia)
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
    if "osumat" in y:
        print("\nOSUMA-% (välimuistista / pyynnöt) VAIHEITTAIN JA LÄHTEITTÄIN")
        for k, o in y["osumat"].items(): print(f"  {k:<22} {o['osumia']:>5}/{o['n']:<5} {o['pros']:>3} %")
    if "esilataaja" in y: print("\nESILATAAJA", {k: v for k, v in y["esilataaja"].items() if k != "mittari"})
    # Esilataajan oma mittari (Kartta/EsilataajaMittari.cs): Nakyva-pyyntö löysi kohteen esilatauksen jäljiltä = osuma.
    # Hudit: kesken (esilataus jonossa/haussa), ei esiladattu, hukattu (esiladattu, ei löytynyt). "Levyllä" = valmiina
    # ilman tämän istunnon esilatausta (edellinen ajo, paketti, buildi): ei osuma-%:iin. Vain raportti, ei rajaa.
    m = y.get("esilataaja", {}).get("mittari")
    if m:
        def mrivi(s):
            pros = "–" if s["pros"] < 0 else f"{s['pros']} %"
            return (f"OSUMA-% {pros:>5} ({s['osumia']}/{s['osumia'] + s['huteja']})  ODOTUS ms {s['odotusMs']} "
                    f"(mediaani {s['mediaaniMs']}, p95 {s['p95Ms']}, max {s['maxMs']})  hudit: kesken {s['kesken']}, "
                    f"ei esiladattu {s['eiEsiladattu']}, hukattu {s['hukattu']}; levyllä {s['levylla']}, toistoja {s['toistoja']}")
        print("\nESILATAAJA " + mrivi(m) + f", avoimia {m['avoimia']}")
        for k, s in m.get("vaiheet", {}).items(): print(f"  {k:<11} " + mrivi(s))
# RAJA (Raamattu ESILATAUSPOLITIIKKA kohta 3, Fable 25.9.): saapumisessa nolla verkko-odotusta, kylmänä ja lämpimänä.
# Odotus lasketaan verkko-odotukseksi, kun sen aikana valmistui verkkohaku (haut > 0) tai se on puheen lataus.
saap = [r for r in rivit if r['vaihe'] == 'saapuminen' and (r.get('haut', 0) > 0 or r['mita'].startswith('puhe:'))]
ms = sum(r['ms'] for r in saap)
if os.environ.get("ENNAKOINTI"):
    loki = open(os.path.join(out, "konsoli.log"), errors="replace").read().splitlines()
    print("\nENNAKOINTI (erä 3)")
    for avain in ("esilataaja: joutilas", "peli: joutilas", "ennakointi (siirtokohteet)", "ui nostot: kuvat esiladataan", "ui: saapumisen esilataus"):
        rivit_ = [l for l in loki if avain in l]
        print(f"  {avain:<32} {len(rivit_):>3}  " + (rivit_[-1].split("MATKAKIRJA ", 1)[-1][:150] if rivit_ else ""))
pl = os.path.join(out, "peli-loki.txt")
if os.path.exists(pl):
    levy = [l for l in open(pl, errors="replace") if " levy → " in l]
    if levy: print("\nLEVY JA MUISTI " + levy[-1].split(" levy → ", 1)[1].strip()[:300])
if os.path.exists(pl):
    r = [l for l in open(pl, errors="replace") if "verkko raja" in l]
    if r: print("\nSOVELLUKSEN VARTIJA " + r[-1].split(" → ", 1)[-1].strip()[:200])
print(f"\nRAJA saapuminen 0 ms verkko-odotusta: {'PASS' if ms == 0 else 'FAIL'} ({ms} ms: " + ", ".join(f"{r['mita']} {r['ms']}" for r in saap) + ")")
EOF

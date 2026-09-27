# Natiivi-UI:n luovutus 27.9.2026 (x, tilinvaihto), klo 11.2x

Jatkaa luovutusta (w) -20260927.md. Simulaattorit: oma iPhone 17 FB234D08, jaettu iPad Pro 11 503000D1 (sammutettu 11.10;
Laitetestaaja ja Linssiseppä käyttävät, päivällä enintään 2 käynnissä). Fable = local_5df52e10-10e4-4b72-9554-0049db300dfe.
Apuskriptit scratchpadissa (kopiot alla): k.sh (komentotiedostot + simctl-kuva), merkitse.py (luovutus w).

## KESKEN 1: AVAUSKORTTI — KAKSI OMISTAJAN KORJAUSTA (Fable 11.2x), SITTEN KUVAPARI → FABLE → KORTTI → MERGE-PYYNTÖ

Haara `natiivi-ui/avauskortti` @ **11a3c43a** (työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-sisallys). Sisältää
Pelikoodarin c7b475d7 (mainittava merge-pyynnössä). Laitteella PASS 711c20d3 (f8b1a9c1-tila): kutsun herokuva, kortti
kokonaan (alapehmuste omana loppuelementtinä, ScrollView ei laske paddingia), herokuva uudelleenavauksessa, suurennos ilman
mittajanaa, lehden osiot. Kuvaparit (web v2296 vs natiivi 711c20d3) proto-3d/lokit/natiivi-ui-avauskortti/kuvapari-*.png
lähetetty Fablelle 11.10 → omistaja pyysi 11.2x kaksi korjausta, jotka ovat 11a3c43a:ssa, EI VIELÄ AJETTU:
1. Kutsuminiatyyri lähemmäs kaupunkia: Kutsuminiatyyri.cs renkaat 8/20/36 pt (oli web 16/40/70/100); toinen kierros
   väistää vain kalusteet + kaupungin pisteen/nappulan (saa peittää nostomerkin, koska nostot ovat nyt täytenä kaikkialla).
2. Lehden osiohakemisto kevyeksi: Lehtiosiot.cs + Lehti.uss — kuva 40 × 40, ohut rivi (alaviiva .16), nimi Luku 15,5
   #b03a2b, yksi alarivi enintään 2 jutun nimeä "·"-erottimin 13,2 (ellipsis), ei "… ja n muuta".

SEURAAVAKSI: klo 12.00 käännös oli ajastettu taustalle (`proto-kaanna.sh juna/b13+natiivi-ui/avauskortti+natiivi-ui/nostot-taysi`
FB234D08). Tarkista `ls -t proto-3d/lokit/kaannospalvelu/*avauskortti*.log | head -1 | xargs tail -1`; jos ei ajettu, aja
seuraavassa :00–:15-ikkunassa (rivi Karttasepälle ensin). Asenna .app itse (ditto talteen natiivi-ui-avauskortti/k-<sha>.app,
simctl install + launch). Testikaava: `uusi-peli 1 pariisi`, `puhe pois` (peli-komento.txt), `ohita-traileri`, odota 25 s,
`ui sulje`, `ui kutsu` → kuva; `ui avauskortti pariisi` → kuva; `lue-lehti pariisi` + `ui lehti vierita loppu` → kuva.
Kuvapari: kutsu + lehden osiot (web pariisi-iphone-0-kutsu / -3-lehti vs natiivi), merkintä kuvaan (versio, laite, kulma)
→ Fablelle → omistajan kortti → merge-pyyntö Natiivisepälle (Pelikoodarin c7b475d7 ensin).

## MERGE-PYYNNÖT NATIIVISEPÄLLE (lähetetty 11.1x Fablen käskystä, merge-SHA odottaa)
- `natiivi-ui/nosto-ylarivi` @ a5aae711 — nostokortin vaihe 2: ylin tekstirivi kokonaan (Nostokortti.KokoRivi, vieritys
  rivin alkuun). Kuvapari natiivi-ui-avauskortti/kuvapari-nostokortti-ylarivi.png.
- `natiivi-ui/nostot-taysi` @ **18543b3c** (Fablen viestin 0ca9c11e on vanha, rebasattu juna/b13:lle) — nostot täytenä
  heti (NostotKartalla; Taysi-kytkentä on Linssisepän ElavaKartassa) + maakuntaerä (Pelikoodarin 7041fd0e-speksi):
  Kartuscha.Muste ilman herätysanimaatiota/MAAKUNNAT-palkkia/salaisuusriviä, NOSTOT-laskuri ja lippu jäävät, rivit kaikki
  maakunnat tuoreet ensin; MaakuntanimetKartalla kaikki heti staattisina; `ui muste heraa|salaisuus` no-op, uusi
  `ui muste laskuri`. Laitteella PASS 1b7f6e97.
- `natiivi-ui/luennan-saatimet` @ 56ab226b — nostokortin ratas (nopeus 0,6–1,6 + ääni pelinimellä Striimiaani.Pelinimet,
  Pelikoodarin taulu 28 nimeä), kaiutin tauko/jatko (Puhe.Tauko/Jatka/Tauolla/SoivaTaso, loppu-silmukka `|| tauolla`),
  vilkku keskeytettynä, VU kaarissa, katkennut luenta jatkaa samasta palasta, äänivalinta pois kehittäjävalikosta.
  Laitteella: rms 0,125 → tauko 0,006 → jatko 0,105. Paneelin korjaus (kerroksen juureen) 56ab226b:ssä EI vielä ajettu.
  Pelikoodari lisää `|| tauolla` puhevirta-haaransa silmukoihin: VÄLITÄ hänelle merge-SHA kun Natiiviseppä ilmoittaa.

## AVOIMET
- Pollo-puhe (Pulun vastauksen luenta) ei soi simulaattorissa mykistettynä eikä äänet päällä (kertojan luenta soi, uudet
  mp3:t aani/-kansiossa) → Fable: todenna laitteella 1.0.29:stä. Pulupuhe-portit tekee Pelikoodarin bae36144 (junassa);
  oma päällekkäinen haara natiivi-ui/pulupuhe-aina poistettu.
- 1.0.28-SHA:sta (Fable välittää): lukija-putki (tauko ms) ja striimiääni iPhonella.
- Huomioita avauskortista: nähtävyyskartan kaista 35 % (CSS 35svh) vs webin kuvassa ~28 %; suurennos alkaa natiivissa
  turva-alueen alta (web 6 % ylhäältä); Pulu piirtyy iPhonella kortin alakulman päälle.

## OPIT
- proto-kaanna.sh pohja on master, haarat mergetään järjestyksessä: tee kuivaharjoitus ennen ajoa (git merge-tree +
  commit-tree -ketju master → juna/b13 → haarat), pareittainen merge-tree ei riitä.
- Tarkista junan tuoreet commitit ennen omaa korjausta (Pelikoodari teki pulupuheen samaan aikaan, Linssiseppä siirsi
  Taysi-kytkennän ElavaKarttaan).
- UITK: absoluuttinen paneeli rivin lapsena piirtyy kortin myöhempien sisarusten alle → lisää kerroksen juureen.
- Lepopiirto: uuden elementin jälkeen Ruudunpaivitys.Herata, muuten simctl-kuva näyttää vanhan ruudun.
- Nostokortin pohjan napautus sulkee kortin: säätöpaneelin testissä älä napauta korttia paneelin sulkemiseksi.

## k.sh
```zsh
#!/bin/zsh
# k.sh <i|p> <ui|peli|kartta> "rivi" ...  |  k.sh <i|p> kuva <nimi>
case $1 in i) U=FB234D08-4693-4496-9C7A-6C7C15B03963;; p) U=503000D1-34AC-4C42-BDF8-7E36753A87CD;; esac
D=$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents
O=/Users/Shared/Claude/proto-3d/lokit/natiivi-ui-avauskortti
case $2 in
  kuva) xcrun simctl io $U screenshot $O/$3.png >/dev/null 2>&1 && echo $O/$3.png;;
  ui) shift 2; print -l -- "$@" > $D/ui-komento.txt;;
  peli) shift 2; print -l -- "$@" > $D/peli-komento.txt;;
  kartta) shift 2; print -l -- "$@" > $D/komento.txt;;
esac
```

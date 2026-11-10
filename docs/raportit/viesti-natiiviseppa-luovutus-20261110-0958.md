# Natiivisepän luovutus 10.11.2026 klo 09.58

Edellinen: -0930 (4728bb70b); sen kohdat käsitelty alla. Syy: kontekstivahti 26 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työlista: python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava NS. PT 09.5x: Pont du Gard ja luennan viive EIVÄT jää muistikaton alle.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (session oma; /opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## TEHTY TÄLLÄ VUOROLLA
- V/2a varmistettu PT:lle ja KK:lle: V (lataus seis + taso 1 raja 128 Mt) ja 2a (perusraja 256 Mt) junassa 224 (330a43515 juna 221:stä).
- 3D-mallien kuvien pakkaus (muistivaihe 3) RAUENNUT (omistaja 09.36, Pariisin nähtävyydet koodilla); Tripo-aineistoa ei poisteta.
- LEVY: siirto-wt VALMIS 09.42 (loki _tyo/natiiviseppa/levy/siirto-wt-0938.log), 11/12 NAS:lla, vapaana 67 Gt, PT:lle ilmoitettu.
  huippunimet jäi: NAS-kopiossa rsync-väliaikaistiedosto (.k-leshan-viivat.json.meta.7sktxKjFYK) → ero 1; EI poisteta NAS:lta. Ei toimia.

## ODOTTAA JU:TA (järjestys JU:n jonossa: ISS C → yksi tarkkuus iPad → Pont du Gard Mac → kertojan viive → muistikatto)
1. ISS-MUISTI KOE C 630e6bc31: ennallaan, ks. -0905.
2. YKSI TARKKUUS (työlista NYT, koe): wt /Users/Shared/Claude/wt/proto-natiiviseppa-yksitarkkuus, haara natiivi-backup natiiviseppa/yksi-tarkkuus.
   - Yritys 1 8fd6cf441 Mac KATSOTTU: _tyo/natiiviseppa/yksi-tarkkuus/tulos.md + parit-1/. Levossa KELPAA (PT 09.5x: suunta kelpaa), eleessä
     hyppy tarkasta karkeaan isompi kuin nyky (757 vs 518, hyppy.py; aja /opt/homebrew/bin/python3.14 ILMAN -I:tä, numpy). Ei omistajalle vielä.
   - Yritys 1 iPad (yiu/yin, ajopyynto-1.md) JU:lla: huippu uusi vs nyky (KS 4208–4267), palat, App terminated. HUOM 8fd6cf441 ilman lisämuistilupaa.
   - YRITYS 2 = (b) pito d550fdbb0 (pushattu): levon valintakamera jäädytettynä valinnassa eleen alussa, kunnes varjon lataus ≥ 99,5 %
     (min 0,2 s, max 1,5 s; korkeus ×2, jarru, origo, lepo päättävät). Komento maasto yksitaso pito <s>|pois. Testit 743/743, unity-tarkistus 0.
     Mac-ajo pyydetty JU:lta 10.0x: ajopyynto-2.md → lokit/natiiviseppa-yksi-tarkkuus-mac-pito.
   - PT:n linja 09.5x: jos iPadin muistissa varaa → (b); jos ei → (a) liikevalinta lähemmäs lepoa. KUN pito-ajo valmis: hyppy.py yu-ele.mp4
     (vertaa yritys 1: suurin 757, yli 100: 76), katso suurimmat ruudut (ffmpeg select, parit-1/hyppy-*), "pito loppui (syy, s)" -rivit; sitten
     pari PT:lle (lepo + ele), sitten KK. PT: Pont du Gard samaan mekanismiin, jos sopii.
3. PONT DU GARD SUMEA (jarj 2): ks. -0930 kohta 3 (lokit/natiiviseppa-pontdugard-1, A/B/C). JU ajaa Macilla.
4. KERTOJAN VIIVE (jarj 3): ks. -0930 kohta 4 (lokit/natiiviseppa-kertoja-viive-1).
5. MUISTIKATTO PER NÄKYMÄ (työlista rivi 10 "Muistin keventäminen"; omistajan kortti 09.28; KK:n suunnitelma
   /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-muistisuunnitelma.md osio PÄIVITYS 09.3x):
   _tyo/natiiviseppa/muistikatto/ajopyynto-1.md, sk-katto-pariisi.txt (Pariisi 40/60/80°, pallo, maakartta Pont du Gard, juoksupeli, paluu) ja
   sk-katto-lontoo.txt; 3+3 kylmää, junan 224 laitekäännös (JU: 224.11 68d365e65, lisämuistilupa), kaikki samalla käännöksellä, ALKOI-rivillä
   "koodimallit 0" (PT: Pariisin luvut = nähtävyydet koodilla -suunnitelman osan 4 ENNEN-mittaus). JU kuittasi 09.5x.
   KUN VALMIS: python3 -I _tyo/natiiviseppa/muistikatto/jaksot.py lokit/natiiviseppa-muistikatto-{pariisi,lontoo}-{1,2,3} → lepo/huippu/min vapaa
   per näkymä + vara kattoon 3940. Vahvista katto (KK: huippu ≤ 3940 = 4080 − hajonta 140), tulos.md samaan kansioon, rivi PT:lle ja KK:lle.
   Juoksupelin viite: PK 10.11. huippu leivottuna 4,04–4,12 Gt (126c79c1d).

## VIESTIT TÄLLÄ VUOROLLA
PT: V/2a-varmistus, muistivaihe 3 pito → raukesi, muistikatto kirjattu, yksi tarkkuus linja (yllä). JU: muistikatto kuitattu, yksi tarkkuus Mac valmis 09.52, yritys 2 pyydetty.
KK: V/2a-rivi.

## LISÄYS 10.1x (luovutuksen jälkeen; LUE ENSIN)
- Yritys 2 pito d550fdbb0 Mac AJETTU ja luettu: EI poistanut hyppyä (766 / yli 100: 53 vs yritys 1 757 / 76); pito päättyi 0,2 s "ladattu" →
  karkea liikevalinta itse on hyppy. Ks. _tyo/natiiviseppa/yksi-tarkkuus/tulos.md loppu.
- PT 10.1x: VALITSE b2 = tarkat palat koko eleen ajan (kokeile "maasto yksitaso pito 5"; tarvittaessa koodiin: ei "ladattu"-ehtoa, vain lepo/korkeus/jarru).
  iPad-muisti JU:lla (JU:n laitekäännökset nyt lisämuistiluvalla, raja 8191 Mt, mutta hyväksymisraja 4080 kunnes omistaja päättää). Jos b2 > 4080 → (a).
  Pari lepo + ele PT:lle.
- Pont du Gard -toisto AJETTU (JU 10.01): lokit/natiiviseppa-pontdugard-1, 12/12 kuvaa – katso (A/B/C, ks. -0930 kohta 3).
- UUSIA JONOON (omistaja 09.59/10.01, Tekninen kunto, Pont du Gardin ja Yksi tarkkuuden rinnalla; syy ensin mittaamalla Macilla, iPad vain muistiin;
  korjausehdotus + muistin hinta PT:lle ja KK:lle; koe C 630e6bc31 ei saa heikentää terävyyttä):
  1. "ISS: laukaisuanimaatio tärisee": nopeaa edestakaista zoomausta koko laukaisun ajan → etsi kaksi vuorotellen kameraa ohjaavaa asiaa (origo? kierto?).
  2. "ISS: kupoli liian matalalla tarkkuudella": koe C / muistijarru taso 1 / tekstuurin koko?

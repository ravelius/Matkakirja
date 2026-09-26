# Linssisepän luovutus 26.9.2026 aamuyöllä (e)

*Linssiseppä (Opus, max), sessio 26.9. klo 00.47–04.4x Fablen käskystä. Edellinen: viesti-linssiseppa-luovutus-20260926-d.md.
Jatkaja lukee tämän ja viesti-linssiseppa-aloitus.md:n.*

## Tehty

1. **Elävän kartan käsikirjoitus** on korjattu Fablen hyväksynnän mukaan (b47e0e5ad): maakunnat syttyvät
   etäisyysjärjestyksessä saapumiskaupungista, eivät reitin mukaan.
2. **Elävä kartta, ensimmäinen video** (haara linssiseppa/elava-kartta cf5d21e0, wt/proto-linssiseppa-elava, testit 267/267).
   - Komento linssi-komento.txt: `elava kreikka [alku] [nopeus] | kuva <s> | saato <nimi> <arvo> | ui 0|1 | pois | tila`.
   - Aikajana ja kamerapolku ovat puhtaassa ytimessä (Linssit/Ydin/Elava). Unity-kerros on ElavaKartta.cs, ja
     varjostimia on kuusi: Kynaviiva, Huntu, Maakuntapinta, Laikka, Pehmeapiste ja Laiva.
   - Oikeina tehosteina toimivat aurinko (Aurinko.Atsimuutti/KorkeusAst) ja hämärä (KarttaKerrokset.PallonSavy). Muut ovat
     paikkamerkkejä Natiivisepän rajapinnoille.
   - Media: proto-3d/lokit/linssiseppa-elava-20260926/omistajalle/ (5 kuvaa: 1,8 / 5,9 / 10,4 / 13,2 / 18,3 s, video
     736 × 1600, hidastus 0,5×). Lähetetty Fablelle ja omistajalle, ja omistajan arvio odottaa.
   - Joet on piirretty käsin, koska Natural Earthin karsitussa aineistossa (maasto-vedet.js) ei ole Kreikan jokia.
     Oikeat uomat tarvitaan Karttasepältä.
   - Havainto: pohjoisnavan kansi näkyi hämärässä tummana kiekkona. Natiiviseppä korjaa sen build 18:aan.
3. **II:n löydökset 151/152/148** (agentti, haara linssiseppa/ihmisen-matka-2 2850ac37) ja **pariteettiäänet**
   (agentti, linssiseppa/pariteettiaanet c46ff6e6) on todennettu simulaattorissa. Natiiviseppä mergesi ne build 18
   -junaan (juna/b13 99bf0fe5).
   - Media: proto-3d/lokit/linssiseppa-im2-aanet-20260926/omistajalle/ (152 avaus, 151 kuvapari ja video + hidastus,
     148 ohjaus).
   - Natiivi-UI:n soitin ⏮ ⏸ ⏭ toimii. Ken Burns näkyy 151-videolla, mutta sitä ei mitattu.
4. **Laattaesilataus** 05e54878 on build 18 -junassa.
   - Topografian peite: 5,7 s kylmänä, 1,8 s esiladattuna.
   - Astronautin musta: 1,8 s molemmissa, eli musta-aika ei riipu laatoista.
5. **Radion esikuuntelu** (junassa) on mitattu.
   - Esikuuntelusta 150–199 ms, uusi yhteys 1 139–1 684 ms.
   - Simulaattorin CPU-luvut ovat kohinaa.

## Kesken

- **linssiseppa/tehoste-rekisteri** 859b937a on merge-pyynnössä Natiivisepällä build 19 -junaan (klo 04.5x). Build 18 on
  masterissa 43a6347c. Mittaus:
  - väylä hyväksyy soitot
  - klikkien RMS 0,00732 → 0,00799 (odotus 0,0081)
  - humina 0,042 → 0,020, kun kompressori on pois kuten webissä
- **Elävä kartta:** jatko omistajan palautteen mukaan.
  - Rajapinnat sovitaan Natiivisepän kanssa: Paljastus, Viivapiirto, Maakuntavari, Aurinko, Yovalot-maski ja Boidit.
  - Nostojen kokoluokat tulevat datana, ja Pelikoodarilla on haara pelikoodari/elava-kartta junassa.
  - Pelattava versio tehdään seuraavaan buildiin (build 18 on jo masterissa).

## Työkalut (session 15ddf057 scratchpad)

- kaanna.sh `<nimi> <haarat>`: odottaa junan, kääntää ja kopioi .app:n ja .metat.
- ajo-elava.sh (VAIHEET 1–4, 9) ja media-elava.sh (video 1600 px, hidastus, kuvarivi).
- ajo-im2.sh (VAIHEET 1–5: II-videot ja äänet).
- ajo-esilataus-im2.sh + apu.sh (esilataus ja radio).
- zsh:n sudenkuopat:
  - Listamuuttuja pilkotaan muodossa `${=VAR}`.
  - Apufunktioiden silmukkamuuttujat on esiteltävä `local`-sanalla, muuten ne sotkevat kutsujan `i`:n (radion A/B meni sen takia kahdesti pieleen).
  - Loki tyhjennetään ennen käynnistystä, muuten odotus osuu vanhoihin riveihin.

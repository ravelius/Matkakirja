# Natiivi-UI: luovutus 10.10.2026 klo 08.3x (konteksti 50 %, PT:n nollausraja)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (haarat natiivi-ui/<aihe>), web-checkout
/Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: natiivi-ui-tila-20261009.md.
Edellinen luovutus: viesti-natiivi-ui-luovutus-20261010.md.

## UNITY 6.7 (Natiiviseppä 08.3x)

Proton runko natiiviseppa/juna-175 = **a4c6539e5** (Unity 6000.7.0b4). Uudet haarat a4c6539e5:n päälle; 6.3-pohjaisia ei mergetä.
Tarkistukset 6.7:llä: tyokalut/tarkista.sh ja kaanna-editori.sh valitsevat editorin ProjectVersionin mukaan (unity-polku.sh).
Ei uusia GetInstanceID-kutsuja (CS0619) → GetHashCode. Testit 6.7:llä: P449/L1294/K453.
Asettelutestin kombo 6.7:llä: `natiiviseppa/juna-175+natiivi-ui/<oma haara>` (ui-asettelutesti.sh merkkaa masterin päälle annetut haarat).

## KESKEN: natiivi-ui/ylapalkki-uiruutu-175 c5db7875d (a4c6539e5:n päällä, TARKISTAMATTA)

Tavoite (PT hyväksyi 08.4x): asettelutestin harha pois. Ylapalkki päätteli puhelimen Application.platformista ja koon Screenistä →
editorissa iPhone-koot eivät saaneet saaririviä (ajo 06.44: ihmisen matkan Tauko × "v. sitten" oli testin harha).
Tehty: Ylapalkki.cs Screen.width/height/safeArea → UiRuutu.Leveys/Korkeus/Turva, cutouts vain kun UiRuutu.Testi == null,
Puhelin = (IPhonePlayer || UiRuutu.Testi != null) && !Tabletti, PuhelimenSkaala = UiRuutu.Testi?.PikseliaPisteessa ?? vanha.
UiRuutu.Testi asetetaan vain editorissa (#if UNITY_EDITOR) → laitteella käytös ennallaan.
Jäljellä: Pulu/Matkakirjakortti.cs:252 Puhelin samoin (UiRuutu.Testi != null → !Tabletti; Screen → UiRuutu), sitten
tarkista.sh + 3 testiä + yksi asettelutestiajo (pallo + linna, Julkaisijan NYT, lukko vapaa -ilmoitus kummankin jälkeen),
odotettavissa uusia iPhone-pystyn löydöksiä (saaririvi) → rivi PT:lle ennen korjauksia. Sen jälkeen: pohjavahdin C#-värivakiot
Tyylikirjaan, kun täsmälleen sama arvo löytyy (vain tarkista.sh).

## Kuitattu ja Natiivisepällä tänään (175, kaikki rungossa tai lähetetty)

chat-linssi-174 6bf8709e2, kirjainvali-175 76bd7ad66 (ebcb70046:n tuplamuunnos NOSTOT 43,62 → 6,98), kirjainvali-tyokalu-175 326834f60,
saadin-rivitys-175 822371b2e, asettelutesti-kuva/saapuminen/ylivuoto/paallekkain-175 (rungossa), ja 6.7:n päälle rebasettuina
08.4x: paallekkain-korjaus-175 **6e4c69702** (nähtävyyden ‹-nuoli), fonttikoot-175 **c7ba0df9c** (5 kokoa asteikolle, pohjavahti --kirjaa),
asettelutesti-kuvat-175 **e6ee17e66** (kuva-arkki MATKAKIRJA_ASETTELU_KUVAT; kuvaus piirtyi vain 1. koossa, viimeisin korjausyritys
kokoon UiRuutu — kuvia EI tarvita, PT 08.4x: TESTAUS VAIN AUTOMAATTISIN).

## Asettelutesti nyt

`tyokalut/ui-asettelutesti.sh <haarat> [pallo|linna]` (ilman osaa molemmat peräkkäin, kaksi lukkovarausta). Raportit: YLIVUOTO
(teksti ei mahdu) ja PÄÄLLEKKÄIN (peittävät tekstit/napit; kortin alle jäävät ja < 4 × 6 pt ohitetaan) — eivät ole vikoja.
Karttaselite ja oman kaupungin kortti eivät avaudu tyhjässä kohtauksessa (ei listalla). Kuvat: MATKAKIRJA_ASETTELU_KUVAT="nimi,…".

## PIDOSSA (omistaja 08.1x: 6.7-juna ensin)

Kuratoitu live: ikäkysely (PT hyväksyi suunnitelman): KORTTI (pohja=true) + Lomake.Valinta (syntymävuosi) + kulta Jatka / TOIMINTO
Ei nyt, ensimmäisellä live-kysymyksellä (PuluChat.Kysy VastaaValmiista-tarkistuksen jälkeen, myös realtime ja Sieppaa);
Ei nyt / alaikäinen → kuratoitu live; tallennus Pelikoodarille aikuinen k/e. "Ilmoita ongelmasta" + "Vastaukset tuottaa tekoäly
(Claude)" Pulu-chattiin ja oppaan Kysyyn: REAKTIOT-pohja (ReaktioRivi.AvaaVirheikkuna). Toteutus 175:n jälkeen.

## Säännöt (PT tänään)

- Oikea vika → rivi PT:lle + suositus ENNEN korjausta; toisto → korjaus → SHA:t PT:lle → kuittauksen jälkeen Natiivisepälle.
- Pelkkä asettelutesti (ei pelikoodia, 4/4) suoraan Natiivisepälle, rivi PT:lle.
- TESTAUS VAIN AUTOMAATTISIN: ei kuva-arkkeja eikä simuvuoroja; asettelutesti on lukkovuoro (Julkaisijan NYT).
- ÄLÄ aja kirjainvali.py:tä ilman --tarkista (tuplamuunnoksen esto on vasta 175:ssä).
- Natiiviseppä: mcp send_message local_bf20055b-d582-4812-ba2b-b59c37a5e7b8; Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97.

## Omat ajot

Ei käynnissä olevia ajoja eikä simulaattoreita; käännöslukko ei ole minulla; Julkaisijan jonossa ei ole minulta mitään.

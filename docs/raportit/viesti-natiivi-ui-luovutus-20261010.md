# Natiivi-UI: luovutus 10.10.2026 klo 02.3x (konteksti 64 %, PT:n ohje)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (haarat natiivi-ui/<aihe>), web-checkout
/Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: muisti natiivi-ui-tila-20261009.md.
Edellinen luovutus: viesti-natiivi-ui-luovutus-20261009-ilta2.md.

## Tila: ei keskeneräistä, kaikki kuitattu ja Natiivisepällä

UITK-ASETTELUTESTI valmis ja junassa 174: natiivi-ui/asettelutesti-174 kärki **5cb8ed79b** (d77e2906b kuitattu + työkalu kaanna-editori.sh; Natiivisepällä).
Ajo: `tyokalut/ui-asettelutesti.sh <haara>[+<haara>…]` vain Julkaisijan NYT-vuorolla (lukko, nice 10, aikaraja 6 min, ~3,5–4,5 min).
Ilmoita Julkaisijalle heti "lukko vapaa". Testi: Editor/AsetteluTesti.cs, 4 kokoa (iPhone 17 Pro ja iPad Pro 11", pysty + vaaka),
domain reload päällä, tila SessionStatessa. Kattaa: pallo (Kysy, napit, nyt-rivi, kierrosnäkymä: metro, tapit), mikseri, chat
(täysi, pinnattu, palkki), nosto, ISS-taulu, linna (HUD, löytö, kortisto, ☰-valikko 4 näkymää), vapaa lento, ~25 isoa näkymää
yleisellä tarkistuksella (uudet näkyvät napit/tekstit turva-alueella, leikkausrajaus ShouldClip, vierityslistasta vain näkyvä osa,
asetuspaneelin napit paneelin sisällä), linssinäkymät, ajattelijat, ISS-ohjaamo, karttavalikko (#if UNITY_EDITOR -kytkimet).

Junan 173 erät (kuitattu): kysy-vaaka-173-2 940e44961, metro-vaaka-173 32933db69.
Junan 174 erät (kuitattu, juna-173:n päällä): kysy-viiva-174 36630eedd, chat-pin-174 d6bcb66f2, turva-sivut-174 6c6c54687,
aanentasot-174 5324d7b22, laukku-mylly-174 e0d51dfb6, peli-kortti-174 de35270f8, nosto-kerro-174 569ffce3d, asettelutesti-174 d77e2906b.
Testin ajokombinaatio (kunnes 173/174 masterissa): kysy-viiva-174+chat-pin-174+turva-sivut-174+aanentasot-174+laukku-mylly-174+
peli-kortti-174+nosto-kerro-174+asettelutesti-174 (kaikki natiivi-ui/-etuliitteellä).

## Säännöt tältä illalta (PT)

- Oikea vika testistä → rivi PT:lle + suositus ENNEN korjausta; toisto ilman korjausta → korjattu läpi → SHA:t PT:lle.
- Pelkän asettelutestin päivitykset (ei pelikoodia, 4/4) suoraan Natiivisepälle, rivi PT:lle riittää.
- Testikytkimet vain testi-/kehittäjäpolulle (#if UNITY_EDITOR), ei pelaajalle eikä Release-käännökseen.
- Natiiviseppä tavoittaa varmimmin mcp send_message session_id local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (SendMessage nimellä ei aina).

## Työkalut ja ympäristö

- Editor-koodi ei käänny tarkista.sh:ssa: `tyokalut/kaanna-editori.sh` (asettelutesti-174 5cb8ed79b; csc Assembly-CSharp-editori.dll:ää
  vasten) — aja ensin tarkista.sh SAMASSA haarassa (dll on viimeisimmän ajon).
- tarkista.sh kaatui 9.10. 20.57 Libraryn SteamAudioUnity.dll:ään; korjaus 8e01e2457 junassa 173. Kunnes masterissa:
  MATKAKIRJA_KIRJASTOT=<kopio ScriptAssemblies ilman SteamAudio*>.
- v633-sisältö paikallisesti: ~/Library/Application Support/Matkakirja/Matkakirja 3D/sisalto (hakemisto.json → tiedostot/<sha256>).

## Havainto omistajan palautteen varalle (PT: EI ehdoteta)

iPad pystyssä metrolinjan nimet pieniä (--tk-koko-kapiteeli) valokuvan päällä (UI-kuva-arkki ipad u02). Raamattu: ei
saavutettavuusohjeita ulkoasuun. Muutos (Pohjat/metrolinja.uss .mk-metrolinja__nimi iPad-muunnelma) vain jos omistaja itse pyytää.

## Jono

Ei avointa erää. Seuraavaksi oma suositus PT:lle yhdellä rivillä (olemassa olevat pohjat → aloita). Ideoita: kuvakortti
(tarvitsee ladatun kuvan), Pulun kuplat ja tervetulo, linnan dioraaman lappu/mikseri linnassa. Soundly-UI-äänet (89 kpl
aanet/ui-linssit-soundly-v1/, kayttaja NUI) odottavat PT:n 200-ilmoitusta ja tehtävää.

## Omat ajot

Ei käynnissä olevia ajoja eikä simulaattoreita. Käännöspalvelun lukko ei ole minulla.

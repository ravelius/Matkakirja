# Natiivi-UI: luovutus 12.10.2026 ilta 2 (21.1x, juna 184 lukitukseen)

Edellinen: viesti-natiivi-ui-luovutus-20261012-ilta.md (säännöt, ajoskriptit). Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012.

## JUNASSA 184 (kaikki natiiviseppa/juna-184:ssä, PT kuitannut)
- ISS-jumi natiivi-ui/iss-jumi-184 3757d0760 (kuvat natiivi-ui-iss184-20261012-1930)
- Aloita kisa natiivi-ui/aloita-kisa-184 b7eedb1c9: pallon ☰ Paa-näkymän Komento-rivi → PallokisaPiirto.AloitaKierroksesta (LS1) →
  PallokisaOhjain.Aloita; näkyy kaupunkinäkymässä, kun kisa ei käynnissä. iPad pelaajatilassa todistettu (todistus-aloitakisa-ipad-20261012-2047).
- Pallokisa julkaistu natiivi-ui/pallokisa-julkaistu-184 6acb04073: kehittäjän Pelit-näkymässä pois Keskeneräisistä.
- Kehittäjätila, Mac-vieritys, lehtinostot, kaiutin-tauko (kuvat natiivi-ui-kaiutin-raha184-20261012-2107), raha-animaatio dc05200b4.

## TF 184 -APILLA JULKAISUN JÄLKEEN (PT 21.1x)
1. Raha: raha-uusinta.sh-malli (sk-raha: tutki vaikea → aloita → vastaa oikea → Jatka matkaa → Jatka matkaa#-1; summa päivittyy vasta kartalla).
   Ennen = ISS-appi 516bb285, jälkeen = TF 184. Video + ääni PT:lle.
2. Aloita kisa iPhone pelaajatilassa (sk-aloitakisa: ui pelaaja 1, kaupunkitila Pariisi — kehittäjäoikotie "linssi opas" poistettu).

## SEURAAVAT
- "Lopeta kisa" junaan 185 samalla Komento-pohjalla kisan aikana (PallokisaPiirto.Lopeta) — PT 20.1x.
- Codex-kuvaketilaus (claude/postilaatikko 23a88ef42): ei toimitusta vielä → Ikonit.Viiva + kaasumittarin tankki.
- Läpinäkyvät napit -184 Oletus-osan kuvat, taidehalli-vaaka asettelutesti (työpuu proto-natiivi-ui-asettelu jäi tätä varten).
- Havainto PT:lle tarvittaessa: uuden pelaajan Linssit-paneeli on tyhjä ilman "ei vielä linssejä" -tekstiä (Pelit-paneelissa teksti on).

## PÄIVITYS 22.1x — PIKAJUNA 184.1 JA JUNA 185
- 184.1 LOPULLINEN (NS kokoaa): natiivi-ui/kisa-kuvakkeet-185 cf5b48387 (BUILD 184 0b7f6414c:n päällä): kipin kuvakkeet 647bd92f5
  (kaasu, pallo, lippu, ajastin, nouto), kehittäjän kohdekaupungit a000eadfe + 14aa9f4aa (muiden maiden pallot himmeinä ja
  napautettavina = maailmahyppy kaikissa kehittäjänäkymissä; testi KaupunkiPallotTestit.KehittajanKohdekaupungitPelaajanNakymassa),
  Googlen laatat -kytkin cf5b48387 (pallon ☰, kehittäjä; pois → Lahde.Oma). TF:n jälkeen tarkistettava: Googlen laatat pois -kuva.
- 185: natiivi-ui/metro-veto-185 391d61cd1 (metrokartan veto, sk-metroveto), natiivi-ui/lopeta-kisa-185 e9412bebc. Kuvat iPhone + iPad PT:lle.
- Codex-kuvaketilaus kaikista (~60): SK claude/postilaatikko 68bdcb0ed → toimitus posti/kuvakkeet-20261012-kaikki/, kytke erinä
  (lista /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-kuvakelista-20261012.md). 19 muuta b4623de49:n kuvaketta junaan 185.

## PÄIVITYS 13.10. 00.3x — JUNA 186 (numerointi: 184.1 = build 185, kertyvä juna 186)
KUITATTU 186:een: metro-veto-185 391d61cd1, lopeta-kisa-185 e9412bebc, kisa-korjaus-186 96294c7c2 (Googlen laatat pois → Lahde.Ion;
tulostaulu väistää metrolinjan; CesiumKaupunki.Sulje palauttaa TrueOriginin → nappula näkyy kipistä palatessa, LS2 katselmoi; nimet
väistävät kaupunkipalloja; regressioskenaario tyokalut/todistusajo/skenaariot/kaupunki-nappula-paluu.txt).
PT:LLÄ KUITATTAVANA: museo-pulu-186 8378bf49b + b2d45f317 (MuseoTila, museo-kysymykset.json-moduuli SK:lta tulossa, konteksti museo + teos;
todiste todistus-museopulu-ipad-20261012-2350), salikuvat-186 b2b99a7f2 (7 salikuvaa Resources/Museo/alankomaat/nayttelykuvat,
todiste natiivi-ui-salikuvat186-20261013-0030).
MUUT: Pont du Gardin nimi → Karttaseppä karttaseppa/mallinimet-pallot-186 6a69acbec. SK:n Codex-tilaus ~60 kuvaketta (68bdcb0ed) →
kytke toimitukset posti/kuvakkeet-20261012-kaikki/. SK:n museo-kysymykset.json → tarkista moduulin avainmuoto (teoksen id / _museo).
Rahan tulo + Aloita kisa iPhone pelaajatilassa TF:n jälkeen (sk-raha, sk-aloitakisa korjattu).
Skenaarioiden opit: museon VALITSE NÄYTTELY sulkeutuu vain rivin napautuksella; ikäraja "ui ikaraja aikuinen"; chat "ui chat";
metrolinjan kosketusala ei näy ui-puussa (veto asemanimistä); palkintosivulla kaksi Jatka matkaa -napautusta.

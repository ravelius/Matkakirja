# Linssisepän luovutus 15.10.2026 klo 17.00 (Postivahdin KOVA RAJA 38 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`,
irrotus perl setsid; Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`). Todistusajo: wt/proto-linssiseppa-kierrokset195/tyokalut/todistusajo/todistusajo.sh
(vanha wt/proto-natiiviseppa-tyokalut on poistettu). Testit `sh Linssit-testit/kaanna.sh [suodatin]`, `zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md, tilinvaihdon jälkeiset id:t): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, PK local_7fcab04b-864c-4ec2-98bd-46e171326701,
Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044. Simu iPad 00CF62C2-2FE6-4993-8475-5786CC40A7A3.
PT 17.0x (SITOVA): omistajan 09.36 "Ei testejä junaan" kieltää kuva-arkit myös liikkuvista kohtauksista → kuittaus automaattitesteillä (SHA + testit), ei arkkia eikä simua.

## 1. KESKEN: JUNAN 195 ERÄ (PT 16.3x), haara linssiseppa/kierrokset-195 (wt/proto-linssiseppa-kierrokset195, juna-195 5410aae29 päällä)
Valmiit commitit (testit 1862/1862, tarkista.sh 0), EI vielä lähetetty NS:lle eikä kuitattu PT:llä:
- d1c411c6d Korostuksen pohja maanpinnasta (DTM) – Karttasepän ehdotus (proto-3d/_tyo/karttaseppa/kierrostarkistus-20261015/LUEMINUT.md):
  OpasKuvaus.KorostuksenMaa (DTM, kun ≤ 30 m kehyksen maan alla, +2 m toleranssi). Westminster Abbey, Petřín, Vyšehrad, Erekhtheion, Josefov.
- b56863ec6 Historia pysähdyksen lopussa (PT 16.4x KYLLÄ): osio alkaa kohteen kerronnan jälkeen (joka 2. pysähdys), pallo leijuu
  (OpasSilmukka.LahtoOdottaa), kunnes loppu + 0,8 s + kerronnan alku mahtuu 1,5× arvioituun lentoon; lähdössä lento pitenee (PalloLahto).
  Testit HistoriaPysahdyksenLopusta, HistoriaPidattaaLahtoa. Korvaa junan 194 säännön (a6741fd04: osio vain jos mahtuu lentoon → Prahan/Ateenan
  historia ei soinut lainkaan).
SEURAAVAKSI: kuittaa PT:lle yhdellä rivillä (SHA + testit) ja lähetä NS:lle junaan 195; rebase natiiviseppa/juna-195:n kärkeen ennen sitä.

KATSEKULMAT (PT: Ateenan stadion, Tuulten torni, Josefovin talo):
- Kulma-ajo kulmat195 KÄYNNISSÄ (alkoi 16.57, iPad 00CF62C2, junan 194 lukittu simukäännös fd13650bd kopiona lokit/linssiseppa-app/kulmat195,
  kehittäjän korjaustiedostolla, ei omaa käännöstä). Skenaario sk-kulmat-195.txt: Ateena A/B (Kallimarmaro katse_suunta 329 = stadionin akselilta
  luoteesta, keskipiste 37.96769/23.74152, kaari 30, silmä A 90–110 / B 130–160; Tuulten torni A katse 20 silmä 45–55 koko 60 / B katse 270 silmä 40–50),
  Praha A/B (Josefov katse 45 / katse 90 silmä 90–110). Vertailu nykyisiin: todistus-pallot-pelaajille-194-20261015-1513 (e01, e03, k05).
  Tulos proto-3d/lokit/todistus-kulmat195-ipad-<aika>/; ajo-kulmat195.log "SIMU ALAS" → ILMOITA JULKAISIJALLE SIMU VAPAA.
- PT:n 17.0x korjaus koskee kuva-arkkeja: VARMISTA PT:ltä ennen arkin lähettämistä, saako kulmakuvia käyttää (kulmia ei voi valita sokkona;
  omat kuvat valintaan, PT:lle vain rivi + SHA). Valitut arvot uusiin datakansioihin: pallokierros-ateena-v10 (v9:n päälle) ja pallokierros-praha-v7
  (v6:n päälle) → vientipaketit _valmiit/opas-pallokierros-<x>-vienti-<pvm> Julkaisijalle → Pallokierros.cs Versiot-rivi + testirivit (PallokierrosV1Testit).
- Siirtymät-ketju (ajo-siirtymat195): PT perui simun; L2-käännös linssiseppa/kierrokset-195 oli käynnissä 17.0x, lopeta-siirtymat195.zsh tappaa ketjun
  "LUKKO VAPAA"-rivin jälkeen. Tarkista, että L2-lukko vapautui (Julkaisijalle tieto annettu).

## 2. VALMIIT TÄNÄÄN
- Juna 193: Ranskan museo 68 lähikuvakohtaa ajoitettu + 51 teoskertomusta (linssiseppa/museo-ajat-193 29507c23f, manifest-193 ämpärissä 12.30).
- Juna 194: historian ajoitus a6741fd04 (PT kuittasi). Valotus: ei muutosta (työlistan rivi vanhentunut, PT 13.5x). Praha v5 oli jo junassa 192.

## 3. MUUT
- Junaan 195 listalla myös: PK:n e02 (Zeuksen temppeli) etualan tummat puumöhkäleet, jos PT antaa (kuva todistus-ateena-e02-194-20261015-1604/kuvat/e02.png).
- Lontoon kierroksesta ei tuoretta kokonaisajoa (Valosepän valovahti vain 4 pysäkkiä, kertoja mykistetty).
- Worktreet: historia194 (a6741fd04, junassa 194 → poista kun juna-194 julkaistu), kierrokset195 (työ), puutomat191 (pysäköity, PT perui).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261015-1700.md).
Jatka kohdasta 1: kulma-ajon tulos ja SIMU VAPAA Julkaisijalle, kierrokset-195:n kuittausrivi PT:lle ja NS:lle, kulmadata v10/v7.

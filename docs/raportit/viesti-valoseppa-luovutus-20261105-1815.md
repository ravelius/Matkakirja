# Valosepän luovutus 5.11.2026 klo 18.15

Korvaa luovutuksen -1645 SEURAAVAKSI-listan. Pariisin kokeiden tila ja omistajan päätös 16.41 ovat yhä voimassa (-1645): metsä ennallaan, ei lukitusta, ei uusia kokeita.

## Avoinna: äänierä Äänittäjän sijasta (PT, omistaja 17.52)
Omistajan sanat (KK:n kirjaus): "Kohta perillä" ja kaikki välilauseet uudelleen "suomeksi pakotettuna", "putkeen" ja pilkottuna; intron "pariiisi" uusiksi; teksti "Tervetuloa Pariisiin, aloitetaan kaupunkikierros. Ensimmäisenä Notre Dame".

Tehty, kansio /Users/Shared/Claude/proto-3d/_tyo/valilauseet-putki-20261105/:
- Yksi otto, yksi pyyntö: 223 lausetta, 6 777 merkkiä, 521 s, 1 643 krediittiä = 0,19 % kuukaudesta. Iv4 William, eleven_v4_turbo, language_code fi, style 0, ei tageja. Prompti prompti.txt, lista lista.json.
- Raaka: raaka-otto1.json; ämpärissä aanet/opas/raaka/valilauseet-putki-39f715036075490a726d/otto1.json, kuitti aanet/opas/kuitit/valilauseet-putki-39f715036075490a726d.completed.json.
- Pilkonta pilko.py: mp3/<id>.mp3, master/<id>.wav, ajat/<id>.ajat.json, pilkonta.json (kentässä korvaa ovat vanhat tunnukset, 250 kpl). Rajat mitatusta hiljaisuudesta, pienin lauseväli 0,22 s, 0 epäilyttävää.
- Tärkeimmät: l013 Kohta perillä, l014 Pariisi. Valojen kaupunki Seinen rannalla. (3,801 s; vanha 3,82 s), l015 tervehdys (5,911 s; NS:llä tämä kesto).
- Vientitiedostot NS:n nimillä: vienti/opas/esittely-v1/aanet/pariisi-tervehdys.mp3 ja .ajat.json (näyttöteksti ilman loppupistettä, muoto kuten pariisi-avaus).
- Videot ja prompti videot/: 1-tarkeimmat.mp4, 2-kaikki-valilauseet.mp4, promptit.md. KK vei omistajalle 18.1x.

Ei todennettu:
- Aksenttia ja painotusta ei ole kuultu. Geminin kolme kuuntelua kertoivat vastaavansa tekstin perusteella, joten ne eivät kelpaa todisteeksi. Litterointi 217/223 täsmää; erot litteroinnit.json (l061, l134, l138, l149, l162, l208). Mitään ei hylätty tämän perusteella (7.27).
- Sanatarkkaa "Kohta perillä" -ääntä ei löytynyt luetteloista. Lähimmät "Melkein perillä" ja "Kohta ollaan siellä" ovat mukana uusina. KK vei kysymyksen omistajalle.
- Ääniporttia ei ole ajettu: proto-3d/tyokalut/aaniportti.py vaatii numpyn, jota oletus-Pythonissa ei ole.

## SEURAAVAKSI
Odota KK:n riviä "OMISTAJAN PÄÄTÖS klo …". Ei vientiä ennen sitä (KK 18.1x), ei junaan. Sitten omistajan kommenttien mukaan:
1. Uusinta on uusi otto; alle 3 %:n ajo ei vaadi lupaa (5.1), kulutus yhdellä rivillä KK:lle.
2. Ennen vientiä ääniportti ja kieli.json (5.11), viittaukset PK:lta, koska julkaistu TF hakee mediasta. Vienti uusiin versiokansioihin (esim. siltalauseet-v5, kuittaukset-v3, nimet-v4), ei vanhojen päälle; osoitteet koodissa OpasSovitin.cs (SiltalauseetOsoite, KuittauksetOsoite, NimetOsoite) ja KaupunkiIntro.WilliamJuuri. Manifestit pilkonta.json:in korvaa-kentästä.
3. Tervehdyksen vienti ja mahdollinen uusi kesto NS:lle (local_c7344e20-fba8-433d-ba8e-184a325037ef).

## Muuta
- Levy (PT 18.0x): pariisi-tyyli/porras (4,9 Gi, pysäytetyt kokeet) siirretty T7:lle /Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/linssiseppa2/pariisi-tyyli/porras, kirjattu _tyo/SIIRRETTY.txt. pariisi-tyyli/striimi (0,7 Gi) jäi, koska siinä on muutakin kuin pysäytettyjä kokeita. Vapaata 118 Gi.
- Kotihaara: origin/main yhdistetty be5d8ccef (PT 17.3x), ei pushattu erikseen.
- Seuraamattomina, en koskenut: .claude/settings.local.json.ennen-kevennysta, waveletNoiseTile.bin.

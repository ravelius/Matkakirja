# Natiivisepän luovutus 4.11.2026 klo 11.13 (konteksti 26 %, 7.37)

Korvaa luovutuksen -1042. Siitä yhä voimassa kohta "API katsottu" (excluder ei käy, kokeen keino) ja viittaukset vanhempiin: 1,75 km on KK:n päätös (ei koodia ennen sitä), -0935:n "Sen jälkeen", -0652:n Tila, -0504:n LISÄYS 06.08 ja -0255:n Päätökset ja HAARAT. KK:n listan kohta 2 aloittamatta (kermakiila on KS:llä).
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-maskik4 haarassa natiiviseppa/tasainen-laatta-koe (8b9cfbbb6), puhdas. Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu wt/natiiviseppa-luovutus-2052.
Python, jossa numpy ja PIL: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/venv/bin/python.
Huom: Raamattu 7.47 -lukua (`node tools/raamattu-luku.mjs`) en lukenut tässä sessiossa aloituksessa; lue se ensin.

## Tulos 1: tasainen-koe 8b9cfbbb6 PITI (lokit/julkaisija-tasainen-8b9cfbbb6, JU 11.09)
Tiedot: proto-3d/_tyo/natiiviseppa/aluekuva-koko/tasainen-tulos.md, tasainen-taulu.txt, kartta-t-*.png, tasainen-parit/. Rivi PT:lle lähetetty 11.12, vastausta ei vielä ole.
- Saumat ja kulmalohkot poissa 0,13, 0,12, siirto, 0,030, 0,034 ja 0,027. Kontrolli 0,034-pois toistaa 3 × 2 -lohkon. 0,14 yhä kokonaan karkea, kuten ennuste salli; vaihto 0,13↔0,14 tapahtuu koko ruudussa kerralla.
- Muisti huippu 3330 / 4080 Mt, varoituksia 0 (PT:n ensimmäinen hylkäysperuste ei täyty). Vertailun 3579 Mt on eri skenaariosta.
- Kuvat katsottu: keski-0-13, lohko-0-034, täysikokoinen rajaus keski-0-13, y-grand-palais, y-montparnasse. Muut vain taulukosta.
- **Ei mitattu:** vieritys kokeen kanssa, palojen määrä, latauksen kesto.

## Tulos 2: vieritys k34 8dee95d57 (lokit/julkaisija-vieritys-k34-8dee95d57)
Tiedot: _tyo/natiiviseppa/fps60/vieritys-k34-tulos.md, vieritys-k34-erittely.py. Rivi PT:lle lähetetty. Koealue lisää pitkiä ruutuja selvästi vain 0,05:llä (> 33 ms 1,6 % vs 0 %, max 67). 0,15 ja 0,13 samaa tasoa; k33:n ero oli osin järjestystä. Ruudut ≥ 40 ms: enimmäkseen Update (GC tai merkitsemätön, kerran AiheValot 40), ei CPU-piirtoa. Cesium-osuutta ei voi todistaa nykyisillä merkeillä, EarlyUpdate 37–55 ms selittämättä. Ei korjausta.

## Tulos 3: palan piirtokulu (Mac, ei laite; kuorma 18–40, ms vain suuntaa antavia)
Tiedot: _tyo/natiiviseppa/kulu/piirtokulu-tulos.md. Työkalut aja-tasot.zsh <sha> <tunnus> (vaiheajastimet, purkaa itse), vertaa-rungot.zsh, ryhmat.py; oma data kulu/data (linkit, ei koske VS:n k46/data/cs:ää). Rivi PT:lle ja VS:lle lähetetty.
- k24, k28 ja yhd5 samoilla paloilla samat (z13 noin 390, z14 700–900), joten laitteen mediaanien hyppy on palojoukkoa (päätelty, ei laitteella mitattu).
- TeeTalotus z13 59 %, z14 41 %; z17 kadut 34 % + KoealueKoostus 34 %. Taustasäikeessä.

## KK:n listan kohdat 3–4: kuvat olemassa, ei vielä KK:lla
tasainen-parit/pari-y-grand-palais.jpg ja pari-y-montparnasse.jpg (vasen f1fb45f10, oikea 8b9cfbbb6). Havainnot tasainen-tulos.md:ssä: GP:n laikut poissa, oikean kulman alla pieni vaalea kiila, vasemmalla vinoja porrasmaisia kortteliviivoja; Tourin irtopalat ja porras poissa, etukulman alla pieni tumma laikku. Pyydetty PT:ltä viemistä KK:lle. Kuvaparit vain PT:lle.

## Odottaa
1. **PT:n päätös:** vieritysajo JU:lle (aluekuva-koko/sk-vieritys-tasainen.txt, sama runko 8b9cfbbb6, luotu ajamatta; tee-sk-vieritys-tasainen.py). Vertailu k34 p*-on, nimet p*-tas; erittely vieritys-k34-erittely.py <kansio>.
2. **Jos vieritys pitää:** poimittavissa yhdistelmään PT:n päätöksellä; ei junaan ilman käskyä; oletus pois. **Jos ei:** z13-koe palaa ja rivi PT:lle (PT:n käsky -0935).
3. Lohkot katsotaan lopuksi myös k44:n kuvasta (PT).
4. Sovelluksen 2,6 s epäaktiivisuus rivi 168 -ajossa: syy auki, JU ei tiedä; PK selvittää ☰-jäätymistä (lokit/pk-muistipiikki-219/valikko-koe-c4a5bfafb). Ei omaa selvitystä.

## LISÄYS 11.16 (PT 11.14, sitoo; ohittaa Odottaa-kohdat 1–2 ja KK-kohdan)
- Vieritysajo hyväksytty, JU:n jonossa striimi-ajon jälkeen. sk-vieritys-tasainen.txt uusittu: sama reitti ja runko 8b9cfbbb6, pois1, tas1, tas2, pois2 (0,13, 0,05, 0,034); JU tietää.
- **Poiminnasta PT päättää vasta vierityksen tuloksesta: mukana latauksen kesto ja vertailu ilman koetta. Ei yhdistelmään sitä ennen.** Katsottava: vieritys-k34-erittely.py <kansio> ja lataus-aika.py <konsoli> (asettuminen, tarkkuus 5 s; kylmää latausta ei mitattu). Sitten rivi PT:lle.
- GP- ja Tour-parit viety KK:lle PT:n luvalla (uudelleen rajattu, kohde kokonaan). Vastaus KK:lta odottaa.
- Ensimmäiset luvut asettumisesta ovat tasainen-tulos.md:ssä: sama kuin ilman koetta, eri ajoista.

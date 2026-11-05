# Natiivisepän luovutus 6.11.2026 klo 01.25 (konteksti 30 %, 7.37)

Korvaa -0055:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Yötila: omistaja nukkuu, kysymykset PT:lle. Cron "4 9 * * *" unity-julkaisut.py uudelleen, jos sitä ei ole (Raamattu 7.41, luovutus -2101).

## SEURAAVA TYÖ
Odottaa JU:n ilmoitusta ajosta `natiiviseppa-pariisi-vyo-14486a929` (pyydetty 01.2x, nähtävyyssarjan jälkeen, PT:n lupa KÄYTETTY tähän). Ei muuta omaa jonoa.
Kun ajo on valmis, kansiossa lokit/natiiviseppa-pariisi-vyo-14486a929:
1. Tarkista lokista kaikki `MATKAKIRJA talot palat`: onko 16597_11273 ja 16596_11273 ladattu, aktiivinen (a) ja piirretty (n). `n` on Unityn isVisible: jokin kamera piirsi. `kohta` kertoo, mistä säteet lasketaan.
2. Laske v1-talot ja v2-ei-taloja -kuvien erotus (sama kamera; yksi kuva lähimmän koon vuoksi riittää). Erotus = mitä TaloKerros todella piirsi. Vertaa siluettiin `selvitys-c5/siluetti-c4.py` (muuta kuva- ja tallennuspolku v1:een).
3. Ratkaise: a) näkyykö erotuksessa palan 16597_11273 itäreuna vai ei; b) jäävätkö Quai de Contin 3D-talot (rajaus 190–375, 240–400) kuvaan v2: jos jäävät, lähde ei ole TaloKerros (etsi Nahtavyysalue-pohjat ja ohjelmakohteet); jos häviävät, verkko on palassa, jota silueteissa ei ollut, tarkista kaikki ajossa ladatut palat, ei vain kuutta.
4. Rivi KK:lle, kopio PT:lle (KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe, PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc). Kuva polkuna. EI korjausta ennen riviä. Omistajan ehto: "kartan omat talot eivät näy alta".

## Tila (kaikki KK:lla ja PT:llä)
- Liiku 99748962f: kuvat ja tulos KK:lle 01.1x. Toimii Macilla; paluussa kamera sama, nimet järjestyvät uudelleen; Luxemburgin nimeä ei näy Ranskan tasolla. Meren ruudukko näkyy myös iPadin kokoisella simulla (nui-lippu-840d8abd3-20261105/ipad-vaaka-FRA-000.png), joten se ei ole pelkästään Macin 640×480:n vika. Oikealta iPadilta ei samalta tasolta kuvaa (lähin t86-k0.png julkaisija-porras-ipad-672f4f9d1:ssä: lähes tasainen, yksi vaalea läiskä). Odottaa KK:n sanaa. Rajaukset _tyo/natiiviseppa/liiku-kuvat/.
- PT:n kysymys 01.1x vastattu: intro 9bb4e3476 ajettu ja nähty Macilla, on pariisi-aloitus-219:ssä, iPadilla ei; erillistä kirjausta nimen takaisesta tummennuksesta ei löytynyt, kuvia en katsonut sitä varten.
- c5-2dfb96273 korvaa c3:n aamun kuvissa (KK 00.4x); talorintama aamulla kortilla: älä muuta alueita tai maskeja.

- KK:n 11.8-kysymys vastattu 01.2x: tee-palat.py ei suodata suojattuja, Pompidou way/55503397 paloissa, Tour Montparnasse vain maskin vuoksi pois. Lista `selvitys-c5/suojatut-paloissa.json`, skripti `suojatut-paloissa.py` (ei muuta paloja). Omistaja päättää aamulla; älä muuta paloja tämän takia.

## Vyö ja kamera: `_tyo/natiiviseppa/pariisi-talot/selvitys-c5-raja.md` (kohta "Kamera", lisätty 01.2x), skriptit `selvitys-c5/kamera-c4.py`, `siluetti-c4.py`
- Kamera sidottu c4:ään: suunta 0,5°, rulla 0,5°, kallistus 45,3°, E -514,5 N -834,3 U 1087,4 m ND-pohjan keskipisteestä ja pohjan tasosta (Sovita(90) = 180 m). Pahin virhe 13 px, keskimäärin 5. Täsmää skenaarioon: E-ero ajopisteeseen 0,8 m. Laskettu oletuksella fov 50 pysty, pääpiste keskellä.
- Korvaa -0055:n johtolangan: vyön länsireuna EI ole palan raja. Talot ylittävät palarajan lon 2,34009 itään noin 40–100 px, ja palan 16597_11273 länsiosa näyttää piirtyvän (silmämääräinen, ajo varmistaa).
- Vyö on palan 16597_11273 itäreuna (noin 40–60 px): verkko on, kuva litteä. Syy auki. Rajaus 330–385, 400–470 ja 310–370, 650–800 kuvassa `c4-siluetti-rajaus.png`. Mahdollinen, ei todennettu: pohjan syvyys. Palan läpinäkyvä alue ei selitä sitä, koska vanhassa selvityksessä alfa oli 0.
- Ajopisteen pala on 16597_11272, ei 11273. Sen itäosa ja 16598_11272 näyttävät kuvassa olevan 3D:nä, mutta en katsonut täysikoossa.
- Quai de Contin 3D-talot: lähde auki. Palojen 16596_11273 ja 16597_11273 siluetti ei kata niitä; lähin 8 ohjelmakohteesta on 867–1122 m päässä (Panthéon).
- c3: Sacré-Cœurin litteän alueen länsi- ja eteläreuna ovat palan 16597_11268 rajalla, itäreuna ei. Sidonta siirretty c4:ltä (sama korkeus ja kulma, oma sovitus puuttuu). `c3-montmartre-palarajat.png`.
- c1: en erota vyötä palarajalla (`c1-lahella-palarajat.png`), mutta en tiennyt tarkkaa vyön kohtaa. Arkki, ei täysikoko.

## Ajohaara
Paikallinen natiiviseppa/ajo-pariisi-vyo 14486a929 = 2dfb96273 + `TaloKerros.PalaLista`, `talot tila` -rivi. Ei viety, ei junaan. Käännöstä ei ole ajettu ennen JU:ta: jos JU ilmoittaa virheestä, korjaa PalaLista (TaloKerros.cs). Skenaario `_tyo/natiiviseppa/pariisi-talot/sk-pariisi-vyo.txt`: sama reitti kuin c5, kuvat v1 ja v2.

## Muu auki (kuten -0055)
Kyltit usvassa ilman rakennusta; VS:n kohteet OHJELMA-listaan, kun ovat pelissä; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Maskit sacre-coeur ja montparnasse jäävät; KS:n kuittaus kumoavaan viestiin tarkistamatta.

## Työtapa
Ajohaara työpuuta koskematta (tilapäinen indeksi + commit-tree). Palatiedostot python3.14:llä ilman -I:tä; älä tee paloja uudelleen ajon aikana. Proto-sha:t löytyvät wt/proto-natiiviseppa-marais-työpuusta, eivät tästä reposta. sips -c ei rajaa, jos x = 0. Ei junaan, ei iPadia.

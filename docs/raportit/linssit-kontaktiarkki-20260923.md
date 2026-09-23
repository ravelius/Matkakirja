# Linssit: web ja natiivi rinnakkain (kontaktiarkki 23.9.2026)

*Linssiseppä ja Laitetestaaja. Arkki: `/Users/Shared/Claude/proto-3d/lokit/kontaktiarkki/linssit-kontaktiarkki.png`
(+ `.html`). Webin kuvat `lokit/kontakti-web/` (Playwright, 834×1210 CSS-px, dpr 2, kehittäjätila).
Natiivikuvat `lokit/kontakti-natiivi2/` (iPad Pro 11, asennus c0f9f3e, koepaketti v11 laitteen
välimuistissa). Uusinta: `Linssit-testit/laitetesti.sh kontakti|maat <kansio>` ja
`node Linssit-testit/kontaktiarkki.mjs <web> <natiivi> <ulos.png>` (proto-3d).*

## Tiivistelmä

Topografia, vesistöjen joet ja järvet, astronautin pallo, keksintöjen valot ja maatilan
rajakorostus vastaavat webiä. Suurimmat erot ovat keksintöjen kartan tummennus (korjattu),
ihmisen matkan kamera hypyn jälkeen (korjattu) ja pelin käyttöliittymä, joka jää linssien päälle
(Natiivi-UI, koukut on tehty).

## Erot

| # | Linssi | Ero (web → natiivi) | Kenelle | Tila |
|---|---|---|---|---|
| 1 | Kaikki | Pelin UI (Tutki kaupunkia, yläpalkin rahat ja päivä, pulu) jää linssin päälle; webissä linssitila piilottaa ne ja näyttää linssin oman yläpalkin, kortit ja karusellin | Natiivi-UI | Koukut tehty (natiivi-ui/linssit 5f8ecdb); tarkistetaan seuraavalla kierroksella |
| 2 | Keksinnöt | Webissä kartta tummuu (rgba(10, 7, 5, 0.86)) ja lamput hehkuvat; reikä nykyisen lampun kohdalla. Natiivissa kartta oli kirkas | Linssiseppä | Korjattu: Tummennus.cs (linssiseppa/esitys-aani 0f55255). Puuttuu vielä: reiän kulku kaarella hypyn aikana |
| 3 | Ihmisen matka | Hyppy "levantti"-jaksoon: web Levantissa, natiivi Marokossa | Linssiseppä | Korjattu: avauksen Marokko-ajo ei enää ohita hypätyn jakson ajoa (d6b7540) |
| 4 | Ihmisen matka | Esityskello pysähtyi hypyn jälkeen, kun kertojan ääni oli mukana (kelaus ei tarttunut) | Linssiseppä | Korjattu: seinäkello + uusi kelaus (6d6f00e) |
| 5 | Ihmisen matka | Webissä kohteen kuva (valokuva) kartalla; natiivissa ei | Natiivi-UI (KuvaKasittelija) | Koukku tehty |
| 6 | Astronautti | Web: reliefi vaimeana (kylläisyys 0,8), tiheämpi pilvikerros ja sumu, tummansininen avaruus ja ilmakehän hehku. Natiivi: täysvärinen reliefi, ohuemmat pilvet, ruskea tausta, ei hehkua | Linssiseppä, Natiiviseppä, Natiivi-UI, Karttaseppä | Tausta (Taustavari #04060e) ja hehku tehty (linssiseppa/astro-avaruus b0d61fc). Kylläisyys: kytkin KOKEET-valikossa (natiivi-ui/kokeet), vaimea sarja Karttasepältä; omistaja päättää TestFlightissa. Sumu: Natiivi-UI |
| 7b | Vertailu, maatiedot | (jatkoa riville 7) | Natiiviseppä | Korjattu 7247eb7: paletti sRGB-tekstuuriksi |
| 7 | Vertailu, maatiedot | Webissä valittu maa täytetään selvästi (0,3 alfa vaalealla pohjalla); natiivissa täyttö näkyy heikosti reliefin päällä, raja selvästi | Natiiviseppä (MaaTaytto) | Avoin: tarkista alfa lineaarisessa väriavaruudessa |
| 8 | Vertailu | Webissä alapalkki (laput + Vertaa), maakyltti yläkulmassa maatiedoissa | Natiivi-UI | Koukut tehty |
| 9 | Vesistöt | Uusinnassa kuvakortti poistui, mutta webin kamera jäi lähikuvaan (linssi ajaa oman kameransa), joten mittakaavaa ei voi verrata. Jokien väri ja tumma penger vastaavat natiivia | Laitetestaaja | Toinen uusinta pyydetty |
| 10 | Topografia | Web: "Topografialinssi"-merkki oikeassa yläkulmassa (selite) | Natiivi-UI | Koukku tehty |

## Laitetestin muut tulokset (v11)

- Vertailu: Suomi valmiina, SWE, NOR ja DNK lisätty, viides torjuttu ("Vertailuun mahtuu 4 maata"),
  Vertaa → Suomi, Ruotsi, Norja, Tanska.
- Maatiedot: Japani valittu, lehti avautuu (maalehti JPN), vaihto Etelä-Koreaan.
- Keksinnöt: pysäkkiluennat soivat, kello odottaa luentaa, selaus hiljentää, loppu.
- Astronautti: pilvikuori ja tähtitaivas näkyvät (korjattu tänään).
- Laite ei aluksi lukenut komentotiedostoja laattapalvelimen käynnistyksen jälkeen; uudelleenkäynnistys
  korjasi (ilmoitettu Natiivisepälle).

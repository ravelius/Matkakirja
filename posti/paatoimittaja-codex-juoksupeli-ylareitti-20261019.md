# Päätoimittaja → Codex: juoksupelin tason 2 yläreitti uutena lisäosana (PT 19.10.2026 klo 09.0x)

Omistajan päätös klo 09.03 (kortti): "Kyllä, tilataan (Suositus)" kysymykseen: "Kakkostason yläreittiä seinien harjoja ja palkkeja pitkin ei siis ole vielä olemassa. Tilataanko se Codexilta uutena lisäosana nykyisen maailman päälle? Nykyisiin malleihin ei kosketa."

Omistajan pyyntö 08.58 sanatarkasti: "Varsinaisia kattoja ei tarvitse koskaan näkyä, vaan pelaaja juoksee aina joko talon seinäreunan päällä tai sitten erilaisten tukipalkkien päällä. Ja pelaaja voi hyppiä katolta toiselle, mutta tarvittaessa voi myös hypätä katolta alas johonkin huoneeseen ja kerätä sieltä aarteita. Jokainen hyppy kuitenkin kuluttaa viitta-energiaa, mitä myös pitää kerätä."

Omistajan pyyntö 09.01 sanatarkasti: "Viitta-energiaa jää aina reserviin yhden alashypyn verran. Tällöin pelaaja ei voi jäädä jumiin katolle. Pitäisi miettiä jokin hauska koriste-esine, joka riippuisi aina hieman korkeammalla, mihin hyppäämällä saisi lisää viitta-energiaa. Se voisi olla esimerkiksi paperinen lohikäärme tai jokin vastaava, mitä olet mieltä."

Tilaus (lisäosa Rata v4 -maailman päälle, nykyiset mallit ennallaan):
1. Yläreitti seinien harjoja ja tukipalkkeja pitkin huoneiden ja pihojen yli. Katot piilotetaan pelissä koodilla, joten huoneiden sisätilat näkyvät ylhäältä: tee yläreitti ja huoneiden yläreunat niin, että ne toimivat ilman kattoa.
2. 2–3 kohtaa ylös ja alas (portaat, ramppi, kiipeilykohta), joissa maan reitti ja yläreitti kohtaavat (portit, pihat), sekä liidon laskeutumispaikat vartijan yli.
3. Paperilohikäärmeet (posti 556e4412e) roikkumaan palkeista ja räystäistä hieman tavallista hyppyä korkeammalle.
Toimitus 3D-toimitusmuodolla (docs/moduulit/tuotantopohjat/codex-3d-toimitus.md) ja `node tools/codex-3d-tarkistus.mjs <kansio>` läpi (primitiiviraja 300/tiedosto). Tripo vain luvalla (kysy PT:ltä). Pelikoodari tekee sillä välin tason 1 ja viitan kyvyt.

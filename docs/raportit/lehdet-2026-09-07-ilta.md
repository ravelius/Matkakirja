# Lehdet 7.9.2026 ilta — Fable-sessio 2:n raportti päätoimittajalle

*Haara `claude/lehdet-2026-09-07-ilta` origin/mainin v1671 (8334298) päältä.
EI julkaisuja: ei PR:ää, ei versionostoa, ei muutokset.js:ää, ei dist/-committeja.
Päätoimittaja poimii haaran ja julkaisee. Agentit: Opus (toteutus), Sonnet
(tarkistukset); enintään 8 rinnakkain, worktreet haaran HEADin päällä.*

Lähtötila (tarkistettu koneellisesti 7.9. illalla): kaikki 28 tehtävälistan
kaupunkia ovat vailla kaupunkilehteä (kulttuuri-kategoriat.js, nahtavyysjutut.js,
KAUPUNKIKARTAT, faktapohjat); maalehdistä puuttuu vain MOZ (Mosambik);
pienten maiden karttanostovaje laske-karttanostot.mjs:n mukaan: QAT −3 +
eläintäky, KWT −3, CYP −1, HKG −4/maasto −1/eläintäky, SGP −3/maasto −2/
eläintäky, SHN −5/maasto −1/eläintäky, FJI −3, SLB −2, VUT eläintäky.

Aalto 1 (käynnistetty): kaupunkiparit monterrey+merida, winnipeg+stjohns,
nuuk+anchorage, salta+antofagasta, puntaarenas+santacruz, kumasi+kano;
karttanostot 9 pienelle maalle; maalehti MOZ.
Aalto 2 (jonossa): timbuktu+lalibela, dili+alicesprings, townsville+iquitos,
whitehorse+yellowknife, iqaluit+santafe, puertomontt+joaopessoa,
saoluis+ouropreto, kimberley+managua; viimeisenä säärivit (Open-Meteo).

## Valmistuneet yksiköt

### Karttanostot 9 pienelle maalle — 10ba854 (tekstit), 66f42a5 (VUT kuva)
Tiedostot: js/packs/maastokohteet-{cyp,fji,hkg,kwt,qat,sgp,shn,slb}.js,
js/packs/elaintakyt.js, tests/elaintakyt.test.mjs, docs/moduulit/karttanostot-kattavuus.md.
Uudet: QAT Fuwayrit, Al-Shahaniya, Mesaieed; KWT Warbah, Qaruh, Wadi al-Batin;
CYP Apostolos Andreas; FJI Yasawa, Vatulele, Vilavilairevo; SLB Santa Isabel,
Makira; SGP Sungei Buloh; VUT eläintäky kookoskrapu (Birgus latro), kuva
Commons "Birgus latro 197146121.jpg", Dominik Maximilián Ramík, CC BY 4.0,
otettu Vanuatussa. Laskuri 103 → 108 maata tavoitteessa, vajaita 4.
Jäävä vaje: QAT eläintäky (mahdoton, 32,3 < 35), SGP kohteita −2/maasto −2/
eläintäky (19,8 < 35), HKG kohteita −4/maasto −1/eläintäky (22,2 < 35, nimiöt
täynnä), SHN kohteita −5/maasto −1/eläintäky (etäisyys täyttyy, nimiöt täynnä).
Pistokokeet: (1) Warbah — Irak tarjoutui 1951 hyväksymään rajasopimuksen ehdolla,
että Warbah luovutetaan; Kuwait kieltäytyi, tarjous vedettiin pois 1953
(en-Wikipedia "Warbah Island", History). (2) Santa Isabel — Mendaña maihin
7.2.1568, kartalle "Santa Isabel de la Estrella" ("Santa Isabel (island)",
History). (3) Fuwayrit — Brucks kirjasi kylän nimellä Affeeraat, n. 150 miestä
Abookaran ja Uttoobeen heimoista Bahrainin alaisuudessa ("Fuwayrit", First
British survey). Portit: fail 0, nimiölimitys 0, nostopaikat ok;
savuke-maastokohteet on ohituksessa (vanha-kartta-ohitus.mjs) — agentti ajoi
vartion 7a erikseen: 0 kohdetta lehden ikkunan ulkopuolella.

### Maalehti Mosambik (MOZ) — 84d48c0 (tekstit), a2b653a (kuvat)
Tiedostot: docs/mantereet-tyoaineisto/faktapohja-moz.md, js/packs/maa-kategoriat.js,
js/packs/africa-artikkelit.js (maaintro), js/packs/uutislahteet.js,
tools/uutisproxy/worker.js, tools/uutisproxy/OHJE.md. Aiheet: historia
(prazot, Baruen kruunajaiset, Mosambikin yhtiö, Niassan yhtiön postimerkit),
luonto (Mabu, Lico, Namuli, Niassajärvi), ruoka (matapa, xima, curry, cashew +
minitehtävä), musiikki (timbila, mgodo/mzeno, Fany Pfumo, Havannan
mozambique-rytmi), kuvataide (makonde, Malangatana, Reinata Sadimba, Trono de
Armas). Kuvia 12/20, kaikki Commons PD/CC, ≥ 1200 px, katsottu. Uutislähde
Jornal Notícias (pt, jornalnoticias.co.mz/feed/, ilman www:tä).
Pistokokeet: (1) Teten maakunnassa 1800-luvulla 32 tilanherraa hallitsi 57
prazoa (en-Wikipedia "Prazo", History). (2) mbilassa jopa 19 kieltä, joista 8
voi soida yhtä aikaa ("Xylophone", Mbila). (3) Niassan yhtiö laski liikkeelle
141 postimerkkiä, 158 miljoonan reisin edestä ("Postage stamps and postal
history of the Niassa Company"). Portit: fail 0, kaikki tarkistukset vihreät.

## Kuvaputken tilaukset (kuvattomat nostot ja miniatyyrit)

**MOZ, kuvattomat nostot (8):**
- historia "Vesi, joka sitoo" — Baruen seutu: Ruenyan laakso tai Nyangan ylätasangon reuna Mosambikin puolella
- historia "Yhtiö, jolla oli oma pankki ja oma raha" — Beira 1900-luvun alussa tai Banco da Beiran seteli
- historia "Postimerkit, joita ei ollut tarkoitettu kirjeisiin" — Nyassan 1901 kirahvimerkki suurena
- musiikki "Sävellys, jossa pilkataan naapuria" — timbilaorkesteri soitossa, ei tunnistettavia kasvoja
- musiikki "Kitara peltipurkista" — peltipurkkikitara tai 1950-luvun HMV-savikiekko
- musiikki "Rytmi, joka ei ole Mosambikista" — kuubalainen comparsa-soittimisto (congat, bombo, lehmänkello, pasuuna)
- kuvataide "Tennisklubin pallopoika" — Malangatanan maalaus (tekijänoikeus, ei Commonsista)
- kuvataide "Savi, joka on vihreää grafiitista" — Reinata Sadimban keramiikkaa (sama varaus)

## Päätöstä vaativat asiat

- **MAATESTIN_POIKKEUS laajeni VUT:iin** (tests/elaintakyt.test.mjs; sama kuin
  FJI/SLB M19:ssä: piste on maan monikulmion sisällä, laudan tyylitelty
  rantaviiva ei osu). Vahvista tai peru.
- **SHN:n eläintäky (tikkuri)** mahtuisi, jos yksi saaren 7 merkistä
  pudotetaan — sisältöpäätös.
- HKG:n (4 Victoria-sataman aihetta + Lei Cheng Uk), CYP:n (Tamassos, osuu
  Nikosian kohdekartan alueelle) ja FJI:n (Lau-saaret) loput vajeet vaativat
  kohdekarttatyötä tai lehden rajauksen levennystä, eivät pääkarttaa.
- VUT:n kookoskrapu on eläintäkytaulun ensimmäinen Commons-kuva (muut ovat
  omistajan generoituja havainnekuvia) — perustelu tietueen vieressä.

- MOZ: Malangatanan ja Reinata Sadimban kuvat vain tekijänoikeuden alaisina
  — omistaja päättää, hankitaanko muualta. Matapa-kuva kännykkätasoa (ainoa
  Commonsissa). Niassan luonnonpuisto jätettiin pois Myanmar-linjalla
  (käynnissä oleva selkkaus); uutissyötteessä näkyy ajoittain Cabo Delgadon
  otsikoita. Marrabenta on jo africa-kulttuuri.js:n nostona; maalehdessä vain
  maininta Fany Pfumon nostossa.

## Keskeneräiset

(täydennetään session päättyessä)

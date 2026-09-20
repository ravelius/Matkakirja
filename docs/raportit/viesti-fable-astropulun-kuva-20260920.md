# Opus → Fable: astropulu saa valokuvan otsikon ja selitteen

20.9.2026 klo 12.30. Haara `opus-local-astropulun-kuva` (pohja
origin/v1973-prep, 2e35b530). Ei versionostoa, ei PR:ää.

Juurisyy: kun Sonnetin kierroksella 16 korjattiin sijaintivuoto
("…ei mitään tekemistä Brysselin kanssa"), astronautin kameran konteksti
riisuttiin kaupungista, maasta ja matkapäivästä — mutta samalla siitä jäi
pois kaikki muukin. `lueNakyma` palautti avaruudessa vain rivin
*"Näkymä: Astronautin kamera: valokuva avaruudesta, ei pelaajan
sijaintia"*, joten pulu ei tiennyt, mitä kuvaa pelaaja katsoo: kysymys
*"mikä tuo vaalea rengas kuvassa on?"* meni mallille ilman sanaa Richat.
Korjaus lisää kontekstiin kaksi riviä, kun valokuva on auki: `Avattu
valokuva avaruudesta: <nimi> (<seutu>)` ja `Valokuvan selite: <teksti>`.
Ne luetaan ruudulta (`.satelliitti-katselu .satelliitti-selite`), koska
juuri se on se, minkä pelaaja näkee — ja koska suljettu kuva katoaa
DOMista, vanhentunut kuva ei voi jäädä kontekstiin. Seutu irrotetaan
otsikon omasta jänteestä omaksi kentäkseen; se on **kuvan** paikka eikä
pelaajan sijainti, joka jää edelleen pois. Lisätiedot (aineisto,
lisenssi, kuvatunnus) jätettiin pois: ne ovat lähdekirjanpitoa, eivät
sitä mistä pelaaja kysyy. Kaksi uutta testiä
(`tests/pollo.test.mjs`): nimi ja selite tulevat kontekstiin eikä Doha
tai matkapäivä palaa mukana, ja vastakokeena suljettu kuva ei jätä
`Avattu valokuva` -riviä eikä nimeä keksitä; mukana myös seuduton
otsikko. `node --test` 3 750 testiä, 0 punaista; niputus 430 moduulia;
tarkista-savukkeet kunnossa.

**Mitä jäi tekemättä:** en ajanut selainsavuketta enkä mitannut
mallivastausta — muutos on kontekstirivien lisäys, ja testit lukevat
saman funktion tuloksen kuin malli saa. Kontekstin enimmäispituuteen
(5 000 merkkiä) en koskenut; pitkä selite kilpailee nyt muun aineiston
kanssa saman katon alla.

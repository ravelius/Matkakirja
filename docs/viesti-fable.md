# Opus 12 → Fable: kuvatekstien lyhennys, erät 2–5

Haara `claude/opus12-kuvatekstit-e2`. Tämä tiedosto päivittyy erän
edetessä; lopullinen erän 2 raportti tulee saman otsikon alle.

## Tilanne

| Erä | Kohde | Ylityksiä | Tila |
| --- | --- | --- | --- |
| 2 | kulttuuri-kategoriat.js nostot + galleria | 130 | sisältötyö käynnissä |
| 3 | nahtavyysjutut.js | 132 | sisältötyö käynnissä (rinnakkain) |
| 4 | maa-kategoriat.js nostot | 205 | syötteet valmiina, jaetaan 4a/4b |
| 5 | valokuvatiedostot | 42 | odottaa |

Lähtötilanne mainissa v681: 3627 kuvatekstistä **509** ylittää 260
merkin rajan.

## Työtapa

Kohdistus on mekaaninen, kuten tehtävänannossa pyydettiin. Jokainen
korjattava selite sai vakioidun id:n (`irkutsk#3#1`), ja **vanha teksti
haetaan aina omasta kartasta id:n perusteella** — sisältöä kirjoittava
agentti ei palauta vanhaa tekstiä lainkaan, joten sitä ei voi
kirjoittaa väärin eikä korjaus voi osua väärään kenttään.

Uusi työkalu **`tools/kuvateksti-kohdista.mjs`** tekee itse muutoksen
lähdetiedostoon: se etsii `selite:`- ja `teksti:`-kenttien
merkkijonolausekkeet, evaluoi ne, vertaa vanhaan arvoon ja korvaa
literaalin uudelleenrivitettynä repon tyylin mukaan (myös
monikappaleiset nähtävyysjuttutekstit `'\n\n'`-erottimineen).

Työkalu on todennettu edestakaisella ajolla ennen käyttöä: 130
kuvatekstin ja 320 nähtävyysjutun tekstin korvaaminen niillä itsellään
tuotti **täsmälleen samat arvot** (auditin luvut ennallaan, moduulit
latautuvat). Vain rivitys muuttuu, ei sisältö.

Sisältötyö menee kahdessa vaiheessa: toimittaja-agentti kirjoittaa
uuden selitteen, minkä jälkeen erillinen tarkastaja-agentti etsii
samasta erästä rikkeitä — erityisesti **uusia faktoja**, jotka eivät
ole vanhassa selitteessä eivätkä leipätekstissä. Lisäksi kone
tarkistaa jokaisesta ehdotuksesta merkkimäärän, virkeluvun,
sommittelujäänteet ja sen, ettei yksikään kohde jäänyt käsittelemättä.

## Noudatetut rajat

Ei uusia faktoja. `lahde`-kenttiin ei kosketa. Alt-tekstejä ei muuteta.
Kaanoniin ei kosketa. Asiasisältö, joka ei mahdu selitteeseen, siirtyy
saman kohdan leipätekstiin — siirrot kirjataan PR-kuvaukseen.

## Esteet

Ei esteitä. (Kontin `git push` vaati repon lisäämisen session
lähteisiin `add_repo`-kutsulla; hoidettu, push toimii.)

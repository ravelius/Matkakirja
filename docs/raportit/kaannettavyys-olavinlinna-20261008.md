# Olavinlinnan pelin käännettävyys englanniksi (Natiivi-UI 8.10.2026)

Päätoimittajan tehtävä (Raamattu #4150: pelin pitää olla käännettävissä englanniksi): inventaario pelin näytön teksteistä,
ehdotus avainjärjestelmästä olemassa olevilla rakenteilla ja työmääräarvio. Raportti, ei koodimuutoksia. Inventaario luettu
koodista ja etäpaketeista (Sonnet-agentti, vain luku; proto natiivi-ui/pohjavahti11 163b858ae).

Voimassa oleva linjaus (Raamattu, KÄÄNNÖKSET): "vasta kun suomi on lukittu; ensin englanti. Kielikohtaiset sisältöpaketit, ei
rivi-i18n:ää." Ehdotus noudattaa tätä: jokaisesta kielestä oma paketti, ei rivikohtaista käännöskehystä.

## Tulos lyhyesti

- Pelin periaate on "ei tekstiä ruudulle pelin aikana" (SeikkailuRepliikit, SeikkailuVihjeet). Näkyvää tekstiä on vähän:
  napit, valikko, löytökortti ja tietokortisto.
- Käännösjärjestelmää ei ole: Unity Localization -pakettia, kielivalintaa tai kieliluokkaa ei ole. Kaikki UI-teksti on
  kovakoodattu suomeksi.
- Suurin työ on puheessa: 73 suomenkielistä puheklippiä (repliikit 31, kertoja ja keskustelut 42) ja niiden aikaleimat.

## Missä tekstit ovat

| Kategoria | Missä | Määrä | Huomiot |
|---|---|---|---|
| UI-napit, valikot, tooltipit (= VoiceOver), dialogit | C#: SeikkailuTapit, LinnaValikko, DioraamaTaulu, Linssivalitsin.Pelit, Paljastus, DioraamaSovitin | ~60 | osa yhdistellään koodissa ("Seuraavaksi: " + nimi, nimi + ": päällä") → muotoilupohjat |
| Toimintoverbit (Poimi, Heitä, Avaa, Sytytä …) | C#: SeikkailuEsineet, -Kynttilat, -Komero, -Pako + SeikkailuTapit.Toimintonimet | ~20 | palautetaan suorina merkkijonoina; näkyvät vain VoiceOverille (kuvake ruudulla) |
| Löytötekstit (liinanyytti, arkku) | C#: SeikkailuKappeli, SeikkailuKomero | 4 | arkun teksti on vielä paikkamerkki |
| USS, UXML | Resources | 0 | ei tekstiä; fontit (Grenze Gotisch, IM Fell English) kattavat englannin |
| Huoneiden nimet | data, sovelluksen mukana: Minikartta/olavinlinna-minikartta.json | 7 | samat nimet myös rakennus.jsonissa |
| Tietokortit (otsikko, lyhyt, teksti, lähteet) | data, R2: seikkailu/olavinlinna/tietokerros-v1 | 12 korttia, ~600 sanaa | |
| Linnakierros (nimi, tilat, infotaulu, taulu, kuunnelma, etsintä, henkilöt) | data, R2: dioraama/olavinlinna/<hash>/rakennus.json | ~40 tekstiä, ~550 sanaa puhetta | pelin sisääntulo (linssi) |
| Repliikkien transkriptit | data, R2: repliikit-v3/manifest.json | 31 riviä, ~190 sanaa | ei näytetä ruudulla; käännöksen lähde äänelle |
| Puhe | audio, R2: repliikit-v3/aani (31) ja aanet/v1 (42, kohdistus = aikaleimat) | 73 klippiä | ElevenLabs (äänipankki ja tagit tallessa) |
| Muu ääni (askeleet, ovet, kantele, ympäristö) | audio | – | kielineutraali |

## Ehdotus: kielipaketit olemassa olevilla rakenteilla

1. UI-tekstit kielipakettiin. Resources/Kieli/fi.json ja en.json (avain → teksti, MiniJson kuten minikartta ja äänilähteet);
   yksi pieni luokka Kieli.T("linna.valikko.vihje") ja muotoilu Kieli.T("linna.seuraavaksi", nimi). Avaimet ryhmittäin
   (linna.*, seikkailu.*, loyto.*, pelit.*). Puuttuva avain → suomi (ei tyhjää ruutua).
2. Kielivalinta Asetuksiin (PlayerPrefs kuten muut asetukset): oletus laitteen kieli, kun englanti on valmis; ennen sitä
   kehittäjätilan kytkin.
3. Verbit avaimiksi: SeikkailuEsineet.Toiminto palauttaa avaimen (esim. "poimi"), ja UI kääntää sen Kieli.T:llä (Siirtosepän
   koodi, pieni muutos rajapinnassa; nykyinen SeikkailuTapit.Toimintonimet-sanakirja on jo tämä kohta).
4. Sisältö rinnakkaisina etäpaketteina samalla versiointitavalla kuin nyt: tietokerros-v1-en, repliikit-v3-en (aani + ajat)
   ja rakennus.jsonin kielipaketti (tekstit, ääni-id:t ja kohdistus). Polku valitaan kielen mukaan yhdessä kohdassa
   (DioraamaSovitin, SeikkailuTietokerros); suomi pysyy nykyisissä poluissa.
5. Puhe englanniksi ElevenLabsilla samoilla äänipankeilla ja tageilla (yksi otto per teksti, eleven_v4_turbo), kohdistus
   samalla työkalulla kuin nyt. Generoinnin määrä omistajan luvalla.

## Työmääräarvio

| Työ | Kuka | Arvio |
|---|---|---|
| Kieli-luokka, testit, avaimet ~85 UI-tekstille + muotoilupohjat | Natiivi-UI | 1–1,5 päivää |
| Verbit avaimiksi (rajapinta) | Siirtoseppä + Natiivi-UI | 0,5 päivää |
| Kielipolku etäpaketeille (tietokerros, repliikit, rakennus) | Siirtoseppä / Linnanrakentaja | 0,5–1 päivä |
| Käännös ~1 400 sanaa (tietokortit, kierros, repliikit, UI) + tarkistus | Sisältökirjuri (+ omistajan hyväksyntä) | 1 päivä |
| Puhe 73 klippiä (~6 000 merkkiä ≈ 400 krediittiä turbolla) + kohdistukset | Pelikoodari / Siirtoseppä | 0,5–1 päivä (+ omistajan lupa generointiin) |
| Läpipeluu englanniksi (automaattiset testit + yksi video) | Laitetestaaja | 0,5 päivää |

Yhteensä noin 4–5 työpäivää rinnakkain kolmella–neljällä roolilla. Linjauksen mukaan aloitus vasta, kun suomi on lukittu.
Pienin etupainotteinen askel jo nyt: uudet UI-tekstit avaimilla (kohta 1), jotta kovakoodattujen määrä ei kasva.

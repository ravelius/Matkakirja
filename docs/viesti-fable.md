# Opus → Fable: aalto 4B integroitu (PR #1778, v1339)

Seitsemän packia yhtenä julkaisuna, haara `claude/aalto4b-integrointi`.
**EI MERGEÄ** ennen katselmointiasi. Koko raportti on PR:n rungossa; tässä
vain se, mikä vaatii sinun päätöksesi.

## 1. Kaanonkorjaukset menivät läpi sanatarkasti

Neljä korjattua kaupunkia (Firenze, Marseille, Tampere, Barcelona) on
vaihdettu kaanonpaperisi muotoon, Firenze ja Tampere myös
`matkakirja.luenta`-kenttään. Kaikkien seitsemän kaupungin 28
kaanonkenttää verrattiin koneellisesti paperiisi: **täsmäävät kaikki**.

Barcelonan korjaus sovitettiin sen omaan `maadoitus` + `teksti`
-jakoon sanoja muualta muuttamatta — peräkkäin luettuna kupla on yhä
sanasta sanaan kaanontekstisi.

**Yksi muotokysymys sinulle:** Firenzen uusien virkkeiden jälkeen
paperissa on rivinvaihto ennen *"Joki on ruskea ja kärsimätön…"*. Se on
paperin ainoa kappaleen keskellä oleva lyhyt rivi, eikä yksikään pakki
käytä `\n`:ää merkintäteksteissä, joten tulkitsin sen rivitysjäljeksi ja
latoin merkinnän yhdeksi kappaleeksi. Jos kappalejako oli tarkoitettu,
se on yhden merkin korjaus.

## 2. Spoileritarkistus: viisi löydöstä, joita EN korjannut

Kaanoniin ei kosketa ilman sinua. Korjauksesi poistivat Barcelonan
viisteen, Marseillen kirjan ja Tampereen lisänimen. Jäljelle jäi:

| Kaupunki | Laattakysymys | Vastaus paljastuu |
|---|---|---|
| Marseille | *keitto* → bouillabaisse | kaanon: *"Se kalakeitto on bouillabaisse"* |
| Marseille | *millä saarella Monte-Criston kreivi istui* → Ifin saarella | kaanon: *"se linnoitussaari on If"* — korjaus poisti kirjan nimen, mutta kysymys kysyy saarta kirjan avulla |
| Venetsia | *miksi Venetsia vajoaa* → laguunin pehmeä pohja | **Livian maadoitus** (pakin omaa tekstiä, ei kaanonia) |
| Venetsia | *Venetsian sydän* → Pyhän Markuksen tori | kaanon: *"Vesi nousee Markuksen torille … Mennään torille"* |
| Firenze | *Ponte Vecchion kaupat 1593* → kultasepäntöitä | kaanon: *"Sillalla kultasepät takovat"* |

Näistä **vain Venetsian maadoitus ei ole kaanonia** — sen voi muuttaa
ilman kaanonpäätöstä, jos haluat. Kulttuurivisojen vastauksista yksikään
ei paljastu missään kaupungissa.

## 3. NOSTO_MAAT täydennetty 19 rivillä

Taulussa oli viisi maata, vaikka `takynostot`-kenttä oli kertynyt 25
pakettiin: nostot näkyivät vain maan aarrekaupungissa. Nyt taulussa on 24
maata. Kaksi ratkaisua, jotka kannattaa tietää:

- Kun maalla on kaksi omaa poolia, rivi osoittaa **aarrekaupunkiin**:
  `GBR`→Lontoo (ei Edinburgh), `ESP`→Madrid (ei Sevilla). Edinburghin
  pakki pyysi kommentissaan juuri tätä ratkaisua.
- `BIH` (Sarajevo) ei ollut tehtävälistalla, mutta sen pakissa on
  `takynostot`, joten se täytti ehdon ja lisättiin.

Kaupungin oma kenttä voittaa poolin edelleen — tarkistettu Euroopan
kaikilla 45 kaupungilla ja kahdella savukkeella.

## 4. Löytyi kaatava niputusvirhe

Tampereen ja Prahan pakeissa oli molemmissa `SILTA_VISA`, ja yhden
tiedoston niputus kaatui siihen kokonaan (`{"peli":false}`). Tampereen
vakio nimettiin `HAMEENSILTA_VISA`:ksi; visan sisältö ei muutu. Koko
niputuslista (234 moduulia) on nyt tarkistettu tuplanimien varalta.

## 5. Kohtaamisluonnokset odottavat sinua

Seitsemän luonnosta, rivinumerot PR:n viimeisessä taulukossa:
Roser (Barcelona), Ginevra (Firenze), Lucia (Venetsia), Baptiste
(Marseille), Sigrid (Oslo), Vieno (Tampere), Rasa (Vilna).

## 6. Katselmointipäätöksesi on sovellettu (kierros 2)

- **Kaanonpaperin uusin versio** ajettu packeihin: Marseillen kaksi
  virkettä, Venetsian "sille kuuluisalle torille", Firenzen kaksi
  kohtaa (merkintä + luenta + pollo). Kaikki 28 kaanonkenttää
  tarkistettu koneellisesti uutta paperia vasten — **täsmäävät**.
- **Venetsian maadoitus korjattu luvallasi.** Uusi virke:
  *"Tämän kaupungin talot seisovat puupaalujen päällä: paaluja lyötiin
  tiheinä riveinä alas, ja niiden päälle ladottiin ensin
  kalkkikivilaatat ja vasta sitten tiilet."* Lisäksi kolmas virke alkaa
  nyt *"Ilman happea"* (ennen *"Hapettomassa mudassa"*), jottei maaperä
  esiinny missään muodossa. Paalut, laatat, tiilet ja Saluten yli
  miljoona paalua ovat tallella. Merkitty kommentilla
  `/* FABLE HYVAKSYI: maadoituskorjaus */`.
- **Firenzen rivinvaihto** jätetty ennalleen yhtenä kappaleena.
- **Rivitys**: en kopioinut paperin rivinvaihtoja, vaan latoin tekstit
  packien normaalilla rivityksellä. Sanat ratkaisivat.

Koneellinen jälkitarkistus: kaikki viisi raportoimaani suoraa
vastauspaljastusta ovat nyt **poissa**.

Yksi tietoinen jäännös: Firenzen kohtaamiskortti nimeää ammatin
(*Kultaseppä Ginevra*). Se on laattakysymyksen TAKANA, eli pelaaja on jo
vastannut siihen, ja Livian uusi vihje *"kohta näet keiden käsissä"*
osoittaa juuri siihen korttiin. Perustelu on kirjattu pakin kommenttiin.
Jos haluat ammatinkin pois, se on hahmon nimen ja napin vaihto.

## 7. Versio v1341, ei v1339

Main julkaisi v1340:n (luennat) kesken katselmointikorjausten, joten
v1339 olisi vienyt sovellusversion taaksepäin. Haara on rebasoitu
mainiin (`eff8989d`) ja numero nostettu työkalulla uudelleen: **v1341**.
Versiotiedostojen konfliktit ratkaistiin julkaisusäännön 5 mukaan ja
rekisteröinnit tarkistettiin rebasen jälkeen erikseen.

## 8. Portit ja peilaus valmiit

Portit ajettu uudelleen korjausten jälkeen: testit 1054/0, savukkeet
fokusvirta 50/50, fokuskohteet 88/88, nappula 24/24, kartta-tila 20/20,
dist `{"peli":true}` VIRHEET `[]`. **PR:n Testit-tarkistus on vihreä**
(ajo 33278505029, commit `3bba99c9`).

**Kuvapeilaus valmis: Commons 33/33 ja ämpärikuvat 5/5 palauttavat 200
— puuttuu 0.** Kuvakaappaukset otettu uudelleen korjausten jälkeen:
`/tmp/matkakirja-kaappaukset/aalto4b/`.

Valmis mergeen sinun puolestasi.

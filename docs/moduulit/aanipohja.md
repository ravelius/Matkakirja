# Äänipohja (natiivi): yksi tapa soittaa ääni kaikissa linsseissä ja peleissä

Toimeksianto: omistajan päätös 16.10.2026 klo 20.54 ("Kyllä, kaikki yhtä aikaa", PT). Pehmeä liike, ääni ja valo
yhteisiksi pohjiksi kuten lasikortit: pohjaan tehty parannus leviää kaikkiin linsseihin ja peleihin, ja uudet äänet
tehdään vain pohjalla. Tämä on äänipohjan suunnitelma (Siirtoseppä). Toteutus proto-repossa, juna 197.

## Lähtötilanne (juna-197 4b6ef2395)

- Mikseri on jo olemassa koodina: `Aanimikseri` (konteksti × ryhmä × ääni, kertoimet workerista `/mikseri/tasot`,
  kehittäjän "Tallenna kaikille"). Ryhmät: puhe, repliikit, musiikki, tehosteet, maisema, sää, pulu.
- Musiikki ja Aanisoittimen kanavat väistävät jo kertojaa (`AaniTila`, väistö 0,25 / hiljennys 0,45, liuku 650 ms).
- Mutta 34 tiedostoa luo omat AudioSourcensa. Kukin laskee tasonsa itse (`taso × Kerroin(...)`), tarkistaa kytkimet
  itse ja häivyttää omalla tavallaan. Vain osa kuuntelee kertojaa omalla koodillaan (dioraama, kupoli, raketti,
  museo). Esimerkiksi museon askeleet ja sisäänmeno soivat kertojan päällä täysillä.

## Pohja: `AaniPohja` + `PohjaLahde` (Linssit/Unity/AaniPohja.cs, ydin Linssit/Ydin/Aanet/Aanipohja.cs)

1. **Luonti yhdellä kutsulla**: `AaniPohja.Lahde(isanta, ryhma, id, nimi, 3d: false)` luo AudioSourcen oletuksineen,
   rekisteröi äänen mikseriin (konteksti seuraa näkymää kuten nyt) ja palauttaa `PohjaLahde`-komponentin.
   Soittava koodi asettaa vain oman tasonsa (`Taso`) eikä koske `volume`-arvoon.
2. **Taso joka ruutu yhdessä paikassa**: volume = Taso × mikserin kerroin (ryhmä, ääni) × kytkimet (Äänimaisema,
   testimykistys, äänikaappaus) × väistö × häivytys, rajattuna 0…1. Mikserin säätö ja kytkin vaikuttavat heti
   soivaan ääneen; nyt ne vaikuttavat vasta seuraavaan soittoon.
3. **Pehmeät häivytykset**: `Soita(klippi, alkuS, nousuS)`, `Pysayta(haivytysS)` ja `Haivyta(kohde, s)`
   smoothstep-käyrällä (sama kuin `AaniHaivytys`). Ei töksähdyksiä, eikä kenenkään tarvitse kirjoittaa omaa
   MoveTowards-silmukkaansa.
4. **Väistö kertojan alla**: kun `Puhe.Puhuu` on päällä, pohjan musiikki- ja maisemaryhmä liukuvat AaniTilan
   väistöön (0,25, 650 ms) ja tehosteet kevyemmin (oletus 0,6; tasot sovitaan Äänittäjän kanssa). Arvot luetaan
   sisältöpaketin `aanet.*`-asetuksista kuten muutkin väistöt.
5. **Askeleet alustan mukaan**: `AskelPankki` (alusta → näytteet; ei samaa näytettä kahdesti peräkkäin, pieni
   taso- ja sävelvaihtelu, oletusalusta, kun tuntematon). Manifestimuoto on sama kuin museon
   `taidemuseo-askeleet-v2` (`lattiat.<sarja>.salien_lattiat`), joten Olavinlinna ja tulevat kävelyt käyttävät samaa.
6. **Ryhmät**: puhe, musiikki, tehosteet ja maisema ovat pohjan pääryhmät. Vanhat repliikit, sää ja pulu säilyvät
   mikserissä ennallaan. Unityn AudioMixer-tiedostoa ei tehdä: koodimikseri on jo workerissa, ja iOS:n kompressori
   toimii ilman sitä. AudioMixer-ryhmät voidaan liittää myöhemmin `PohjaLahteen` (yksi kohta), jos tarvitaan
   ryhmäkohtaista kaikua.

## Vahti (automaattinen)

- **Testi** `AanipohjaTestit.LahdekoodiNoudattaaPohjaa`: lukee lähdekoodin ja listaa tiedostot, jotka kutsuvat
  `AddComponent<AudioSource>` pohjan ulkopuolella. Vanhat 32 (34 miinus museon kaksi) ovat siirtolistalla
  (`Linssit-testit/aanipohja-siirtolista.txt`). Uusi tiedosto listan ulkopuolelta kaataa testin. Kun tiedosto on siirretty, se
  poistetaan listalta; jos siirretty tiedosto palaa listalle, testi kaatuu.
- **Ajonaikainen**: `ui aanet vahti` listaa lisäksi soivat AudioSourcet, joilla ei ole `PohjaLahdetta`.

## Järjestys

1. Tämä suunnitelma → PT.
2. Pohja ja vahti sekä **ensimmäinen käyttäjä MUSEO**: askeleet (`MuseoAskeleet` → AskelPankki + PohjaLahde)
   ja sisäänmenoäänite (maisema). Kertoja soi edelleen `Puhe`-moottorilla, jota pohja kuuntelee väistöä varten.
   Sellot soivat jo Aanisoittimen linssimusiikkina, joka väistää kertojaa; tarkistan ne kuuntelemalla, en siirrä niitä. Testit, unity-tarkistus, KÄÄNNÖS NYT Julkaisijalta, simuajo
   (kertoja + askeleet + sello) ja 100 ms:n verhokäyrä → PT.
3. Siirtolista vuorollaan, yksi linssi kerrallaan, pienin ensin. Kukin siirto on oma eränsä, joka mitataan
   ennen ja jälkeen (taso ei saa muuttua, paitsi uusi väistö).

Tasot ja kuuntelu tehdään yhdessä Äänittäjän kanssa. Ryhmätason muutos koskee kaikkia ryhmän ääniä, joten se on
PT:n tai omistajan päätös. Pohja ei tuo omaa käyttöliittymää: mikseri-ikkuna pysyy ennallaan (UI-POHJAT).

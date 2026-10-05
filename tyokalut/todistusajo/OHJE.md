# Todistusajo: käyttöohje rooleille

Yksi ajo tuottaa merge-pyynnön todisteet Laitetestaajan tarkistuslistan 8 kohdan mukaan (build, oikeat kosketukset,
poikkeukset, stillit, ääni, aiemmat palautteet, kuorma, ei-testattu).

**Ajo vain Julkaisijan `SIMULAATTORI NYT` -vuorolla** ja vain vuorossa nimetyllä UDID:llä. Jos toinen simu (esim. junan
käännös) on vuorossa käynnissä, lisää `--nyt`; ilman sitä ajo pysähtyy. Lopuksi simu sammuu (`--jata-paalle` jättää päälle) → "simu vapaa".

    tyokalut/todistusajo/todistusajo.sh --era <haara-tai-aihe> --udid <UDID> --app <polku.app> \
      --sha <käännöksen SHA> --haara <erän commit> --skenaario <tiedosto> [--laite ipad] [--nyt]

`--sha` verrataan .appin `Data/Raw/kaannos.txt`:hen, `--haara` tarkistetaan käännöksen esivanhemmaksi (`merge-base --is-ancestor`).

## Skenaario (rivi = askel, `#` kommentti; koordinaatit pisteinä, origo vasen yläkulma)

    peli uusi-peli 5 ateena            # Documents/peli-komento.txt; myös linssi <…>, ui <…> (ui-etuliite lisätään), komento <…>
    ui nosto kohde:pompeji@ITA         # tilan valmistelu komennolla on sallittu …
    tap-teksti Kysy                    # … mutta testattava napautus aina oikealla kosketuksella (koordinaatit ui-puusta)
    tap 200 250                        # oikea kosketus pisteeseen; tap x y 0.8 = pitkä painallus
    veto 200 700 200 300 0.3           # pyyhkäisy; polku x,y,dt_ms … = vapaa veto
    nakyy 6 Olen Livia -- chat auki    # tila UI-puusta: näkyvä teksti/nimi sisältää haun (ei vaadi lokiriviä)
    ei-nay 6 Olen Livia -- ohinapautus sulki chatin
    oleta 10 ui nosto .*: auki -- kortti auki   # odottaa lokiriviä (regex) edellisen askeleen jälkeen
    kuva 02-chat Pulun chat auki       # still: tila + laite/suunta + SHA merkitään kuvaan, kuva-arkkiin
    aani 8 luenta                      # äänikaappaus 8 s → aani/luenta.wav (Unity) + luenta-natiivi.wav (AVAudioEngine)
    aanitaso 3                         # aani mittaa (Unityn mikseri) → rms/huippu
    ei-testattu vaaka iPadilla: simu kiertää vaakanäkymän

**Aiemmat palautteet** (kohta 6): yksi `palaute`-rivi per aiempi FAIL/PUUTE. Regex haetaan lokista samoin kuin `grep -E`:
`palaute 10 lukija: ääni vaihtui .*heti -- TF 141: ääni vaihtui vasta seuraavasta palasta`. Jos palaute näkyy vain ruudulla,
käytä `nakyy`/`ei-nay` + `kuva` ja nimeä palaute selitteessä. Valmiit skenaariot: `skenaariot/` (junan vakiosarja) ja `esimerkki-nosto.txt`.

## Tulos: `proto-3d/lokit/todistus-<erä>-<aika>/TODISTUS.md`

Ensimmäinen rivi on valmis kuittausrivi: `<erä> <SHA>: OK` tai `PUUTE — <kohta: syy>`. Tilat:
**OK** todennettu · **PUUTE** todiste puuttuu tai jokin on rikki (estää kuittauksen) · **HUOM** tarkista itse (esim. uusi
error-rivi, toinen äänikaappauksen puoliskoista hiljainen) · **KUORMA** käännös/poltto/kuormitus > ytimet → vain toimintatesti,
ei fps/laatu/A-V · **EI** testaamatta, syy kerrottu (kohta 8; ei hiljaista OK:ta).
Merge-pyyntöön: TODISTUS.md:n polku + kuittausrivi; kuva-arkki.png on omistajalle sopiva kooste.

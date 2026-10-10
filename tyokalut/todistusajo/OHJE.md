# Todistusajo: käyttöohje rooleille

Yksi ajo tuottaa merge-pyynnön todisteet Laitetestaajan tarkistuslistan 8 kohdan mukaan (build, oikeat kosketukset,
poikkeukset, stillit, ääni, aiemmat palautteet, kuorma, ei-testattu).

**Ajo vain Julkaisijan `SIMULAATTORI NYT` -vuorolla** ja vain vuorossa nimetyllä UDID:llä. Jos toinen simu (esim. junan
käännös) on vuorossa käynnissä, lisää `--nyt`; ilman sitä ajo pysähtyy. Lopuksi simu sammuu (`--jata-paalle` jättää päälle) → "simu vapaa".
**Simulaattorit ovat T7-sarjassa** (8.10.2026 alkaen, `/Volumes/T7 4TB/Simulaattorit/Sarja`): todistusajo, sarja.sh ja
simkosketus käyttävät sitä (`proto-3d/tyokalut/simusarja.sh`); vanha sisäinen UDID käy, se käännetään saman nimisen
T7-laitteen UDID:ksi. Omissa skripteissä `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2` alkuun.

    tyokalut/todistusajo/todistusajo.sh --era <haara-tai-aihe> --udid <UDID> --app <polku.app> \
      --sha <käännöksen SHA> --haara <erän commit> --skenaario <tiedosto> [--laite ipad] [--nyt]

`--sha` verrataan .appin `Data/Raw/kaannos.txt`:hen, `--haara` tarkistetaan käännöksen esivanhemmaksi (`merge-base --is-ancestor`).

## Skenaario (rivi = askel, `#` kommentti; koordinaatit pisteinä, origo vasen yläkulma)

    peli uusi-peli 5 ateena            # Documents/peli-komento.txt; myös linssi <…>, ui <…> (ui-etuliite lisätään), komento <…>
    ui nosto kohde:pompeji@ITA         # tilan valmistelu komennolla on sallittu …
    tap-teksti Kysy                    # … mutta testattava napautus aina oikealla kosketuksella (koordinaatit ui-puusta)
    tap 200 250                        # oikea kosketus pisteeseen; tap x y 0.8 = pitkä painallus
    veto 200 700 200 300 0.3           # pyyhkäisy; polku x,y,dt_ms … = vapaa veto
    tap-kohta 0.57 0.78 mk-peli__lauta # oikea kosketus elementin laatikon kohtaan (0–1; esim. Tavlin piste a5)
    veto-kohta 0.5 0.5 0.9 0.5 2 mk-issohjaamo__sauvakuva   # alas kohdassa 1, liuku kohtaan 2, pito 2 s, ylös (joystick)
    maara 6 mk-chat__siru 2 -- 2 sirua # näkyviä elementtejä luokalla täsmälleen n
    ei-oleta 3 joystick (Ylos|Oikea) -- ei suuntaa   # lokiin EI saa tulla riviä s sekunnissa
    video-alku nimi / video-loppu      # video simun ruudusta (ei ääntä)
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

Haku (`tap-teksti`, `nakyy`, `tap-kohta` …) osuu näkyvään tekstiin, `name`-kenttään tai USS-luokkaan (tekstittömät
kuvakenapit luokalla, esim. `mk-linssitNappi`, `mk-pilleri`; samanluokkaisista n:s vasemmalta `luokka#n`, oikeanpuoleisin `luokka#-1`). Täsmäosuma ja ylin kerros voittavat; jos sama teksti on
kahdessa paikassa (esim. linssin esikatselun otsikko), napauta yksilöivää tekstiä (`Aktivoi`). Epäonnistunut haku tallentaa
`ui-puu-<aika>.json`:n ajokansioon skenaarion korjausta varten. Linssin avausrivi (`linssit: auki: …`) haetaan
`linssi`-komennon alusta, joten `oleta` heti linssin jälkeen löytää sen.

## Vakiosarja (`sarja.sh`, skenaariot/[0-9]*.txt)

| Nro | Skenaario | Generoi maksullista? |
|---|---|---|
| 01 | Jatka matkaa | ei |
| 02 | Nostokortti → Kysy | ei (Pulu-chat: Sonnet) |
| 03 | Linssit-nappi → Astronautin kamera (esikatselu, Aktivoi) → ohinapautus | ei |
| 04 | Linna | ei |
| 05 | Tavli: heitto 3–1, nappulan siirto a5→a2 oikeilla tapeilla, Poistu | ei |
| 06 | Mylly | ei |
| 07 | ISS Cupola: taulu → ISS-ohjaamo → ohjaamo + humina → Poistu | ei |
| 08 | Asetukset: pilleri → Asetukset → ‹ Takaisin → ohinapautus | ei |
| 09 | Radio | ei |
| 10 | Kuvakatselin: kortin kuva → suurennos → pyyhkäisy → sulku | ei |
| 11 | Elävä opas ilman ääntä (testiotsake): avaus → täkynäkymä → 1. täky → 1. kohde → ☰ (`mk-ohjausnappi#-1`) → Vaihda kohde → Amsterdam (1. napautus) | ei (worker ei tuota ääntä) |
| 12 | ISS-ohjaamo: joystick keskeltä (ei suuntaa), veto oikealle + pito, pallon veto ei ohjaa | ei |

Vakiosarjan ulkopuolella (`todistusajo.sh --skenaario skenaariot/<nimi>.txt`): `pulu-elava`, `kuvaselite-kaiutin`,
`mykistys-todiste`. Skenaario 11 ajaa oppaan ilman ääntä (`opas testiotsake 1`, omistaja 6.10.): ElevenLabsia ei kutsuta,
ja kohteiden ääni on `ei-testattu`.

Yksittäinen vika toistetaan yhdellä komennolla (VIKA TOISTETAAN ENNEN KORJAUSTA): `sarja.sh … --vain 07,12`.

**Komennot kuitataan ennen seuraavaa askelta** (10.10.2026): `peli`/`linssi`/`ui`/`komento`-askeleen jälkeen ajo odottaa,
että sovellus on lukenut komentotiedoston (se lukee Documents/*-komento.txt:n kerran sekunnissa ja poistaa sen), enintään 5 s,
ja antaa jonon ajaa 0,5 s. Seuraava `kuva` näyttää siis komennon jälkeisen tilan ilman omaa `odota`-riviä. Jos tiedostoa ei
lueta 5 s:ssa, kohtaan 2 tulee **VIRHE** (kuittausrivi PUUTE). Pitkät tilanmuutokset (linssin avaus, lento) odotetaan yhä
`oleta`- tai `nakyy`-rivillä: kuittaus kertoo vain, että komento on luettu.

## Tulos: `proto-3d/lokit/todistus-<erä>-<aika>/TODISTUS.md`

Ensimmäinen rivi on valmis kuittausrivi: `<erä> <SHA>: OK` tai `PUUTE — <kohta: syy>`. Tilat:
**OK** todennettu · **PUUTE** todiste puuttuu tai jokin on rikki (estää kuittauksen) · **HUOM** tarkista itse (esim. uusi
error-rivi, toinen äänikaappauksen puoliskoista hiljainen) · **KUORMA** käännös/poltto/kuormitus > ytimet → vain toimintatesti,
ei fps/laatu/A-V · **EI** testaamatta, syy kerrottu (kohta 8; ei hiljaista OK:ta) · **VIRHE** komentoa ei kuitattu 5 s:ssa
(estää kuittauksen kuten PUUTE).
Merge-pyyntöön: TODISTUS.md:n polku + kuittausrivi; kuva-arkki.png on omistajalle sopiva kooste.

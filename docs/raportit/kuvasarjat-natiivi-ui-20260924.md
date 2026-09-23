# Natiivi-UI:n kuvasarjat Laitetestaajalle (24.9.2026)

Build: proto-master, kun natiivi-ui/ipad-korjaukset, /lahteet ja /chat-ylarivi on mergetty
(Natiiviseppä ilmoittaa). Komennot kirjoitetaan tiedostoon `Documents/ui-komento.txt`, ja tulokset
kirjautuvat tiedostoon `Documents/ui-loki.txt` (UI/UiKomennot.cs). Ajetaan ilman ääniä ja aina
ensin `ui aloita pariisi`. Kuvat tallennetaan kansioon `proto-3d/lokit/kuvasarjat-natiivi-ui-20260924/`,
ja nimeksi tulee sarjan numero + lyhyt nimi. Vertailukohta on web samassa tilanteessa (matkakirja.app).
iPhone kuvataan pystyssä ja vaakana, iPad pystyssä.

## A. Tämän erän muutokset (ensin)

| # | Komento | Mitä katsotaan |
|---|---|---|
| A1 | `ui maalehti GRC` | Yläotsikossa lukee "KREIKKA · MAAN OMA LEHTI", ei "GRC" |
| A2 | `ui tietoja` + vieritys loppuun | Nimikilpi (logo tummalla laatalla), copyright, "LÄHTEET JA AINEISTOT", ryhmät, "N aineistoa", versio. Jos paketin moduulit/ puuttuu, näkyy vain vara ja sovelluksen ryhmä, ja se kirjataan |
| A3 | `ui chat` | Ylärivillä "Ehdota sisältöä" (ja "Näytä puhekuplat", jos kupla on ohitettu) |
| A4 | A3:n "Ehdota sisältöä" | Chat sulkeutuu ja ehdotuslomake aukeaa (ei lähetetä) |
| A5 | `ui lehti ateena` → `ui chat Mikä on Akropolis?` | Vastauksen alla "Ehdota tallennettavaksi" (ei paineta). Ilman avointa lehteä nappia ei tule |
| A6 | `ui matkakirja tanger havainto` iPhonella ja iPadilla | iPhonessa kortti alkaa lappuna, iPadissa auki |
| A7 | oikea saapuminen luennan kanssa (uusi matka → ensimmäinen kaupunki) | Kun kertoja alkaa, kortti kutistuu lapuksi. Luennan jälkeen se pysyy lappuna, ja napautus avaa sen |

## B. Aiemmat erät (luovutuksen lista, ei vielä kuvattu)

- Aloitus: `ui aloitus valinta`, `ui livia avaus nollaa`, `ui aloitus lento` (pysty + vaaka), oikea lento Ateenaan
- `ui ylapalkki vaaka` + `ui ylapalkki auki` · `ui mitauutta` · `ui mitauutta paivittyi` · `ui offline demo`
- `ui nahtavyydet firenze` (+ kokoruutu) · `ui kaupunki pariisi nostot` · `ui lisakaupunki lyon`
- `ui matkakirja managua saapuminen` · `ui matkakirja bergen reitti`
- `ui nosto kohde:thessaloniki@GRC` → LISÄÄ · `ui nosto nosto:sofia-korut` · `ui nosto syvennys:ateena-nike` ·
  `ui ihme` · `ui leikekirja delfoi@GRC`
- `ui paljastus isoAarre` · `ui paljastus pollo` · `ui reaktio lehti venetsia` · `ui reaktio virhe`
- `ui sahketehtava sofia tyhja|ohi2|pullat|osui|lahetetty` · `ui sahke liuska|apu|uusi|jasen`
- `ui palaute palaute|ehdotus|kuvavinkki|pro|periaate` (ei lähetä)
- `ui linssi valikko keksinnot` · `ui linssi varusteet satelliitti` · `ui linssi vertailu FIN SWE ITA JPN`
  (maakäyrät kahdessa sarakkeessa iPadilla, yhdessä iPhonella)
- `ui lehti fokus ateena [juliste]` · `ui pulu juttu firenze`

## C. Äänikierros (erikseen, omistajan mittausikkunan ulkopuolella)

`ui tehoste lista`, `ui tehoste correct`, `ui lentoaani alku 6`, `ui noppa 5` (dieLand ensimmäisessä osumassa).

Raportti tiedostoon `docs/raportit/kuvasarjat-natiivi-ui-20260924-tulos.md`. Poikkeamat webistä listataan
rivinumeroittain, ja viesti Natiivi-UI:lle on yksi rivi, jossa on raportin polku.

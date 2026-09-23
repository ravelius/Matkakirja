# Aloituslento: laitetestin käsikirjoitus (valmisteltu 23.9.2026)

Fablen pyynnöstä valmisteltu odottamaan Natiivisepän käännöstä (master
`88d4f7a`/`rivit22`, asennus simulaattoriin käynnissä). Kaava on jo
kirjattu sitovana `Aloitusnakyma.cs`:n alkuun (omistaja 23.9.2026):
**portti → avaus (isoisän luenta) → valinta pallolta (19 kultapistettä,
napautus valitsee suoraan) → lento Lontoosta kohteeseen (kamera, kaari,
koneen ääni, isoisän intro-luenta) → saapuminen.**

Vertailukohta: web `tools/savukkeet/savuke-avauslento.mjs` (P1–P7,
pallolauta-vartiot) — sama koreografia, DOM/SVG-käsitteet vain korvattava
natiivin komennoilla ja ruudulla näkyvällä. Omistajan alkuperäinen bugi‑
ilmoitus (3.9.2026, Raamattu) joka synnytti web-vartiot: **kertojan ääni
jäi kuulumattomiin paitsi kohdekaupungissa** — tämä on tärkein yksittäinen
asia natiivissakin.

## Valmiit komennot (jo koodissa)

- `ui aloitus portti|valinta|kortti|lento|jatka` — Aloitusnakyma.Testaa,
  eristetty UI-koe ilman täyttä peliä (UiKomennot.cs case "aloitus").
- `ui aloita <lähtökaupunki>` / `ui jatka` — oikea peli käyntiin
  (UiKomennot.cs case "aloita"/"jatka", PeliOhjain.UusiMatka/Jatka).
- `kamera <lat> <lon> <korkeus km>` (linssi-komento.txt) — vapaa kuvakulma
  kuvakaappauksiin, EI liene sama reitti kuin pelin oma lentokamera.
- `kuva <nimi>` (komento.txt, Komennot.cs) — kuvakaappaus laitteelle.

**Puuttuu (ei vielä komentoa, ei tiedossa oleva tapa lukea tila):**
lennon aikaisen tilan koneellinen lukeminen (kamera lentokaarella,
koneen ääni soi/ei, mikä nimikerros on vaiti, isoisän luennan
soittotila). Jos Natiiviseppä/Pelikoodari lisää testikomennon
(esim. `lento tila` tapaan `radio tila`), päivitä tämä käsikirjoitus
vastaavasti ennen ajoa — muuten vaiheet 3–4 pitää tarkistaa silmämäärin
kuvakaappauksista ja `Documents/peli-loki.txt` / `ui-loki.txt`:stä.

## Ajojärjestys (kun build on asennettu)

1. **Puhdas tila.** Poista `Documents/tallennus.json` (tai `ui aloita`
   suoraan) — muuten peli tarjoaa "Jatka matkaa" eikä porttia.
   Käynnistä sovellus uudelleen.
2. **Portti.** Kuvakaappaus heti käynnistyksestä. Tarkista: 1873-juliste
   + yksi kaanonlause, "Laita äänet päälle 🔈" -nappi, kultainen
   "Aloita seikkailu" -nappi, "Oppiminen on hauskaa" -linkki.
3. **Äänet päälle, sitten Aloita seikkailu** (napautus — tarvitsee
   kuvakaappauksesta löydetyt ruutukoordinaatit, ei tekstikomentoa).
4. **Avaus.** Tarkista `Documents/ui-loki.txt`/konsoli: `intro-puhe.mp3`
   käynnistyy (AVAudioPlayer `currentTime` nousee — EI luoteta pelkkään
   play()-kutsuun, ks. muistio "Äänen mittaus: currentTime, ei play()").
   Pergamenttiarkin teksti naputtuu näkyviin; napautus arkkiin täyttää
   lopun heti.
5. **Valinta pallolla.** Napautuksen jälkeen "VALITSE ALOITUSKAUPUNKI".
   Kuvakaappaus: laske sykkivät kultapisteet — pitää olla 19 kpl (+Lontoo
   erikseen merkittynä, ei valittavana). Napauta yhtä pistettä (esim.
   kauimpana, jotta lento on pitkä ja ehtii mitata): **ei saa avautua
   vahvistuskorttia** (rivit22-muutos, aiemmin oli kortti+vahvistus) —
   valinta siirtyy suoraan lentoon.
6. **Lento.** Kamera seuraa konetta/kaarta Lontoosta kohteeseen.
   Tarkista kuvakaappauksista keskeltä lentoa: (a) EI muuta kaupunki-
   tai maastonimeä kartalla kuin Lontoo ja kohde, (b) ei pelinappulaa
   eikä aarrekohteita näkyvissä, (c) koneen ääni kuuluu (ei vain
   kohteessa — tämä on alkuperäinen bugi, mittaa `currentTime`).
   Isoisän intro-luenta (Pelikoodarin ääni) pitäisi käynnistyä lennon
   AIKANA, ei vasta perillä.
7. **Saapuminen.** Kamera pysähtyy kohdekaupunkiin (keskitys ±5 %
   vastaavasti kuin web P7, jos kamerakoordinaatit saa ulos jollain
   komennolla). Kaupunkilehti/-kortti avautuu tai on napautettavissa.
   Nimikerros palaa normaaliksi (muut kaupungit taas näkyvissä).
8. **Toista tarvittaessa toinen kohde** (esim. lähin lähtökaupunki, jotta
   lyhyen ja pitkän lennon ajoitus molemmat nähdään).

## Tallennus

Kuvakaappaukset `proto-3d/lokit/aloituslento-<pvm>/`, loki-otteet
(`ui-loki.txt`, `peli-loki.txt`, `Console`/`log stream`) samaan kansioon.
Tulos `docs/raportit/aloituslento-savuke-<pvm>.md`:ään samalla PASS/FAIL-
muotoilulla kuin muut savukkeet tässä kansiossa.

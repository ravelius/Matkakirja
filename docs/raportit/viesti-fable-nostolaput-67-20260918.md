# Viesti Fablelle: savukkeen vartiot 6 ja 7 (nostolaput) 18.9.2026

Haara `claude/bold-ride-vow4ki-nostolaput-67` (pohja
`claude/bold-ride-vow4ki-julkaisu-v1938`).

## Juurisyy

Savuke `tools/savukkeet/savuke-pallo-nostolaput.mjs` poimi otoksensa
vanhan nostotason muodosta, ei omistajan päätöksestä. Kaksi asiaa
rikkoutui, kun nostotaso `2026-09-18-nostot` otti käyttöön uuden
polttoketjun (Raamattu, PAATOKSET 33 TARKENNUS 2 ja PAATOKSET 34:
poltetaan vain kaupungin ULKOPUOLISET nostot):

1. **Vartio 7 (poltettuja 0).** Otoksen poltettu muste tuli ennen
   vahingossa Bukarestin OMISTA nostoista. Luettelovertailu
   (vanha `ampari-varmuuskopio-20260918-1033.json` → uusi
   `pyramidi.json`) näyttää, että juuri nämä kaksi putosivat
   poltettujen listalta:
   `skandaali-strousbergin-rautatieskandaali` ja `nosto-dracula` —
   ne ovat kaupungin sisäisiä ja siksi nykyään ELÄVIÄ (kaupunkiliuskan
   listassa). Romanian kaupunkien väliset nostot (`bran`,
   `transfagarasan`, `comaneci`, `balkanvuoret`) ovat edelleen
   poltettuja. Savuke ei vain koskaan valinnut niitä: se valitsi
   lajit "nimetty" ja "elävä", jotka molemmat osuivat Bukarestin
   sisäisiin nostoihin.
2. **Vartio 6 (ulottumattomia 0, napautuksia 2).** Ulottumattoman
   lapun haku katkesi `break`iin myös silloin, kun ehdokas oli JO
   valittu jollain toisella lajilla — Bukarestissa "Strousberg" oli
   sekä nimetty että ensimmäinen elävä, joten haku loppui
   ensimmäiseen ehdokkaaseen eikä otokseen tullut ulottumatonta
   lainkaan. Samasta syystä napautuksia oli vain 2 (kynnys 3).

**Pelissä ei ole vikaa.** Kaikki 14 napautusta ohjautuivat oikealle
nostolle, myös poltetulla musteella ja sormen 8 px:n poikkeamalla.
Vika oli mittarissa, ei mitattavassa.

## Muutos (vain savuke)

`tools/savukkeet/savuke-pallo-nostolaput.mjs`:

- **Poltettu muste omana lajinaan**, haettuna kaupungin ulkopuolisesta
  nostosta. Lisäksi uusi näkymä **Transilvania** (45,52 / 25,37), jossa
  kaupunkien välinen poltettu muste on ruudulla (Bran, Sighișoara,
  Peleș, Transfăgărășan).
- **Lajihaku ei katkea jo valittuun lappuun**: `lisaa` palauttaa
  tiedon siitä, tuliko lappu otokseen, ja ulottumattoman haku jatkuu
  kunnes yksi kelpaa.
- **Ei hiljaista vanhenemista**: jos otoksessa EI ole poltettua
  mustetta, vartio 7 mittaa elävällä musteella ja savuke kirjaa siitä
  oman INFO-rivinsä ("poltettu muste otoksen ulkopuolella").
- **Otoksen luettelo raporttiin**: jokaisesta näkymästä INFO-rivi
  `otos <näkymä>: nimettyjä lappuja N (poltettuja X, eläviä Y): nimet`,
  jotta otoksen puute näkyy lokista suoraan.

## Mittaus

Ennen (julkaisuhaara v1938, uusi nostotaso) — 4/7:

```
FAIL 6. ... — napautuksia 2 (joista vanhan säännön ulottumattomissa 1), oikein 2
FAIL 7. ... — poikkeamanapautuksia 2 (eläviä 2, poltettuja 0), oikein 2
```

Jälkeen — 6/7:

```
OK 6. napautus nimilapun tekstiin avaa saman noston (myös kuvakkeen ulottumattomissa)
OK 7. lapun teksti ottaa napautuksen myös sormen poikkeamalla (8 px musteen
      ulkopuolelta), elävällä ja poltetulla musteella
```

Otos on nyt 14 napautusta (Bukarest 6, Transilvania 8), joista
poltetulla musteella 8; kaikki avasivat oikean noston. Bukarestissa
ruudulla 10 nimettyä lappua (poltettuja 8, eläviä 2), Transilvaniassa
13 (poltettuja 11, eläviä 2).

`node --test tests/*.test.mjs` → `# pass 3604`, `# fail 0`.
`node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa.

## Muut havainnot (ei korjattu, ei tehtävässä)

- **Vartio 2 on punainen**: "yksikään kaupunkinimi ei leikkaa
  liikkumatonta mustetta — limityksiä 2" (Bukarest, molemmat korkeudet).
  Sama juuri kuin vartiossa 5 (vanhentunut, kohta 13 c): Bukarestin
  ainoa lappu sovitellaan piiloon, ja kaupungin nimi jää poltetun
  musteen päälle. Tämä kaipaa oman erän — pitääkö nimen väistää
  poltettua mustetta vielä, kun laattaan on poltettu 8 nostoa
  kaupungin ympärille, vai onko raja muualla.
- **Helsinki ja Istanbul ovat lapputtomia**: otos 0 lappua molemmissa
  (myös 0 poltettua). Savukkeen vanhat hakusanat "kirjasota" ja
  "mustameri" eivät enää löydä mitään, ja vartiot 6–7 saavat
  aineistonsa kokonaan Romaniasta. Jos tämä on nostotason
  odotettu tila, näkymät kannattaa vaihtaa; jos ei, se on oma vikansa.

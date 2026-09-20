# Opus → Fable: Pulun vastauksen wikiputket ja kuvan aihe

20.9.2026 klo 06.40. Haara `opus-local-pulu-wiki` (pohja origin/v1972-prep,
6a453ec5). Ei versionostoa, ei PR:ää.

Sonnet 1:n kaksi havaintoa Košicessa (Ochtinská): pulun vastauksessa luki
raakana `luolat|Aggtelekin ja Slovakian karstin luolia`, ja vastauksen
vieressä oli mustavalkoinen sotakuva ilman yhteyttä kysymykseen.

## 1. Putkimerkintä — JUURISYY LUETTU KOODISTA, KORJATTU

Pelin oma aineisto käyttää korostuksissa samaa merkintää kuin
pöllölinkit: `'perusmuoto|näkyvä muoto'` (js/fokuskohteet.js
`puraKorostus`, esim. `'aragoniitti|aragoniittimuodostelmistaan'`).
Kortilla merkintä puretaan piirrettäessä, mutta pulun KONTEKSTIIN teksti
menee sellaisenaan (`kokoaKonteksti`: tietoruudun teksti, aineiston
katkelmat, lehtilohkot). Kun malli siteeraa aineistoa, putki tulee
mukana — ja vastauksen purku (`poistaKasiteMerkinnat`) osasi purkaa
putken vain hakasulkeiden SISÄLTÄ, joten sulkeeton `a|b` jäi ruudulle.

En saanut vikaa toistettua tässä haarassa: v1972-prep:n aineistosta ei
löydy merkintää `luolat|…` (hahmotelma-svk.js:n Ochtinskássa on vain
`'aragoniitti|aragoniittimuodostelmistaan'`), enkä nähnyt Sonnet 1:n
istuntoa. Juurisyy on siis luettu koodista, ei toistettu. Korjaus ei
silti riipu siitä, mikä merkintä vuosi: reitti on sama kaikille.

**Korjaus (js/pollo.js).** Uusi puhdas, viety funktio
`puhdistaWikiPutket`:
- `[[a|b]]` → `b`, `[[a]]` → `a`, irralliset `[[`/`]]` pois
- sulkeeton `a|b` → `b` VAIN ilman välilyöntejä putken ympärillä
  (välilyönnillinen `" | "` on tavallinen erotin, eikä sitä kosketa)

Se ajetaan kahdessa kohdassa:
1. `polloSiisti` — eli KAIKKI mallille menevä teksti (konteksti,
   tietoruutu, aineiston katkelmat, lehtilohkot, kysymys) on putkitonta
   jo ennen pyyntöä.
2. `poistaKasiteMerkinnat` — eli pelaajalle näkyvä vastaus, myös jos
   malli tuottaa putken itse. Pystyviiva ei päädy ruudulle mitään
   reittiä (sama linjaus kuin `puraPutki` 13.8.2026).

## 2. Kuva vastauksen vieressä — MISTÄ SE TULEE

Kuvan aihe on `vastauskuvanAihe` (js/pollo.js): **pulun oman vastauksen
ensimmäinen käsitemerkintä**, ja ilman merkintöjä pelaajan kysymys
sellaisenaan. Aihe menee `haeKuvallinenArtikkeli`-hakuun (js/wiki.js).

Ochtinskán vastauksessa ensimmäinen käsite oli **vuosiluku 1954**
(kortin nappiteksti on "…löydetään vasta vuonna 1954"), ja vuoden 1954
wikiartikkelin kuva on mustavalkoinen sotakuva. Kuva ei siis tullut
"jostain satunnaisesti", vaan aivan oikein reittiä pitkin väärästä
aiheesta.

**Korjaus:** pelkkä luku ei kelpaa kuvan aiheeksi. Vuosiluku ohitetaan ja
kuva haetaan seuraavalla käsitteellä; jos muita ei ole, aiheeksi jää
kysymys kuten ennenkin. Luku osana nimeä ("Apollo 11") ei ole pelkkä
luku eikä siihen kosketa.

En rajannut kuvaa laajemmin "kysymyksen aiheeseen": vastauksen oma
ensimmäinen käsite ON vastauksen pääaihe, ja se on lähempänä sitä, mitä
pelaaja juuri luki, kuin kysymyslause. Jos haluat tiukemman säännön
(esim. kuva vain, jos aihe esiintyy kysymyksessä tai kortissa), se on
yhden ehdon kokoinen muutos — sano niin teen.

## Vartiot

- `tests/pollo.test.mjs`: kaksi uutta testiä (putkien purku kontekstissa
  ja näkyvässä tekstissä; vuosiluvun ohitus kuvan aiheena).
  `node --test tests/*.test.mjs`: **3 737 testiä, 0 punaista**.
- `tools/savuke-pollo.mjs`: uusi koevastaus (`putki`) ja neljä mittaa —
  pystyviiva ei näy pelaajalle, sulkeeton putki purkautuu, sulkeellinen
  linkittyy näkyvällä muodollaan, eikä yksikään pyyntörunko vie
  pystyviivaa mallille — **kaikki neljä OK**:

  ```
  OK  aineiston pystyviiva ei näy pelaajalle — Luola on osa Aggtelekin ja
      Slovakian karstin luolia, ja sen aragoniittikiteet hohtavat pimeässä.
  OK  sulkeeton putki purkautuu näkyvään muotoon
  OK  sulkeellinen putki linkittyy näkyvällä muodollaan — aragoniittikiteet
  OK  yksikään pyyntörunko ei vie pystyviivaa mallille
  ```

## SAVUKKEESSA ON SEITSEMÄN VANHAA PUNAISTA (ei minun)

Ajoin savukkeen myös ILMAN muutoksiani (`git stash`) samalla koneella:
**perusajo 112 OK ja samat seitsemän FAILia**, ja se päättyy samaan
kaatumiseen (`.pollo-kuvatausta` on null, koska kuvapopup ei auennut).
Muutosteni kanssa 116 OK — erotus on täsmälleen minun neljä mittaani —
ja sama seitsemän punaisen joukko. En siis rikkonut mitään, mutta nämä
ovat rikki tässä ympäristössä jo ennestään:

1. `fokusnäkymässä rivi on alussa tyhjä (Liiku odottaa aarretta)`
2. `liu'ussa on kolme matkustusnappia` (nappeja neljä: liftaus, bussi,
   laiva, lento)
3. `napit ovat jalan, laiva ja lento`
4.–7. nähtävyyslinkin kuvapopup ei aukea (`kuvia: 0`), ja siitä seuraa
   ajon lopettava poikkeus.

Kohdat 1–3 näyttävät siltä, että savuke on jäänyt jälkeen matkustusnappien
uudistuksesta (mittari vanhentunut), 4–7 siltä, että popup ei toimi
tässä ajossa lainkaan. En korjannut niitä tässä erässä — ne eivät kuulu
tilaukseen, ja arvaus olisi voinut piilottaa oikean vian. Kerro, jos
otan ne seuraavaksi.

## Mitä jäi tekemättä

- Vikaa ei toistettu alkuperäisellä aineistolla (ks. yllä).
- Kuvan aiheen rajaus kysymykseen jätettiin tekemättä tarkoituksella.
- Aineiston korostusmerkintöjä ei siivottu lähteestä: ne ovat oikeaa
  dataa kortille, ja nyt ne puretaan matkalla malliin.

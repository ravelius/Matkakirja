# Opus 10 → Fable: kuvatekstien korjaus, ERÄ 1 valmis (15.8.2026)

Opus 8:n vaihe 1 (kartoitus) on repossa; minä teen korjauserät.
Haara `claude/opus8-kuvatekstit` on rakennettu uudelleen tuoreesta
mainista (`273ff65`) + cherry-pick `3e02acc` (mittatyökalu ja
kartoitusraportti). Erä 1 on PR:ssä — et odota minulta vastausta,
jatkan suoraan erään 2.

## Erä 1: kulttuuri-kategoriat.js kansikuvat

**Ennen (tuore main, 15.8.):** 3 600 kuvatekstiä, 569 yli 260 merkin
rajan; kansikuvia yli rajan **60/201** (pisin 911).
**Jälkeen:** kansikuvia yli rajan **0/201**, pisin 260. Koko repon
ylitykset 569 → **509**.

Luvut kasvoivat Opus 8:n raportista (551 → 569), koska Siperian uudet
kaupungit tulivat mainiin rinnakkain: erässä 1 olivat mukana myös
**jakutsk** ja **magadan** (6 kansikuvaa), kuten ohjeistit.

Korjatut kaupungit (60 selitettä): tabriz 3, isfahan 3, jakutsk 3,
magadan 3, novosibirsk 3, tokio 3, teheran 3, riad 3, jekaterinburg 3,
luxor 3, irkutsk 3, mosul 3, ankara 3, halab 3, aden 3, damaskos 3,
salalah 3, izmir 2, sana 3, nikosia 2, bagdad 1, kiova 1.

**Leipätekstisiirtoja ei tarvittu: 0.** Kansikuvien selitteet olivat
lähes puhdasta sommittelukuvailua ("etualalla… vasemmassa
alanurkassa…"), ja ne yksittäiset asiatiedot, jotka niissä oli
(Chardinin 1673-piirroksen luettelot, Riadin pohjapiirroksen tienimet,
Mosulin vuosiluku 1932, Kiovan Rastrelli-tieto), mahtuivat uuteen
lyhyeen kuvatekstiin sellaisenaan. Uusia faktoja ei ole keksitty,
`lahde`-kenttiin ei ole koskettu, eikä yhtään alt-tekstiä ole muutettu.

Työtapa oli mekaaninen ja tarkistettava: kirjoitin uudet selitteet
käsin ja ajoin ne tiedostoon skriptillä, joka tunnistaa kohdan VANHAN
selitteen tekstillä (auditin JSON) — väärään kenttään ei voi osua.
Skripti on session scratchpadissa, ei repossa.

## Portit

`node --test tests/*.test.mjs` → **# pass 703 / # fail 0**;
`tarkista-kaksoisavaimet` → ei kaksoisavaimia; `build-standalone` ok;
savukkeet `savuke-lehtiotsikko` 17/17, `savuke-esilataus` 5/5,
`savuke-kaupunkitaulut` läpi (pageerrorit 0). Kaappaukset katsottu:
kaupunkitaulut 390/900 px sekä lehtikaappaukset Tabrizista ja
Magadanista — kansirivin kuvatekstit ovat nyt 2–3 riviä lähdemerkinnän
kanssa. Versio **v679**.

## Huomio sivussa (en korjaa ilman tehtävänantoa)

Auditin virkelaskuri laskee järjestysluvun pisteen (esim. "130.
kortteli") ja lähdetekstin pisteen virkkeen lopuksi, joten pari
kolmivirkkeistä selitettä näkyy neljänä. Merkkiraja on silti kunnossa.

## Seuraavaksi

Erä 2: kulttuuri-kategoriat.js nostot + galleria (128 + 2 yli rajan),
Lähi-itä ja Aasia ensin. Opus 9:n uudet kaupungit
(petropavlovsk/juzhno-sahalinsk/vladivostok) otan mukaan sitä mukaa
kuin ne ovat mainissa; rebase-konflikti ratkaistaan mainin hyväksi.

— Opus 10

# Opus 12 → Fable: kuvatekstien lyhennys, erät 2–5

## Tilanne

| Erä | Kohde | Ylityksiä | Tila |
| --- | --- | --- | --- |
| 2 | kulttuuri-kategoriat.js nostot + galleria | 130 → **0** | **PR #1039 (v682) auki** |
| 3 | nahtavyysjutut.js | 132 | sisältötyö käynnissä, haara `-e3` |
| 4 | maa-kategoriat.js nostot | 205 | sisältötyö käynnissä, jaetaan 4a/4b |
| 5 | valokuvatiedostot | 42 → **0** | **valmis**, haara `-e5`, odottaa vuoroaan |

Koko repon ylitykset: **509 (v681) → 379** erän 2 jälkeen. Kun erät 3–5
ovat sisällä, jäljelle jää 0.

## Erä 2 valmis: PR #1039, v682

kulttuuri-kategoriat.js:n nostojen ja gallerioiden selitteet 130 kpl
yli rajan → 0, pisin nyt 260 (oli 819).

**Leipätekstisiirtoja tuli yksi.** `venetsia`, nosto *Gondoli ei ole
symmetrinen*: tieto siitä, että tavallinen gondoli on musta ja vain
kilpaveneet värikkäitä, siirtyi selitteestä leipätekstin loppuun
sanatarkasti. Muut 129 lyhenivät ilman siirtoa — karsittu aines oli
sommittelukuvailua (pollareita, jäteastioita, pilviä, "vasemmassa
alanurkassa"), ei asiatietoa.

Portit: testit **# pass 703, # fail 0**, ei kaksoisavaimia, dist
10 541 kt tuoreen mainin päältä, savuke-lehtiotsikko **17/17**,
savuke-kaupunkitaulut pageerroreita 0.

## Erä 5 valmis odottamaan: haara `claude/opus12-kuvatekstit-e5`

42 postikorttiselitettä → 0, pisin 260. **Huomio linjaukseen:**
valokuvapakettien postikorteilla ei ole leipätekstikenttää lainkaan —
`selite` on ainoa tekstikenttä. Asiasisältöä ei siis voinut siirtää
mihinkään, vaan se tiivistettiin selitteen sisään. Kaikki asiatieto on
tallella; karsittu aines oli sommittelua. Jos haluat nämä jollain muulla
tavalla, se on helppo korjata erikseen.

Nämä 42 kirjoitin itse, koska ne olivat lyhimpiä ylityksiä (261–371
merkkiä) ja agenttikapasiteetti oli varattu eriin 2–4.

## Työtapa: mekaaninen kohdistus (tämän erän tärkein tulos)

Jokainen korjattava selite sai vakioidun id:n (`irkutsk#3#1`), ja
**vanha teksti haetaan aina omasta kartasta id:n perusteella** —
sisältöä kirjoittava agentti ei palauta vanhaa tekstiä lainkaan, joten
sitä ei voi kirjoittaa väärin eikä korjaus voi osua väärään kenttään.

Uusi työkalu **`tools/kuvateksti-kohdista.mjs`** tekee muutoksen
lähdetiedostoon: jäsentää `selite:`- ja `teksti:`-kenttien
merkkijonolausekkeet, evaluoi ne, vertaa vanhaan arvoon ja korvaa
literaalin uudelleenrivitettynä repon tyylin mukaan — myös
monikappaleiset nähtävyysjuttutekstit `'\n\n'`-erottimineen.
Todennettu ennen käyttöä edestakaisella ajolla: 130 kuvatekstin ja 320
nähtävyysjutun tekstin korvaaminen niillä itsellään tuotti täsmälleen
samat arvot. Työkalu on erän 2 PR:ssä, ja erät 3–5 käyttävät samaa.

Sisältö tehdään kahdessa vaiheessa: toimittaja kirjoittaa selitteen,
erillinen tarkastaja etsii samasta erästä rikkeitä. **Erässä 2
tarkastus löysi ja korjasi 104 rikettä**, suurin osa uusia faktoja —
esimerkiksi "keltainen kauppatalo" siinä missä lähtöteksti sanoi vain
"keltainen talo kylttirivistöineen", tai "kaksi metsästäjää tähtää"
kun vanhassa vain toinen tähtää. Tämä vaihe kannatti selvästi.

## Esteet

Ei esteitä. Kaksi konttihavaintoa muistiin:

1. `git push` ei toiminut ennen kuin repo lisättiin session lähteisiin
   `add_repo`-kutsulla (proxy ei injektoi tunnusta ilman sitä).
2. `gh`-komentoa ei ole polussa; PR:t on avattava GitHubin REST-API:n
   kautta `$GITHUB_TOKEN`illa.

Jatkan erillä 3 ja 4 omilla haaroillaan enkä jää odottamaan mergeä.

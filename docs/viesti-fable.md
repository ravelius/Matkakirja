# Viesti Fablelle — laattapyramidi, erä 4 (30.8.2026)

Haara `claude/pyramidi-pilotti`. Ei versionostoa, ei PR:ää.
**Portit: 1048 pass / 0 fail, savuke-laattapyramidi 13/13.**

En käynnistänyt yhtään agenttia täysajoa varten, joten mitään ei ollut
pysäytettävänä. Työnkulku on valmis. **Yksi asia estää koeajon, ja
tarvitsen siihen sinulta päätöksen.**

---

## ESTE: työnkulkua ei voi ajaa haaralta

`workflow_dispatch` toimii vain, jos työnkulkutiedosto on
**oletushaarassa**. Kokeilin ja todensin, en oleta:

- dispatch haaralle `claude/pyramidi-pilotti` → **404 Not Found**
- repon 27 työnkulun listaus → jokaisen `html_url` osoittaa
  `blob/main/...`, eikä `generoi-pyramidi.yml` ole listalla lainkaan.
  Se ei siis ole lupaongelma vaan rekisteröinti: GitHub ei tunne
  työnkulkua ennen kuin se on mainissa.

Käskit: ei PR:ää, ei versionostoa — enkä siksi vienyt tiedostoa
mainiin. **Koeajo vaatii, että `generoi-pyramidi.yml` on mainissa.**
Vaihtoehdot:

1. **Sinä mergeät työnkulkutiedoston mainiin** (se on yksi uusi
   tiedosto, ei koske peliin eikä muuta oletuspolkua), minkä jälkeen
   voin ajaa koeajon ja todentaa laatat ämpärissä.
2. Merge koko haara normaalilla julkaisukaavallasi, ja koeajo sen
   jälkeen.
3. Ajat koeajon itse napista, ja minä todennan tuloksen.

Suosittelen vaihtoehtoa 1: työnkulku on ainoa osa, joka on pakko olla
mainissa, ja se on inertti kunnes joku painaa nappia.

## R2-vienti: mitä se vaatii (kysymyksesi 4)

| asia | tila |
| --- | --- |
| Tunnukset kontissa | **ei ole** — vahvistettu, siksi kontti ei kelpaa |
| Secretit | `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ACCOUNT_ID` — käytin täsmälleen näitä, en kirjoittanut tunnuksia mihinkään enkä lokita niitä |
| Malli | `patinoi-fokus.yml` (generointi + sync samassa jobissa) ja `vie-fokus.yml` — rakenne niistä, ei keksitty |
| Julkinen osoite | `https://pub-…r2.dev/julisteet/pyramidi/<versio>/z7/92/41.webp` — sama reitti kuin lehdillä, eli **suoraan selaimen haettavissa** |
| Viennin kesto | sync tapahtuu shardin omassa jobissa generoinnin perässä; suurin shardi ~250 Mt |

## Työnkulku — `.github/workflows/generoi-pyramidi.yml`

`workflow_dispatch`, syötteinä versio, shardivalinta
(`kaikki` / `vain-z0-z6` / `koeajo-z0-z3`), laatu, patinataso ja
`vie`-kytkin (pois = pelkkä harjoitus ilman ämpäriä).

**Matriisi korvaa parven kokonaan.** Laattamäärät tarkistettu ajamalla
jokainen kaista `--kuiva`-tilassa:

| shardi | erä | laattoja |
| --- | --- | --- |
| z0-z6 | tasot 0–6 | 5 933 |
| z7a | sarakkeet 0–43 | 4 532 |
| z7b | sarakkeet 44–87 | 4 532 |
| z7c | sarakkeet 88–131 | 4 532 |
| z7d | sarakkeet 132–168 | 3 811 |
| | **yhteensä** | **23 340** ✓ |

**Kaistarajat lohkorajoille** — lisäsin generaattoriin `--sarakkeet`,
koska asteilla rajaaminen katkaisee lohkon keskeltä: mitattuna 62 %
hukkaa alueajossa, 0 % sarakeajossa.

**Jokainen shardi synkkaa itse**, jottei 1,3 Gt kulje jobien välillä.
**Luettelo on oma jobinsa**, koska `pyramidi.json` kuvaa koko pyramidin
eikä yksikään shardi tunne muiden tasoja — jos shardit kirjoittaisivat
sen, viimeisenä valmistuva jättäisi ämpäriin luettelon joka tuntee vain
omat tasonsa. Se syntyy pelkästä geometriasta (`--vain-luettelo`).

Samasta syystä laatasto-bittikartta kirjoitetaan vain harvassa
pyramidissa: matriisiajossa shardi näkee levyllä vain omat laattansa ja
kertoisi, ettei muita ole. Nyt kenttä on `null` = kaikki olemassa.

**Aikakatto:** suurin shardi ~1 240 Mpx eli mitatulla 0,44 Mpx/s
nopeudella **~47 min**; `timeout-minutes: 330` antaa seitsenkertaisen
varan ja jää 6 h katon alle. Levy: suurin tuotos ~250 Mt; työnkulku
tulostaa `df -h` ennen ja jälkeen, joten ensimmäinen ajo vahvistaa sen
mitattuna.

## Patinaresepti lukittu (kohtasi 1)

Kohdistusheitto ja musteen leviäminen ovat nyt **paperivakioita**.
Kirjasin perustelusi koodiin sanatarkasti sen viereen, jotta se ei valu
takaisin: ne ovat paperin ja painokoneen ominaisuuksia, eivät maaston,
eivätkä skaalaudu kartan mukana sen paremmin kuin paperin rae tai
nimiön kirjasinkoko.

**Lehtiputki on koskematon, ja se on todennettu eikä oletettu:**
`patinoi-fokus.yml` ei anna `--leveys`-valitsinta, joten lehdet
patinoituvat omalla 6400 pikselin leveydellään, jolloin `s` = 1 ja
`x * s === x` tarkalleen. Muutos on niille aritmeettinen no-op.

Todennettu z7:llä: sateenkaari poissa, rantaviiva terävänä, saumakokeet
ennallaan (**lohkoraja pahin 0 tasoilla z0–z2 ja z6–z7**). Koko ja
nopeus eivät muuttuneet mitattavasti (z7 0,211 → 0,209 tavua/px,
0,42 → 0,43 Mpx/s), eli korjaus maksoi vain sen mitä se korjasi.

Poistin samalla mittakaavavaroituksen, jonka lisäsin edellisessä
erässä — se varoitti tilanteesta, jota ei enää ole.

## Arvio täydestä ajosta

| | arvio |
| --- | --- |
| Laattoja | 23 340 |
| Koko | 1,16–1,30 Gt |
| Työ | 6 061 Mpx + 9 % reunusta |
| **Kesto (5 shardia rinnakkain)** | **~50 min**, hitain shardi ~47 min |
| Yhdellä säikeellä vertailuksi | 4,2 h |

Nopeus 0,44 Mpx/s on mitattu tässä kontissa. GitHubin ajokoneen
yksisäikeinen nopeus voi olla eri; siksi katto on 330 min eikä 60.

## Mitä EI tehty

- Täysgenerointia ei ajettu.
- Koeajoa ei ajettu (yllä oleva este).
- Mitään ei viety ämpäriin.
- Versiota ei nostettu, PR:ää ei tehty.

## Avoimet

1. **Työnkulun saaminen mainiin** — yllä. Ainoa este.
2. **Vinjetointi pelitilakerroksessa.** Ei tule laattoihin (Raamattu
   listaa sen pelitilakerrokseen). En tarkistanut onko se siellä jo.
3. **Syvyyskäyrät oikeasta datasta** — päätit myöhemmäksi eräksi.

## Sivussa nähtyä (en korjannut)

- `savuke-karttazoom.mjs` on `tools/`-juuressa, ei `tools/savukkeet/`.
- `tools/hero-tyolista-*.mjs` — 25 kertaluontoista ajotiedostoa juuressa.

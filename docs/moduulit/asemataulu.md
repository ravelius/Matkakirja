# Asemataulu: speksi (ainoa)

TÄMÄ ON ASEMATAULUN AINOA SPEKSI (omistaja 19.10.2026 klo 19.51: "asemataulu pitää olla yksi tarkkaan speksattu työnkulku jotta
se ei hajoa aina tilin vaihdon yhteydessä jollain tavalla"). Raamatun 7.39 viittaa tähän; muut ohjeet (ASEMATAULU-ROOLI.md,
docs/tilinvaihto.md kohta 4, aloitusviestit) viittaavat tähän eivätkä toista sääntöjä. Sanatarkka historia:
docs/raamattu-loki/paatokset-2026-09.md ja -2026-10.md, otsikot "ASEMATAULU: …" (uusin "ASEMATAULU: ILLAN NELJA LINJAUSTA JA YKSI
SPEKSI (19.10.)" ja "ASEMATAULU TARKENNUS: LUKITUN JUNAN RIVI").

Ylläpitäjä: Päätoimittaja. Jokainen sivun, skriptin, ohjeen tai tietomuodon muutos tehdään docs-PR:llä kansioon tools/asemataulu/ ja
tähän speksiin samana päivänä. Työkansio päivittyy mergen jälkeen itsestään seuraavalla 5 min kierroksella (luku 2, KIERROS);
kenenkään ei tarvitse muistaa ajaa komentoa.

## 1. Tiedostot: koodi repossa, tila työkansiossa

Työkansio TAULU = `/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/` (yhteinen kaikille tileille samalla Macilla).

| Laji | Missä totuus | Tiedostot | Kuka muuttaa |
|---|---|---|---|
| KOODI JA OHJE | repo `tools/asemataulu/` | `asemataulu.html` (TAULU:ssa `asemataulu-julkaisu.html`), `ASEMATAULU-ROOLI.md`, `paivita.py`, `kone.py`, `laitteet.py`, `synkka.py`, `syke.py`, `elevenlabs.py`, `tarkista-junat.py`, `tyolistavahti.py`, `asemataulu.py`, `hoitaja/kierros.py` (kaikki kansion koodi; testi valvoo) | docs-PR (PT hyväksyy); TAULU:n kopio vain komennolla tai kierroksella, ei käsin |
| TILA | TAULU | `data/talo/*.json` (taulun dokumentit), `osoitteet.md`, `nykyinen.json` (komento kirjoittaa), `hoitaja/` (sessiot.json, odottaa.json, roolit.json, mittarit.json, luovutukset), `historia.jsonl`, `vienti/`, `data/talo-arkisto/tyolista-valmiit.jsonl` (arkistoidut valmiit, ei viedä tauluun eikä peiliin) | dokumentin kirjoittaja (luku 3) |
| PEILI (varmuuskopio) | TAULU → repo | `tools/asemataulu/osoitteet.md`, `tools/asemataulu/data/talo/*.json`: uuden Macin siemen, ei ohje | `tools/tyotavat/peili.sh` |

Komento kopioi KOODIN aina origin/mainista. Jos TAULU:n kopio poikkeaa, vanha siirtyy ensin kansioon `TAULU/_ennen-repoa/<aika>/`
(ei poisteta). Tilikohtaiset asiat (taulun osoite, session id:t) ovat vain osoitekirjassa ja tiedostossa `nykyinen.json`; ohjeissa
ja koodissa niitä ei ole, joten tilinvaihto ei riko niitä.

## 2. Yksi komento rakentaa ja päivittää taulun

```
python3 -I tools/asemataulu/asemataulu.py              # millä tahansa tilillä ja checkoutilla
python3 -I tools/asemataulu/asemataulu.py --tarkista   # ei kirjoita; tilinvaihto-valmis.mjs ajaa tämän
```

1. KOODI origin/mainista TAULU:un (`PÄIVITETTY|<tiedosto>`).
2. Puuttuva TILA (data/talo/*.json, osoitteet.md) luodaan repon peilistä; olemassa olevaan ei kosketa.
3. `nykyinen.json` = `{taulu, idt: {paatoimittaja, keskustelukanava, asemataulu, postivahti, julkaisija, natiiviseppa}, lahde: {repo, tyopuu}, paivitetty}`
   (`lahde.repo` = ajavan checkoutin pääkansio, josta kierros hakee mainin; worktree voidaan poistaa)
   osoitekirjasta (rivi "Asemataulu (tämän tilin taulu): <osoite>" ja roolitaulukko). osoitteet.md:ssä täsmälleen yhdellä tilirivillä
   merkintä KÄYTÖSSÄ, ja sen osoite = osoitekirjan osoite.
4. Tarkistin (luku 10) data/talo:lle ja hoitaja/roolit.json:lle.
5. `vienti/uusi-taulu-batch.json` = koko kokoelma talo (op set, file_path) uudelle tai tyhjälle taululle, ja tuloste SEURAAVAKSI
   (julkaisu ja batch, luku 9).

Paluukoodi 0 = valmis (`ASEMATAULU VALMIS`), 1 = puutteita (`PUUTE|…`, `VIRHE: …`).

KIERROS (21.10.2026: #5120:n ohje jäi työkansioon 16 tunniksi, koska komento piti muistaa ajaa käsin; tyolistavahti.py puuttui
kopiolistalta kokonaan): synkka.py ajaa jokaisen viennin alussa työkansion `python3 -I TAULU/asemataulu.py --kierros`, kun kansiossa
on nykyinen.json. Kierros tekee kohdat 1 ja 3 (koodi ja ohje mainista, `_ennen-repoa/` kuten yllä; nykyinen.json vain, kun taulun
osoite tai id:t muuttuivat ja osoitekirja on ehjä) ja on hiljainen, kun mikään ei muutu. Siemeniä se ei luo (vanha siemen ei saa
palata tauluun), eikä se aja tarkistinta (synkka ajaa) eikä kirjoita batchia. Rivit Asemataululle: `PÄIVITETTY|…` ei toimia,
`OHJE PÄIVITETTY|ASEMATAULU-ROOLI.md|…` lue ohje uudelleen ennen seuraavaa kierrosta, `NYKYINEN MUUTTUI|…` lue nykyinen.json uudelleen,
`PUUTE|…` yksi rivi PT:lle.

## 3. Dokumentit ja kirjoittajat (kokoelma talo)

Jokaisella dokumentilla on yksi kirjoittaja (ArtifactData, if_version). Kirjoittaja kirjoittaa ensin TILA-tiedostoon ja vie sen.

| Dokumentti | Sisältö | Kirjoittaja |
|---|---|---|
| mittarit | `{laatat: [Viikko {palkki, prosentti, arvo, nollautuu}, 5 tuntia {palkki, prosentti, nollautuu}, Levy {arvo, lisa}, Muisti, Prosessori, Raati, Testaajat {arvo}], kk_konteksti, pt_konteksti, ts}` | Asemataulu-sessio (`hoitaja/kierros.py`) |
| roolit | `{rivit: [{nimi, malli, effort, tila, teksti, aika}], ts}` (luku 6) | Asemataulu-sessio (`hoitaja/kierros.py`) |
| laitteet | `laitteet.py`:n tulos | Asemataulu-sessio |
| junat | junarivit (luku 4) | PT |
| tyolista, huom | pidemmän aikavälin työt (valmiista vain 10 uusinta, luku 7); työlistan Työn alla -rivit ovat myös roolikorttien tekstit (luku 6) | PT; synkka.py arkistoi vanhemmat valmiit |
| eteneminen | junan valot (luku 5) | lastaus PT; matka Natiiviseppä (vaiheet 1–2) ja Julkaisija (3–5) |
| toimi-&lt;rooli&gt; | VAATII TOIMIA: rooli, kysymys, ts (valinnainen kuitattu/hoidettu) | sessio itse, jos sillä on Artifact-työkalu (PT, Asemataulu, Julkaisija, Natiiviseppä); muuten PT rivin "VAATII TOIMIA: &lt;rooli&gt;: &lt;asia&gt;" perusteella. Vanhat poistaa synkka.py (luku 6, VAHTI SIIVOAA) |
| katsoja | ts (syke) | sivu itse |
| boost | `{paalla, alkoi, paattyy}`; sammuu 1 h kuluttua | sivu itse (Boost-nappi); Asemataulu ja Postivahti lukevat |

Poikkeukset yhden kirjoittajan sääntöön: Päivitä-napin vienti kirjoittaa Asemataulu-session dokumentit samoista tiedostoista, ja PT
tyhjentää etenemisen, kun juna on TF:ssä.

POISTETUT (omistaja 20.10.2026 klo 23.32–23.35: "Sinulle osion voi poistaa. ota myös kulutus pois, koska se ehkä vain kuluttaa liikaa
tokeneita itse ja se ei kuitenkaan pysy ajantasalla"): dokumentteja `viestit` (Sinulle-osio) ja `kulutus` (kulutus.py) ei kirjoiteta
eikä viedä, eikä sivulla ole niiden osioita. Samoin `tehtavat` (PT:n käsin kirjoittamat roolien tehtävät; omistaja 20.10.2026 klo
23.48: "roolit taitavat kuitenkin laahata perässä"): roolikortin teksti johdetaan työlistasta (luku 6), eikä sivu lue tehtavat-dokumenttia.
asemataulu.py jättää ne pois uuden taulun batchista.

## 4. Junarivit: kertyvä, lukittu ja TF

Taulu näyttää kolme riviä järjestyksessä avoin juna, lukittu juna, TF uusin ensin (omistaja 20.10.2026 klo 09.56). Rivillä on vain se, mikä on juuri siinä junassa; seuraavan junan asiat
menevät seuraavan junan riville, ja ei-pelin asiat (Raamattu, taulun ohje, työkalut, tuotantopohjat) eivät kuulu junariveille
ollenkaan (omistaja 19.10.2026 klo 19.48).

| Tila | Nimi | `tila`-kenttä | `teksti` | Valot |
|---|---|---|---|---|
| KERTYVÄ (lastaus, ehtoja kootaan) | "Juna N" | esim. "Työn alla" | "Työn alla:" ja "Valmiina:" | oranssi, `edistys` 0–5 junat-rivillä |
| LUKITTU (lukituksesta TF:ään) | "Juna N" | alkaa "Lukittu" (tai käännösvaihe: "Käännössä", "Applelle"); ei sanoja valmis, TestFlight, julkaistu | vain "Valmiina:", vain lukitusversion pelaajan nähtävät asiat | vihreä, eteneminen `jakso: "matka"`, 1–5 |
| TF (perillä) | "TF N" | sisältää sanan TestFlight, esim. "Testaajilla (TestFlight sisäisillä 14.50, ulkoisille 15.28)" | vain "Uutta (pp.kk. klo HH.MM; myös Macille):", aika = TF sisäisille testaajille (Julkaisijan tfN-ketju.log, rivi SISAINEN) | ei valoja |

Junan ollessa TF:ssä PT muuttaa "Juna N" -rivin "TF N" -riviksi ja tyhjentää etenemisen. Lähestyvän junan arvio:
"TestFlightissa arviolta noin klo HH.MM" (PT päivittää).

KIRJOITUSOHJE (sama kaikille tileille ja kirjoittajille; tarkistin valvoo, luku 10):
1. Nimi aina lyhyt: "Juna 204" tai "TF 204" (enintään 12 merkkiä). Selitykset, ajankohdat ja perustelut tekstiin, ei nimeen eikä pitkään
   `tila`-kenttään (enintään 80 merkkiä).
2. Teksti alkaa otsikolla, ei johdannolla (ei "Julkaisu pyydetty …, lähtee heti" eikä muuta lähtö- tai lukitusjohdantoa; omistaja
   19.10.2026 klo 19.20). Otsikot vain "Työn alla:" ja "Valmiina:" (lukittu: vain "Valmiina:"; TF: vain "Uutta (…):"). Ei "Korjatut:",
   "Odottaa valintaasi:" eikä muita. Kohdat ranskalaisin viivoin (–), rivinvaihdot säilyvät, kukin asia kerran.
3. Ei ☑/☐/✅/✓-merkkejä (omistaja 19.10.2026 klo 19.20) eikä päivitysaikaa junarivillä (13.10.).
4. JUNAKORTTI (omistaja 14.10.2026 klo 23.59): TF-kortissa vain yksi "Uutta:"-lista (pyydetyt muutokset ja muut uudistukset).

| Kenttä | Pakollinen | Muoto | Käyttö |
|---|---|---|---|
| nimi | kyllä | "Juna N" / "TF N" | napin teksti; yksi rivi per nimi |
| teksti | kyllä | otsikot luvun 4 mukaan, ranskalaiset viivat | napautuksella avautuva sisältö |
| tila | kyllä | lyhyt teksti, ks. taulukko | väri ja valmis/keskeneräinen |
| edistys | Juna N: kyllä | luku 0–5 | valot (eteneminen ohittaa) |
| valmis_arvio | ei | ISO-aika | jäljellä oleva aika valojen perässä |
| aika | ei | enintään 20 merkkiä, esim. "klo 18.43" | pieni aika napin alla |
| lisa | ei | teksti | lisärivi tekstin alla |
| valmiit, odottaa | ei | kokonaisluvut | nimen perässä (9/2) |
| ts | ei | luku | kirjoitusaika |

Oikein (kertyvä): `{"nimi": "Juna 206", "tila": "Työn alla", "edistys": 1, "teksti": "Työn alla:\n– skannerin tiedot\n\nValmiina:\n– kuvanotto"}`

Oikein (lukittu): `{"nimi": "Juna 205", "tila": "Lukittu", "edistys": 0, "teksti": "Valmiina:\n– juoksupelin ensimmäinen pelattava versio"}`
ja eteneminen `{"nimi": "Juna 205", "jakso": "matka", "edistys": 2, "kirjoittaja": "Natiiviseppä", …}`

Väärin (tarkistin hylkää): `{"nimi": "Juna 204: julkaisu pyydetty 22.45", "tila": "Lukittu, matkalla TestFlightiin", "edistys": "1", "teksti": "Julkaisu pyydetty 22.45, lähtee heti.\n\nKorjatut:\n☑ kuvanotto\n\nValmiina:\n– kuvanotto\n– Raamattuun uusi linjaus"}`
(pitkä nimi, sana TestFlight sammuttaa valot, edistys merkkijonona, johdanto, kielletty otsikko, ☑-merkki, ei-pelin asia).

BUGIKORJAUKSET: työlistan ensimmäinen kohde; tilannekappaleessa yksi vika per rivi tilan kanssa; edistys lasketaan "Korjatut:"- ja
"Työn alla" -luetteloiden viivoista (5 × korjatut / kaikki). Junan lähdettyä korjatut siirtyvät Valmistuneisiin kohteeksi
"Bugikorjaukset (TF NNN)". (Korjatut-otsikko on sallittu vain työlistassa, ei junarivillä.)

## 5. Valot: lastaus ja matka (omistaja 19.10.2026 klo 19.18)

Viisi neliötä junan nimen alla. Dokumentti `talo/eteneminen` = `{nimi, tila, edistys, jakso, vaihe, valmis_arvio, kirjoittaja, ts}`;
`nimi` on täsmälleen junarivin nimi, ja eteneminen ohittaa saman rivin `tila`-, `edistys`-, `jakso`- ja `valmis_arvio`-kentät.

- LASTAUS (ehtoja kootaan): ei jaksoa, ORANSSI, edistys 0–5 (PT).
- MATKA (lukituksesta TF:ään): `jakso: "matka"`, VIHREÄ, edistys kokonaisluku 1–5: 1 lukittu + käännös alkoi, 2 käännös valmis
  (Natiiviseppä), 3 testit + IPA, 4 Applelle, 5 TF:ssä (Julkaisija; sisäisillä → rivi PT:lle ja KK:lle, Postivahti varmistaa
  tf*-ketju.logista).
- Valot palavat, kun edistys on luku eikä tila sisällä sanoja valmis, TestFlight tai julkaistu. Sana TestFlight kuuluu junarivin ja
  etenemisen tilaan vasta vaiheessa 5 (PT 19.10.2026: "Lukittu, matkalla TestFlightiin" sammutti Juna 205:n valot). `valmis_arvio` päivitetään vaiheen
  vaihtuessa; sivu laskee siitä jäljellä olevan ajan minuutin välein.

## 6. Roolikortit (omistaja 19.10.2026 klo 19.24: ODOTUS EI OLE LEPO)

| tila | teksti | väri |
|---|---|---|
| työ | tehtävän lyhyt nimi tai "Työ käynnissä" | vihreä |
| odottaa | "odottaa …" lyhyesti mitä (käännös- tai simuvuoro, yöjuna, yön renderöinti, Codexin malli) | kulta |
| lepo | "Levossa" vain, kun roolilla ei ole mitään jonossa | harmaa |
| kysyy | kysymys (VAATII TOIMIA) | punainen |

KORTTI JOHDETAAN JOKA KIERROKSELLA (omistaja 20.10.2026 klo 23.48: "roolit taitavat kuitenkin laahata perässä"; `hoitaja/kierros.py`,
myös ilman Boostia `--vain-roolit`):
- TYÖ, kun session viimeisin toiminta (list_sessions-kenttä `lastActivityAt`, tallennettuna `hoitaja/sessiot.json`:iin) on alle
  15 min vanha tai sessio on juuri nyt käynnissä. Hetken busy/idle-tila ei yksin tee roolista lepäävää.
- TYÖN TEKSTI = työlistan rivit, joiden `tila` on "työn alla" ja joiden `lisa`-kentässä roolin nimi on (pilkuin tai nuolin eroteltu
  lista; vanhat nimet kuten "Lavastaja (ent. Linnanrakentaja)", Linnanrakentaja → Lavastaja, Siirtoseppä → Projektiseppä): otsikot,
  enintään 2, uusin (`ts`) ensin, erottimena "; ". Jos rivejä ei ole: "Työ käynnissä".
- Muuten odottaa (odottaa.json) tai lepo.

Lähde `TAULU/hoitaja/odottaa.json` `{rooli: "odottaa …"}`: PT päivittää työlistan ja jonojen mukaan; `kierros.py` käyttää sitä joka
kierroksella, kun rooli ei ole työssä. Roolille, joka on odottaa.json:ssa, ei koskaan näytetä "Levossa". Keskustelukanava ja
Päätoimittaja omilla riveillään (aina työ), samoin Asemataulu itse.

VAHTI SIIVOAA VANHAT VAATII TOIMIA -DOKUMENTIT (omistaja 20.10.2026 klo 23.48; toimi-keskustelukanava-odottaa jäi punaiseksi, vaikka
asiaan oli vastattu): synkka.py lisää batchiin poiston (op delete, if_version) jokaiselle taulun `toimi-*`-dokumentille, joka on
- yli 30 min vanha (`ts`) ja kuitattu: dokumentissa kenttä `kuitattu` tai `hoidettu`, tai `toimi-<rooli>-odottaa`-dokumentin roolin
  sessio ei enää odota (`~/.claude/sessions/*.json`, status ≠ waiting; sama tieto kuin odottajat-vahti.py:n JATKUU), tai
- yli 2 h vanha, kun kuittaustietoa ei ole (muut toimi-dokumentit ilman kenttää, tai sessiotiedostoja ei voi lukea).
Odottava sessio (status waiting) ei koskaan siivoudu. Rivi `SIIVOA|<doc>|<ikä min>|<syy>`; paikallinen kopio siirtyy kansioon
`TAULU/data/talo-arkisto/toimi/`, jotta se ei palaa uuden taulun batchissa.

## 7. Ulkoasu (omistaja 10.10.2026 klo 15.4x–15.5x ja myöhemmät täydennykset)

- Kirjasin Raleway.
- Ylhäällä viikko koko leveydellä palkkina 0–100 %. Viikkopalkin nimen perässä (jäljellä ~X h, koko ~Y h)
  viimeisen 3 tunnin tahdista (`paivita.py` viikon_arvio historia.jsonl:stä, yli 48 h vuorokausina) ja
  viiden viime tunnin muutos, esim. (+3 %).
- Viikon alla samalla rivillä kolme palkkia: 5 h (otsikon perässä aika seuraavaan nollaukseen muodossa
  t:mm, esim. 5h (1:30); 5 h -palkista muutosprosentti on poistettu) ja kolmantena KESKUSTELUKANAVAN
  konteksti (kenttä `kk_konteksti`; omistaja 14.10.2026 klo 22.37 – ennen PT:n konteksti `pt_konteksti`).
  Nimi ja prosentti palkin yläpuolella yhdellä rivillä, jotta palkit mahtuvat puhelimessakin rinnakkain.
- Värirajat: käyttöpalkit kulta 70 %:sta ja punainen 90 %:sta; kontekstipalkki kulta 55 %:sta ja
  punainen 65 %:sta (oman nollauksen rajat).
- Pienellä Levy, Muisti ja Prosessori prosentteina.
- Junat yhdellä rivillä ilman väkäsiä: uusin aina ensin, enintään kolme junaa tai TF:ää, tulevat
  lihavoituna, käännössä oleva oranssina ja sen alla viisi pientä neliötä etenemisestä (luku 5) ja perässä arvioitu jäljellä oleva aika, esim. (15 min), ja valmiit/odottavat, esim. (9/2).
  Napautus avaa yhden tekstin kerrallaan koko leveyteen; "Työn alla" tyhjän rivin jälkeen omana
  kappaleenaan. Junarivillä ei päivitysaikaa (13.10.).
- Työlista: otsikon perässä harmaana "(kysymyksiä: N)", jonka napautus näyttää omistajalle avoimet
  kysymykset sisennettyinä luettelomerkkeinä. Kohteet väkäsin, väkäsen takaa aukeava sisältö pienesti
  sisennettynä, aktiiviset isommalla, kokeilut ennen jonossa olevia, edistys 0–5 palkkia otsikkorivin
  oikealla, selitteen jälkeen lyhyt tilannekappale ja vastuusessiot selitteen lopussa mallin
  taustavärillä. Symbolit vain jonossa ○ (myös myöhemmin) ja kokeilu ◇ ilman selitettä; odottaa-palloa
  ei ole. Työlistan päivitysaika näkyy, punaisena kun työlista on yli 3 h vanha. Työlistaan ei merkintöjä
  (palautteesi), (pyyntösi) eikä (päätöksesi).
- Työlistan sisällä väliotsikot Odottaa (määrä) ja Valmistuneet (määrä) (omistaja 20.10.2026 klo 23.35: "siirrä odottaa ja
  valmistuneet työlistan alaotsikoiksi"): pohja `.ryhma-otsikko` + `.tf-nappi` + `.vakanen` (sama väkänen kuin TF-paneelissa),
  oletuksena kiinni, tila muistetaan katsojan selaimessa, ja ne pienenevät Työlistan mukana.
- VALMISTUNEET 10 UUSINTA (omistaja 20.10.2026 klo 23.32: "valmistuneet lista voisi olla 10 viimeisintä vain"): napautus näyttää 10
  uusinta valmista työtä päivämäärineen (valmis = tila alkaa "valmis" tai tilanteessa ei ole Työn alla -osiota; järjestys kenttä
  valmistui "pp.kk.", sitten ts, uusin ensin), ja määrä otsikossa on näkyvien määrä. synkka.py siirtää joka kierroksella ennen
  vientiä vanhemmat valmiit rivit tyolista.json:sta tiedostoon `TAULU/data/talo-arkisto/tyolista-valmiit.jsonl`
  (`{arkistoitu, rivi}` per rivi, sama rivi kerran; ei viedä tauluun), jotta työlista ei kasva.
- TYÖLISTAVAHTI (omistaja 20.10.2026 klo 23.12, Raamattu 7.39): `tools/asemataulu/tyolistavahti.py` ajetaan jokaisessa viennissä
  (synkka.py ennen tarkistinta) ja korjaa PT:n tyolista.json:n: työn alla ilman päivitystä (rivin `ts`) yli 24 h → rivillä punainen
  "ei päivitystä N h" ja rivi PT:lle; yli 48 h → tila pidossa (Odottaa), ellei PT uusi riviä (uusi `ts`); tila valmis tai edistys ≥ 5
  → valmis, edistys 5 ja valmistui-päivä samassa viennissä; edistys > 5 → 5; tuplarivit (sama tai lähes sama otsikko) ja yli 15
  työn alla → rivi PT:lle. Työlistan otsikossa "(työn alla N, kunnossa)" tai punaisena "(työn alla N, M vanhaa riviä)". Rivin `ts` on
  millisekunteja lukuna (merkkijono normalisoidaan); puuttuva `ts` = "ei päivitysaikaa" (punainen, rivi PT:lle, ei siirtoa pitoon).
  PT:lle tulostuvat rivit `TYOLISTA VANHA|EI TS|PIDOSSA|TUPLA|LIIKAA|…` enintään kerran 6 tunnissa per rivi; Asemataulu välittää ne PT:lle.
  PT kirjoittaa rivin `ts`:n aina, kun se päivittää rivin.
- LAITTEET ennen rooleja: ruudut iPad, Blender, Unity-käännökset, Pilviajot, Simulaattorit,
  Codex-tilaukset ja Googlen musiikki (Lyria-ajot). Käytössä vihreä ja "Rooli: mitä", vapaa harmaa,
  prosessorin käyttö viitenä pienenä palkkina ja prosenttina. Otsikko näyttää käytössä olevat laitteet
  prosentein, esim. (käytössä: iPad 35 %, Blender 81 %). Prosentti on laitteen prosessien osuus koko
  koneen prosessorista (16 ydintä, yksi täysin kuormitettu ydin noin 6 %); Unityn luku sisältää
  käännöksen lapsiprosessit.
- Roolit tiiviinä ruudukkona: otsikko (1/13 käytössä, vaatii toimia: N), "vaatii toimia: N" punaisella
  ja lihavoituna vain, kun N > 0. Taustaväri = tila (työssä vihreä, odottaa kulta, lepää harmaa, kysyy
  sinulta punainen), pieni neliö = malli (Opus ruskea, Sonnet turkoosi), selitteenä työssä olevalla
  tehtävän lyhyt nimi ja muilla tilateksti; ei kellonaikaa eikä värien selitettä. Toimia vaativan session
  kortti on punaisella pohjalla, ja kysymys luetaan kortista.
- PIENENNETTÄVÄT OSIOT (11.10.): Työlista, Laitteet ja Roolit pienenevät ja avautuvat otsikon
  napautuksesta (tila muistetaan katsojan selaimessa); pienennettynä otsikon perässä yhteenveto (työn
  alla N; käytössä olevat laitteet; työssä, odottaa ja kysyy N).
- Mittareissa laatat Raati ja Testaajat (ulkoisten TestFlight-ryhmien asentaneet) pelkkänä lukuna.

## 8. Päivitysrytmi

- CRONIT (Asemataulu-sessio luo ne heti nollauksen jälkeen ilman uutta lupaa, omistaja 15.10.2026 klo 23.35): vain A `*/5`;
  B-cronia ei ole (20.10.2026) eikä kulutus-cronia (Kulutus poistettu 20.10.2026 klo 23.32). Tarkat askeleet: ASEMATAULU-ROOLI.md.
- BOOST = TÄYSI TARKISTUS (omistaja 20.10.2026 klo 09.56; aiemmin 14.10. klo 22.34–23.39, Raamattu 7.39): "kun se painetaan päälle,
  sen pitäisi tarkistaa että kaikki osiot taulusta ovat ajantasalla ja pitää ne ajantasalla". Napin selite "Tarkista ja päivitä koko
  taulu tunniksi". Nappi kirjoittaa `talo/boost` `{paalla, alkoi, paattyy}`; Asemataulun A-kierros (5 min) huomaa sen ja tekee heti
  täyden tarkistuksen: mittarit, roolit, laitteet, junat TF-lokeja vasten ja työlista (B), sama 5 min välein
  tunnin ajan. Postivahti herättää Asemataulun lisäksi `paattyy`-kentän perusteella. Boost sammuu itsestään tunnin kuluttua.
- ILMAN BOOSTIA: Asemataulu ei kokoa eikä tarkista itse; se kokoaa vain roolikortit (`kierros.py --vain-roolit`, luku 6) ja vie
  sessioiden omat kirjoitukset (PT junat, työlista, huom, VAATII TOIMIA) muuttuneina sekä synkka.py:n siivoamat toimi-dokumentit. Postivahti (Raati, Testaajat) sekä Natiiviseppä ja Julkaisija (eteneminen) kirjoittavat
  itse kuten ennen. Raati ja Testaajat klo 08 ja kun uusi juna saapuu TF:ään.
- PÄIVITYSNAPPI (omistaja 10.10.2026): oikean yläkulman nappi näyttää mittareiden iän (nyt, 5 min, 1 h 5 min; punainen yli 15 min).
  Napautus lähettää PT:n sessiolle kommentin "Päivitä Asemataulu"; PT ajaa `paivita.py`, vie tiedot batchilla (if_version) ja
  ratkaisee ketjun.
- KATSOJAN SYKE: näkyvissä oleva sivu kirjoittaa `talo/katsoja.ts` 2 min välein ja esiin tullessaan; vienti ei riipu sykkeestä.
- VIENTI JOKA KIERROKSELLA (20.10.2026: taulun otsikossa "päivitetty 22.39", vaikka tyolista.json oli 23.07): Asemataulun A-kierros
  ajaa synkka.py:n PT:n dokumenteille (junat, tyolista, huom) myös ilman Boostia; PT:n oma suora kirjoitus ei
  korvaa vientiä. Taulun aika on dokumentin `ts`, joten PT päivittää myös sen.
- KONTEKSTIPALKIN TUOREUS (omistaja 21.10.2026 klo 01.13: taulu näytti KK:n 35 %, kun luku oli 29 %): `kk_konteksti` ja `pt_konteksti`
  haetaan `get_usage`lla JOKA kierroksella, myös ilman Boostia, ja heti kun Postivahti ilmoittaa nollauksesta. Jos luku on yli 15 min vanha
  tai session id on vaihtunut, vanhaa lukua ei viedä: kentät poistetaan mittarit-dokumentista, kunnes tuore luku on haettu (sivun "päivittyy"-näyttöä ei tehdä, PT 21.10.2026).
- VANHENEMINEN: synkka.py ilmoittaa "VANHA|<doc>" (Asemataulu → PT "ASEMATAULU VANHA"), kun junat tai työlista on yli 45 min jäljessä
  viimeisimmästä tapahtumasta tai työlista yli 6 h päivällä.

## 9. Käyttöönotto uudella tilillä (tilinvaihto)

Taulu on tilikohtainen: toisen tilin taulun tietokantaan ei voi kirjoittaa, joten jokaisella tilillä on oma kopio samasta sivusta.

1. Osoitekirja ensin (docs/tilinvaihto.md kohta 3): uudet session id:t.
2. `Artifact list`: onko tilillä oma Asemataulu? Jos on, sen osoite osoitekirjan riville "Asemataulu (tämän tilin taulu): <osoite>"
   ja osoitteet.md:hen merkintä KÄYTÖSSÄ (poista merkintä edellisen tilin riviltä).
3. `python3 -I tools/asemataulu/asemataulu.py` → kopiot ajan tasalla, nykyinen.json, tarkistin, batch-tiedosto.
4. `Artifact publish TAULU/asemataulu-julkaisu.html` (capabilities `{"comments": {}, "db": {}}`, icon dashboard) samaan osoitteeseen,
   tai uutena, jos tilillä ei ole taulua; uusi osoite kohtaan 2 ja komento uudelleen.
5. Tyhjä taulu: `ArtifactData batch` tiedostosta `TAULU/vienti/uusi-taulu-batch.json`.
6. Asemataulu-sessio: aloitusviesti docs/aloitusviestit/asemataulu.md → lukee ASEMATAULU-ROOLI.md:n ja nykyinen.json:n, luo cronit.
7. KK avaa taulun sivupaneeliin (Artifact open) heti luonnin ja jokaisen nollauksensa jälkeen; PT avaa sen jokaisen session alussa.
8. `node tools/tyotavat/tilinvaihto-valmis.mjs` → ajaa `asemataulu.py --tarkista`; "Tilinvaihto valmis" vasta, kun se on 0.

## 10. Tarkistin (ennen jokaista vientiä)

`python3 -I TAULU/tarkista-junat.py --kansio TAULU/data/talo` (tai `[junat.json] [eteneminen.json]`). synkka.py ajaa sen ennen jokaista
vientiä ja jättää virheellisen dokumentin viemättä (`ESTO|<doc>|…`); asemataulu.py ja tilinvaihto-valmis.mjs ajavat sen myös.
Etenemisen Natiiviseppä ja Julkaisija kirjoittavat suoraan tauluun, joten synkka tarkistaa taulun `talo/eteneminen`-dokumentin listin
kopiosta ja tulostaa `TARKISTA|eteneminen|<määrä>|<1. virhe>|<kirjoittaja>` (sama sisältö kerran); Asemataulu välittää rivin PT:lle
(21.10.2026). Muut sessiot lukevat taulun osoitteen ja id:t aina TAULU/nykyinen.json:sta, eivät omasta ohjeestaan.
Tekstisäännöt (otsikot, johdanto, merkit, ei-pelin asiat) koskevat kolmea näkyvää junariviä; vanhemmista vain varoitus.

| Sääntö | Lähde |
|---|---|
| nimi "Juna N" / "TF N" ≤ 12 merkkiä, tila ≤ 80, pakolliset kentät, vain tunnetut kentät, nimi kerran | omistaja 14.10. ja 18.10. (C5) |
| Juna N: edistys luku 0–5; tilassa ei sanoja valmis/TestFlight/julkaistu | valot, luku 5 |
| TF N: tilassa TestFlight/valmis/julkaistu | luku 4 |
| otsikot (KAIKKI rivit, ei vain näkyvät): avoin Työn alla + Valmiina, lukittu vain Valmiina, TF vain yksi "Uutta (pp.kk. klo HH.MM; myös Macille):"; kukin asia kerran; ei valintamerkkejä | 18.10. (C5), 19.10. 19.48, 20.10. 09.56 |
| Juna N: tilassa ei "Testaajilla"; Juna N, jota uudempi TF on, on TF-rivi | 20.10. 09.56 (206 ja 207 jäivät Juna-riveiksi) |
| `--tf-lokit <julkaisija-tyokalut>`: juna, joka on lokin mukaan sisäisillä, on "TF N" ja otsikon aika = lokin SISAINEN-aika (kolme uusinta) | 20.10. 09.56, Boostin täysi tarkistus |
| eteneminen ilman nimeä = tyhjennetty (juna TF:ssä), ei tarkisteta | luku 5 |
| teksti alkaa otsikolla (ei johdantoa); ei ☑/☐/✅/✓ | 19.10. 19.20 |
| ei ei-pelin asioita (Raamattu, Asemataulu, tarkistin, tuotantopohja, työkalu) junarivin kohdissa | 19.10. 19.48 |
| eteneminen: nimi = junarivi; edistys 0–5; jakso puuttuu tai "matka"; matkalla 1–5 ja kirjoittaja Natiiviseppä 1–2, Julkaisija 3–5; tilassa TestFlight/valmis/julkaistu vasta vaiheessa 5 | 19.10. 19.18, PT 20.0x |
| roolit (TAULU/hoitaja/roolit.json, viety versio): tila työ/odottaa/lepo/kysyy; lepo = "Levossa"; odottaa = "odottaa …"; odottaa.json:n rooli ei ole lepo | 19.10. 19.24 |
| tyolista: ei "(palautteesi", "(pyyntösi", "(päätöksesi" | omistajan tyylilinjaus |

Testit: tests/asemataulu-junat.test.mjs (tarkistin), tests/asemataulu-komento.test.mjs (komento), tests/asemataulu-valmiit.test.mjs
(valmiiden arkistointi, poistetut osiot) ja tests/asemataulu-roolit.test.mjs (roolikortit työlistasta ja viimeisestä toiminnasta,
toimi-dokumenttien siivous, tehtavat poistettu).

## 11. Google-rivi peruttu (omistaja 16.10.2026 klo 16.47)

"Googlen voi ottaa pois, koska sen lukua ei näemmä saa heti." Rivi, hae-google.mjs ja dokumentti `google` poistettu.

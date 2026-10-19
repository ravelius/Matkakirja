# Asemataulu: speksi (ainoa)

TÄMÄ ON ASEMATAULUN AINOA SPEKSI (omistaja 19.10.2026 klo 19.51: "asemataulu pitää olla yksi tarkkaan speksattu työnkulku jotta
se ei hajoa aina tilin vaihdon yhteydessä jollain tavalla"). Raamatun 7.39 viittaa tähän; muut ohjeet (ASEMATAULU-ROOLI.md,
docs/tilinvaihto.md kohta 4, aloitusviestit) viittaavat tähän eivätkä toista sääntöjä. Sanatarkka historia:
docs/raamattu-loki/paatokset-2026-09.md ja -2026-10.md, otsikot "ASEMATAULU: …" (uusin "ASEMATAULU: ILLAN NELJA LINJAUSTA JA YKSI
SPEKSI (19.10.)" ja "ASEMATAULU TARKENNUS: LUKITUN JUNAN RIVI").

Ylläpitäjä: Päätoimittaja. Jokainen sivun, skriptin, ohjeen tai tietomuodon muutos tehdään docs-PR:llä kansioon tools/asemataulu/ ja
tähän speksiin samana päivänä, ja työkansio päivitetään sen jälkeen komennolla (luku 2).

## 1. Tiedostot: koodi repossa, tila työkansiossa

Työkansio TAULU = `/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/` (yhteinen kaikille tileille samalla Macilla).

| Laji | Missä totuus | Tiedostot | Kuka muuttaa |
|---|---|---|---|
| KOODI JA OHJE | repo `tools/asemataulu/` | `asemataulu.html` (TAULU:ssa `asemataulu-julkaisu.html`), `ASEMATAULU-ROOLI.md`, `paivita.py`, `kone.py`, `laitteet.py`, `kulutus.py`, `kulutus-projektit.json`, `synkka.py`, `syke.py`, `elevenlabs.py`, `tarkista-junat.py`, `hoitaja/kierros.py` | docs-PR (PT hyväksyy); TAULU:n kopio vain komennolla, ei käsin |
| TILA | TAULU | `data/talo/*.json` (taulun dokumentit), `osoitteet.md`, `nykyinen.json` (komento kirjoittaa), `hoitaja/` (sessiot.json, odottaa.json, roolit.json, mittarit.json, kulutus.*, luovutukset), `historia.jsonl`, `vienti/` | dokumentin kirjoittaja (luku 3) |
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
3. `nykyinen.json` = `{taulu, idt: {paatoimittaja, keskustelukanava, asemataulu, postivahti, julkaisija, natiiviseppa}, paivitetty}`
   osoitekirjasta (rivi "Asemataulu (tämän tilin taulu): <osoite>" ja roolitaulukko). osoitteet.md:ssä täsmälleen yhdellä tilirivillä
   merkintä KÄYTÖSSÄ, ja sen osoite = osoitekirjan osoite.
4. Tarkistin (luku 10) data/talo:lle ja hoitaja/roolit.json:lle.
5. `vienti/uusi-taulu-batch.json` = koko kokoelma talo (op set, file_path) uudelle tai tyhjälle taululle, ja tuloste SEURAAVAKSI
   (julkaisu ja batch, luku 9).

Paluukoodi 0 = valmis (`ASEMATAULU VALMIS`), 1 = puutteita (`PUUTE|…`, `VIRHE: …`).

## 3. Dokumentit ja kirjoittajat (kokoelma talo)

Jokaisella dokumentilla on yksi kirjoittaja (ArtifactData, if_version). Kirjoittaja kirjoittaa ensin TILA-tiedostoon ja vie sen.

| Dokumentti | Sisältö | Kirjoittaja |
|---|---|---|
| mittarit | `{laatat: [Viikko {palkki, prosentti, arvo, nollautuu}, 5 tuntia {palkki, prosentti, nollautuu}, Levy {arvo, lisa}, Muisti, Prosessori, Raati, Testaajat {arvo}], kk_konteksti, pt_konteksti, ts}` | Asemataulu-sessio (`hoitaja/kierros.py`) |
| roolit | `{rivit: [{nimi, malli, effort, tila, teksti, aika}], ts}` (luku 6) | Asemataulu-sessio (`hoitaja/kierros.py`) |
| laitteet, kulutus | `laitteet.py`:n ja `kulutus.py`:n tulos | Asemataulu-sessio |
| junat | junarivit (luku 4) | PT |
| tyolista, tehtavat, huom | pidemmän aikavälin työt; tehtävien lyhyet nimet `{rivit: {rooli: nimi}}` | PT |
| viestit | Sinulle-osio `{rivit: [{otsikko, teksti}]}` | PT |
| eteneminen | junan valot (luku 5) | lastaus PT; matka Natiiviseppä (vaiheet 1–2) ja Julkaisija (3–5) |
| toimi-&lt;rooli&gt; | VAATII TOIMIA: rooli, kysymys, ts | sessio itse, jos sillä on Artifact-työkalu (PT, Asemataulu, Julkaisija, Natiiviseppä); muuten PT rivin "VAATII TOIMIA: &lt;rooli&gt;: &lt;asia&gt;" perusteella |
| katsoja | ts (syke) | sivu itse |
| boost | Boost päällä: ts (alkuhetki); sammuu 1 h kuluttua | sivu itse (Boost-nappi); Postivahti lukee |

Poikkeukset yhden kirjoittajan sääntöön: Päivitä-napin vienti kirjoittaa Asemataulu-session dokumentit samoista tiedostoista, ja PT
tyhjentää etenemisen, kun juna on TF:ssä.

## 4. Junarivit: kertyvä, lukittu ja TF

Taulu näyttää kolme uusinta riviä numeron mukaan, uusin ensin. Rivillä on vain se, mikä on juuri siinä junassa; seuraavan junan asiat
menevät seuraavan junan riville, ja ei-pelin asiat (Raamattu, taulun ohje, työkalut, tuotantopohjat) eivät kuulu junariveille
ollenkaan (omistaja 19.10.2026 klo 19.48).

| Tila | Nimi | `tila`-kenttä | `teksti` | Valot |
|---|---|---|---|---|
| KERTYVÄ (lastaus, ehtoja kootaan) | "Juna N" | esim. "Työn alla" | "Työn alla:" ja "Valmiina:" | oranssi, `edistys` 0–5 junat-rivillä |
| LUKITTU (lukituksesta TF:ään) | "Juna N" | alkaa "Lukittu" (tai käännösvaihe: "Käännössä", "Applelle"); ei sanoja valmis, TestFlight, julkaistu | vain "Valmiina:", vain lukitusversion pelaajan nähtävät asiat | vihreä, eteneminen `jakso: "matka"`, 1–5 |
| TF (perillä) | "TF N" | sisältää sanan TestFlight, esim. "Testaajilla (TestFlight sisäisillä 14.50, ulkoisille 15.28)" | vain "Uutta (pp.kk. klo HH.MM):", aika = TF sisäisille testaajille | ei valoja |

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

SINULLE-OSIO (omistaja 11.10.2026): junien alla vain tärkeimmät linkit riveinä "– Otsikko: linkki" ilman väkäsiä ja lihavointia, linkki
pienemmällä; otsikko Sinulle avaa ja pienentää osion (kiinni oletuksena). Ohjeita ja vastauksia ei lisätä osioon.

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

Lähde `TAULU/hoitaja/odottaa.json` `{rooli: "odottaa …"}`: PT päivittää työlistan ja jonojen mukaan; `kierros.py` käyttää sitä joka
kierroksella, kun rooli ei ole työssä. Roolille, joka on odottaa.json:ssa, ei koskaan näytetä "Levossa". Keskustelukanava ja
Päätoimittaja omilla riveillään, samoin Asemataulu itse.

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
- Työlistan alla Valmistuneet (määrä): napautus näyttää valmistuneet työt päivämäärineen (tila valmis,
  kenttä valmistui).
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

- CRONIT (Asemataulu-sessio luo ne heti nollauksen jälkeen ilman uutta lupaa, omistaja 15.10.2026 klo 23.35): A `*/5`, B `13,43`,
  kulutus `7`. Tarkat askeleet: ASEMATAULU-ROOLI.md.
- BOOST (omistaja 14.10.2026 klo 22.34, 22.40 ja 23.39, Raamattu 7.39): mittarit (kulutus, muisti, kone), roolit ja laitteet
  päivittyvät vain Boostin aikana 5 min välein (vienti vain muuttuneesta, versiot tiedostosta). Boost-nappi kirjoittaa `talo/boost`;
  Postivahti lukee sen kierroksellaan (enintään 20 min) ja herättää Asemataulun; Boost sammuu itsestään tunnin kuluttua.
- HETI: junien vaiheet, eteneminen ja VAATII TOIMIA. Sisällön tarkistus (B) tunnin välein, kulutus.py klo 08 ja 20, Raati ja
  Testaajat klo 08 ja kun uusi juna saapuu TF:ään.
- PÄIVITYSNAPPI (omistaja 10.10.2026): oikean yläkulman nappi näyttää mittareiden iän (nyt, 5 min, 1 h 5 min; punainen yli 15 min).
  Napautus lähettää PT:n sessiolle kommentin "Päivitä Asemataulu"; PT ajaa `paivita.py`, vie tiedot batchilla (if_version) ja
  ratkaisee ketjun.
- KATSOJAN SYKE: näkyvissä oleva sivu kirjoittaa `talo/katsoja.ts` 2 min välein ja esiin tullessaan; vienti ei riipu sykkeestä.
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
Tekstisäännöt (otsikot, johdanto, merkit, ei-pelin asiat) koskevat kolmea näkyvää junariviä; vanhemmista vain varoitus.

| Sääntö | Lähde |
|---|---|
| nimi "Juna N" / "TF N" ≤ 12 merkkiä, tila ≤ 80, pakolliset kentät, vain tunnetut kentät, nimi kerran | omistaja 14.10. ja 18.10. (C5) |
| Juna N: edistys luku 0–5; tilassa ei sanoja valmis/TestFlight/julkaistu | valot, luku 5 |
| TF N: tilassa TestFlight/valmis/julkaistu | luku 4 |
| otsikot: kertyvä Työn alla + Valmiina, lukittu vain Valmiina, TF vain Uutta; kukin asia kerran | 18.10. (C5), 19.10. 19.48 |
| teksti alkaa otsikolla (ei johdantoa); ei ☑/☐/✅/✓ | 19.10. 19.20 |
| ei ei-pelin asioita (Raamattu, Asemataulu, tarkistin, tuotantopohja, työkalu) junarivin kohdissa | 19.10. 19.48 |
| eteneminen: nimi = junarivi; edistys 0–5; jakso puuttuu tai "matka"; matkalla 1–5 ja kirjoittaja Natiiviseppä 1–2, Julkaisija 3–5; tilassa TestFlight/valmis/julkaistu vasta vaiheessa 5 | 19.10. 19.18, PT 20.0x |
| roolit (TAULU/hoitaja/roolit.json, viety versio): tila työ/odottaa/lepo/kysyy; lepo = "Levossa"; odottaa = "odottaa …"; odottaa.json:n rooli ei ole lepo | 19.10. 19.24 |
| tyolista: ei "(palautteesi", "(pyyntösi", "(päätöksesi" | omistajan tyylilinjaus |

Testit: tests/asemataulu-junat.test.mjs (tarkistin) ja tests/asemataulu-komento.test.mjs (komento).

## 11. Google-rivi peruttu (omistaja 16.10.2026 klo 16.47)

"Googlen voi ottaa pois, koska sen lukua ei näemmä saa heti." Rivi, hae-google.mjs ja dokumentti `google` poistettu.

# Asemataulu: ulkoasu, tietomuodot ja päivitys

Siirretty 14.10.2026 Raamatun kohdasta TYÖTAPA JA SESSIOT (nyt luku 7, ASEMATAULU). Raamattuun jäivät
säännöt (oma kopio jokaisella tilillä, kirjoittajat, päivitysrytmi, VAATII TOIMIA); tämä dokumentti
on toteutuksen kuvaus. Sanatarkka historia: docs/raamattu-loki/paatokset-2026-09.md, otsikot
"KARSINTA 0.11 POSTIVAHTI JA ASEMATAULU 14.10.2026" ja "ASEMATAULU: …".

Ylläpitäjä: Päätoimittaja. Jokainen sivun, skriptin tai tietomuodon muutos viedään samana päivänä
docs-PR:llä kansioon tools/asemataulu/ ja tähän dokumenttiin (omistaja 10.10.2026). PT:n jonotyö vertaa
Macin työkopioita mainiin ja tekee PR:n, jos ne eroavat.

## Lähde ja tiedostot

- Hyväksytty sivu: `tools/asemataulu/asemataulu.html` (sama kuin julkaistu sivu). Työkopio Macilla
  `Matkakirja-fable/scratchpad/talon-tila.html`.
- Tiedot: `Matkakirja-fable/scratchpad/asemataulu/data/talo/<dokumentti>.json` (totuus), Postivahdin
  ja Asemataulu-session `vienti/`-tiedostot samassa kansiossa. Vienti tauluun `tools/asemataulu/synkka.py`
  (vertaa taulun sisältöön, ArtifactData batch `if_version`-ehdolla).
- Taulujen osoitteet tileittäin: `Matkakirja-fable/scratchpad/asemataulu/osoitteet.md`. Tilinvaihto:
  docs/tilinvaihto.md, kohta 4.
- Skriptit (työkopiot `Matkakirja-fable/scratchpad/asemataulu/`, hyväksytyt `tools/asemataulu/`):
  `paivita.py` (kone.py + laitteet.py + Postivahdin tiedostot → vienti/*.json), `kone.py` (Muisti,
  Prosessori), `laitteet.py`, `kulutus.py`.

## Ulkoasu (omistaja 10.10.2026 klo 15.4x–15.5x ja myöhemmät täydennykset)

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
  lihavoituna, käännössä oleva oranssina ja sen alla viisi pientä neliötä etenemisestä (ks. Junan
  eteneminen) ja perässä arvioitu jäljellä oleva aika, esim. (15 min), ja valmiit/odottavat, esim. (9/2).
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

## Tiedot ja dokumentit (kokoelma talo)

| Dokumentti | Sisältö | Kirjoittaja |
|---|---|---|
| mittarit | viikko, 5 h, `nollautuu` (get_usagen resetsAt), `kk_konteksti`, levy, muisti, prosessori, Raati, Testaajat | Asemataulu-sessio |
| roolit, laitteet | roolien tilat; laitteet.py:n tulos | Asemataulu-sessio |
| kulutus | projektijako (kulutus.py) | Asemataulu-sessio |
| junat | Valmiina / Työn alla / Junaan N ja TF-rivit; uusin ja edellinen TF sekä tulevat | PT |
| tyolista, tehtavat, huom | pidemmän aikavälin työt; tehtävien lyhyet nimet `{rivit: {rooli: nimi}}` | PT |
| viestit | Sinulle-osio `{rivit: [{otsikko, teksti}]}` | PT |
| eteneminen | junan eteneminen (alla) | Natiiviseppä (1–4), Julkaisija (5) |
| toimi-&lt;rooli&gt; | VAATII TOIMIA: rooli, kysymys, ts | sessio itse, jos sillä on Artifact-työkalu (PT, Asemataulu, Julkaisija, Natiiviseppä); muuten PT rivin "VAATII TOIMIA: &lt;rooli&gt;: &lt;asia&gt;" perusteella (14.10. klo 23.14) |
| katsoja | ts (syke) | sivu itse |
| boost | Boost päällä: ts (alkuhetki); sammuu 1 h kuluttua | sivu itse (Boost-nappi); Postivahti lukee |

Poikkeukset yhden kirjoittajan sääntöön: Päivitä-napin vienti kirjoittaa Asemataulu-session dokumentit
samoista tiedostoista, ja PT tyhjentää etenemisen, kun juna on TF:ssä.

## Junarivit ja tekstit

- JUNARIVIN NIMI (omistaja 14.10.2026 klo 20.51–20.53): perillä oleva juna on rivillä "TF N", tila
  "TestFlightissa (saapui pp.kk. klo HH.MM)"; lähestyvä on "Juna N", ja kun sisältö on lukittu ja jäljellä
  olevien töiden kesto arvioitu, tila "TestFlightissa arviolta noin klo HH.MM" (PT päivittää arvion).
- TF-junan teksti alkaa "Uutta (pvm klo aika):", jossa aika on hetki, jolloin TF tuli sisäisille testaajille.
- JUNAKORTTI (omistaja 14.10.2026 klo 23.59): valmiin junan (TF N) kortissa vain yksi "Uutta:"-lista (pyydetyt
  muutokset ja muut uudistukset), ei Valmiina- eikä erillistä Korjattu-osiota; kertyvän junan kortissa ennallaan.
- RANSKALAISET VIIVAT: kertyvän junan tekstit muodossa "Valmiina:" / "Työn alla:" ja TF:t "Uutta:",
  kohdat ranskalaisin viivoin, rivinvaihdot säilyvät.
- BUGIKORJAUKSET: työlistan ensimmäinen kohde; tilannekappaleessa yksi vika per rivi tilan kanssa;
  edistys lasketaan "Korjatut:"- ja "Työn alla" -luetteloiden viivoista (5 × korjatut / kaikki). PT siirtää
  korjauksen Korjatut-luetteloon heti kuittauksen jälkeen; junan lähdettyä korjatut siirtyvät
  Valmistuneisiin kohteeksi "Bugikorjaukset (TF NNN)".
- SINULLE-OSIO (omistaja 11.10.2026): junien alla VAIN tärkeimmät linkit riveinä "– Otsikko: linkki"
  ilman väkäsiä ja lihavointia, linkki pienemmällä; otsikko Sinulle avaa ja pienentää osion (kiinni
  oletuksena). Nyt rivit TestFlight raati, TestFlight beta-testaajat, äänisivu ja GitHubin salaisuudet.
  Ohjeita ja vastauksia ei lisätä osioon.

## Junan eteneminen (omistaja 11.10.2026)

Dokumentti `talo/eteneminen` `{nimi, tila, edistys 0–5, vaihe, valmis_arvio (ISO-aika), kirjoittaja, ts}`
kirjoitetaan jokaisessa vaiheessa lukituksesta TF:ään: 1 lukittu + testit, 2 käännös, 3 simutodiste /
muistiajo, 4 TF-lataus Applelle (1–4 Natiiviseppä), 5 Applella / TestFlightissa (Julkaisija; sisäisillä → Julkaisija heti rivi PT:lle ja KK:lle, Postivahti varmistaa
tf*-ketju.logista, 14.10.).
`valmis_arvio` päivitetään vaiheen vaihtuessa, ja sivu laskee siitä jäljellä olevan ajan minuutin välein.
Kenttä `nimi` on täsmälleen junarivin nimi (esim. "Juna 183"). Sivu näyttää etenemisen saman nimisen
junan napin alla, ja eteneminen ohittaa junarivin tila-, edistys- ja valmis_arvio-kentät; palkit näkyvät,
kun edistys on annettu eikä juna ole valmis (sana valmis, TestFlight tai julkaistu tilassa merkitsee
valmiiksi). Kun juna on TF:ssä, PT muuttaa junarivin TF-riviksi ja tyhjentää etenemisen.

## Asemataulun merkinnät: yksi kirjoitusohje kaikille tileille (omistaja 18.10.2026, C5)

Sama ohje kaikilla tileillä ja kaikille kirjoittajille (PT, Natiiviseppä, Julkaisija, Asemataulu). Tarkistin
`tools/asemataulu/tarkista-junat.py` valvoo sitä koneellisesti; AJA SE ENNEN JOKAISTA VIENTIÄ
(`python3 -I tools/asemataulu/tarkista-junat.py <junat.json> [<eteneminen.json>]`, paluukoodi 0 = ok, 1 = virhe).

Säännöt:
1. Junan nimi on aina lyhyt: "Juna 204" tai "TF 204" (enintään 12 merkkiä). Selitykset, ajankohdat ja perustelut
   menevät kenttään `teksti` (leipäteksti), eivät koskaan nimeen eivätkä pitkään `tila`-kenttään (enintään 80 merkkiä).
2. Junarivin tekstissä on vain kaksi otsikkoa: "Työn alla:" ja "Valmiina:" (TF-rivillä vain "Uutta:"). Ei "Korjatut:",
   "Odottaa valintaasi:" eikä muita. Kukin asia on tekstissä kerran (ei sekä Työn alla- että Valmiina-luettelossa).
3. Liikennevalot (viisi neliötä nimen alla) palavat, kun Juna N -rivillä on `edistys` LUKUNA 0–5 (ei merkkijonoa) ja
   `tila` ei sisällä sanoja valmis, TestFlight tai julkaistu. Päivitä `edistys` ja `tila` jokaisessa vaiheessa samalla
   viennillä kuin tekstin. Etenemisdokumentti (`eteneminen`) ohittaa rivin kentät vain, jos sen `nimi` on täsmälleen
   junarivin nimi.
4. TF N -rivin `tila` sisältää sanan TestFlight (tai valmis/julkaistu), muuten rivi näkyy keskeneräisenä lihavoituna.

| Kenttä | Pakollinen | Muoto | Käyttö |
|---|---|---|---|
| nimi | kyllä | "Juna N" / "TF N" | napin teksti; yksi rivi per nimi |
| teksti | kyllä | leipäteksti, otsikot Työn alla / Valmiina (TF: Uutta) | napautuksella avautuva sisältö |
| tila | kyllä | lyhyt teksti, TF-rivillä sana TestFlight | väri ja valmis/keskeneräinen |
| edistys | Juna N: kyllä | luku 0–5 | liikennevalot |
| valmis_arvio | ei | ISO-aika | jäljellä oleva aika valojen perässä |
| aika | ei | enintään 20 merkkiä, esim. "klo 18.43" | pieni aika napin alla |
| lisa | ei | teksti | lisärivi tekstin alla |
| valmiit, odottaa | ei | kokonaisluvut | nimen perässä (9/2) |
| ts | ei | luku | kirjoitusaika |

Esimerkki oikeasta junarivistä:
`{"nimi": "Juna 204", "tila": "Työn alla", "edistys": 1, "teksti": "Julkaisu pyydetty 22.45, lähtee heti.\n\nTyön alla:\n– skannerin tiedot\n\nValmiina:\n– kuvanotto"}`

Esimerkki väärästä (tarkistin hylkää): `{"nimi": "Juna 204: julkaisu pyydetty 22.45, lähtee heti kun alla olevat valmiina", "tila": "valmis", "edistys": "1", "teksti": "Korjatut:\n– kuvanotto\n\nValmiina:\n– kuvanotto"}`
(pitkä nimi, tila "valmis" sammuttaa valot, edistys merkkijonona, kielletty otsikko Korjatut, sama asia kahdesti).

## Päivitys

- Rytmi ja BOOST (omistaja 14.10.2026 klo 22.34, 22.40 ja 23.39, Raamattu ASEMATAULU, PÄIVITYSRYTMI JA BOOST):
  mittarit (kulutus, muisti, kone), roolit ja laitteet päivittyvät vain Boostin aikana 5 min välein (yksi
  koontiskripti, vienti vain muuttuneesta, versiot tiedostosta). Boost-nappi kirjoittaa `talo/boost`;
  Postivahti lukee sen kierroksellaan (enintään 20 min) ja herättää Asemataulun; Boost sammuu itsestään
  tunnin kuluttua, ja muulloin kierros A ja viennit ovat tauolla. Junien vaiheet ja VAATII TOIMIA heti;
  sisällön tarkistus tunnin välein; Raati ja Testaajat klo 08 ja kun uusi juna saapuu TF:ään.
  Boost-napin rakentaa Asemataulu-sessio sivulle asemataulu-julkaisu.html (erillinen erä, PT 14.10.).
- PÄIVITYSNAPPI (omistaja 10.10.2026): oikean yläkulman nappi näyttää mittareiden iän (nyt, 5 min, 1 h 5 min;
  punainen yli 15 min). Napautus lähettää PT:n sessiolle kommentin "Päivitä Asemataulu" (sivun capabilities
  db + comments, PT:n artefaktivahti); PT ajaa `paivita.py`, vie tiedot ArtifactData-batchilla (if_version)
  ja ratkaisee ketjun.
- KATSOJAN SYKE: näkyvissä oleva sivu kirjoittaa `talo/katsoja.ts` 2 min välein ja esiin tullessaan;
  mittareiden vienti ei riipu sykkeestä (Boost korvaa sykkeen, 14.10. klo 23.39).

## Google-rivi peruttu (omistaja 16.10.2026 klo 16.47)

"Googlen voi ottaa pois, koska sen lukua ei näemmä saa heti." Rivi, hae-google.mjs ja dokumentti `google` poistettu.

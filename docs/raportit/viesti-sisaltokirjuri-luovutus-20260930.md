# Sisältökirjurin luovutus 30.9.2026 klo ~03.5x (Sonnet, tilinvaihdon jälkeinen vuoro)

Checkout-haara `sisalto-pelikatalogi-20260927` (ei mergata, ei poisteta). Ensimmäinen komento:
`git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.

## 1. Valmiina mainissa tässä vuorossa

- #3611 linssien esittelyt; ISL (#3560), ALB (#3632), MKD+MNE+CYP (#3638), MLT+LUX+MDA (#3643),
  BLR+SVK (#3647), EST+LVA+LTU+SVN (#3652), TUR Euroopan puoli (#3655, 5 provinssia),
  RUS erä 1 (#3659, 15), erä 2 (#3661, 15).
- Olavinlinna Linnanrakentajalle (raportit docs/raportit/sisaltokirjuri-olavinlinna-*): era3 (faktat;
  KORJATTU era4:ssä: fatabuuri = vaate-/tavara-aitta, ei ruokavarasto), pohjakaava, era4 (kappeli/fatabuuri/
  keittiö + sinettifaktat, ei Olavinlinna-kohtaista sinettilähdettä), era5 (keskushalli, kierreportaat,
  muurinharja, laituri + repliikkitarkistus: "oikeakätisyys" on myytti, "34 porrasta" keksitty).

## 2. Junassa / auki

- **#3662 RUS erä 3** (Penza, Tatarstan, Udmurtia, Baškortostan, Orenburg, Samara, Saratov, Volgograd,
  Rostov, Krasnodar, Kalmukia; 11 aluetta) Julkaisijan junassa. Kun se on mainissa, RUS on valmis
  (Euroopan puoli). Pohjois-Kaukasian tasavallat POIS (Päätoimittaja).
- **Krim ja Sevastopol**: sisältö (pitka+pulu) tehty ja cherry-pickattu Karttasepän haaraan
  `karttaseppa-krim` (commit 68dfc7ecf); siirto RUS→UKR ja PR tulee Karttasepältä. Älä tee omaa PR:ää.
- GRC:llä oli jo täysi pulu; EST/LVA/LTU/SVN/SVK/BLR tehty. Muita Euroopan maakuntapaketteja ei jää.

## 3. Menetelmä ja opit (Sonnet-tutkimusagentit + oma editointi)

1. Sonnet-agentti(t) tutkii 5–8 aluetta/agentti (WebSearch/Fetch), JSON pitka+pulu; itse editoin:
   poistin epävarmat luvut, politiikan, "ensimmäinen/suurin" -väitteet; pitka 450–900 merkkiä,
   pulu 2–3 paria/alue, kolmas persoona.
2. Sovellus: pitka heti `lyhyt:`-rivin jälkeen luonnehdinnoissa; pulu-lohko `maakunnat-pulu.js`:ään
   (osittaisessa maassa lisäys olemassa olevaan lohkoon; maa pysyy `ERASSA_1`-listalla jos aluetta puuttuu).
3. `node tools/tarkista-kaksoisavaimet.mjs` ennen pushia (GRC:llä oli jo pulu → junan pysäytys).
4. `node tools/uusi-versio.mjs "<rivi ≤ 60 merkkiä>"`; koko testisarja `nice -n 15`; `merge-base --is-ancestor
   origin/main HEAD`; junan aikana EI pushata (Julkaisija ilmoittaa mainiin menon).
5. Avaimet joissa heittomerkki (`"Stavropol'"`, `"Ul'yanovsk"`) sekoittivat oman promptigeneraattorini
   (väärä lyhyt toisen alueen kohdalle) — data itse on kunnossa; tarkista aina lyhyt tiedostosta.
6. zsh: `set -- $p` -silmukka ei jaa sanoja; kirjoita komennot auki. Oma worktree
   `/Users/Shared/Claude/wt/sisaltokirjuri-alb` (haarat sisaltokirjuri-*; mergetut voi poistaa).
7. Scratchpadin skriptit (mkprompt, apply-partial, JSON-tiedostot) katoavat sessiolta; tarvittaessa
   kirjoita uudelleen tässä kuvatulla tavalla.

## 4. Auki / seuraava

- Odota #3662 mainiin; siivoa worktree/haarat (`sisaltokirjuri-rus-*`, `-tur-*`, `-est-*` jne.).
- Mahdollinen jatko: Pohjois-Kaukasia ja Aasian puoli jäävät pois (VAIN EUROOPPA); UKR:n puuttuvat
  alueet (Lviv, Donetsk, Dnipro…) ovat Karttasepän mukaan sisältövalinta — kysy Päätoimittajalta
  haluaako niille pitka+pulu.
- Vaihtoehto: pitka-tekstit vielä lyhyt-keskeisiin maihin, jos Päätoimittaja haluaa (Etelä-Amerikka jne. EI,
  VAIN EUROOPPA).

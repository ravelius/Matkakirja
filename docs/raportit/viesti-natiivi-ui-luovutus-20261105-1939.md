# Natiivi-UI: luovutus 5.11.2026 klo 19.39 (konteksti 28 %)

Korvaa -1913:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki 84a2f3d83, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Ei omaa ajoa käynnissä.

## Päivitys 19.4x (PT): 84a2f3d83, ajettu ja katsottu, viety PT:lle ja KK:lle
690f5e141 aiheutti kaksi vikaa, molemmat korjattu: pyöreä merkki 3D-rakennuksen päällä (nyt NostotKartalla.KylttiOsuuMalliin myös portin ollessa kiinni) ja nimi Sainte-Chapelle sivussa (MalliKyltit: näkyvän rakennuksen nimi pysyy pois). Kuvat: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-84a2f3d83. Keskustassa 12 pyöreää. Kohta 3 alla on hoidettu; KK:lta odotetaan kohtia 1, 2, 4. Chatelet-tasoa ei ajettu uudelleen (korjaus koskee vain kiinni olevaa porttia).

## Ensin
Odota KK:n vastausta viestiin 19.3x (jonossa, kun luovutus tehtiin). Älä muuta koodia ennen sitä. Viestit: `mcp__ccd_session_mgmt__send_message` session id:llä. Pyynnössä JU:lle aina rivi "mitä tämä ratkaisee" (10.5, JU huomautti).

KK:lle viety, kuvat katsottu täysikoossa: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-690f5e141 (keski, keski-lahempi, chatelet).

KK:n ratkaistavana:
1. Naru kaukana: pidin sen maan ja Euroopan näkymissä ennallaan. Suositus: näin. Vaihtoehto: pois kaikkialta (poista `|| !p.LahiAuki`, KaupunkiPallot.cs).
2. Keskustassa 12 pyöreää merkkiä, osa nimen päällä: Sorbonne, Pariisi (lähempänä Saint-Germain-des-Prés'n luostari).
3. Keskustassa nimi "Sainte-Chapelle" rakennuksen länsipuolella; Louvrella ja Notre-Damella ei karttanimeä. Syy mittaamatta. Korjataan vain KK:n pyynnöstä.
4. Hintakyltti lähes kiinni nimessä Pompidou-keskus (chatelet). Hintakyltti ei väistä (2.215), ei muutettu.

## Tehty 690f5e141 (omistaja 19.23)
- Koko: KyltinTaysiPt 14 → 12 (tyylikirjan pienin, kapiteeli). Kartta.uss: padding 2,4/6,6, tähti 12 px, --kadonnut padding-left 22,6. Sama sopu NostotKartalla.KyltinReunus (nyt public) ja KyltinTahtiTila 16.
- Sääntö yhdessä paikassa: KarttaKyltti.LahiPortti (KaupunkiPalloMitat.KylttiLahella): auki kaari ≤ 0,02, kiinni ≥ 0,024; KorkeusKaarelle pysähtyy lähimpään korkeuteen, joten lähimmällä zoomilla kyltit näkyvät aina. NostotKartalla.kylttiPortti käyttää samaa; vanhalla piirroskerroksella (PiirrosTila) aina auki.
- Portin kiinni ollessa: kyltti häipyy, ei varaa tilaa nimiltä (Kohdelaatikot), merkkialue ei ota napautusta, leike häipyy (Merkki.LeikePois, erillään KuvaTormaasta). Pyöreä merkki jää (15.01).
- Köysi: KaupunkiPallot.Koysikerros leikkaa pallon kuvan kahteen kerrokseen KoysiRaja 0,612:sta (mitattu kuvasta, korin alareuna noin 0,604). Malli on yksi verkko, joten kuva leikataan.
- MalliKyltit: portin sulkeutuessa Haivyta eikä Piilota, joten häipyy pehmeästi.
- Testi KaupunkiPallotTestit.KyltitVastaRakennuksenLahella; Kartta-testit 616/616 ennen viimeistä ajoa, unity-tarkistus 0 virhettä.

## PT:n työ 19.2x: valmis, PT:lle viety
Keski-kuvan neljä merkkiä (434,423 · 810,690 · 840,816 · 1088,781) ovat saapumiskuvia (SaapumisKuvat, 2.205): `ui kohdassa` löysi 18 pt:n pyöreän napin, eikä kohta ole `ui kohdenostot` -listassa. Näin kuuluu. Tuileries-kuvan kolme on todennäköisesti samoja, ei mitattu. Pont Neuf ja nimien vaihtuminen eivät johdu tästä; Pont Neuf näkyy nyt keski-lahempi- ja chatelet-kuvissa.

## Muut havainnot
- Quai Voltaire näkyy chatelet-kuvassa.
- Pulu tuileries-kuvassa ja -1815:n Auki 3 ennallaan; tuileries-kuvaa ei otettu tässä ajossa.
- Lokin ArgumentOutOfRange on Unityn editorin hakuindeksi (SearchDatabase), ei pelin koodia.

## Huomiot
- tarkista.sh: `zsh tyokalut/tarkista.sh`, sitten `git restore` Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json. Koko skriptiä ei ajettu tässä erässä.
- Liikevahti hälyttää Nahtavyysalue-, Nimikerros- ja PariisiKallistus-tiedostoista, jotka eivät kuulu tähän muutokseen. MalliKyltit.cs:n oma hälytys kuitattu poikkeusmerkinnällä. Aiempi valovahdin hälytys on PT:llä.
- `ui kohdassa x y` -kysely on yhä koodissa; sk-pariisi-kyltit-8.txt:ssä kyselyt mukana, poista tarvittaessa.

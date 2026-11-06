# Natiivi-UI: luovutus 6.11.2026 klo 12.44 (pehmeä kontekstiraja, 7.37)

Korvaa -1231:n työlistan. Avoimet asiat -1150:stä ja -1140:stä ovat voimassa. Lukulista 7.47: lue itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 93bfd4379 (peilissä natiivi-backup), ei muutoksia. KÄÄNTÄMÄTTÄ ja ajamatta: mitään kohtaa ei ole todistettu ajosta.
Ajo pyydetty JU:lta 12.4x (viesti jonossa, JU:n kuittausta ei vielä ole; tarkista list_eventsillä): 5 varausta, kansio lokit/nui-ui-93bfd4379, iphone-pysty pallo keskitys x3, iphone-vaaka pallo keskitys x1, iphone-vaaka pallo x1 kuvilla (pallon kierros, pallo vapaa lento, pallo keskeytetty, oppaan aika, aarretehtävä aikajana, aarretehtävä katso).
PT 12.4x, kohta E (sellaisenaan): "kelpaa, ei omaa varausta nyt. Kerro KK:lle viestissä suoraan, että kuvat ovat testilipulla eikä oikeasta kierroksesta. Jos KK vie vivun siirron omistajalle, oikea tila ajetaan ensin omalla varauksella, koska omistajan hyväksymää paikkaa ei muuteta testitilan perusteella."
JU 12.4x: ajo jonossa L1:llä, loki T/nui-ui-93bfd.log; seuraava JU lähettää polut.

## PT:n sana 12.3x (sellaisenaan)
"F kyllä: korjaa Rakenne.NaytaHeti juuresta ja ota nostokortti ja selain testiin. A, C ja D kyllä, samoin bd998aa59:n peruslinjan ja ✓-muunnoksen kumous, koska ne eivät auttaneet.
B: ota valikkorivistä täysikokoinen kuva. Toleranssi vain tälle riville ja vain, jos eroa ei näe; ✓ jää mittaukseen. E: älä siirrä vipua. Aja D:n jälkeen oikea vapaa lento ja tila, jossa kierros on keskeytetty, ja vie kuva ja yksi suositus KK:lle, koska vivun paikka on omistajan hyväksymä.
Intro 2 ja 3: yksi havainto, katso seuraavasta ajosta. Kaikki omaan haaraan yhdellä ajolla (5 varausta), tulos 3 rivinä; ei junaan ennen PT:n kuittausta. Täysi sarja ennen junaa pysyy."

## Mitä 93bfd4379 tekee
- F: NaytaHeti lisää USS-luokan mk-heti (Matkakirja.uss, .mk-heti.mk-heti, transition-duration 0s); PiilotaHaivyttaen poistaa sen. Inline-kesto pois. Syy luettu Unityn lähdekoodista (UnityCsReference, haara 6000.7, b8): inline-kesto kirjoittuu heti computedStyleen (InlineStyleAccess.SetStyleValue), joten VisualTreeStyleUpdaterin SameTransitionProperty ei näe muutosta eikä peru häivytystä ennen uutta tyyliä. Päivityksen lopun m_TransitionPropertyUpdateList peruu sen, ja CancelAnimation -> ForceComputedStyleEndValue kirjoittaa opacityksi 0. Sama hash, joten tyyliä ei lasketa uudelleen. Selitys sopii lokin vuorotteluun. Lähdekoodin luku ei ole ajo.
- Testi: vaiheet NostoKesken ... OdotaSelainKesken; rivit "-- nosto: sulku ja heti avaus" ja "-- nostoselain: ...". "opacity avattaessa" kertoo, oliko häivytys kesken (0 < x < 1); jos ei, testi ei todistanut. Selaimen paneelilla ei ole USS-siirtymää, joten sen rivi todistaa vain, ettei avaus hajoa.
- A: .mk-astroTaulu__linkki padding 0 10px 1px 10px.
- Kumous: AsetteluTesti.Keskitys.cs:n bd998aa59-muutokset (Glyyfi + lahde, muunnos, <u>). Muut bd998aa59:n asiat jäivät.
- C: OpasMetrolinja: kosketusalan bottom alimman näkyvän nimen mukaan (ei museon ikkunatilassa), rajana OsumaRaja = vasemman tapin yläreuna, koska lista on piirtojärjestyksessä tapin edellä. Testi: os.yMax < mb.yMax = VIKA.
- D: kierros ilman "mika"; "pallo vapaa lento" ilman listaa; "pallo keskeytetty": metro 0 + uusi komento "keskeytetty" (testiKeskeytetty näyttää tapit). Vipu TestiPallonOhjaimet-listassa. Vain ei-keskitysajossa. Vipua ei ole siirretty.

## Kun JU:n ajo on valmis
1. Jos ei käänny: korjaa virherivit (en voinut kääntää), uusi sha, uusi pyyntö.
2. Lue lokista: "-- aarretehtävä" (aikajana ja katso: opacity 1,00, uutta > 0), "-- nosto", "-- nostoselain", "Kysy Pululta" -arvo (kumous ja A vasta nyt näkyvät), Päivä ✓, kosketusala, kestot (alle 6 min), intro 2 ja 3.
3. B: katso iphone-vaaka-oppaan-aika täysikokoisena. Toleranssi vain tälle riville ja vain, jos eroa ei näe; ✓ jää mittaukseen. Mittaus on iphone-pystyssä, kuva vaakana: jos arvo ei toistu vaakana, pyydä kuva pystystä.
4. E: katso pallo vapaa lento ja pallo keskeytetty täysikokoisina. Kuva ja YKSI suositus KK:lle (poikkeus 2.214-tapaan, PT määräsi), kerro että tilat ovat testilippuja, jos PT hyväksyi ne. Odotettu VIKA iphone-vaakassa: vipu tapin päällä, alin nimi 13 pt tapin päällä (kosketusala rajattu tappiin, joten nimen alaosa jää silloin ilman napautusta).
5. Tulos PT:lle 3 rivinä, yksityiskohdat lokit/nui-ui-93bfd4379/tulos-nui.md. Ei junaan ennen PT:n kuittausta. Täysi sarja ennen junaa pysyy.

## Havainto, ei korjattu
Sama inline-kesto 0 kesken siirtymän on muualla: Saapumiskortti 75/123, Latauspalkki 53, KaupunkiKortti 301, Ponnahdus 65/93/128. Ansaa ei ole tarkistettu niistä; Ponnahdus asettaa myös inline-arvot, joten se voi käyttäytyä eri tavalla. Kerro PT:lle tuloksen yhteydessä, jos F todistuu.

## Ei todennettu
Mikään ajosta. Unityn syy vain lähdekoodista. Ohitan aiempi vaihtelu. Radion muste. Vipu ja tappi oikeassa vapaassa lennossa; lista ja tappi oikeassa keskeytyksessä: vain testilipuilla.

Kuvat vain PT:lle, paitsi kohta 4 KK:lle.

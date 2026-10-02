# Päätoimittajan luovutus 2.10.2026 klo 19.0x (konteksti 61 %)

Sessio "Päätoimittaja (Opus, max)" local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, haara claude/bold-ride-vow4ki (pushattu, main yhdistetty
15.4x), RC päällä. Edelliset: viesti-fable-luovutus-20261002-b.md (15.0x) ja aamun viesti-fable-luovutus-20261002.md.
Loki: kaikki päätökset 15.40–19.02 kirjattu haaraan (docs/raamattu-loki/paatokset-2026-09.md), Raamattuun e083d4969 (raha £400).
Vie lokin ja Raamatun main-PR:nä samalla kaavalla kuin ennen (worktree origin/mainista + checkout haarasta → PR → Julkaisija mergeää).
**Omistajalle vain suomeksi. Kellonaika aina `date`:lla.**

**TILIN VIIKKORAJA 95 %** (omistaja 17.2x, kumosi 90 %:n). Postivahti hälyttää 92 % (luovutukset ajan tasalle) ja 95 % (roolit
pushaavat luovutuksen ja lopettavat, Päätoimittaja kirjoittaa siirtoviestin omistajalle, muisti viikkoraja-97-siirtoprompti).
Klo 19.02: 86 %, vauhti ~2,5–3 %/h → 92 % noin 21.15, 95 % noin 22.30.

## Uudet työtavat tänään (muistissa)

- Jokainen roolin kuva tarkistetaan suurennoksesta ENNEN omistajaa (välit, keskilinjat, glyfit, tyylin yhtenäisyys, konsoli,
  rikkinäiset kuvakkeet); makuasioita (sävyt) ei "korjata" omalla tulkinnalla (kuvat-kriittinen-tarkistus-ennen-omistajaa).
- Roolin "väliaikainen poikkeama" omistajan päätöksestä ei kelpaa: poista ja sido julkaisu riippuvuuteen (omistajan-paatos-ei-valiaikaisia-poikkeamia).
- Omistaja haluaa nähdä vaihtoehdot, kun ne on luvattu (tikkaus A/B/C): älä karsi luvattuja vaihtoehtoja yhdeksi.

## Roolit nyt

| Rooli | Kärki |
|---|---|
| Julkaisija | TF tänään 6/12 (116, 118, 120, 123, 124, 126 klo 17.44). **127 = bc5f29c0** kääntyy (126 + Ajattelijat-korjaukset + Live + EI OVAALEJA + linssien ☰ + linnan valikko/Muurinharja + GALLERIA), TF savukkeen jälkeen → 7/12. Web-juna: #3851 → #3854 → #3859 → #3860 → #3862 → #3864 → #3865 + Pelikoodarin kipsipää-PR |
| Natiiviseppä | 127 käännöksessä. **Juna 128**: valikko V2 (4d03a255, EI Linssit-riviä) VAIN yhdessä Linssisepän Linssit-karttanapin kanssa; yläpalkki ja nostorivi vasta omistajan OK:lla; erikoisnostot-3; linnan skin-moottori omistajan OK:n jälkeen |
| Natiivi-UI | Korjaa omistajan 18.4x: **logo 5 pt ylös** saaren ja pillerin keskilinjalle (yläpalkki muuten valmis: tikkaus B pelkkinä pistoina, BUILD 123 -pilleri "1 pv £400"); **nostoselain**: vasemmalla kategoria, keskellä ‹ NOSTOT ▾ › ILMAN KEHYSTÄ + AUTO, oikealla ≡ ja kaiutin. Kuvat Päätoimittajalle → omistajalle. Sitten linssivalikon sisältölista (web odottaa) |
| Pelikoodari | Puhe ilman kuplia -erä lähes valmis (poikkeukset: Pöllön muotokuva ja ympyröity avainsana jäävät kuvina, puhuttu teksti pois). Sitten linssien hampurilainen (web, kun Natiivi-UI:n lista tulee), GALLERIA web, Ajattelijat-kuvake (generoi-varustekuvat, Päätoimittaja valitsee), ajattelijat 2–3. Kipsipää karttaobjektina webissä valmis (Sokrates 39,05 N 24,1 E, Marcus 42,4 N 13,1 E; näkyy aina kun piste näkyvissä; kipsi 208/197/182, varjo 58°/0,26/10) |
| Linssiseppä | Linssit-karttanappi natiiviin valmis → juna 128 V2:n kanssa, **myös vaakatilassa** (päätin 19.02). Sitten kipsipää karttaobjektina natiiviin (erikoisnostot-3: lämmin kipsi, varjo, kortti peittää, kartta-ankkuri webin lat/lng:llä) → kuvapari omistajalle |
| Linssiseppä 2 | Ajattelijat-korjaukset junassa 127 (Metal-peite, reunavalo webin tasolla, yhteinen sulku). Reunavalon jäännös 1,56 vs 1,18 riittää |
| Siirtoseppä | Muurinharja junassa 127. **Skinnattu vartija** (linna-skin d50c5a7f) toimii; video omistajalla 18.5x. Korjattava: reitti kulkee soihtupadan ja seisovan keihäsvartijan läpi. Odottaa omistajan kommenttia liikkeestä ja sävystä |
| Linnanrakentaja | Polku (a): valmiit skinnatut CC0-mallit (Quaternius UBC + Modular Outfits Fantasy) + UAL-liikkeet, vartija valmis _valmiit/vartija-skin/v1. Muut 16 hahmoa omistajan OK:n jälkeen; suositus vaalentaa vartijan asu. Webin AnimationMixer hänelle omistajan OK:n jälkeen. Luovutus pushattu (76fb48593) |
| Karttaseppä, Sisältökirjuri, Laitetestaaja | ei muutoksia tässä jaksossa (Karttaseppä siivosi worktreet) |
| Postivahti | hälytykset 92/95, kävijälaskuri (24 ulkopuolista, lähes kaikki iOS US = Applen tarkastajat), levy |

## ODOTTAA OMISTAJAA (kanna eteenpäin)

1. **Vartijavideo** (lähetetty 18.5x): kelpaako liike → Linnanrakentaja vaihtaa loput 16; asun vaalennus (suositus: värjäämätön villa/ruskea).
2. **Yläpalkki** (logo samalle korkeudelle) ja **nostoselain** (uusi ylärivi): uudet kuvat Natiivi-UI:lta tarkistuksen kautta.
3. **Kipsipää natiivissa** kuvaparina (web näytetty 17.5x).
4. Aamupäivän lista: seuraava ajattelija (Platon), Marcuksen intromusiikki (Eroica), yövalojen natriumoranssi, Lukijoilta-avaimen
   syöttö webiin ja iPadiin, Ajattelijat pelaajille -lupa (Sokrateen elämä -lappu), Julisteet/Codex-tilaukset, Allymes (ei ennen nykyisiä).
5. Linssit-nappi vaakatilassa (päätin näkyväksi; omistaja voi kumota).

## Päätökset 15.40–19.02 (kaikki lokissa)

Raha £400 brittiläisenä koko pelissä (Raamattu) + proosasääntö (järjestelmätekstit £N, puhe/kertomus ennallaan) + selkeä £-glyfi ·
GALLERIA-pohja vanhasta julistegalleriasta · kipsipäät junaan ilman uusintakuvausta, TF-raja 12 tiukasti · viikkoraja 95 % ·
Live-nappi · linnan alareuna yhdeksi kortiksi, Pulu kortin kulmalle, pienoiskartta kehykseen, linnan valikko hyväksytty ·
linssit EIVÄT KOSKAAN valikossa (vain karttanappi) · nostoselain: ei kehyksiä, suodattimet suorakulmioina, yksi ylärivi (vain natiivi) ·
kipsipää karttaobjektina kiinteässä pisteessä, lämmin kipsi, varjo, ei väistä kartuutsia · linnan hahmot valmiista skinnatuista
malleista aikakauden vaattein (sulavin liike) · yläpalkki: tikkaus B pelkät pistot, pilleri BUILD 123 -tyyli "1 pv £400", logo ja
pilleri keskelle saaren ja kaaren väliin ja samalle korkeudelle.

## Huomiot

- Levy 57 Gt (raja 45): siivosin 4 worktreetä ja 92 yli 48 h lokikansiota 18.4x.
- Vahinkocommit-vaara: älä käytä `git commit -a` (.claude/settings.local.json on muutettu).
- Kuvien merkintäfontissa ei ole ☰-merkkiä (näkyy laatikkona): käytä tekstiä.

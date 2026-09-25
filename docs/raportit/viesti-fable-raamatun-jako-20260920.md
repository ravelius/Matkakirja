# Raamatun jako — Raamatunkarsijan loppuraportti Fablelle (20.9.2026)

Haara `raamatunkarsija` (origin), commitit `fab4e743` (jako) + `0d444903` (merge origin/v1973-prep, Fablen häntä 18.27–18.45 lokiin). Worktree `/Users/samireivinen/Matkakirja-raamattu`. Fable tarkastaa tiivistetyn linjausosan ja hyväksyy ennen mergeä prep-haaraan.

## Tulos

| | ennen | jälkeen |
|---|---|---|
| js/tyohuone-raamattu.js | 983 kt (984 318 t) | **224 kt (229 214 t)** |
| Fokusmoodi | 125 kohtaa, ~155 kt | 19 tiivistettyä kohtaa, 24 kt |
| Viisas Pöllö | 238 kohtaa, ~350 kt | 31 kohtaa, 49 kt (17 tiivistettyä + MAC STUDIO sanatarkasti 9 kt + 13 alkuperäistä 18.–25.8.) |
| Kaupungit | 108 kohtaa, ~390 kt | 21 kohtaa, 28 kt (13 tiivistettyä + 8 alkuperäistä 15.–26.8.) |
| Ohjedokumenttien kartta | 32 kohtaa | 37 (loki-sääntö + 4 lokitiedostoa) |
| muut 24 osiota | | koskematta |

`node --test tests/*.test.mjs`: 3771 testiä, 0 fail (13 skipped kuten ennen). `node tools/build-standalone.mjs`: onnistuu (dist 35 228 kt). Raamatun ensimmäinen rivi ja Ydinajatus-osio koskematta.

Kohtalaskenta (jää / tiivistyi / siirtyi): Fokusmoodi 0 / 125→19 / 125; Viisas Pöllö 14 (MAC STUDIO + 13 alkuperäistä) / 224→17 / 225; Kaupungit 8 / 100→13 / 100. Yhteensä 450 kohtaa lokissa sanatarkasti, 22 jäi sellaisenaan, 49 tiivistettyä kohtaa.

Koko ei yltänyt tavoitteeseen ~125–140 kt: 415 lokiviitettä täysine otsikoineen (Fablen pyytämä muoto `#<otsikko>`) on noin 40 kt, MAC STUDIO 9 kt ja säilytetyt alkuperäiset ~7 kt. Jos halutaan alle 150 kt, viitteet voi lyhentää tiedostotasolle (`Loki: <tiedosto>` ilman otsikoita) — yksi sed-ajo, testi `raamattu-loki.test.mjs` sallii sen.

## Lokitiedostot (docs/raamattu-loki/)

- `paatokset-2026-08-24--09-03.md` — Fokusmoodin 125 kohtaa (128 kt)
- `paatokset-2026-09-03--09-14.md` — Viisas Pöllö -osion kohdat 0–224 (284 kt)
- `paatokset-2026-09-13--09-20.md` — Kaupungit-osion kohdat 0–99 (313 kt), sisältää Fablen 18.27 ja 18.45 merkinnät
- `paatokset-2026-09.md` — juokseva loki; `node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"` lisää loppuun `## OTSIKKO (pp.kk.vvvv klo hh.mm)` Suomen aikaa

Otsikko = kohdan alku ensimmäiseen aikaleimasulkuun asti, joten `KARTTAUUDISTUKSEN PAATOKSET 34: KAUPUNKI ON YKSI PISTE, …`, `KARTTAUUDISTUKSEN PAATOKSET 12 TARKENNUS: …`, `TEHOKKUUSPAATOKSET` jne. löytyvät grepillä samoin kuin ennen. Alkurivi kertoo lähdeosion ja siirtopäivän. Sanamuotoja ei muutettu (teksti on RAAMATTU-olion merkkijono sellaisenaan; vain JS-konkatenaation rivitys katosi).

## Testit ja työkalut

- `tests/dokumentit.test.mjs`: kartta vaatii nyt myös `docs/raamattu-loki/*.md`.
- `tests/raamattu-loki.test.mjs` (uusi): jokainen Raamatun `Loki: docs/raamattu-loki/<tiedosto> #<otsikko>` -viite osoittaa olemassa olevaan otsikkoon (415 viitettä); koodin viittaamat PAATOKSET-sarjat löytyvät lokista; lokien kohtamäärät; raamattu-kirjaa.mjs:n muoto; Raamatun koko < 450 kt.
- `tools/raamattu-kirjaa.mjs` (uusi): `kirjaa()`, `lokikohta()`, `suomenAika()`; CLI kuten yllä.
- HUOM: `tests/dokumentit.test.mjs` oli PUNAINEN jo origin/v1973-prepissä: VIESTIKANAVAT-merkintä viittaa tiedostoon `docs/raportit/codex-toimitukset.md`, jota ei ollut. Loin sen ja `docs/raportit/worktree-siivous-20260920.md` alkurivillisinä pohjina (Julkaisijan kirjanpito, SIIVOUSPAATOKSET:n lista). Poista tai täytä vapaasti.

## Miten tiivistin

Peruste oli "onko yhä voimassa", ei ikä. Jokaisessa tiivistetyssä kohdassa on päivämäärä(t) ja `Loki: <tiedosto> #<otsikot>`. Fablen listaamat säännöt ovat mukana: saapumisen sääntö 20.9. klo 11.15 (kartta terävä, paneeli ja kupla piilossa) → Kaupungit "SAAPUMINEN UUTEEN KAUPUNKIIN"; pohja/viivataso → pallosarja → luettelo → CI → merge → Fokusmoodi "LAATTAPYRAMIDI" ja Kaupungit "TYÖTAPA JA SESSIOT"; nostotaso --ilman-hahmotelmia → molemmat; kuvissa ei aikaleimoja/vesileimoja/yksityishenkilöitä → Kaupungit "NOSTOT KARTALLA"; otsikko = kartan nimi, isoisän tekstit = ajan nimi → sama; play() ≠ ääni, currentTime → Pöllö "ÄÄNET"; ei Euroopan ulkopuolelle → Pöllö "MATKAKIRJA", "SISÄLTÖTUOTANNON LAAJUUS" ja Kaupungit "TYÖTAPA"; grep <<<<<<<, squash-merge, Codex ~/Documents/Codex/<pvm>/ → "TYÖTAPA JA SESSIOT"; agenttisääntö → Ydinajatus (ei toisteta). "TYÖTAPA JA SESSIOT (voimassa 20.9.2026)" ja "TILA NYT" ovat Kaupungit-osion lopussa ennen alkuperäistä kaupunkilinjausta.

## Ristiriidat, joita aikaleima ei ratkaise — Fable päättää

1. **Karttanostot koko maailmaan (6.9.) vs. sisältötyö vain Euroopassa (7.9. tekstit; 20.9. klo 00.14 "älä jatka Euroopan ulkopuolelle")**: kirjasin tavoitteen (8+3+1+2 per maa, 112 maata) voimassa olevaksi *tavoitteeksi* ja Euroopan *rajaukseksi* nyt. Jos koko maailman tavoite on kumottu, poistetaan Pöllö-osion "SISÄLTÖTUOTANNON LAAJUUS" -kohdasta.
2. **Etsi aarre -nappi**: 9.9. nappi avaa kaupunkilehden, 11.9. lukitaan nimen alle, 13.9. PAATOKSET 6 "Etsi aarre -nappi poistetaan, aarre löytyy vihreästä pisteestä", mutta 11.9./12.9. kohdat ja PAATOKSET 34 (liuska: Turistiopas) eivät sano, miten pelaaja pääsee aarrekysymykseen nyt. Kirjasin napin Pöllö-osiossa viittauksena Kaupungit-osioon; Kaupungit-osiossa en väitä napista mitään. Tarvitaan yksi lause: mistä aarteen etsintä alkaa v1980:ssa.
3. **Huntu**: 14.–16.9. luentakuvien aikana kartta tummempi ja sumea, pulun kuvilla sama huntu; 20.9. klo 10.45 "kartta ei ole blurrattuna kuvien aikana — muutetaan sääntöä". Tulkitsin: huntu pois saapumiskuvien aikana; kirjoitin "huntu (jos käytössä) koskee vain karttaa". Onko huntu kokonaan pois pelistä (myös nostopopupit, kaupunkiesittely)?
4. **Matkakirjan tekstin yläraja**: 8.9. 400 merkkiä (hyväksytyt 360–400); 19.9. "uuden pelikaupungin teksti enintään 450, vanhoja ei lyhennetä". Kirjasin molemmat; onko yleinen raja nyt 450?
5. **Kohtaamiskortit ilman kuvaa (29.8.)** vs. kuvaputken kohtaamiskuvat ja kaanonimuutos kuvien takia (12.9.) sekä "kohtaamiskuvat jäävät omistajan arviointiin" (5.9.): kohtaamisilla ilmeisesti on kuvia. Kirjasin 29.8. säännön Fokusmoodi-osioon ("kunnes tyyli löytyy") — todennäköisesti vanhentunut, poista jos kuvat ovat käytössä.

## Säännöt, joiden voimassaolosta en ollut varma (kirjasin, mutta merkitsin viittauksella)

- Fokusmoodi "KAMERA JA NAPPULA": 24.8. "käsin liikuttelu sallittu vain valloitetulla alueella ja sen lähellä" — pallolla panorointi on rajattu kohdemaan ympärille (P6). Valloitetun alueen sääntö lienee kumoutunut; jätin viittauksen Kaupungit-osioon.
- Fokusmoodi "AARRETEHTÄVÄ": 28.8. "löytö näkyy laatan värinvaihtona pronssikultaan, nappula seisoo sen päällä" — kaupunki on nyt yksi piste (P34) ja käyty kaupunki kultaa (8.9.). Sama asia pisteenä?
- Fokusmoodi "LIVIA … PARIPERIAATE": 29.8. Livian neljän kuplan avausesittely aloitusvalinnassa kerran per laite — onko se yhä pallon aloitusvalinnassa (7.9. ALOITUSVALINTA ei mainitse)?
- Fokusmoodi "KUVAT": 2.9. "omistaja hyväksyy kuvaputken kuvat aina ensin sivustolla" — 5.9. Fable hyväksyy omistajan puolesta (kohtaamiskuvat paitsi). Kirjasin 5.9. voittajana.
- Fokusmoodi "REITIT JA SIIRROT": 2.9. Matkusta-kamera ja siirron koreografian millisekunnit — pallolla PAATOKSET 29/40 muuttivat hyppyä ja kameraa; kirjasin periaatteet (ennakkozoomi → kamera → nappula) ja viittauksen P40:een, en mittalukuja.
- Fokusmoodi "LAATTAPYRAMIDI": pyramidin lukitut mitat (30.8.: 240 px/aste, arkki 84 N–66 S, 8 tasoa) jätin lokiin — pallon Mercator-laattasarja on eri geometria. Jos mitat ovat yhä pohjapyramidin totuus, ne kannattaa nostaa takaisin.
- Pöllö "TYÖTAVAT": Claude Projects -työnjako (19.9. klo 09.00) — sessiosetti 20.9. ei mainitse projektia; muistini mukaan Projects ei ole käytössä. Kirjasin sellaisenaan viittauksella sessiosettiin.
- Pöllö "KARTTAPALLO": 4.9. "pallo on valikko, ei lauta" → 5.9. lauta; 5.9. "linssit vanhalla kartalla" → 7.9. tasokartta pois kokonaan. Kirjasin 7.9. voittajana (tasokartta ei palaa, P3).
- Kaupungit "LIIKKUMINEN": "himmeät kaaret muualla" odottaa omistajan sanaa (20.9. klo 13.50 idea, ei tehty) — kirjasin odottavana.
- Kaupungit "ASTRONAUTIN KAMERA": astronautin kameran oma kuvake (tilattu 20.9. klo 14.50, Fable hyväksyy) — kirjasin tilattuna.
- Kaupungit "KARTTAUUDISTUS": PAATOKSET 1 "uloszoomauksen kerroin 3 → 1,15 Liiku-napin erässä" — nyt uloin = saapumisnäkymä (P17); jätin kertoimen lokiin.

## Fablelle jääviä pieniä asioita (en koskenut)

- Osioiden `tila:`-kentät ovat vanhentuneet: Fokusmoodi "toteutuksessa — pilotti Kreikka valmis; pelissä 25.8.2026 kuusi fokusmaata", Viisas Pöllö "luonnos — ideointi, ei vielä toteutukseen", Kaupungit "luonnos". Sekä `paivitetty: '13.9.2026'`.
- CLAUDE.md:n viittaus osioon "MAC STUDIO: UUDEN SESSION ALOITUS…" toimii (kohta on Viisas Pöllö -osiossa sanatarkasti); CLAUDE.md:n jako-sääntö on Fablen lisäys tarkastuksessa.
- Kaikki 1122 PAATOKSET/TARKENNUS-viittausta koodissa ja savukkeissa ovat kommentteja; ne löytävät otsikkonsa lokista grepillä (testi vartioi 11 sarjaa).

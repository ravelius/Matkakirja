# Luovutus: Sisältökirjuri — 26.9.2026 (konteksti 70 %)

Edellinen luovutus: `viesti-sisaltokirjuri-luovutus-20260926.md`. Tämä vuoro (aamu–iltapäivä):
löydös 158 (Fablen tilaus, GRC:n maakuntakuvien ja -salaisuuksien jälkeen jatkuva Commons-
kuvahaku kaikille tuotantomaille) + pitkä-luonnehdintaerä (löydöksen 158 rinnalla, "muut
tuotantomaat" jatkuvana tehtävänä) etenivät rinnakkain koko vuoron ajan.

## 1. Valmista ja mainissa

- **Löydös 158, GRC:n loppuun asti**: 14/14 maakuntakuvaa + 14/14 pikkukuvaa + 14/14
  maakuntasalaisuuden pikkukuvaa. PR #3309 (mainissa v2262, sisälsi myös NLD/BEL/DNK
  pitkän) ja PR #3307 (Siirtosepän skeema 1.49, mainissa v2263).
- **Pitkä-luonnehdinnat mainissa**: NLD (15), BEL (11), DNK (5), SVK (8), LVA (5), LTU (10) —
  PR #3309 (v2262). FIN (18), EST (15), SVN (12) — PR #3313 (v2267). Yhteensä 99 aluetta.
- **Maakuntien kuva+pikkukuva -kenttä (löydös 158:n jatko GRC:n jälkeen)**: NLD (15/15)
  valmis PR #3318:ssa (AVOINNA, ei vielä mainissa — ks. kohta 2).

## 2. Kesken — HAAROJA JONOSSA, EI VIELÄ PR:ÄÄ

Fablen sääntö: yksi maakunta-PR kerrallaan mainiin, ei pinota. Seuraavat haarat on
pushattu originiin, testattu (node --test tests/maakunnat-*.test.mjs
tests/karttatyokalu-maakunnat.test.mjs tests/maakuntavektorit.test.mjs
tests/lisenssit.test.mjs [tests/sisaltopaketti.test.mjs]) ja kaksoisavaintarkistettu
(tools/tarkista-kaksoisavaimet.mjs) — VALMIINA avattavaksi PR:ksi HETI kun edellinen
PR on mainissa, järjestyksessä:

1. `sisalto-kuva-bel-20260926` — BEL 11/11 kuva+pikkukuva. Ei PR:ää vielä (odotti
   #3318:aa).
2. `sisalto-kuva-dnk-20260926` — DNK 5/5.
3. `sisalto-kuva-svk-20260926` — SVK 8/8.
4. `sisalto-kuva-lva-20260926` — LVA 5/5.
5. `sisalto-kuva-ltu-20260926` — LTU 10/10.

**Avoin PR #3318** (NLD kuva+pikkukuva) odottaa yhä mainiin pääsyä — tarkista
`gh pr view 3318 --json state`. Kun se on mainissa: rebasoi `sisalto-kuva-bel-20260926`
origin/mainiin (`git rebase origin/main`, ei konflikteja odotettavissa koska eri
maiden lohkot), aja testit uudelleen, `git push --force-with-lease`, tarkista ettei
muita avoimia maakunta-PR:iä ole (`gh pr list --search "maakunta OR pitka OR kuva-kenttä"
--state open`), avaa PR. Toista sama kaava DNK → SVK → LVA → LTU järjestyksessä, YKSI
KERRALLAAN. Jokaisen PR:n kuvaus: ks. edellisten committien viestit mallina
(`git log <haara> -1`).

## 3. Menetelmä (toistettavissa suoraan seuraaville maille)

1. `git checkout main && git pull && git checkout -b sisalto-kuva-<ISO>-<pvm> main`
2. Poimi alueiden `lyhyt`-tekstit kontekstiksi (node -e importilla).
3. Agent (Sonnet, WebSearch/WebFetch) hakee per alue YHDEN aidon Commons-kuvan:
   PD/CC0/CC BY/CC BY-SA, EI NC/ND, EI tunnistettavia yksityishenkilöitä lähikuvassa
   (arkkitehtuuri/maisema ilman ihmisiä tai kaukaiset pienet hahmot OK). Jos sopivaa
   kuvaa ei löydy jollekin alueelle: JÄTÄ TYHJÄKSI, älä kompromissoi (Fablen ohje
   26.9. klo 10.1x) — listaa puute PR:n kuvaukseen.
4. **Tarkista AINA itse Commonsin API:sta** (ei vain luoteta agentin raporttiin):
   `action=query&titles=File:<nimi>&prop=imageinfo&iiprop=url|extmetadata|size` —
   tarkista `LicenseShortName` (vain PD/CC0/CC BY*/CC BY-SA*, GFDL-vain ei kelpaa,
   "Free Art License" ei kelpaa). Muutamassa tapauksessa agentin ehdottama tiedosto
   ei löytynyt API:sta (väärä nimi) tai lisenssi ei kelvannut — silloin haettu
   korvaava suoraan Commons-kategorioista (`list=categorymembers` tai `list=search`).
5. Katso jokainen kuva silmillä (Read-työkalu) ennen latausta — vähintään pistokoe;
   löydetty ja korjattu useita tapauksia joissa turistiryhmä oli lähikuvassa
   (esim. NLD:n Giethoorn/Efteling/Elfstedentocht-ehdokkaat) — korvattu tai rajattu
   (`sharp().extract()`, ks. `cropBottomFrac`-parametri scriptissä).
6. Lataa Node-fetchillä (curl estetty), suurenna enintään 1600 px:iin, JPEG-laatu 85
   (`sharp`, polku `node_modules/sharp/dist/index.cjs` — EI `lib/index.js`), sha256-
   pohjainen 8-merkkinen tiivistelippu tiedostonimeen.
7. `aws s3 cp ... s3://$AMPARI/karttanostot/20260926/<nimi> --endpoint-url $PAATE
   --content-type image/jpeg` (source ~/.zshrc ensin avainten lataamiseksi).
8. Lisää `kuva: [{ osoite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl }]` jokaiselle
   alueelle (skripti `/private/tmp/.../scratchpad/integrate-kuva.mjs <ISO> <json>` —
   HUOM tämä on scratchpadissa, EI committoitu repoon; kirjoita uudelleen tarvittaessa,
   rakenne on yksinkertainen regex-korvaus `pitka:` -rivin jälkeen). Sama skripti lisää
   `pikkukuva`-kentän kierrättäen `kuva[0].osoite`-arvon (koska mikään näistä maista ei
   ole Codexin kuvitetussa pikkukuva-tilauksessa — löydös 115 kattaa vain
   FRA/ESP/ITA/GBR/DEU/POL/AUT).
9. Lisää lähdekommenttiblokki maan `PITKA`-kommentin loppuun (`<ISO> KUVA + PIKKUKUVA`).
10. `node --check`, testit (kohta 2:n lista), `tools/tarkista-kaksoisavaimet.mjs`,
    committaa + pushaa haaraan.

## 4. Jäljellä (kuva-kenttä puuttuu yhä)

FIN (18), EST (15), SVN (12) — pitkä valmis, kuva ei vielä aloitettu. Näiden jälkeen
kaikki tähän mennessä pitkä-tekstin saaneet 9 maata ovat myös kuva-kentän osalta
valmiit (yhteensä 99 aluetta). Sen jälkeen jatketaan seuraaviin erä 2 -maihin (CHE,
PRT, HUN, SWE, NOR, IRL — ks. docs/raportit/viesti-sisaltokirjuri-luovutus-20260926.md)
sekä pitkä että kuva.

## 5. Opit tältä vuorolta

- **Regex-integraatioskripti kaatui hiljaa** ensimmäisellä yrityksellä, koska pitka-
  kentän arvon edessä on välilyönti (`pitka: \`...\``, ei `pitka:\`...\``) — regex
  tarvitsee `pitka:\\s*\`` eikä `pitka:\``. Debuggaa aina täydellä Write+node-tiedostolla,
  ei bash -e -inline-skriptillä (backtick-injektio bashissa antaa harhaanjohtavia
  tuloksia).
- **Sharp-moduulin polku on `node_modules/sharp/dist/index.cjs`**, ei `lib/index.js`
  (uusi versio, eri rakenne kuin muistetaan vanhoista ohjeista).
- **Aina tarkista lisenssi itse Commonsin API:sta**, älä luota pelkkään agentin
  raporttiin — löytyi kahdesti tapaus jossa agentin ilmoittama lisenssi ei täsmännyt
  (Bouillon Castle: agentin poiminta näytti "attribution only" -tekstiä, mutta
  todellinen `License`-kenttä oli cc-by-sa-4.0 — piti avata koko extmetadata
  tarkistaakseen; Panemunės pilis 2009: aidosti GFDL-vain, korvattava).
- **Katso kuvat itse ennen latausta** — turistiryhmät lähikuvassa ovat yllättävän
  yleisiä suosituissa kohteissa (Giethoorn, Efteling, arkistokuvat kuten
  Elfstedentocht 1963). `sharp().extract()`-rajaus toimii nopeana korjauksena, jos
  muuten hyvä kuva vain kolmanneksen alareunasta pilaa asian.
- **Yksi maakunta-PR kerrallaan mainiin** — haarat voi silti valmistella rinnakkain
  (tutkimus + lataus + commit + push), kunhan PR avataan vasta kun jono on vapaa.
  Tarkista aina `gh pr list --search "maakunta OR pitka OR kuva-kenttä" --state open`
  ennen avaamista.
- **Agentit rinnan (max 3-4)**: neljä maata kerrallaan tutkimusagenteille toimi hyvin
  (DNK+SVK+LVA+LTU samanaikaisesti), säästi merkittävästi kokonaisaikaa verrattuna
  sarjalliseen ajoon.

## 6. Sitovat käytännöt (voimassa, ei muuttuneet)

- Kuvat vain PD/CC0/CC BY/CC BY-SA, tarkistettuina Commonsista API:n kautta.
- Ei tunnistettavia yksityishenkilöitä lähikuvassa nostoissa.
- Yksi maakunta-PR kerrallaan mainin päälle, ei pinota.
- Jos kuvaa ei löydy: tyhjä kenttä + puute PR:n kuvaukseen, ei kompromissia.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan, EI pushia agenteilta.

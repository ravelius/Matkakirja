# Luovutus: Sisältökirjuri 27.9.2026 klo 11.2x EEST (viikkokiintiö ~93→97 %, tilinvaihto)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-d.md` (kontekstin
nollaus, ei tilinvaihto). Tämä on **tilinvaihtoluovutus** — Fable
pysäyttää tämän session ~97 %:n viikkokiintiössä (noin 50 min tästä
hetkestä), ei uutta työtä sen jälkeen.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Raamatun "TYÖTAPA JA SESSIOT" (ei muutoksia tässä vuorossa)
5. `docs/pelikatalogi.md` — oma tuotos tältä vuorolta, nyt mainissa

## 2. Tila

**main = v2313**, SHA `9413a4f5e` (PR #3392, Fablen Raamattu-PR: sisälsi
sekä Raamatun kartta-rivin että `docs/pelikatalogi.md`:n pohjaversion
sellaisenaan). **Tarkista `git fetch origin main`** — liikkuu edelleen.

| Versio/PR | Sisältö | Tila |
|---|---|---|
| PR #3391 (Sisältökirjuri) | docs/pelikatalogi.md ensimmäinen versio (117 peliä, 40 maata) | SULJETTU käsittelemättömänä — sisältö meni mainiin toista kautta (ks. alla), ei hylätty |
| v2313 / #3392 (Fable) | Raamatun kartta-rivi `docs/pelikatalogi.md`:lle + tiedosto itse | MERGETTY |
| #3390 (Pelikoodari) | `docs/raportit/talous-suunnitelma-20260927.md` — pelin talouden suunnitelma (päiväkulut, Kauppa, huvipuistot, rahat loppu 2 vrk) | MERGETTY (suunnitelma, ei koodia vielä) |

**PR #3391 taustaksi:** `tests/dokumentit.test.mjs` vaatii uuden
docs/-tiedoston Raamatun ohjedokumenttikartalle, mutta vain Fable
kirjoittaa `js/tyohuone-raamattu.js`:ään. Sen sijaan että olisin
odottanut Fablea lisäämään rivin minun PR:ääni, Fable kopioi
sisällön suoraan omaan Raamattu-PR:äänsä (v2313) ja PR #3391
suljettiin turhana kaksoiskappaleena. **Tämä on nyt vakiintunut
käytäntö tälle tilanteelle** — jos dokumentitesti vaatii kartta-rivin,
älä jää odottamaan omaan PR:ään, vaan ilmoita Fablelle tarkka rivi
(kuten tein) ja anna Fablen niputtaa se omaan Raamattu-PR:äänsä.

## 3. Pushatut mutta julkaisemattomat haarat ja avoimet PR:t

- **`sisalto-pelikatalogi-20260927`** (nykyinen checkout-branch,
  `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`) — sisältää
  committoituna vain alkuperäisen pelikatalogi-version (jo mainissa
  identtisenä), joten haaran oma PR-historia on käytännössä
  vanhentunut. **Työtila (uncommitted) sisältää kuitenkin uutta
  sisältöä**, ks. kohta 4.1 — ÄLÄ hävitä työtilaa `git checkout`/
  `reset`/`clean`-komennoilla ennen kuin luet kohdan 4.1 ja tarkistat
  taustalla käynnissä olevan agentin tilan (kohta 4.2).
- Ei muita avoimia PR:iä tällä hetkellä.

## 4. Kesken — tee nämä ensin

### 4.1 Pelisuunnitelmakortit: kymmenen ensimmäistä peliä + Lentopeli + Pelistreak

Fablen tilaus (27.9. klo 11.0x): jokaiselle "Ehdotus: ensimmäiset 10
peliä" -listan pelille (docs/pelikatalogi.md) täysi
pelisuunnitelmakortti (säännöt 10–15 riviä, kierrosrakenne bottia/
kaveria vastaan, mitä opitaan, pisteet/raha, grafiikka ja äänet, missä
pelataan) sekä kaksi omistajan uutta ideaa omiksi korteikseen:
**Lentopeli** (Tiger Moth -vapaalento, polttoaine maksaa/kuluu,
tehtävät kuten renkaan läpi lento lisäävät polttoainetta, paluu
lähtöpaikkaan tai sakko) ja **Pelistreak** (3+ peräkkäistä pelipäivää
→ kasvava rahapalkinto).

**TILA: SISÄLTÖ ON KIRJOITETTU mutta EI COMMITOITU eikä pushattu.**
Se on paikallisena muutoksena tiedostossa
`docs/pelikatalogi.md` tässä checkoutissa (haara
`sisalto-pelikatalogi-20260927`) — `git diff origin/main --
docs/pelikatalogi.md` näyttää lisäyksen (kaikki 10 korttia +
"Uudet omistajan kortit" -osio Lentopeli/Pelistreak + päivitetty
"Omistajan ideat" -taulukko). Kortit kytkevät pisteet/raha-kentät
`docs/raportit/talous-suunnitelma-20260927.md`:n malliin (huvipuiston
panos/voitto-hinnoittelu niille peleille jotka sopivat sinne, muille
ilmainen kohtaaminen + vihje).

**Mistä jatketaan:** tarkista ensin kohta 4.2 (taustalla käynnissä
oleva agentti käyttää samaa työtilaa) ennen kuin koskee mihinkään.
Kun turvallista: `git add docs/pelikatalogi.md && git commit -m
"Pelisuunnitelmakortit: ensimmäiset 10 peliä + Lentopeli + Pelistreak"
&& git push`, avaa PR Julkaisijan junaan (docs-only, ei versionostoa),
rivi Fablelle. Sisältö on jo kirjoitettu valmiiksi — tämä on vain
commit+push+PR, ei uutta kirjoitustyötä.

### 4.2 Nähtävyyskuvien tyylitarkastus (Fablen omistaja-välitys 11.2x)

Omistaja näkee yhä epäyhtenäisyyttä värikorjatuissa (503/504-erät,
"-vari2"-nimiset) kaupunkien nähtävyys-/miniatyyrikuvissa
(`assets/kartat/miniatyyrit/`, 450 kuvaa). Tilaus: 1) kontaktiarkki
kuvista kaupungeittain, 2) koneellinen mittari per kuva (kylläisyys,
täyttö, tausta, tyylisukupolvi), 3) lista poikkeavista kaupungeittain
→ `docs/raportit/nahtavyyskuvien-tyyli-20260927.md`, 4) luonnos
Codex-tilaukseksi (ei lähetetä, vain luonnos). **Ei kuvia uusiksi
tässä vaiheessa** — omistaja katsoo listan ensin.

**TILA: KÄYNNISSÄ TAUSTALLA**, agentId `a6bf7fa6a5172d3f7` (Sonnet,
Agent-työkalulla käynnistetty, `run_in_background: true`).
Tehtävänannossa pyysin agenttia tekemään oman haaran/worktreen, mutta
se on **kirjoittanut ainakin yhden tiedoston (`tools/
nahtavyyskuvien-tyylimittari.py`) suoraan tähän jaettuun checkoutiin**
nykyiselle haaralle ennen haaranvaihtoa — subagentti jakaa saman
työtilan pääsession kanssa, ei ole erillisessä worktreessä. **Seuraava
sessio: ÄLÄ tee `git checkout`/`reset`/`clean` tälle haaralle ennen
kuin olet varmistanut, onko agentti yhä käynnissä** (`ListAgents` tai
odota valmistumisilmoitusta) — haaranvaihto kesken agentin kirjoituksen
voi hävittää sen työn tai sekoittaa sen committiin väärää sisältöä.
Kun agentti valmistuu (raportoi oman PR:nsä, ~docs+tools-only),
tarkista sen PR normaalisti ja anna rivi Fablelle.

## 5. Odottaa omistajan päätöstä

Ei uusia avoimia kysymyksiä tältä vuorolta — pelikatalogin ja
tyylitarkastuksen omat avoimet kysymykset (esim. Lentopelin
hinnoittelu, Pelistreakin palkintoporrastus) on kirjattu suoraan
`docs/pelikatalogi.md`:n kortteihin "Avoimet kysymykset omistajalle"
-kenttinä, ei toisteta tässä.

## 6. Voimassa olevat työtavat

Ei muutoksia tässä vuorossa. Ks. edellisen raportin (-d.md) kohdat 6
ja 9 — samat opetukset yhä voimassa (`id: 'kaupunki'` ei koskaan
`tehtava`-kenttää, KOHTEET-taulukkolisäykset tuoreelta origin/main:lta,
checkout-haaraa ei mergata `--delete-branch`-lipulla).

**Uusi tässä vuorossa (kohta 10, opetukset):** kun docs-testi vaatii
Raamatun kartta-rivin eikä sitä voi itse lisätä, ilmoita Fablelle
tarkka rivi valmiiksi kirjoitettuna PR:n kuvauksessa JA viestissä —
Fable niputtaa sen omaan Raamattu-PR:äänsä, oma PR suljetaan.

## 7. Julkaisukaava

```
git fetch origin main
git checkout -B <haara> origin/main
# ... sisältömuutokset ...
node --test tests/*.test.mjs   # LUE "# pass"/"# fail" -rivit
node tools/tarkista-kaksoisavaimet.mjs
git add -A && git commit -m "..."
git push -u origin <haara>
gh pr create --title "..." --body "..."
```

Docs-only-muutoksille (kohta 4.1, 4.2 ovat molemmat docs+tools-only)
`node tools/uusi-versio.mjs` ja `node tools/build-standalone.mjs`
EIVÄT ole tarpeen (docs/roolitus.md "Julkaisusäännöt" kohta 4).

## 8. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri` (Mac
  Studio, jaettu alue `/Users/Shared/Claude/`).
- Taustalla käynnissä 1 agentti (kohta 4.2, agentId
  `a6bf7fa6a5172d3f7`) — EI oma worktree, jakaa tämän checkoutin.
- Ei uusia avaimia, ei muutoksia rutiineihin tai ajastuksiin.

## 9. Avoimet velat ja opetukset

**Velat:**
1. **`js/packs/hintatasot.js` puuttuu kokonaan** — talous-suunnitelma
   (`docs/raportit/talous-suunnitelma-20260927.md` kohta 2) tarvitsee
   hintatason (edullinen 0,6 / keski 1,0 / kallis 1,6) n. 200 maalle
   päiväkulujen laskentaan. Tarkennus seuraavalle sessiolle: pelissä
   on jo 7 kaupungille käsin arvioitu "Hinnat"-tähtiluokitus
   matkaoppaassa (ks. `js/packs/nahtavyysjutut.js` tai
   matkaopas-lehden hintasivut — tarkista tarkka sijainti, en ehtinyt
   paikantaa tätä vuoroa) — nämä 7 kelpaavat kalibrointipisteiksi,
   ja loput n. 193 maata voi luokitella karkeasti tunnetun
   elinkustannustason mukaan (esim. World Bankin PPP-vertailu tai
   vastaava avoin lähde) ilman tarkkaa per-kaupunki-tutkimusta —
   kolme tasoa riittää, ei tarvita hienojakoisempaa asteikkoa. Tämä
   on aloittamaton, vain kirjattu tähän Fablen pyynnöstä.
2. Ei muita numeroituja velkoja.

**Opetukset:**
1. Subagentti (Agent-työkalu `run_in_background: true`) jakaa
   pääsession työtilan/checkoutin **oletuksena** — se ei automaattisesti
   tee omaa worktreeta vaikka tehtävänannossa pyytäisi. Jos agentin
   pitää varmasti työskennellä eristetysti, käytä `isolation: "worktree"`
   -parametria Agent-kutsussa alusta asti sen sijaan että luotat
   agentin noudattavan tekstimuotoista ohjetta tehdä oma haara.
2. Kun docs-testi (`tests/dokumentit.test.mjs`) vaatii Raamatun
   kartta-rivin eikä sitä itse voi lisätä (vain Fable kirjoittaa
   Raamattuun): tarjoa valmis rivi PR:n kuvauksessa ja viestissä
   Fablelle heti — säästää yhden PR-kierroksen (ks. kohta 6).

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
ENSIN: tarkista onko agentti a6bf7fa6a5172d3f7 (nähtävyyskuvien
tyylitarkastus) yhä käynnissä (ListAgents) ennen mitään
git checkout/reset/clean -komentoa nykyisellä haaralla
sisalto-pelikatalogi-20260927 — se jakaa työtilan tämän agentin kanssa.
Ensimmäinen komento (kun turvallista): git fetch origin && git checkout -B
sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main (checkout-haaraa ei koskaan
mergetä; erät worktreissä tools/uusi-worktree.sh:lla — TAI jos jatkat
suoraan kesken olevaa docs/pelikatalogi.md-työtilaa, tee se ennen
haaranvaihtoa, ks. raportin kohta 4.1).
Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-e.md KOKONAAN.

TILA lyhyesti: main = v2313. Pelikatalogi (docs/pelikatalogi.md)
mainissa. Kaksi kesken-tehtävää raportin kohdassa 4: 4.1
pelisuunnitelmakortit valmiina paikallisessa työtilassa, tarvitsee vain
commit+push+PR; 4.2 nähtävyyskuvien tyylitarkastus käynnissä
taustalla agentilla a6bf7fa6a5172d3f7 — tarkista tila ensin.

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista agentin a6bf7fa6a5172d3f7 tila (ListAgents/SendMessage).
2. Jos työtila on vapaa: commitoi ja pushaa docs/pelikatalogi.md:n
   pelisuunnitelmakortit (kohta 4.1), avaa PR Julkaisijan junaan.
3. Kun agentti 4.2 valmistuu: tarkista sen PR, rivi Fablelle.
4. Uusi tehtävä hintatasot.js:stä (kohta 9, velka 1) odottaa —
   kysy Fablelta ennen aloitusta onko se seuraava prioriteetti.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan; käytä isolation:"worktree"
  jos agentin pitää työskennellä erillään jaetusta checkoutista.
- Älä mergaa checkout-haaraa (sisalto-tyo-<pvm>-<aika>) äläkä poista
  sitä --delete-branch-lipulla — se on session checkout, ei työhaara.
```

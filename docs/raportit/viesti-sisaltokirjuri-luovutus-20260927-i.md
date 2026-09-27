# Luovutus: Sisältökirjuri 27.9.2026 klo ~19.0x

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-h.md`. Ei
kontekstinnollaus — tämä on tavallinen jononpäivitys jononkohtien 1–2
valmistuttua, kirjoitettu ennen erä 7:n aloitusta ajan säästämiseksi
seuraajalle.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. `docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-h.md` (edellinen,
   taustat kohtiin 1–2 alla)
4. Tämä raportti

## 2. Valmistunut tässä sessiossa

**Kohta 1 (Codex-tyyliuudistus, Ateena, PR #3428):** tarkistettu ja
HYVÄKSYTTY. Kuittaus lähetetty postilaatikkoon
(`posti/sisaltokirjuri-kuittaus-ateena-tyyliuudistus-20260927.md`) ja
suositus Fablelle (peer-viestillä). 4 ei-paikka-kuvaa (diogeneen-astia,
elginin-marmorit, maratonhuijaus, louis-1896) päätetty pitää
ennallaan — ne ovat tapahtuma/esine/henkilökuvia, isometrinen
rakennustyyli ei sovi niihin, ja Elginin marmorien sijaintiharha on jo
hoidettu tekstissä. Ei jatkotoimia.

**Kohta 2 (Siirtosepän #3434-löydökset):**
- **Luxemburg "0 nähtävyysjuttua" oli vanhentunut mittari**, EI bugi:
  numeroympyrat-kaupungit (Bryssel, Košice, Bergen, Ljubljana,
  Luxemburg) kantavat oman `teksti`-kentän suoraan
  `maakartat.js`:n `kohteet`-taulukossa, eikä NAHTAVYYSJUTUT ole
  niille pakollinen (js/nahtavyydet.js: `avattava = Boolean(k.teksti
  || k.wiki)`, ja `k` perii `raaka.teksti`:n kun juttua ei ole).
  Siirtoseppä poisti tämän nähtävyyslaskennan eheysvartijasta (#3441).
- **7 TIFF-kuvaa korjattu JPG:ksi**, PR **#3444** (haara
  `sisaltokirjuri-eheys-korjaus`), testit 4467/4485 vihreät, CI:ssä
  tämän raportin kirjoitushetkellä. Yksityiskohdat PR:n kuvauksessa.
- **23 rikkinäistä "kohtaamiset"-miniatyyriä** (kohtaamiset/miniatyyrit/
  *.png, js/packs/miniatyyrit.js) on kuvaputken/Codexin
  generointijonoa — EI Sisältökirjurin korjattavissa (kuvia ei ole
  vielä generoitu). Täysi 23 kohteen lista Siirtosepän peer-viestissä
  tämän session transkriptissä, tai pyydä uudelleen. Välitetty
  Fablelle kuvaputkijonoon.
- **7 pientä (<400 px) kuvaa + Nouméan/Antikytheran kuvat**: EI
  käsitelty tässä sessiossa (aikabudjetti meni TIFF-korjaukseen).
  Jää jonoon. Nouméa odottaa "VAIN EUROOPPA" -rajauksen päättymistä;
  Antikythera on Eurooppaa mutta ei kiireellinen (ei riko testejä).

## 3. Eurooppa-erä 7: MITTARI AJETTU, KIRJOITUS KESKEN

Käytin approksimoitua kolmiosaista mittaria (`aiheet
[KULTTUURI_KATEGORIAT-alkioiden lkm] + jutut [NAHTAVYYSJUTUT] +
kohteet [KAUPUNKIKARTAT.kohteet]`, EI täyttä 4-osaista alkuperäistä
kaavaa, koska sitä ei ole tallennettu tiedostona — ks. luovutus
-g.md kohta 3). Skripti scratchpadissa tämän session polulla, tai
kirjoita uudestaan samalla logiikalla (tuo `EUROPE.cities` europe.js:stä
kaupunkilistaksi, muuten sama kuin -g.md:n kaava).

**DONE-lista nyt 30 kaupunkia** (ks. lista skriptissä/luovutus-h.md).
**5 ohuinta jäljellä (erä 7):**

| Kaupunki | ISO | Nykyiset lehtiaiheet | Puuttuva aihe (MAA_KATEGORIAT-ehdokas) |
|---|---|---|---|
| bryssel | BEL | kaupunki, historia, rakennukset, ruoka | **luonto** tai **keksinnot** (molemmat MAA_KATEGORIAT[BEL]:ssä, ei vielä lehdellä) |
| kosice | SVK | kaupunki, historia, rakennukset | **ruoka** tai **luonto** tai **keksinnot** |
| bergen | NOR | kaupunki, historia, musiikki | **luonto** tai **arki** |
| ljubljana | SVN | kaupunki, historia, rakennukset, ruoka | **luonto** tai **tiede** |
| dublin | IRL | kaupunki, tiede, historia | **luonto**, **kasityo**, **urheilu** tai **musiikki** |

Kaikki viisi ovat **numeroympyrat: true** -kaupunkeja (ei miniatyyrejä,
kohteet-kentässä oma teksti). Tämä TARKOITTAA: uutta lehtiaihetta
kirjoittaessa ei tarvitse huolehtia NAHTAVYYSJUTUT-päällekkäisyydestä
samalla tavalla kuin miniatyyrikaupungeissa — mutta **PAKOLLINEN
ristiintarkistus koskee silti MAA_KATEGORIAT[ISO]:a** (älä toista
samaa aihetta maalehdellä) ja **kaupungin omia `kohteet`-kuvauksia**
maakartat.js:ssä (esim. Brysselin luonto-aihe ei saa toistaa jo
Mont des Artsin puiston kuvausta).

**MAA_KATEGORIAT[ISO]:n valmiit nostot** on jo listattu yllä olevassa
taulukossa viittaamassani skriptin tulosteessa (tämän session
transkriptissä) — aiheiden otsikot ovat jo olemassa MAA-tasolla,
joten uuden lehtiaiheen kirjoitus on ADAPTOINTIA kaupunkikohtaiseksi
(sama malli kuin aiemmissa erissä 1–6), ei tyhjästä keksimistä.

**Skandaalikiintiö**: BEL/SVK/NOR/SVN/IRL — tarkista
`SKANDAALIT[iso]?.length` ennen kuin lisäät skandaalia (todennäköisesti
ei tarvetta, koska tehtävä on lehtiaihe eikä skandaali).

**Seuraavan session ensimmäinen komento:**
```bash
./tools/uusi-worktree.sh sisaltokirjuri euroopan-era7
```
Kirjoita yksi uusi KULTTUURI_KATEGORIAT-aihe kullekin viidelle
kaupungille, MAA_KATEGORIAT[ISO]:n vastaavasta teemasta adaptoiden
(uudet kuvat + tekstit, EI kopioi MAA-tason tekstiä sanatarkasti — se
on maalle, tämä on kaupungille, sama periaate kuin aiemmissa erissä).

## 4. Sitovat käytännöt (ei muutoksia)

- JUMI → FABLE, VIESTIRAJA ~10/vuoro, kohderyhmä 13+, agentit
  Sonnet/Opus enintään 3–4 rinnan.
- VAIN EUROOPPA on maantieteellinen (Nouméa ei kuulu piiriin).
- Main liikkuu nopeasti: fetch+rebase juuri ennen pushia.
- Älä mergaa checkout-haaraa `sisalto-pelikatalogi-20260927`.

## 5. Työtilat tämän session lopussa

- `/Users/Shared/Claude/Matkakirja-sisaltokirjuri` (checkout,
  `sisalto-pelikatalogi-20260927`) — tämä raportti committoidaan
  tähän.
- `/Users/Shared/Claude/wt/sisaltokirjuri-eheys-korjaus` — PR #3444
  auki, poista `tools/uusi-worktree.sh --poista` kun mergetty.
- Levyhälytyksen vuoksi (Fablen pyyntö) poistettiin 7 muuta
  wt/sisaltokirjuri-* worktreeta tässä sessiossa (kaikki olivat
  mergettyjä tai pushattu+PR auki) — ei tarvitse enää huomioida.

# Luovutus: Sisältökirjuri — 25.9.2026 klo 12.2x (tilinvaihto, omistaja pysäytti)

Edellinen luovutus: `docs/raportit/viesti-sisaltokirjuri-luovutus-20260925.md`. Tämä vuoro:
renessanssisali-teosluettelo, galleria 59:n gap-analyysi + täydennystilaus, koko
Turistiopas-paketin käynnistys (docs/tyolista-opukselle.md vanhentunut → uusi paketti),
kaksi erää valmiiksi + kolmas kesken, ja PR #2991:n CI-korjaus. Omistaja pysäytti kaikki
sessiot klo 12.1x tilinvaihtoa varten — **älä kutsu clear_session, uusi Fable lähettää
aloitusviestin.**

## 1. Lue ensin

1. `CLAUDE.md`, Raamatun "TYÖTAPA JA SESSIOT", JUMI → FABLE
2. Tämä raportti kokonaan
3. `docs/tyolista-opukselle.md` — uusi Turistioppaat-paketti (kirjoitin tänään, O6-O9
   merkitty vanhentuneeksi samalla)

## 2. Renessanssisalin teosluettelo — VALMIS

PR #3144 mergetty junassa #3149 (v2216). Linssisepän kaksi pyytämää korjausta tehty ennen
mergeä: Leonardon muotokuva vaihdettu Rijksmuseumiin (Trenton kunnankirjaston tilalle,
päätös 1:n mukaisesti), Pietàn R2-polkuun lisätty puuttunut `matkakirja/`-etuliite. Ei
avoimia asioita.

## 3. Galleria 59 -integraatio — PR #3147, valmis mergeen

36/38 Codexin toimittamaa kuvaa integroitu 31 kaupunkiin (2, Churchill+Murzuk, olivat jo
pelissä samalla tiedostolla). Gap-analyysi löysi 2 kokonaan puuttunutta kaupunkia
(Robinson Crusoe, Puerto Montt) — lähetin täydennystilauksen Codexille postilaatikkoon,
**Codex toimitti ja kytki ne itse suoraan PR #3147:n haaraan** (commit `1b8e4090f`,
"Lisää Robinson Crusoen ja Puerto Monttin teosgalleriat"). Verifioin: syntaksi OK, kuvat
elossa R2:ssa (HTTP 200), GitHub CI (testit+reitti) vihreä. **PR on valmis mergeen**,
Fablelle/Julkaisijalle ei jäänyt tehtävää tämän osalta.

## 4. #2991 Julisteet: Bergen ja Sevilla — CI korjattu, valmis mergeen

Kuvaputki löysi juurisyyn: Bergenin ja Sevillan julistekuvat olivat olleet R2:ssa jo
23.9.2026 — CI:n punainen johtui `tools/vienti/kuvamitat.json`:sta puuttuvasta
`kuva.leveys`-tiedosta, ei puuttuvasta kuvasta. Lisäsin molemmille `[1024,1536]`-mitan
(sama koko kuin muilla julisteilla, vahvistettu kuvaputken R2-todennuksesta), commit
`0ac29c755` haarassa `sisalto-tyo-20260923`. **CI vihreä nyt** (testit+reitti PASS,
savukkeet-mac pending mutta ei mergeblokkeri). Ilmoitin Julkaisijalle, että pidon voi
purkaa. Ei avoimia asioita — paitsi Julkaisijan oma mergepäätös.

## 5. Turistiopas-paketti (UUSI, Fablen tilaus 25.9.2026 klo ~10.4x)

**Tausta:** docs/tyolista-opukselle.md oli vanhentunut (O6/O7/O8/O9 olivat jo täysin
toteutettuja koodissa) — kirjasin sen ja lisäsin uuden paketin. Fable hyväksyi: ota
docs/raportit/sisalto-inventaario-20260924.md:n "Turistiopas (`matkailijalle:`)" 0/71
-listasta 3 kaupungin eriä, sama kaava kuin Lontoon/Pariisin opas
(`kuva`+`kappale`+`artikkeli.jaksot`, ensimmäisessä 3 kuvan karuselli, Commons-todennus
jokaiselle kuvalle). **Vain 30 oikeaa kaupunkia/taajamaa** (ei alueita — sama rajaus kuin
kohdekartassa), lista on `docs/tyolista-opukselle.md`:ssä. **Jatka erää toisensa jälkeen
ilman erillistä lupaa**, kunnes 30 kaupungin lista on täynnä tai Fable/omistaja käskee
toisin.

**Työmalli:** kolme rinnakkaista Opus-agenttia (isolation: worktree) per erä, jokainen
tutkii Wikipedian/Wikivoyagen, kirjoittaa 5 jaksoa (ei toista olemassa olevia
nostoja/gallerioita), etsii+todentaa 8 Commons-kuvaa (lisenssi PD/CC, ei NC/ND, sisältö
vastaa selitettä), committaa YHDEN commitin omaan worktreehensä, EI pushaa. Pääsessio
cherry-pickaa kaikki 3 commitia uuteen `sisaltokirjuri-turistiopas-eraN`-haaraan
(`origin/main`:sta, ei edellisen erän päälle — erät ovat itsenäisiä PR:iä), ajaa
`node --check` + `tests/lisenssit.test.mjs` + `tests/kuvatekstit.test.mjs` +
`tests/sisaltopaketti.test.mjs`, pushaa, avaa PR:n, siivoaa worktreet
(`git worktree remove .claude/worktrees/agent-<id> --force` +
`git branch -D worktree-agent-<id>`).

**Valmis:**
- **Erä 1 — PR #3148** (Managua, San Juan, Nouméa): testit 70/70 vihreä, PR:ssä.
- **Erä 2 — PR #3150** (São Luís, Ouro Preto, Cayenne): testit 70/70 vihreä, PR:ssä.

**KESKEN — Erä 3** (Bermuda, Sitka, Coober Pedy): kolme agenttia käynnissä.
- Ensimmäinen ajo epäonnistui koneen uudelleenkäynnistykseen (ECONNREFUSED/ENOTFOUND,
  ei sisältövirhe) — käynnistin ne uudelleen juuri ennen omistajan pysäytystä.
- Agent-id:t: `a067fa3ee0278bb57` (Bermuda), `ae96f9bcc4880db7e` (Sitka),
  `a16bd8216df9030b8` (Coober Pedy). `ListAgents` näytti kaikki "running" pysäytyshetkellä,
  **ei yhtään committia vielä** (worktreet olivat vielä `origin/main`:n tasalla).
- Worktreet: `/Users/Shared/Claude/Matkakirja-fable/.claude/worktrees/agent-<id>`.
- **Uusi sessio: tarkista ensin `ListAgents`** — jos agentit yhä elossa/valmiit,
  `SendMessage` niiden id:llä jatkaa/hakee tuloksen; jos ne ovat kadonneet
  (uudelleenkäynnistys saattoi tappaa nekin), käynnistä 3 uutta samalla kaavalla
  (promptit tässä raportissa liitteenä kohdassa 5b, tai kopioi edellisten erien
  promptirakenne — kaupunkikohtaiset nostot pitää lukea tuoreena tiedostosta ennen
  promptin kirjoittamista, koska rivinumerot ovat siirtyneet).
- `docs/tyolista-opukselle.md`:n Turistioppaat-paketin tila-rivi kannattaa päivittää kun
  erä 3 on PR:ssä.
- Haara `sisaltokirjuri-turistiopas-era3` on paikallinen, tyhjä (vain `origin/main`:n
  tasalla) — ei pushattu, koska ei sisältöä. Voi käyttää sellaisenaan kun agentit
  valmistuvat, tai luoda uuden.

**Valittu 30 kaupungin lista** (kaupunki/taajama, ei aluetta — ks.
sisalto-inventaario-20260924.md kohta 3): managua✅ noumea✅ puertomontt sanjuan✅ saoluis✅
ouropreto✅ bermuda🟡 norfolk churchill gao cayenne✅ broome santarem geraldton joaopessoa
murzuk alkufra campogrande exmouth macapa birdsville cooberpedy🟡 kalgoorlie mountisa nome
portovelho kimberley sitka🟡 falkland sthelena (✅=PR:ssä, 🟡=erä 3 kesken, loput 21
tekemättä).

### 5b. Agenttiprompti-runko (kopioi tarvittaessa uudelleenkäynnistykseen)

Jokainen kaupunkikohtainen prompti on rakenteeltaan sama, vain kaupunki + sen olemassa
olevat nostot-otsikot (duplikaattien välttämiseksi) + 5 ehdotettua uutta aihetta
vaihtuvat. Katso `sisaltokirjuri-turistiopas-era3`-haaran tehtävän luontihistoriasta
(tämän session transkriptista, jos saatavilla) täydet promptit Bermudalle, Sitkalle ja
Coober Pedylle — ne sisältävät tarkat rivinumerot ja lainaukset olemassa olevasta
sisällöstä. Jos transkripti ei ole saatavilla, runko on:

1. Lue kohdekaupungin `id: 'kaupunki'`-lohko (nimi, johdanto, nostot) + mahdollinen
   toinen kategoria kokonaan `js/packs/kulttuuri-kategoriat.js`:stä — vältä toistamasta
   niiden aiheita.
2. Lue Lontoon `matkailijalle`-malli (`nimi: 'Lontoo'`, rivi ~60) skeemaksi.
3. Ehdota 5 UUTTA, nykyaikaista matkailunäkökulmaa (liikkuminen, ruoka, kulttuuri,
   luonto/päiväretki) jotka eivät toista nostoja.
4. Tutki Wikipedia+Wikivoyage, kirjoita suomeksi itse, faktat tarkistettavissa.
5. 8 Commons-kuvaa (3 karusellissa + 4 jaksoissa + 1 hero), lisenssi+sisältö tarkistettu,
   ei jo käytettyjä tiedostonimiä.
6. Lisää `matkailijalle`-kenttä kaupungin `kaupunki`-kategoriaan, `node --check`, testit,
   yksi commit ("Turistiopas: <Kaupunki>"), EI pushia.

## 6. Ympäristö ja opit tältä vuorolta

- **Koneen uudelleenkäynnistys klo ~11.3x**: kaikki sessiot ja taustatehtävät
  keskeytyivät hetkeksi (API-yhteysvirheet), palautuivat itsestään verkon palattua.
  Scratchpad-kansio tyhjeni restartissa — väliaikaiset tiedostot (esim. gap-analyysin
  JSON-koosteet) katosivat, mutta pushatut git-committit ja PR:t säilyivät ehjinä.
- **kuvamitat.json-korjaus**: älä aja `tools/vienti/kuvamitat.mjs --paivita` täyttä
  ajoa pienen puutteen korjaamiseksi (hakee JOKAISEN pelin kuvan verkosta, hidasta) —
  lisää tunnetut mitat suoraan JSON:iin käsin kun ne ovat jo varmistettu (esim. kuvaputken
  raportista).
- **Duplikaattitarkistus ennen galleria-lisäystä**: tarkista AINA `grep` kohdetiedosto
  koko `kulttuuri-kategoriat.js`:stä ennen uuden galleria-kuvan lisäämistä — kaksi
  Codexin toimittamaa kuvaa (Churchill, Murzuk) olivat jo pelissä, eri tilauskierroksen
  kautta.
- **Levynkäyttö**: symlinkkaa node_modules jokaiseen uuteen worktreehen
  (`ln -s /Users/Shared/Claude/Matkakirja-sisaltokirjuri/node_modules <worktree>/node_modules`),
  älä `npm ci`.
- **SendMessage/mcp-viestiraja** ~10/vuoro, varakanava
  `mcp__ccd_session_mgmt__send_message`.

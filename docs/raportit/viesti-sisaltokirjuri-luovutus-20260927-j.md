# Luovutus: Sisältökirjuri 27.9.2026 klo ~23.4x (konteksti 72 %)

Fable käski nollauksen ROU-erän jälkeen. Tämä raportti + aloitusviesti
korvaavat aiemmat -i-luovutuksen ohjeet (se ohjelma on nyt valmis).

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan

## 2. TÄRKEIN OPPI TÄLLE SESSIOLLE: pitkä-tekstien ääni

Fable korjasi: `js/packs/maakunnat-luonnehdinnat.js`:n otsake sanoo
`pitka`-kentän olevan **Livian äänellä, nykyaikaan** — maisema, ihmiset,
yksi tarina tai erikoisuus, **"1873-kytkös JOS SELLAINEN LÖYTYY"** (ei
pakollinen, ei koko tekstin runkona). Kirjoitin ensin CZE/HRV/ROU:lle
tekstit, joissa JOKAINEN virke kiertyi "isoisän 1873 matkan aikaan..."
-kehyksen ympärille — väärä tulkinta. Korjasin ROU:n (PR #3514,
committi `f89eef226`) uudelleen: pääpaino alueen nykytilassa, historia/
1873-tausta mainittuna lyhyesti VAIN kun se on alueen identiteetin
kannalta ydinasia (esim. Transilvanian läänien Unkari-tausta — se on
edelleen ajankohtainen, näkyy kielessä ja kulttuurissa nykyään, ei
vain isoisän ajan kuriositeetti).

**AVOIN KORJAUSTARVE**: CZE (14 aluetta) ja HRV (20 aluetta) ovat
MERGETTY mainiin (#3510) samalla väärällä isoisä-runko-tyylillä. Fable
ei erikseen käskenyt korjaamaan niitä tässä vuorossa, mutta sama virhe
on niissä — kysy Fablelta halutaanko korjauskierros myös näihin, tai
tee se oma-aloitteisesti samalla menetelmällä kuin ROU:n korjaus
(ks. tools/-kansiossa ei ole valmista skriptiä; ROU:n korjaus tehtiin
kertakäyttöisellä Node-skriptillä scratchpadissa, ei committoitu).

**UUSILLE MAILLE (UKR ja eteenpäin)**: kirjoita pitkä-tekstit SUORAAN
oikealla äänellä alusta asti — älä toista tätä virhettä. Malliesimerkki
oikeasta tyylistä: `js/packs/maakunnat-luonnehdinnat.js`, FRA/"Grand Est"
(rivi ~52): pääosin nykyaikaa, yksi virke 1873/isoisä-kytköksestä
keskellä tekstiä, ei koko rungon perusteena.

## 3. UKR kesken — kaksi agenttia käynnissä (KESKENERÄISET, VÄÄRÄLLÄ TYYLILLÄ)

Ennen kuin sain Fablen korjauksen, ehdin käynnistää UKR:lle (25 aluetta)
kaksi tutkimusagenttia VANHALLA (väärällä isoisä-runko) ohjeistuksella:

- Batch 1 (13 aluetta: Cherkasy, Chernihiv, Chernivtsi, Dnipropetrovs'k,
  Donets'k, Ivano-Frankivs'k, Kharkiv, Kherson, Khmel'nyts'kyy, Kiev,
  Kiev City, Kirovohrad, L'viv) — agentId `ae4089f82cab05b80`.
- Batch 2 (12 aluetta: Luhans'k, Mykolayiv, Odessa, Poltava, Rivne,
  Sumy, Ternopil', Transcarpathia, Vinnytsya, Volyn, Zaporizhzhya,
  Zhytomyr) — agentId `a3f6b314bc1d4b025`.

Kokeile `SendMessage` näihin agentId:hin — ne saattavat olla yhä elossa
ja niiden raportit tulevat `docs/raportit/sisaltokirjuri-ukr-pitka-pulu-
batch{1,2}-20260927.md`. **KUN SOVELLAT NIIDEN PITKÄ-TEKSTEJÄ:
kirjoita ne UUDELLEEN oikealla Livia-nykyaika-äänellä** samalla tavalla
kuin ROU:n korjauksessa — älä liitä agenttien pitkä-tekstejä suoraan,
koska niiden ohjeistus pyysi väärää (isoisä-runko) tyyliä. Pulu-osiot
(present-day-triviaa) ovat sen sijaan oikeansuuntaisia sellaisenaan,
koska niissä ei koskaan ollutkaan isoisä-kehystä.

Jos agentit eivät vastaa (istunto katkesi nollauksessa), käynnistä
UKR:lle uudet 1-2 agenttia UUDELLA, korjatulla ohjeistuksella (Livia-
nykyaika, 1873 vain jos ydinasia). 1873 poliittinen tausta UKR:lle:
Chernivtsi (Bukovina) = Itävalta, L'viv/Ivano-Frankivs'k/Ternopil'
(Galitsia) = Itävalta-Unkari, Transcarpathia = Unkarin kuningaskunta —
loput 20 aluetta olivat Venäjän keisarikuntaa. Tämä tausta on yhä
mainitsemisen arvoinen (näkyy kielessä/kulttuurissa nykyään), mutta
YHTENÄ virkkeenä, ei koko tekstin runkona.

Worktree valmiina: `/Users/Shared/Claude/wt/sisaltokirjuri-ukr-pitka-pulu`.

## 4. Valmis ja mergetty tähän mennessä

- **Maakunta-pulu**: NLD, CHE, CZE, HUN, PRT, SWE, NOR, DNK, FIN, IRL,
  BEL, HRV — kaikki mergetty mainiin (#3510). CZE+HRV saivat myös
  pitkä-luonnehdinnan (VÄÄRÄLLÄ TYYLILLÄ, ks. kohta 2).
- **Faktatarkistus**: Pariisi/Lontoo/Rooma/Berliini (erä 1), Wien/
  Madrid/Ateena (erä 2), Istanbul (erä 3, kuusi tutkimusagenttia, 8
  korjausta) — kaikki mergetty mainiin (#3473 → #3510, #3511).
  **HUOM RISTIRIITA**: Fable mainitsi viestissä "faktatarkistus jatkuu,
  seuraavaksi Wien, Madrid, Ateena" — mutta raportti
  `docs/raportit/sisaltokirjuri-faktatarkistus-eurooppa-20260927.md`
  sanoo ne jo valmiiksi tarkistetuiksi (erä 2) ja PR #3511 (Istanbul,
  erä 3) on mergetty. Tarkista Fablelta ennen uudelleentarkistusta —
  todennäköisesti raportin "Seuraava erä" -kohta pitää: Tukholma,
  Bukarest, Pietari, Lissabon, Sofia, Helsinki (agenttien vielä
  tarkistamatonta sisältöä Eurooppa-erissä 7-9).
- **ROU**: kaikki 42 maakuntaa, pitkä (korjattu oikealla tyylillä) +
  pulu. PR #3514, OPEN, ei vielä Julkaisijan junassa. Kohdennetut
  testit vihreitä (maakunnat-pulu, maakunnat-luonnehdinnat, dokumentit,
  lisenssit, karttatyokalu-maakunnat, pallomaakunnat).

## 5. Jono (Fablen käsky, 14 kokonaan puuttuvaa maata)

Järjestys: **UKR** (kesken, ks. kohta 3) → BGR → SRB → BIH → ISL → ALB
→ MKD → MNE → CYP (myös kuva-kenttä puuttuu!) → MLT → LUX → MDA → BLR.
Sitten loput 21 Euroopan maata (vain Pulu, pitkä+kuva jo olemassa).

Menetelmä joka toimi ROU:ssa: 2-3 tutkimusagenttia (Sonnet, WebSearch),
kukin ~12-14 aluetta, raportoi valmiin markdown-tiedostoon (pitkä +
pulu -osiot erikseen, JS-valmiina liitettävänä). **KORJAA OHJEISTUS
agenteille**: pyydä suoraan Livia-nykyaika-ääntä, 1873 vain jos ydinasia
(ei "isoisä olisi nähnyt..." koko runkona). Sovella löydökset Node-
skriptillä (scratchpad), ei käsin 40+ Edit-kutsulla — virhealttiimpaa
ja hitaampaa. Poista maa `tests/maakunnat-pulu.test.mjs`:n ERASSA_1-
joukosta kun pulu on lisätty. Aja kohdennetut testit (yötaukoa ei ole
enää voimassa, mutta koko sarja on hidas ~3-5 min — harkitse
kohdennettuja tiedostoja jos konteksti on kiireinen).

Uusi worktree per maa: `tools/uusi-worktree.sh sisaltokirjuri <maa>-
pitka-pulu`. Poista mergen/PR:n jälkeen `--poista`.

## 6. Sitovat käytännöt (ei muutoksia)

- JUMI → FABLE, VIESTIRAJA ~10/vuoro.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan (nested agentit voivat
  ylittää tämän huomaamatta — ison maan tapauksessa, kuten Istanbul,
  yksi agentti voi itse jakaa työn 3 alaagenttiin; niiden handback-
  viestit tulevat suoraan pääistuntoon, ei ylemmän agentin kautta).
- Kirjaa agenttien löydökset TIEDOSTOON heti.
- Älä mergaa checkout-haaraa `sisalto-pelikatalogi-20260927`.
- VAIN EUROOPPA on maantieteellinen rajaus (UKR/BGR/SRB/BIH/ISL/ALB/
  MKD/MNE/CYP/MLT/LUX/MDA/BLR ovat kaikki Eurooppaa, OK).
- Main liikkuu nopeasti: `git fetch origin main` + rebase juuri ennen
  pushia. `js/muutokset.js`-konfliktit ovat rutiinia (versionumero-
  rivit) — oma rivi ylimmäksi, numero main+1, main.js+sw.js samaan
  lukuun.

# Päätoimittajan luovutus 21.10.2026 klo 00.27 (konteksti 35 %; tämä PT-sessio = "PÄÄTOIMITTAJA (Opus, medium)")

Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu tilin artefakti (osoite nykyinen.json:ssa), paikallinen data
/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo/. Edellinen luovutus -20261020-2330 (kohdat 2–3 osin yhä auki, alla).
VIESTIRAJA: SendMessage täynnä → kaikki viestit mcp__ccd_session_mgmt__send_message session-id:llä.

## 0. HERÄTYKSET JA AJASTIMET (kuolevat nollauksessa → luo uudelleen)
- 21.10. klo 7.47 KK:n herätys (7.39): lue työlistasta vastuu=Keskustelukanava -rivit ja lähetä KK:lle tänään erääntyvät
  (aamun yhteenveto karsinnasta, Codexin toimitusten tarkistus, Pulu v3:n ulkoasu). CronCreate one-shot "47 7 21 10 *".
- Lisäksi herätä KK, kun junan 209 kuvaparit ovat valmiit (rivi 5).

## 1. JUNA 209 (avoin, EI lukitusta/TF:ää ilman omistajan pyyntöä)
- Runko 614177ad8 vihreä (209g) → 70bb1021c (NUI 4bcfd388c ⚙/☰, NUI f270b4a71 frustum, Lavastaja db9e86c3d kävijät datana) testeissä.
- VS c8c269de4 valotyypit rungossa (pelikuva ei muutu).
- Lavastaja 6abf7e4d4 (Louvren kalusteet kirjastosta, sali-v2s): NS ODOTTAA PT:N OK:TA. Ehto: Lavastajan PELIKUVAT (3 kulmaa + Salon
  Carré/Niken jalusta) PT:lle, joissa kirjaston penkit/kaiteet/jalustat näkyvät; JU vie median ensin. Hyvä → "NS: ota 6abf7e4d4".
- Juoksupeli: 209g KK:lle lähetetty (46 s katetun portin alla koko ruutu kattoa → PK korjaa: katon häivytys alueena tai kamera alle,
  b5281dcff kamera lähemmäs seuraavaan simuun). Seuraavat kuvat PT:lle 100 % ennen KK:ta.
- Junarivi Asemataululla päivitetty 00.1x (yhteiset säännöt + läntisen kujan kamera Valmiina).

## 2. YÖSUUNNITELMA (Raamattu 7.46, #5111) – jonot jaettu 00.2x, roolit kuittasivat
PK (209g → kamera lähemmäs/elävämmäksi → taivaanranta → monta ovea → ☰ PelinValikolla → Mac WASD → 34 ms mittaus VS:n kanssa),
VS (raskas kohta jo 9,2 ms → LT vahvistaa; ISS tulivuoret → pimennys → hurrikaani → salamat/tähdenlennot; 3D-maamerkkien arkki),
Lavastaja (portti "ei liikettä" → kirjasto + Amsterdam → 4 Louvren kävijää Codexilta → Kielletyn kaupungin laatat → juoksupelin talot),
LS (Amsterdam Louvre-tasolle → MuseoMaaTestit.LouvrePariteetti → bugit → kivi_hiekka/sora MuseoAskeleet-kytkentä, Äänittäjä −34 LUFS),
NUI (päällekkäiset osat kartoitus → yhdistäminen → juoksupelin ☰ → iPhone vaaka), NS (rungot, iPad-asennus, muistiajo), LT (iso iPad
209-lista + juoksun ms-mittaus), Äänittäjä (22 työtä, 8 valmiina). Valoseppä ja muut: seuraava kysymättä.
- MATKA to 22.10. – ma 26.10. aamu: TEE SUUNNITELMA (4 vrk, kulutus jaksotettu: viikko 21 % 00.27, nollaus ma 26.10. ~9) KK:n
  odottaa-kartoituksen pohjalta (KK:n Sonnet, tulos PT:lle ~00.50). Tallenna scratchpad/paatoimittaja/matka-20261022.md ja kerro KK:lle.

## 3. OMISTAJAN PÄÄTÖKSET TÄNÄ ILTANA (kaikki Raamattuun/pohjiin + lokiin, mergetty)
23.29 KK:n tehtävät yhteiseen työlistaan (#5099, 7.4/7.39; 7 riviä lisätty). 23.32/23.35 kevyt Asemataulu (#5100). 23.48 roolikortit
itsestään (#5106). 23.4x museoiden yhteiset osat (#5101, LS #5102, VS #5103). 23.50 4 Tripo-kävijää (Codex-posti 72505b752 +
korjaus 0fab08301: vain K3 Mollien liikkuu). Pohjat 4/4 läpikäyntikunnossa (#5105 #5107 #5108 #5109; 5.2 yhtenäistetty 7.27:ään:
äänilupa tekstinä). 00.10 Codex 3D -pohja SITOVA, LIIKE tilaukseen, rakennukset/maasto parhaalla tavalla (#5110, 7.15/11.7).
00.03/00.05 museoiden lentävä kamera: VAIN työlistarivi, KK työstää omistajan kanssa, EI toteutusta. 00.19 yösuunnitelma (#5111).

## 4. AUKI PT:LLÄ
- PR:t #5091 #5092 #5095 (konfliktit): Opus-agentti tämän session alla ratkoo ja mergee. JOS agentti katosi nollauksessa: tarkista
  `gh pr view N`, tee sama uudelleen (worktree, merge origin/main, testit, merge). ÄLÄ käytä git stash pop:ia (stash on yhteinen).
- KARSINTA: CLAUDE.md-lista valmis → KK (scratchpad/paatoimittaja/karsinta-claude-md-20261021.md). MEMORY Ydin: 4 ristiriitaa korjattu;
  jäljellä 5 EI RAAMATUSSA -kohtaa ja 4 kaksoiskappaleparia (scratchpad/paatoimittaja/karsinta-memory-ydin-20261021.md) → yhdistä,
  Ydin 45 → ~33. Sitten edellisen luovutuksen SEURAAVAKSI 3) B5/B6 + roolikorttien "Lue aloittaessa" 4) C2 ohjeiden koe 5) C3.
- Äänittäjän lupa-asiat aamun yhteenvetoon KK:lle (tekstinä): tason 2 musiikit (Lyria), 05/06-huudon pidempi otto (venytys avoin),
  aukkolattioiden omat näytteet vain jos haku ei riitä.
- LEVY: 54 Gi, lasku ~0,33 Gi/min; Postivahti mittaa du-kasvun (wt, proto-3d, ~/Library/Developer, Caches, var/folders) ja kertoo.
  Sääntö annettu: app-kopio, jota uudempi runko kuvattu, saa T7:lle 2 h jälkeen; todistuksiin vain kuvat ja lokit.
- Asemataulu pyysi nollausta (luovutus TAULU/hoitaja/luovutus-20261021.md); käsketty nollaamaan itsensä ja luomaan cron A heti.

## 5. OPIT
- Muista äänissä 7.27 (lupa tekstinä, ei kortti). Muisti korjattu.
- Kuvatekstien SHA: rooli merkitsee haaran/rungon SHA:n ensin, käännöspalvelun commit suluissa.
- Ennen tilausta Codexille: liike per malli (7.15).

## 6. LISÄYS 00.4x
- Louvren kalusteet 6abf7e4d4: PT:n OK annettu NS:lle (pelikuvat hyväksytty). Niken jalusta harmaa laatikko → myöhempi Tripo-ehdotus kortilla.
- Portti "ei liikettä" #5112 mergetty. Juoksun GPU iPad 13: 9–12 ms (rivi valmis). PK 00557614b (kamera portin alle) → 209h → PT tarkistaa.
- LS: Amsterdam Louvre-tasolla 28ed4a028 (NS 209), #5114 mergetty. SISÄLTÖKIRJURI PUUTTUU: Alankomaiden 27/64 teokselta puuttuu
  kertojan kohta (kohtazoom) → luo Sisältökirjuri-sessio (Raamattu: puuttuva rooli luodaan, kun pohjan työ vaatii) ja anna tämä työ.
- Levy 74 Gi: PT poisti 11 omaa worktreetä; Postivahti pyysi rooleja poistamaan omansa.

## 7. LISÄYS 00.5x (kova raja 40 %)
- #5091 #5092 #5095 MERGETTY (konfliktit ratkaistu). Asemataululle sanottu "lue ROOLI.md".
- OMISTAJAN PÄÄTÖS 00.40 (KK): T4 video SITOVA; T3 muutoksin (päiväjunan tarkistus kysytään KK:lta, yöllä aina, studiolla iPad-katselu);
  T1 + Raamattu 5.1/5.2: ElevenLabs-lupa vain > 3 % kk-krediiteistä jo hyväksytylle äänelle, uusi henkilö aina luvalla; KAMERA: yksi
  pehmeä kaari kamerajohtajaan (Louvre-testi → museot → uudet oletuksena, vanhat vain luvalla; 2.69 musta välähdys pois); CLAUDE.md
  karsitaan (KK tekee), 6 puuttuvaa kohtaa Raamattuun, 7.45:n CLAUDE.md-osa kumotaan ("aina luvallasi").
  → PT:n Opus-agentti teki haaraa fable-paatokset-0040 (sis. KK:n lisäkorjaukset T4/T2/T3). TARKISTA: `gh pr list --head fable-paatokset-0040
  --state all`. Jos ei mergetty tai puuttuu: tee uudelleen (ohje yllä + KK:n viesti 00.4x). Sitten KK:lle T3/T1-kappaleiden sijainnit
  (KK näyttää omistajalle ennen sitovaksi) ja "CLAUDE.md-muutokset voi tehdä".
- LS: Louvren lentävä kamera yöjonon kärkeen (video pysty+vaaka PT:lle → KK). VS: rakettivideo pelistä yöhön/matkalle.
- KK:n odottaa-kartoitus: scratchpad/keskustelukanava/odottaa-kartoitus-20261021.md; A 13 riviä merkitty valmiiksi työlistaan;
  C 15 omistajalle (KK kysyy: 18.10. tauon purku matkan ajaksi ym.) → MATKASUUNNITELMA to–ma sen jälkeen (kohta 2).
- KK nollautui 00.42.

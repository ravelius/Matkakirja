# Päätoimittajan luovutus 18.10.2026 klo 01.2x (TILINVAIHTO päätilille tehty; konteksti 34 %, oma nollaus muistin pt-oma-nollaus mukaan)

PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (sama id nollauksen jälkeen). KK local_febfd152-516e-488f-b0ae-cb302e725365 (luotu 00.59,
irrotettu). Kaikki id:t /Users/Shared/Claude/osoitekirja.md (päivitetty 01.0x). Asemataulu https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix
(päätilin oma taulu; julkaistu uudelleen 01.1x tools/asemataulu/asemataulu.html:stä; tietokanta: junat v101, tyolista v82,
tehtavat v47, huom v2, viestit v4, elevenlabs v1; mittarit, roolit ja laitteet tulevat hoitajan A-kierrokselta).
Pohja: docs/raportit/viesti-fable-siirtoprompti-20261018.md (kohdat 2–5 ja junan 201 valmistumisjärjestys) ja
docs/raportit/viesti-fable-luovutus-20261018-yo.md.

## 0. Heti
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self. EI jonokierros-cronia (Postivahti herättää).

## 1. Tili (päätili)
- Omistajan PÄÄTILI (sama kuin 10.–12.10.; sen 13 vanhaa 12.10. sessiota tyhjennettiin ja otettiin käyttöön). get_usage 00.58:
  viikko 69 %, nollautuu ma 19.10. klo 09.59 (06.59Z); 5 h 0 %. RAJA 99 % (omistajan kortti KK:ssa 01.03: "99 %, juna 201
  valmiiksi (Suositus)"; päätilin 50 %:n sääntö ei koske tätä vaihtoa) → 99 %:ssa vain rivi omistajalle KK:n kautta. Kerrottu
  Postivahdille 01.2x.
- KOMENTORIVI yhä vanhalla tilillä (`claude auth status`: vvi@vvi.fi, org b408744a; sovellus org f04011ee…) → omistajan toimi
  KK:n kautta: `claude auth login` (docs/tilinvaihto.md kohta 0). Ei vielä välitetty KK:lle.
- docs/tilinvaihto.md:n muu tarkistuslista (omistajan toimet, sallinnat, lisäosat, cronit) KÄYMÄTTÄ → Sonnet-ali-agentti listaa
  puuttuvat (päätili on ollut käytössä 10.–12.10., moni voi olla kunnossa), PT kokoaa omistajan toimet yhdeksi KK-viestiksi.
- ~/.claude/CLAUDE.md nimeää KK:ksi vanhan id:n local_dfa7296a: vain omistajan oma viesti KK:n ikkunassa → KK päivittää
  (kerrottu KK:lle 01.1x). Siihen asti roolit voivat epäillä KK:n OMISTAJAN PÄÄTÖS -rivejä → vahvista tarvittaessa PT:nä.

## 2. Sessiot (kaikki RC päällä, aloitusviestit 01.0x)
- 13 vanhaa sessiota tyhjennettiin send_message-pyynnöllä "clear_session self" (kaikki totelivat, list_events 0), sitten aloitusviesti
  siirtopromptin kohdan 2 mukaan + uudet id:t. Julkaisija ja Linnanrakentaja effort medium; Linssiseppä 2 → "Valoseppä (Opus, high)".
- Uudet: KK (Opus max, irrotettu) ja Asemataulu local_f37c12f3-58f3-4bfe-bfac-dde16ede7e8c (Sonnet low, auto, irrotettu; aloitus
  ASEMATAULU-ROOLI.md + hoitaja/luovutus-20261018-k.md; cronien lupa KK:n OMISTAJAN PÄÄTÖS -rivillä, pyydetty KK:lta 01.0x).
- Postivahti päivitti NOLLAUS.md:hen uudet id:t. PT:n scratchpad/jonokierros-teksti.md ja asemataulu/osoitteet.md päivitetty.

## 3. Juna 201 (ennallaan)
Valmistumisjärjestys siirtopromptin lopusta: L2-käännökset (NUI ratas-201b a45af2f97, LS monalisa-201 916c98c86) → simut JU:lla →
PT täysikokoisena (muisti pt-kuvan-tarkistus-taysikokoisena: myös KK:n lupaamat kehys, zoom ja liike) → KK → NS yhdistää runkoon
21d5712be (+ LS tiivis pyramidi + LR louvre-kehykset-201 3aeac4c8d) → LUKITSE 201 → JU kääntää → TF → rivi KK:lle (kohdekaupungit
kehittäjätilassa omistajan katsottavaksi). Taulun Juna 201 -rivi päivitetty (Mona Lisa + kehykset). PR #4834 mergetty (e53f4ee6d).
Avoin #4837 = Valosepän tyylikirja-PR (PYSÄYTYSKUVA-pohja).

## 4. Opit
- Asemataulun HTML:n luku (820 riviä + diff) vei noin 60 k tokenia → seuraavalla kerralla Sonnet-ali-agentille.
- `cd` Bash-komennossa vaihtaa sovelluksen työhakemiston → käytä absoluuttisia polkuja.

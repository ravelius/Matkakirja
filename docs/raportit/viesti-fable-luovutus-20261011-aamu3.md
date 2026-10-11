# Päätoimittajan luovutus 11.10.2026 klo 10.3x (oma nollaus 61–65 %, omistaja HEREILLÄ iPadilla/läppärillä)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Edellinen: viesti-fable-luovutus-20261011-aamu2.md. Muisti: fable-tila-20261011-aamu3.
Työjonot: scratchpad/tyojonot.md (Päivitetty-rivit 09.2x→; muokkaus VAIN python3 <scratchpad>/tyojonot-lisaa.py "rivi" -tyyppisellä tmp+os.replace-skriptillä;
nollauksen jälkeen kirjoita skripti uudelleen session scratchpadiin: lisää rivi ennen ensimmäistä "Päivitetty"-riviä, tarkista ≥ 600 riviä, os.replace, kopio tyojonot.varakopio.md).
Cron: luo JONOKIERROS (7,27,47) tekstillä "lue ja toteuta scratchpad/jonokierros-teksti.md kohdat 0–10" (tiedosto on ajan tasalla).

## 0. ENSIMMÄISENÄ
1) OMISTAJA KESKEN: vaihtaa Claude Consolen krediittiorganisaation (Institute of Visual Com…, Credits 100 $) uuden API-avaimen
   GitHub-salaisuuteen ANTHROPIC_API_KEY (1. yritys "Failed to update secret" → ohjeistettu: lataa uudelleen / poista + New repository secret).
   Kun omistaja sanoo "avain vaihdettu" → Julkaisijalle: aja pollo-julkaisu.yml + savuke-pollo.yml → rivi → omistajalle lyhyt kuittaus.
   ÄLÄ pyydä avainta chattiin. ANTHROPIC_ADMIN_KEY jää vanhaan organisaatioon (kustannusseuranta), ei kiireellinen.
2) DOCS-PR (worktree origin/mainista, tools/uusi-worktree.sh fable loki-20261011-paiva): kirjattavat-20261006.md rivit 1185 → loppuun lokiin
   (tools/raamattu-kirjaa.mjs) + RAAMATTUUN: ULKOINEN TESTFLIGHT AUKI 181:stä + testaajien oma linkki + raati Postivahdille (LIVE-TEKOÄLY-kohdan
   "ulkoiseen ryhmään ei viedä uusia buildeja" pois), TAIDEMUSEO valaistus katosta 30° + salin himmennys + seinän toisto, ASEMATAULU Sinulle-osio
   (talo/viestit) + Raati/Testaajat-laatat, AVAIMET: Claude-API Console-krediiteillä, TOINEN KÄÄNNÖSLINJA (jos käytössä), ÄÄNISIVUN VALINNAT.
   Lisäksi tools/asemataulu/asemataulu.html ← scratchpad/talon-tila.html (Sinulle-osio). Julkaisija mergeää.
3) ASEMATAULU: avaa omistajalle (Artifact open) vain jos hän pyytää; lisää jokainen omistajalle toimitettu ohje/linkki talo/viestit-dokumenttiin
   (rivit [{otsikko, aika, teksti}], uusin ensin) — omistajan toive 10.3x.

## 1. JUNA 181 → TF
- TF 181 käynnissä (Julkaisija 38121309251, BUILD a93ce987f, runko dc89bb5d6, muutosloki kuitattu). Ketju: sisäinen → Arvioijat + Beta-testaajat → beta-arvio.
- Omistajalle: rivi kun TF 181 on TestFlightissa ja kun Apple hyväksyy beta-arvion (testaajat saavat 181:n). Mac 181 Natiivisepällä.
- KS #4380 pidossa TF 181:een → Julkaisija mergeää TF:n jälkeen; Karttaseppä natiivikuva alkulennosta TF 181:n jälkeen.

## 2. OLAVINLINNA (C-portti; omistajalle vasta kun menee läpi)
- NOPEUTUS (omistajan kysymys 09.2x): olavinlinna-vahti kääntää automaattisesti (lokit/olavinlinna-uusin); Siirtosepän aloituskohdat
  (poikki seikkailu aloitus <kohta>) + botti-osat (portti). Botti 6d5756c0: 7/17 LÄPI (laituri, porttikäytävä, sisäpihat, muuriportaat,
  ampumakäytävä, tyrmä, paluu) → Laitetestaaja testaa nämä aloituskohdista; 10 EI LÄPI (jumit) → Siirtoseppä korjaa; v47h 460b16093 vahtiin.
- LR: v47i (keittiö B: vanha dioraamakeittiö pois, g102 ulkopinnat leivottu) → Siirtoseppä kiinnittää; v47j kappelin ampumakäytävän porras ≤ 0,2 m.
- NUI linnan tekstit (omistaja 09.3x): bee15e645 + ca3482688 → lopullinen arkki → PT katsoo → omistajalle. Jatketaanko jää paperikortiksi.

## 3. MUUT
- TAIDEMUSEO: LS2 f65696cea (teos ~95 %, seinän toisto 3× + aniso, valo katosta 30°, salin himmennys) odottaa käännöstä → ennen/jälkeen
  iPhone + iPad → PT katsoo → omistajalle. NUI 79fbb7a35 (☰ + tekstitys) odottaa LS2:n virkejakoa (> 120 merkkiä kahtia).
- TOINEN KÄÄNNÖSLINJA (PT 10.2x, kone vapaa ma asti): Natiiviseppä (PROTO_LINJA=2, T7-kopio), koekäännös ~11.00 → Julkaisija jakaa vuorot.
- PÄÄKAUPUNGIT: e03 + Ramallah → Pelikoodari #4391 (f51e9b948, Ramallah a0e46c393) + Karttasepän Ramallah-kartta → juna 182.
- LS1: e71176416 junassa 181; jatko obeliski ~58 % (182). Pelikoodari: web-rivit eivät tule (muste vain natiivi).
- ÄÄNISIVU: valinnat + Lähetä Claudelle (#4388); lukija scratchpad/aanisivu-valinnat.mjs (source ~/.zshrc). Omistajalta ei vielä lähetyksiä.
- Levy ~79 Gi (Postivahti jakaa siirtolistat roolien _valmiit/_tyo/wt). Viikko 88 % (99 %:ssa vain rivi omistajalle), nollautuu ma 12.10. klo 10.
- JUNA 182 illalla (päivän 2. TF): Olavinlinna v12+, linnan tekstit, museo, e03-lehdet, San Marco.
Ennen seuraavaa omaa nollausta: python3 tools/tallenna-keskustelu.py.

## LISÄYS 10.5x (juuri ennen nollausta, konteksti 64 %)
- PULUN OPASTUS (omistajan kortti 10.5x "Pulu opastaa kerran"): kolme repliikkiä hyväksytty sisällöltään ("nämä hyvät"):
  1) "Napauta kartan merkkejä – niistä aukeaa juttuja." 2) "Vastaa kysymykseen oikein, niin vihreä piste vie aarteen jäljille." 3) "Ja jos jokin mietityttää, napauta minua!"
  EI GENEROIDA VIELÄ: omistaja kysyi "mitä muuta pulu sanoo alussa?" ja "mitä pulu sanoo lennon valinnassa alussa" → Pelikoodari kokoaa koko alun
  käsikirjoituksen sanatarkasti (aloituskaupungin valinta, alkulento, saapuminen Tukholmaan, opastuksen paikka) → docs/raportit/pulu-alku-kasikirjoitus-20261011.md
  → NÄYTÄ OMISTAJALLE (vastaus + Asemataulun Sinulle-osio talo/viestit) → vasta hyväksynnän jälkeen generointi (turbo, yksi otto) → NUI natiivi.
- BUILD 181 valmis iOS + Mac (Natiiviseppä 10.39); iOS-TF Julkaisijalla (ajo 38121309251, vaihe 2/5 10.44). Postivahti päivittää junan etenemisen 5 min välein (omistajan toive).
- KÄÄNNÖSLINJA 2 KÄYTÖSSÄ 10.46 (Natiiviseppä): linjalla 2 LS2 museo182e → LS1 c8acebc02 → NUI ca3482688; linjalla 1 TF + linnavahti.
- Linnan 7. kierros käynnissä (Laitetestaaja, botin hyväksymät 7 osaa). LR v47i (keittiö B) viety, v47j (kappelin porras) viennissä.
- Kirjattavat nyt 1185 → loppuun (sis. 10.4x junan päivitystiheys, 10.5x opastus ja käsikirjoituksen näyttö ennen generointia).
- Keskustelu tallennettu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-11-klo-0909-1050.md

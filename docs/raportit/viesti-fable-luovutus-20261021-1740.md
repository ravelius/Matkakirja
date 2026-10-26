# Päätoimittajan luovutus 21.10.2026 klo 17.40 (konteksti 30 %; PT-sessio "PÄÄTOIMITTAJA (Opus, medium)")

Id:t: /Users/Shared/Claude/osoitekirja.md (Postivahti päivitti 17.27: Projektiseppä c264506b, Sisältökirjuri 0c172ea0,
Karttaseppä 4bd7c316 nollattu mutta ei herätetty). Edellinen luovutus -20261021-1535. Viestit send_message-varakanavalla.
Postiworktree: /Users/Shared/Claude/wt/fable-posti-0945 (push HEAD:claude/postilaatikko).

## OMISTAJA MATKALLA to 22.10.–ma 26.10. (loki #5135, #5138)
- 16.14 OMISTAJA PYYSI JULKAISUA: TF, kun 16.03-korjaukset ja grafiikkakierrokset 1–2 ovat valmiit. 16.17: TF:ää edeltävä
  tarkistusajo ajetaan myös päivällä (isolla iPadilla ilman omistajaa). Mac ja iso iPad vapaina, ei hiljaista tuntia.
- 17.20/17.25: kaikki Työn alla -rivit etenevät rinnakkain; työ ei pysähdy kysymyksiin (suositus = oletus muutettavissa asioissa).
- 17.28: musiikki aina Lyralla (5.15, jokainen kutsu luvalla); KK kysyy aina kortilla paitsi pitkät tekstit; Codexin kuvat ja
  Tripo PYSYVÄLLÄ LUVALLA tarpeen mukaan (7.15, 11.5, 11.6, 12.24 päivitetty #5138; muisti päivitetty).

## 0. TF-JUNA 209 (tärkein)
- Ehdokas kootaan NS:llä: PK b0ff55141 (käännöskohta jänteestä, näkyvyyskamera nousee ≤ 8 m, Taihemen räystään yli) + VS
  a26367b67 (räystäspalkin värinä, lehvästö) + NS:n mittarikorjaus 3698ec71e + NUI b40d404d3 (lentopelin ☰-tauko) → LT kierros 29.
- Kierros 28 (5a5044f3f): kaatumiset 0/5 (WarmupAllShaders poistettu, PK ac0b899ca), muuten aukio/sisätila ei läpi; korjattu yllä.
- LUKITUS VASTA KUN: VS:n k2-viimeistely (täyttömaa ulkorenkaan pinnoille, pilvet pienemmiksi ja terävämmiksi, varjot tummemmiksi)
  on rungossa JA PT on hyväksynyt k2:n kuvaparin JA LT kaikki 0 (myös uudet 4 mittaria + värinä) JA tarkistusajo
  (`ennen-junaa.sh --loki`) ei HYLÄTTY (KESKEN ok). 5 kylmäkäynnistystä.
- Hyväksytty poikkeama: kartan saapumislennon pitkät ruudut (vanha vika, max ~108–125 ms) EIVÄT estä TF:ää; NS tekee
  syymerkinnät erilliseen haaraan, korjaus junaan 210. Kirjattava JUNATARKISTUKSEEN.
- Otsikko "Viimeinen keisari" (#824) vain, jos omistaja hyväksyy Codexilla; muuten OtsikkoUrl tyhjä. "karkuteillä" #825 v7 mukana.
- iPad: 5a5044f3f testikäytössä; ennen maanantaita sille TF-versio.
- Paikallinen asemataulu: junat.json (juna 209 "TF kun mittaus 0") ja tyolista.json päivitetty.

## 1. OMISTAJAN 17.31 = ENSIMMÄINEN PRIORITEETTI: selkeät työtavat / tuotantopohjat sitoviksi
- "Kysymys omistajalle" -pohja: PT:n luonnos PR #5139 (+ Raamattu 13.53). EI mergeä ennen omistajan hyväksyntää KK:n kautta.
- "Tarkista ennen" -osiot (AINA/EI-rivit + kohdat), kukin oma PR → KK: uusi linssi Linssiseppä (+NUI, kiireisin, omistajan kanssa
  ensimmäisenä); musiikki-ja-aanet.md UUSI pohja + kertojan ääniosuus Äänittäjä; kertojan tekstiosuus, pääkaupungin avaus,
  kuumailmapallo, taidemuseo Sisältökirjuri; 3D-maamerkki ja codex-3d-toimitus Lavastaja; historiapeli PK (TF:n jälkeen);
  tuotantoputken tarkistukset + esirenderöity video + testi "jokaisessa pohjassa Tarkista ennen" Projektiseppä.
- Raamattu "ydin ensimmäiseen virkkeeseen" (luvut 1–12): PT:n Opus-agentti teki worktreessä wt/fable-raamattu-ydin luonnos-PR:n
  (tarkista `gh pr list --head fable-raamattu-ydin`); EI mergeä ennen KK:ta/omistajaa. Uudet pohjat Raamatun karttaan (13.x) mergen yhteydessä
  (musiikki-ja-aanet.md puuttuu vielä).
- KK käy pohjat omistajan kanssa yksi kerrallaan: uusi linssi, kertojan teksti ja ääni, 3D-maamerkki, pääkaupungin avaus,
  kuumailmapallo, historiapeli, tuotantoputken tarkistukset; lautapelit sen jälkeen.

## 2. CODEX
- #812 maamerkit: Matterhorn ja Kinderdijk hyväksytty, Colosseum v2 (#832, 3 kaarikerrosta + attika) hyväksytty → Tripo 3 kpl.
  GLB:t → VS:n vertailuarkki (koodiversio | Codex) → PT → KK.
- #799: osapankki + sijoitusresepti hyväksytty vastaanottotavaksi; lautanen ja pöytä HOLD.
- Amsterdamin kävijät NL1–NL4 tilattu Tripo 3D -sessiolta (posti 01e45050c), vastaanottaja Lavastaja.
- #825 karkuteillä v7 kuitattu (73602828d).

## 3. MUUT RIVIT
- Linssiseppä: Amsterdam Louvre-tasolla (c2e3aef04, väliaikaiset kävijät Louvren malleilla); museokameran kartoitus ja
  tavoiteluonnos KK:lla (docs/raportit/kartoitus-museokamera-20261021.md). Bugilistalla ei avoimia.
- NUI: uuden linssin pohjan osuus #5136; tekee KK:lle 3–5 kuvaa pohjan läpikäyntiin.
- Lavastaja: museoiden yhteiset osat valmiit rungossa 4186554cd.
- Äänittäjä: tason 2 musiikki = Lyria-kehote ja ottomäärä KK:lle kortille (kiinalainen tori). Puyin huudot 03/06 jo pelissä.
- Projektiseppä: Asemataulu itsepäivittyväksi PR #5137 → Julkaisija mergeää (PT ei mergeä koodia).
- Worktree fable-luovutus-1740 ja fable-kysymyspohja → `tools/uusi-worktree.sh --poista fable-<aihe>` mergen jälkeen.
- Keskustelu talteen: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-21-klo-1540-1733.md.

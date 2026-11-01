# PT:n luovutus 1.11.2026 klo 02.55

Edellinen: viesti-fable-luovutus-20261031-2320.md (ja 2242, 2210). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Viestit aina id:llä; SendMessage-raja täyttyi → mcp__ccd_session_mgmt__send_message (ToolSearch).

## OMISTAJAN PÄÄTÖKSET TÄLTÄ VUOROLTA (KK:n välittäminä)
- **23.42 YÖLUPA**: KK hyväksyy omistajan puolesta aamuun, aina hänen sanojaan vasten; rajat: ei ostoja, ei uusia pysyviä
  poistoja, ei asetuksia/avaimia/CLAUDE.md, ei päätetyn kumoamista. Juna 216 lähtee vain 21.08-ehdoilla (Pariisi + valo).
  Lokissa PR 5773.
- **02.04**: kameran kallistus kuuluu droneen (KK:n c5e-kohta 1 peruttu); VALO ENSIN LOPPUUN piha 06:ssa, sitten koko
  reitille ennen kuin reitin ulkoasua arvioidaan.
- KK lopetti 02.20 vuotavan ChatGPT/codex app-serverin (83 Gt, swap täynnä) yöluvalla.

## JUNA 216 (runko bb115574d, NS)
- Runkoon tällä vuorolla (kaikki PT:n kuittaamia, mitattu ennen/jälkeen iPadilla): esilataajan joutilasennakointi pilkottu
  (a29bb5d3f), Nimikerros −28 % (99593f61d), ruutuprojektio Lado −42 % (513998a40), KokoSivuPeitto 3,6 s → 0,18 s (bb115574d).
- Ehdot: (1) Pariisin uusi kartta, (2) valo hyväksytty (taivas + räystäiden varjot vielä auki).

## VALO (ykkönen)
- Piha 06: valopaketti proto linssiseppa2/k17-piha06-216 114fcc7cf (VS) = runko 513998a40 + koe67 + k17 + rappaus +
  tausta-v89d + rakennukset-v90; o3-pari k06u: muuri 150/64/57 (hav. 147/58/53). KK kuittasi suunnan reitille (yölupa).
  EI runkoon ennen reitin koosteita + KK:ta.
- Muurin punainen: peli piirtää V4_red:n rappauksena (laji 10) → korjaus pelissä (JuoksuK11RappausSavy). V4_marmorin
  kuviottomuus pystypinnoilla = pelin tarkoituksellinen haara, kohta suljettu.
- Auki ennen omistajaa: (1) taivas: Codex maalaa paloina 1774×887 limittäin, koe tilattu (postilaatikko f1903f573);
  (2) räystäiden/pylväshallien alusvarjot (VS + LAV leivonnassa).
- LAV:n koko reitin leivonta v4: odotusajo nohupilla (leivonta-v4-odota.zsh), käynnistyy kun levy ≥ 82 Gi; loki
  proto-3d/_tyo/linnanrakentaja/leivonta-216/uusinta/ajo-leivonta-v4.log. Postivahti seuraa. Sitten VS + PK reitin koosteet
  0/35/70 % → PT → KK.

## REITTI (PK)
- c5e: botti keisarin (keski)sillalla (sivusilta +150 m botin valinnassa), kansi laatoitettu (rakennukset-v89/v90), ei
  uppoamista; KK kuittasi sillan. Työn alla: ovet aukeavat keisarin tullessa (v90 + peli 1d6f7463d), maalikamera b972df372,
  edusta-v1 (Duanmen + sivuhallit, LAV; JU vie ämpäriin, uusi SHA ca0a1f4dc1fc) portin taustaksi. Holvin kirkkaat
  alapinnat (KK:n kohta 2) arvioidaan valon jälkeen. c5g → PT → KK video (myös sivueunukin ennakoitavuus ≥ 2,5 s).

## PARIISI (KS)
- KK hyväksyi Codexin pseudo-3D-suunnan (929cef880) yöluvalla. Kolmas pala r4-c4 tilattu (1f6a1e23b: vesimaski, terävät
  katot ja ikkunat). Jos r4-c4 läpäisee vaaka­sauman ja nelikulman → koko kaupunki ilman uutta KK-kierrosta; sitten puut,
  puistot, maamerkit → koottu alue G:n rinnalle KK:lle. Codexin työ on voinut katketa 02.20 (KK seuraa, rivi omistajalle aamulla).

## LEVY (pullonkaula)
- JU:n NAS-arkistointi vei käytössä olevia vientejä (v99, tausta-v89d) → kaikki 27 palautettu. Arkistoskripti SEIS, kunnes
  korjattu + kuiva-ajon lista PT:lle. Lokit → NAS vain ehdoin (ei 31.10. 12.00 jälkeisiä, viittaukset myös wt:stä).
- OPPI: du seuraa wt/-symlinkkejä T7:lle (proto-natiiviseppa-unity67/-b5): NS poisti T7:ltä b5:n Library/Build ja unity67-wt:n
  (koodi talteen-20261018). Mittaa sisälevy `du -shx` tai ilman kauttaviivaa.
- Codex-muistivahti: `ps rss` ei näe pakattua vuotoa → top MEM TAI swap > 30 Gt (KIERROS.md PR 5790 + 5791).

## AVOIN (seuraava PT)
- VS: taivaspalat + räystäsvarjot + reitin valo. LAV: leivonta v4 käyntiin levyn noustua. PK: c5g ja ovikuva.
- NS: luovuttaa nyt; seuraaja JONO 1 VieritysHeratys (PT antoi luvan samoin ehdoin). Postivahti nollaa.
- KS: r4-c4 Codexilta. JU: edusta-v1 vienti, lokit → NAS, korjattu arkistoskripti PT:lle.
- Asemataulu: juna 216 -rivi päivitetty (runko bb115574d).

## Säännöt, jotka opin
- tools/uusi-worktree.sh --poista ottaa lipun ENSIN: `--poista <rooli>-<aihe>`.
- Luovutushaaran PR voi mergeytyä ennen roolin viimeistä täydennystä → tarkista haaran kärki mainia vasten ja vie lisäys
  uutena PR:nä (tänä yönä 5771, 5776, 5779).
- Kuittaa kuvapari mittareita vasten ennen KK:ta (o2 vs o3: räystäät 0,14 vs 0,27).

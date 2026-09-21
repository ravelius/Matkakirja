# Fablen luovutus 21.9.2026 ilta (Mac-käyttäjä koodaus, ensimmäinen sessio)

Edellinen luovutus: viesti-fable-luovutus-20260921-siirto.md. Tämä sessio:
21.9. klo 11.30 → ilta. Kaikki päätökset ovat lokissa
docs/raamattu-loki/paatokset-2026-09.md (otsikot alla mainittu); Raamattua
muutettiin kohdassa KAKSI ÄÄNTÄ.

## Ympäristö (valmis, ei toistettavaa)
- Kehitys käyttäjässä koodaus; repot /Users/samireivinen/ ACL:llä. Avaimet
  ~/.zshrc → /Users/samireivinen/.matkakirja-avaimet.zsh (Bash-työkalu ei
  lataa niitä: `zsh -c 'source ~/.zshrc; …'`). gh ravelius (repo+workflow),
  `gh auth setup-git` ajettu. Playwright chromium + webkit koodaus-cachessa.
- Siirtojäänteet korjattu (kaikki vaativat sudoa, omistaja ajoi): ajurihakemistot
  chown koodaus, /tmp/matkakirja-savukkeet chown, /opt/homebrew chown,
  savukkeet.yml CHROMIUM-polku koodaus-cacheen (PR #2649). CI vihreä.
- main EI ole suojattu: Julkaisija mergeää kun Testit vihreä, ei ohitusta,
  ei korttia omistajalle (loki: MERGE ILMAN OHITUSTA).
- Sessiot: Fable, Julkaisija (sonnet3), Karttaseppä (opus2), Pelikoodari (opus),
  Sisältökirjuri (nostot), Laitetestaaja (sonnet), Postivahti (Sonnet,
  /Users/koodaus/Matkakirja-posti, /loop 5m `bash .postivahti.sh`, ilmoittaa
  Fablelle Codexin postista). Remote Control päällä kaikissa.
- Testit käyttävät Mac Studion kaiuttimia (SwitchAudioSource; Laitetestaaja
  ja savukkeet-mac vaihtavat ja palauttavat).
- Rooli-worktreet nimetään roolin mukaan seuraavassa nollauksessa (loki
  HAKEMISTOSIIVOUS); Matkakirja-fable pysyy.

## Tila
- Mainissa v2000 (v1994 FRA-nostot, v1996 Karttaseppä E2, v1997 E3+E4, v1998
  E4b ennuste, v1999 sumu pois, v2000 z-tappelu). Julkaisijan jono: nimiöt E2
  (PR #2652) → E3 → ennustekoukku → gl-rasterit → bodensee → linssisarja (47
  ikonia) → Kellot → Lippuarvaus 1–2 → Tähtitaivas → Muuttolinnut →
  laitepalvelin → muu-Eurooppa-30 → linssit-rengas1 → nykyalueet →
  kadonneet-monumentit + KIIREELLISET alla.
- Fablen haara claude/bold-ride-vow4ki = origin/v1973-prep (push molempiin).

## OMISTAJAN YKKÖSPRIORITEETTI: kartan sulavuus (Google Earth)
- Sulavuus E1–E4b koodattu ja mitattu (iPad: panorointi 0 px, zoom p95 0,33 px).
- Omistajan tuntuma v2000: (a) Marseille-nimiö, pelinappula ja nostot HEILUVAT
  panoroidessa ja palaavat paikalleen (epäily: E4b ennuste tuotannossa ilman
  Pelikoodarin ennustekoukkua; omistaja kokeilee ?ennuste=0 – TULOS PUUTTUU;
  Karttaseppä tutkii, sammuttaa ennusteen oletuksena jos pahentaa);
  (b) meren laikukas möhnä vilkkuu yhä zoomatessa (z-korjaus ei riittänyt,
  Karttaseppä toistaa ja etsii syyn); (c) NOSTOT KADONNEET v1999:stä (sumu-
  pois piilotti valtaosan; Pelikoodari korjaa KIIREELLISENÄ ennen GL-jatkoa).
- GL-KERROS (nimiöt+merkit WebGL-piirtoon) päätetty ja nopeutettu: suunnitelma
  docs/raportit/gl-kerros-suunnitelma-20260921.md; tavoite: tänään illalla
  kaupunkinimet tuotantoon ?glnimiot=1 takana, huomenna nostot+merkit+nappula+
  napautus, illalla GL oletukseksi (CSS2D perääntymistie ?glnimiot=0).
  Karttaseppä runko (karttaseppa-gl-runko), Pelikoodari rasterit+napautus,
  parvet savukkeisiin. Uudet linssit ODOTTAVAT kunnes kartta toimii.
- Pohjatason isobaattipoltto (syvyysviivat atlaksen tapaan) valmis lähtöön
  /Users/koodaus/pyramidi-poltto/ajo-20260922/, 2 h CI-tauko; AJETAAN VASTA
  Fablen luvalla omistajan tuntumatestin jälkeen.

## Muut valmiit tänään
- Maakunnat (FRA 13, DEU 16) tuotannossa nimiöversio 2026-09-21f (ruoste
  vahva, rajat; z7–z8). Bodensee-siirto avasi CHE:n.
- Linssit: rengas 1 = 22 (12 tarina + 6 leikki + 4 katselu); isoisän linssi
  lahja, ei aarre (LINSSIAARTEET 21 riviä). 47 ikonia Codexilta webp 192 px
  repossa; leikkilinssit Kellot, Lippuarvaus (+2), Tähtitaivas, Muuttolinnut
  valmiit (jäljellä Yökartta, Vuodenajat – odottavat).
- Sisältö: Malta 26, Kypros 26, CHE 29, BIH/GBR/TUR/NOR/ISL/RUS/UKR 30.
  Sisältökirjuri: monumenttilista valmis (81 kohdetta/33 maata), seuraavaksi
  pienoismallien kytkentä kun Codex toimittaa, sitten visat 1/3.
- Codex-tilaukset postilaatikossa (haara claude/postilaatikko, posti/fable-
  codexille-*): linssi-ikonit (toimitettu), pienoismallit Eurooppa 97 kpl,
  monumentit erät 1–4 (81 kpl, LUX bastionit pois). Toimitukset
  ~/Documents/Codex/<pvm>/; Julkaisija hakee, Sisältökirjuri kytkee.
- Kaanon: kaksi ääntä = isoisä 1873 + Livia nyt; nuori Fogg on pelaaja ilman
  repliikkejä (tarina.md + Raamattu).
- Apuraha (AVEK DigiDemo 20260770): Fable kirjoitti kuvaukset ja korjatut
  kappaleet chatissa; TestFlight-linkki https://testflight.apple.com/join/KxKekB4n.
  Hakemuksen väite "Livia vastaa vapaisiin kysymyksiin tekoälyllä" ei ole
  pelissä – omistaja tietää. "Kolmiulotteiset tilat" hakemuksessa ei ole
  Raamatussa.
- Pelikoodarin parvet (rinnalla): nostokortti kaksi palstaa leveällä /
  pino ≤760 px kapealla; lehden vuosiluku oikeaan reunaan pienessä laatikossa;
  reaktiot kahteen (sydän / peukku alas + tarkentava kysymys). Kaappaukset
  tulevat Fablelle → omistajalle.

## Odottaa Fablea / omistajaa
- Omistajan ?ennuste=0-tulos; Karttasepän syy meren vilkkumiseen; Pelikoodarin
  nostojen palautus (kiireellinen); GL-kokeiluversio tänä iltana.
- Laitetestaaja: iPhone-vertailu, kierros 22; ilmoittaa vain valmiina.
- Postivahti ilmoittaa Codexin toimituksista (pienoismallit erä A odotettavissa).

## Uuden Fable-session ensimmäiset askeleet
1. Lue tämä ja lokin viimeiset otsikot (`grep '^## ' docs/raamattu-loki/paatokset-2026-09.md | tail -30`).
2. ListAgents; sessiot ovat auki, älä lähetä aloitusviestejä uudelleen.
3. Kysy omistajalta ?ennuste=0-tulos; hoida sulavuuspalaute ennen kaikkea muuta.

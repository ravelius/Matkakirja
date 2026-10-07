# Siirtoprompti tilinvaihtoa varten (PÄÄTOIMITTAJA 7.10.2026, vaihto keskiyöllä: omistaja 16.3x "tehdään tilinvaihto vasta keskiyöllä kun kreditit ovat varmasti loppu")

Roolit pushaavat luovutuksen ja aloitusviestin VAIHTO NYT -viestistä (kärjet kohdan 3 taulukossa, täydennetään vaihdossa).
Tarkempi tila: docs/raportit/viesti-fable-luovutus-20261004.md alku "TILANNE 7.10.2026" (uusin LISÄYS ylimpänä).
Päätökset: docs/raamattu-loki/paatokset-2026-09.md (grep "7.10.2026"); loki-PR #4150 (fable-loki-20261007g) Julkaisijalla.
Kirjaamatta: scratchpad/kirjattavat-20261006.md merkin "Kirjattu #4150" jälkeen.

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja kirjautuu työpöytäsovellukseen uudella tilillä, avaa session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, max) ja liittää:

> Olet PÄÄTOIMITTAJA (ent. Fable), Matkakirjan päätoimittaja. Nimeä session nimeksi ISOILLA "PÄÄTOIMITTAJA (Opus, max)".
> Checkout /Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki: aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`.
> Lue CLAUDE.md, Raamatun Ydinajatus kohta 2, docs/raportit/viesti-fable-siirtoprompti-20261007.md KOKONAAN ja
> docs/raportit/viesti-fable-luovutus-20261004.md alku "TILANNE 7.10.2026". Muisti MEMORY.md (erityisesti testaus-vain-automaattiset,
> fable-tila-20261007, pilviajot-remotetrigger, sessionimet-malli-effort, viikkoraja-97-siirtoprompti, sessioiden-luonti-appia-ohjaamalla,
> omistajalle-vain-suomeksi, omistajalle-ei-ammattisanoja). Ota roolisessiot käyttöön kohdan 3 taulukon mukaan (vanhat sessiot
> tyhjennetään send_message "clear_session self" -käskyllä tai luodaan uudet), aseta mallit ja nimet, lähetä aloitusviestit, kytke Remote
> Control kaikille ja itsellesi, ja jatka kohdan 2 jonosta. Kysy omistajalta tämän tilin viikkoraja ja kerro se Postivahdille.

## 2. Tila ja jono (7.10. ilta)

1. **TESTAUS VAIN AUTOMAATTISIN** (omistaja 15.5x, Raamattu #4150): ennen junaa ja TF:ää vain automaattiset testit ja käännös; ei savua,
   rutiinia, kuittausstillejä, iPad-mittauksia eikä toistoajoja. Roolit eivät tee omia käännöksiä. Enintään 2 junaa päivässä (16.1x).
   Kuittaus yhdellä rivillä (mitä muuttui, testit, SHA).
2. **TF 161** testaajilla 16.02 (BUILD 9572eaff) + Mac TF 161. Ulkoinen ryhmä Arvioijat: 160 Applen beta-katselmoinnissa, 161 jonossa
   (Julkaisija yrittää 10 min välein). **JUNA 162** (omistajan pyyntö: TF klo 22): runko 13c1c0269 + Siirtoseppä ef6b092d
   (Olavinlinnan pelattava pala kehittäjävalikossa "Olavinlinna – pelattava pala (kokeilu)", kiinnitetty peili v44g) + NUI 34cf54b0
   (seikkailutapit) + NUI 3f07c49b (apurahakortti v7 + Avaa valmiit linssit) + LS1 b9f37ee8f (latauskuva + siirtymäpeiton purku)
   + LS2 f6e4a8495 (S2-kaudet). Omistaja testaa illalla.
3. **AVOINNA:** Mac-ohjauslevyvika (diagnostiikka 161:ssä; omistajan Player.log-komento viestissä 16.0x); alkulento v3 (LS1: ei yötä,
   kone näkyvissä alusta, ei nykäystä; 763 ms kehys selvityksessä); vesiportin kynnys (LR törmäys); Pariisin yksityiskohtakuvat
   (Sisältökirjuri kokoaa paikallisesti → ämpäri + Codex); 31 kaupungin korjaukset (Pelikoodari, ei ääniä ennen omistajan pelitestiä);
   apurahakortti v7 Pagesiin (#4147) + Laitetestaajan simutarkistus TF 160 -koodilla; talvi2b (Karttaseppä, ~21) → z5-yleiskuva saumoista
   ja pilvistä → vienti; kevät2 vientipaketti Julkaisijalle.
4. **PILVI:** krediitti loppui sami.reivinen-tililtä 16.1x (250 $ ~2 h:ssa). Pilveen vain rajatut tehtävät (Raamattu PILVIAJOT: KULUTUS).
   CLI on kirjautuneena sami.reivinen@vvi.fi; jos työpöytä vaihtaa samalle tilille, CLI vaihdetaan eri tilille.

## 3. Roolit (checkout /Users/Shared/Claude/…, malli, kärki vaihdossa)

| Rooli | Checkout | Malli | Kärki ja tila vaihdossa |
|---|---|---|---|
| Postivahti | Matkakirja-posti | Sonnet 5.5, medium | (täydennetään) |
| Julkaisija | Matkakirja-julkaisija | Opus, high | (täydennetään) |
| Natiiviseppä | Matkakirja-3d-selvittaja | Opus, high | (täydennetään) |
| Natiivi-UI | Matkakirja-natiivi-ui | Opus, high | (täydennetään) |
| Pelikoodari | Matkakirja-pelikoodari | Opus, high | (täydennetään) |
| Linssiseppä | Matkakirja-linssiseppa | Opus, high | (täydennetään) |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | Opus, high | (täydennetään) |
| Linnanrakentaja | Matkakirja-linnanrakentaja | Opus, high | (täydennetään) |
| Siirtoseppä | Matkakirja-siirtoseppa | Opus, high | (täydennetään) |
| Karttaseppä | Matkakirja-karttaseppa | Opus, high | (täydennetään) |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | Sonnet 5.5, high | (täydennetään) |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet 5.5, high | (täydennetään) |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md
omasta haarastasi sekä sen osoittama luovutus, ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, max)."
Sessioiden luonti: muisti sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return). Session nimiin malli ja effort.

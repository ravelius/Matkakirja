# Laitetestaajan luovutus (27.9.2026, tilinvaihto ~b, konteksti 76 %)

## Tila lyhyesti

Kolme täyttä savukierrosta ajettu tämän session aikana: **1.0.29** (2 uusintakierrosta, puhevirta-
bugi löydetty+korjattu+vahvistettu), **1.0.30** (8/12 PASS, talous/pelistreak jäi osittain auki),
**1.0.31** (6/6 PASS täydellisesti — Z10-pohja, luenta ilman Äänimaisemaa, talous-loppukortti
koetilalla, aloitusvalinta, elämäpalkki, pienten maiden kynnys). Lisäksi ajettu erillinen
**App Store -laatukierros** TF 1.0.31:llä (löydökset lähetetty omistaville rooleille) ja tälle
tilinvaihdolle vielä käynnissä **10 minuutin muisti/lämpö-seuranta** (ks. alla, tarkista tulos).

Kaikki raportit `docs/raportit/savukierros-tf10*-20260927*.md` ja
`docs/raportit/laitetestaaja-appstore-laatu-20260927.md`, kaikki committoitu ja pushattu
haaraan `laitetestaaja-savukierros-b13`.

## TÄRKEÄ UUSI SÄÄNTÖ (Fable 27.9. klo ~18.0x): puhetestien xAI-kulutus

Omistaja pelaa itse tuotannossa ja xAI-puheen kulutus (Pulun virtaluenta / kehittäjäkomennoilla
säädetty puhe) nousi tänään ~100 300 mrk:aan, josta ~87 000 mrk tallentamatonta. **UUSI SÄÄNTÖ
HETI VOIMAAN:**
- Puhetestit vain **säilöttävillä (jo aiemmin käytetyillä/toistuvilla) teksteillä ja
  oletusäänellä** — ei uusia, kertakäyttöisiä kysymyksiä/tekstejä joka kerta.
- Pulun virtaluentaa ja kehittäjäkoodilla säädettyä puhetta **enintään 5 000 mrk/vrk per rooli**
  ilman Fablen erillistä lupaa.
- Äänitarkistukseen (esim. App Store -kierroksella) **riittää yksi lyhyt nosto + yksi Pulun
  kysymys** — ei tarvitse toistaa useita kertoja per kierros.
- Tämä koskee sekä `ui chat <kysymys>` -komentoa (jokainen uniikki kysymys = uusi xAI-synteesi,
  ei välimuistia) että `puhe lue <vapaa teksti>` -kehittäjäkomentoa.
- Tänään käytetty 14 puhe-/lukutestiä (8 Pulu-chat + 4 `puhe lue` + 2 nostokortin lukijaa) —
  tästä eteenpäin huomattavasti säästeliäämmin.

## 10 minuutin muisti/lämpö-seuranta: VALMIS, PASS

Ajettu loppuun ennen tilinvaihtoa, ks. docs/raportit/savukierros-tf1031-lampo-20260927.md:
11 min 1 s, lämpötila "Normaali" koko ajan, fps vakaa 30-32,6, 0 poikkeusta, muisti RSS ~1,54 Gt.
App Store -raportti päivitetty vastaavasti. Natiivisepälle ilmoitettu.

## Jono seuraavalle sessiolle

1. **1.0.32-junan savuke kun Natiiviseppä pyytää.** Ei vielä SHA:ta tätä kirjoittaessa.
2. Avoimet App Store -löydökset (docs/raportit/laitetestaaja-appstore-laatu-20260927.md):
   - Natiivi-UI: iPhonen vaakatilan "Näytä yläpalkki" -nappi (mk-vakasnappi) rikkoo asettelun —
     odota heidän vahvistustaan oikealla laitekierrolla ennen kuin oletat sen korjatuksi.
   - Pelikoodari: offline-tilan aito todentaminen jäi kesken.
4. **1.0.30:sta avoinna jääneet** (ks. savukierros-tf1030-uusinta-20260927.md): talous-loppukortti
   ja pienten maiden kynnys OVAT nyt molemmat todistettu PASS 1.0.31:ssä `koetila raha/rahaton/
   loppukortti` ja Amsterdam-aloituksella — ei enää avoimia näiltä osin.

## Tärkeimmät opitut työkalut tälle session ajalle

- **`ui puu`** (ui-komento.txt): dumppaa koko UI-puun tarkoilla laitepistekoordinaateilla
  `Documents/ui-puu.json`:ään — KÄYTÄ AINA napautuskohteiden löytämiseen, älä arvaa
  kuvakaappauksesta pikseleinä (ne ovat 3× laitepisteet, ks. reseptin sudenkuoppa-osio).
  HUOM: näyttää VAIN näkyvät (ei vieritetyt pois) elementit — vieritä ensin jos elementti puuttuu.
- **`aani mittaa <s>`** (peli-komento.txt): ainoa luotettava tapa todistaa että ääni oikeasti soi
  (rms/huippu/soivat kanavat) — pelkkä komennon "ok" ei riitä.
- **`koetila pelipaiva yyyy-MM-dd`**, **`koetila raha <n>`**, **`koetila rahaton [vuoroja]`**,
  **`koetila loppukortti`**: talous/pelistreak-testaus ilman kellon siirtoa tai pitkää pelaamista.
- Kaupunki-id:t `uusi-peli`-komentoon pienille maille: NLD=amsterdam, BEL=bryssel, CHE=alpit,
  DNK=kobenhavn (kaupungit.json-datasta, ei englannin-/suomenkielisiä nimiä oleteta).
- Kaikki muut sudenkuopat ja komennot: `docs/raportit/laitetestaaja-reseptit.md` (kasvava,
  lue ennen kysymistä).

## Viestikanavat (tarkista uudet id:t seuraavan session aloitusviestistä)

- Fable: local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (voimassa tätä kirjoittaessa, TARKISTA).
- Natiiviseppä: local_04e2850b-d63c-481d-be73-c7d784a7cbcb.
- Natiivi-UI: local_e9fdc695-8421-4c14-a187-8881e73c835a.
- Pelikoodari: nimellä "Pelikoodari (Opus)" ListAgents-listassa, ei local_-id:tä talteen otettu.
- Peer-viestien 10/vuoro-raja täyttyi useita kertoja tässä sessiossa — käytä
  `mcp__ccd_session_mgmt__send_message` (session_id) varakanavana heti kun SendMessage sanoo rajan.

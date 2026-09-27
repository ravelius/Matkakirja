# Laitetestaajan aloitusviesti (27.9.2026 ~18.0x, päivitetty edellisen session lopussa)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
`git fetch origin && git pull` (haara laitetestaaja-savukierros-b13; jos main on edellä,
`git merge origin/main`, EI force-pushia — jos merge tuo satoja tiedostoja jotka eivät liity
sinun docs-muutoksiisi, peruuta merge ja pushaa suoraan omaan haaraasi, ks. luovutuksen kohta
tästä jos epäselvää).

## Lue ENSIMMÄISENÄ
- **docs/raportit/viesti-laitetestaaja-luovutus-20260927-b.md** — edellisen session luovutus:
  1.0.29/1.0.30/1.0.31-kierrosten tila, KESKENERÄINEN 10 min muisti/lämpö-seuranta (TARKISTA JA
  VIIMEISTELE ENSIMMÄISENÄ), App Store -laatukierroksen avoimet löydökset, ja TÄRKEÄ UUSI SÄÄNTÖ
  puhetestien xAI-kulutuksesta (säilöttävät tekstit, oletusääni, ≤5000 mrk/vrk per rooli ilman
  Fablen lupaa — lue tarkkaan ennen yhtään `ui chat`/`puhe lue` -komentoa). Lue tämä ennen mitään
  muuta.

## Lue seuraavaksi
- **docs/raportit/laitetestaaja-reseptit.md** (kasvava, päivitetty jatkuvasti) — KAIKKI toimivat
  debug-komennot, mukaan lukien `ui puu` (UI-puun tarkat koordinaatit), `aani mittaa` (todellinen
  äänimittaus), `koetila raha/rahaton/loppukortti/pelipaiva` (talous/streak ilman kellon siirtoa),
  pienten maiden kaupunki-id:t. Lue ennen kuin kysyt komentoa keneltäkään.
- **CLAUDE.md**, Raamatun Ydinajatus kohta 2 (työtapa), WEB ON MALLI MITATTUNA.
- Tämän session luovutusraportit kronologisesti jos tarvitset yksityiskohtia: git log
  `docs/raportit/savukierros-tf10*-20260927*.md` ja `laitetestaaja-appstore-laatu-20260927.md`.

## Jono (tärkeysjärjestyksessä)
1. **Viimeistele 10 min muisti/lämpö-seuranta** TF 1.0.31:llä (ks. luovutuksen ohjeet, saattaa
   olla jo valmis kun aloitat — tarkista lampo.jsonl/kehysajat.jsonl ja raportoi Natiivisepälle).
2. **1.0.32-junan savuke kun Natiiviseppä pyytää.**
3. Avoimet App Store -löydökset (docs/raportit/laitetestaaja-appstore-laatu-20260927.md) — seuraa
   Natiivi-UI:n ja Pelikoodarin vastauksia, uusinta jos he pyytävät varmistusta.

## Kierroksen kaava (toistuu build-kierroksesta toiseen)
1. Rooli (Natiiviseppä/Fable) ilmoittaa uuden käännöksen SHA:n + asennetut simulaattorit + testilistan.
2. **Tarkista aina ensin ancestor**: `git merge-base --is-ancestor <juna-SHA> <käännös-SHA>` proto-3d:ssä
   (exit 0 = ok). ÄLÄ testaa jos tämä ei täsmää pyydettyyn.
3. Boot vain omat laitteet (1572C658 iPhone, 3B4CDACB iPad) — yksi kerrallaan jos toinen rooli mainitsee
   ydinten/poltton olevan kesken (Z10 tms.), tai jos toinen rooli on juuri ilmoittanut käyttävänsä
   jompaakumpaa jaettua/toisen laitetta — tarkista aina ennen bootia.
4. Jos tarvitset Debug.Log-tason todisteita: käynnistä `xcrun simctl launch --console-pty <UDID>
   app.matkakirja.proto3d > tiedosto 2>&1 &` HETI, ennen muita komentoja — tavallinen
   `peli-loki.txt`/`ui-loki.txt` EI näytä Debug.Log-rivejä.
   **ÄLÄ KOSKAAN `pkill` tätä prosessia** — se sammuttaa myös itse sovelluksen. Lopeta aina
   `xcrun simctl terminate <UDID> app.matkakirja.proto3d` ensin, sitten `shutdown`.
5. Aja pyydetyt kohdat, ota kuvia tarvittaessa (`mcp__Claude_Code_iOS_Simulator__control` attach+screenshot;
   koordinaatit device-pointteina — käytä `ui puu` tarkkojen napautuskoordinaattien saamiseksi,
   ÄLÄ arvaa kuvakaappauksesta pikseleinä, ks. resepti).
6. Kirjoita raportti `docs/raportit/savukierros-tf<versio>-20260927.md`, committaa, pushaa (`git
   fetch` ensin jos toinen rooli on saattanut pushata reseptiin väliin — fast-forward pull).
7. Ilmoita tuloksesta viestillä (max 8 riviä) SendMessage-työkalulla pyytäjälle (Natiiviseppä/Fable),
   ja löydökset suoraan omistaville rooleille (Natiivi-UI/Natiiviseppä/Pelikoodari) jos App Store-
   tyyppinen laajempi kierros. Jos SendMessage sanoo rajan (~10/vuoro) täyttyneen: käytä
   VARAKANAVAA `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id) —
   ei koskaan jäädä odottamaan omistajaa tämän takia.
8. Jos jokin havainto tuntuu FAILilta mutta olet epävarma laajuudesta/testijärjestyksestä: kysy ennen
   raportointia tai merkitse raporttiin selvästi "epäilty FAIL, ei varmistettu".
9. **Puhetestit (xAI-kulutus, sitova 27.9. ~klo 18.0x):** säilöttävät tekstit, oletusääni, ≤5000
   mrk/vrk per rooli ilman Fablen lupaa. Yksi lyhyt nosto + yksi Pulun kysymys riittää
   äänitarkistukseen — ÄLÄ toista useita uniikkeja `ui chat`/`puhe lue` -kutsuja per kierros.

## Tunnettuja sudenkuoppia
- **Asennusrekisterin desync**: `simctl launch` "No such process" vaikka listapps näyttää
  asennetuksi → uninstall+install tuoreesta Matkakirja-proto-kaannos-buildista.
- **Kortit/postikortit peittävät kameran** heti uuden pelin/saapumisen jälkeen — sulje ensin
  (`ui puu` löytää "Ohita"-napin koordinaatit).
- **Koordinaattimuunnos simulaattorikuvakaappauksissa**: kuvakaappaus on natiivi 3× laitepisteet
  — käytä AINA `ui puu`:ta napautuskoordinaateille, älä laske kuvasta.
- **`ui`-etuliite muistikomennoille**: `ui lehti <kaupunki>`, `ui chat`, `ui nosto <id>`,
  `ui maakuntanimet 0|1`, `ui mitauutta` — pelkkä sana ilman `ui`-etuliitettä ei tee mitään.
- **`elava elementit` (meri) kuuluu `linssi-komento.txt`:hen**, EI `komento.txt`:hen.
- **`ui puu` näyttää vain näkyvät elementit** — jos nostokortin ylärivi/lukija puuttuu dumpista,
  vedä näkymää (swipe) ennen kuin raportoit puuttuvaksi (löydös 131: kuva pysyy paikallaan,
  kortti vierittää alle).
- **iPhonen vaakatila**: "Näytä yläpalkki" -nappi (mk-vakasnappi) saattaa rikkoa asettelun
  (löydös App Store -kierrokselta, ei vielä varmistettu oikealla laitekierrolla) — jos testaat
  vaakaa, tarkista tämä ensin.
- **Talous/streak-testaus**: käytä `koetila raha/rahaton/loppukortti/pelipaiva` -komentoja, EI
  yritä kuluttaa rahaa pelaamalla käsin (hidasta, `kulkutapa odota` vaatii ettei mikään muu
  kulkutapa toimi).
- **Pienten maiden kaupunki-id:t**: NLD=amsterdam, BEL=bryssel, CHE=alpit, DNK=kobenhavn.

## Viestikanava
Fable: local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (tarkista ettei vaihtunut — Fable ilmoittaa uuden
id:n aloitusviestissä). Vain valmis kierros, jumi tai kysymys, enintään 8 riviä.
JUMI → FABLE: ei AskUserQuestion-korttia; viesti Fablelle ja jatka muuta.

Ensin uudessa sessiossa: kuittaa Fablelle yhdellä rivillä, tarkista juna.log
(`proto-3d/lokit/kaannospalvelu/juna.log`) ja odota Fablen kutsua seuraavaan savukierrokseen.

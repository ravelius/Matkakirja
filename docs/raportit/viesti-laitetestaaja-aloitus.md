# Laitetestaajan aloitusviesti (päivitetty 6.10.2026 illalla, tilinvaihto)

## PÄIVITYS 6.10.2026 klo 22.1x — LUE TÄMÄ ENSIN
- **docs/raportit/viesti-laitetestaaja-luovutus-20261006.md** on uusin luovutus (tulokset TULOS 153 ja 154 OK, avoimet, käytäntö, todistusajon koordinaatit).
- Simut sammutettu. Älä käynnistä simua ilman Julkaisijan SIMU NYT -viestiä (UDID + aika); tulokset kirjoitetaan "TULOS <build>: OK/VIKA – …" -riville vuoron loppuun ja raporttiin, ei viesteinä.


Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
`git fetch origin && git pull` (haara laitetestaaja-savukierros-b13; jos main on edellä,
`git merge origin/main`, EI force-pushia — jos merge tuo satoja tiedostoja jotka eivät liity
sinun docs-muutoksiisi, peruuta merge ja pushaa suoraan omaan haaraasi, ks. luovutuksen kohta
tästä jos epäselvää).

## PÄIVITYS 5.10.2026 klo 05.58 — LUE TÄMÄ ENSIN (viikkoraja 99 %, tilinvaihto)
- **docs/raportit/viesti-laitetestaaja-luovutus-20261005.md** on uusin luovutus (kärki, avoimet kohdat).
- Viimeisin kierros: juna 142 koe 30488e2b, osittainen (lukijan ääni OK). Muut kohdat testaamatta, syy aika.
- Simu 1572C658 sammutettu. Odota Julkaisijan "SIMU NYT" -viestiä ennen bootia.

## PÄIVITYS 2.10.2026 klo 22.1x — LUE TÄMÄ ENSIN (viikkoraja 92 %, Postivahdin/Päätoimittajan ohje)
- **docs/raportit/viesti-laitetestaaja-luovutus-20261002.md** on uusin luovutus (kärki, avoimet kohdat, protokolla).
  Viimeisin savukierros: 1.1 (129) 745d8ff0 PASS (`savukierros-1129-20261002.md`); 2.10. kierrokset 119…129 + 128b raportoitu.
- Uusia ohjeita: attach uudelleen jos toinen rooli detachaa; vaakatilassa sim-tapit ovat pystykoordinaatteja (402−y_v, x_v).

## PÄIVITYS 1.10.2026 klo 06.0x — (vanhempi) viikkokiintiö 95 %, Päätoimittajan käsky
- **docs/raportit/viesti-laitetestaaja-luovutus-20261001.md** on uusin luovutus (kärki, avoimet kohdat, protokolla tiivistettynä).
  Viimeisin savukierros: 1.1 (91) f42339ca PASS (`savukierros-1191-20261001.md`); kaikki 1.1 (76)…(91) raportoitu. TILINVAIHTO 1.10. klo 07.5x.
- Ääni: pelin mykistys oletuksena; `aani mykistys 0` vain mittauksen ajan; Macin oletusulostuloon ei koskaan (alla oleva
  30.9. klo 16.2x -ohje voimassa).
- Odota Natiiviseppän tarkistuslista + Julkaisijan "LAITE NYT"; yksi simulaattori kerrallaan; sammuta kierroksen jälkeen.

## PÄIVITYS 30.9.2026 klo 16.2x — ÄÄNI (kumoaa vanhan ohjeen)
- **ÄLÄ KOSKAAN vaihda Macin oletusulostuloa** (ei `SwitchAudioSource -s "Mac Studio-kaiuttimet"`, ei palautusta jälkeen).
  Omistaja kuuntelee koodaus-käyttäjän oletusulostulon (Scarlett Solo USB) kautta. Vanha ohje "vaihda output Mac
  Studio-kaiuttimiin ennen kierrosta" on KUMOTTU (Päätoimittaja 30.9.). Simulator.app:ia ei ole tällä koneella eikä
  `simctl` valitse ääniulostuloa, joten ääni menee aina järjestelmän oletukseen.
- Kun ääntä ei mitata: mykistä pelin ääni (`puhe pois` peli-komento.txt:hen tai valikosta Äänet pois). `aani mittaa` mittaa
  Unityn oman mixerin, joten se toimii vaikka ulostulo on mykistetty. Natiiviseppä lisää kehitysbuildeihin testimykistyksen
  (mykistää vain lopullisen ulostulon) ja siitä tulee oletus automaattisiin ajoihin.
- Uusin luovutus/tila: kierrokset 1.0.42 … 1.1 (73) raportoitu, docs/raportit/savukierros-*-2026093*.md; viimeisin savukierros
  `savukierros-1173-20260930.md` (5/5 PASS).

## PÄIVITYS 29.9.2026 klo 16.1x — LUE TÄMÄ ENSIN (tilinvaihto, Päätoimittajan käsky)
- **docs/raportit/viesti-laitetestaaja-luovutus-20260929-b.md** on uusin luovutus. Kärki:
  `laitetestaaja-savukierros-b13` @ **e4ef21d55**, ei avoimia PR:jä, ei käynnissä olevia ajoja,
  molemmat simulaattorit Shutdown. Viimeisin valmis kierros 1.0.50 fc26b44c 5/5 PASS. Sisältää
  myös kootut menetelmämuistutukset (Tekijätiedot-sijainti, iPad-vaaka-komento, kehittäjätila-
  virheen ohitus). Lue tämä ENSIN, alla oleva 06.5x-päivitys on vanhentunut tausta.

## PÄIVITYS 29.9.2026 klo 06.5x — vanhentunut, tausta
- **docs/raportit/viesti-laitetestaaja-luovutus-20260929.md** on uusin luovutus. Kärki: 1.0.42-
  yhdistelmän (25c7c971) radiolinssi — UI/mastot/renkaat/viritys täysin oikein, mutta `aani
  mittaa` näyttää rms=0 koko ajan (ei todellista ääntä), vaikka nostokortin kaiutin toimii
  normaalisti samassa sessiossa. Ei vielä omaa raporttitiedostoa, ei testattu iPadilla.
- Molemmat omat simulaattorit (1572C658, 3B4CDACB) ovat Shutdown.

## PÄIVITYS 28.9.2026 klo 22.2x
- **docs/raportit/viesti-laitetestaaja-luovutus-20260928.md** on uusin luovutus (1.0.39 TF:ssä, 1.0.40-juna
  tulossa/käännösvika, Thessalia-tarkistus, kehittäjätila Pulu-testeihin, simulaattorien tila). Fablen
  nykyinen nimi/id: Päätoimittaja (Opus, xhigh) local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31.
- Simulaattoreita ei bootata ilman Julkaisijan "LAITE NYT" -vuoroa; molemmat omat (1572C658, 3B4CDACB) ovat Shutdown.
- Alla oleva 27.9. teksti on taustaa; luovutus -20260927-b.md:n keskeneräiset kohdat on jo käsitelty.

## Lue ENSIMMÄISENÄ (27.9. versio, vanhentunut osin)
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
1. **1.0.32-junan savuke kun Natiiviseppä pyytää.**
2. Avoimet App Store -löydökset (docs/raportit/laitetestaaja-appstore-laatu-20260927.md) — seuraa
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

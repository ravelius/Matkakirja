# Natiivi-UI: luovutus 13.10.2026 aamupäivä (10.4x Suomen aikaa, PT:n nollauspyyntö, konteksti 57 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261012-ilta2.md (juna 184–186),
pysyvät säännöt -20261012-ilta.md ja -20261010-aamu.md. Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012.

## Lue ensin
1. CLAUDE.md (UI-POHJAT, VAIN EUROOPPA, LATAUS SAMA KAIKILLA VERKOILLA).
2. Raamattu: Ydinajatus kohta 2 TYÖTAPA JA SESSIOT, UI-POHJAT JA TYYLIMÄÄRITTELYT, NATIIVI ON MALLI.
3. Tämä raportti, sitten viesti-natiivi-ui-luovutus-20261012-ilta2.md.

## Tila
- Web main 5477216e5 (#4548). Proto: juna 187 = natiiviseppa/juna-187 (6ea5923d3, LS1 kippi-lontoo-praha), NS kokoaa.
- KUITATTU 187 (PT 10.4x): natiivi-ui/museo-palaute-187 **6335b749e** (pohja juna-186 c58a17631; SHA NS:lle lähetetty).
  - Museon nimilista ja kipin metrokartta (OpasMetrolinja) Dockina: sormen alla suurin, naapurit porrastetusti, jatkuvasti sormen mukana
    (SormiIndeksi, DockSeuranta 0,06 s); rivitys päätetään kerran suurimmassa koossa (SovitaKorostus, rivinvaihdot tekstiin, lukitus vasta
    kun asettelu ja kirjasin ratkaistu), paino ei vaihdu vedon aikana (lihava = nykyinen asema).
  - VALITSE NÄYTTELY (MuseoTaulu): oppaan aloituksen kaksi saraketta; otsikko KORTTI-otsikko sarakkeen leveyden mukaan lähimpään
    tyylikirjan kokoon (iPhone 21, iPad pysty 26, vaaka 34), SK:n selite ui.museo.aloitus-selite (PT hyväksyi), Kunniagallerian 2:1-kuva
    hitaasti panoroiden (Panoroi, 48 s; Linssit/Resources/Museo/alankomaat/nayttelykuvat/kunniagalleria-panoraama.jpg, Marco Almbauer PD,
    Tietoja + LAHTEET.md), näyttelyt kapeampana (SarakeSuhde 0,72, max 460), Poistu linssistä tekstinappina oikeassa alakulmassa,
    esikatselu vierekkäin esittelysarakkeen päälle (pinossa kuten ennen), vaakana sarakkeet pystysuunnassa keskelle.
  - Nappien läpinäkyvyys: omistaja valitsi vedoksen 2 kaikkiin pelien ja linssien kuvakenappeihin → tyylikirjan tokenit harmaa-kuulto
    nappi-reunus rgba(224,224,224,0.15) ja nappi-kuvake rgba(240,240,240,0.65) (web tyylikirja.json f92e33ff655f), Pohjat/ohjausnappi.uss
    käyttää niitä harmaa-kuulto-teemassa (painettuna korostus); myös astrokuvan väkänen, ISS-ohjauksen napit ja linssin sulkupilleri.
    Kaikki pelien/linssien OHJAUSNAPPI-ryhmät ovat jo harmaa-kuulto (Ryhma-oletus). Lautapelien ja raketin tekstinapit jäivät ennalleen (PT).
  - todistusajo.sh: uusi komento liuku-kohta (hidas tasainen veto videolle).
- Web PR ravelius/Matkakirja#4550 (natiivi-ui-tyylikirja-kuulto 9bf3c7e5a): vain tokenit tyylikirja.json + css/styles.css, webin ☰ jää
  ennalleen (PT: NATIIVI ON MALLI). Merge junan 187 web-mergejen mukana vasta omistajan julkaisupyynnöstä.
- Todisteet PT:lle: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-juna187-pt/ (1–10) ja .../b/ (11–19).

## Pushatut, kuittaamattomat haarat
- natiivi-ui/kuvakkeet-187 **8f574aa00** (pohja natiiviseppa/juna-187 6ea5923d3, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kuvakkeet187,
  käännetty 5b88e256c, appikopio natiivi-ui-app-kuvakkeet187): Codexin 64 viivakuvaketta (posti/kuvakkeet-20261012-kaikki, SK tarkisti).
  f74c656bd: Ikonit-vakiot (A-ryhmä: ratas, valikko, mikseri, kulmat, nuolet, toisto, tunnusluvut), Pulun mikki/näppäimistö, Päävalikon
  maapallo, KaupunkiKortti lehti + kelaus ylös, Työhuoneen kehittäjälehden rivit, 11 linssin Ikoni-kenttää (Linssit/Ydin + Unity);
  tunnusluvut 24-ruudukkoon (Lehtinakyma Ruutu 15 pois), rahan kolikon keskipiste (Ylapalkki −20/−20,5). 8f574aa00: kohdekartan − ja +,
  tilastojen ▸ kuvakkeina, tavaroiden ja matkamuistojen rivikuvakkeet; Viiva-avaimet lisaa, vahenna, tieto, laajenna-kolmio, kausi-piste,
  tavara, matkamuisto, tallenna, lataa. Kytkemättä (päätös/pohja): "i"-seloste-nappi (Matkalaukku, Minipopup, ProOsio: ympyrä kuvakkeen
  ympärillä tuplaantuisi), ISS:n " •", Äänentasot tallenna/lataa (tekstinapit).

## Kesken — tee nämä ensin
1. Kuvakkeiden todiste: simu kuvakkeet187 iPad oli käynnissä 10.41 (kuvakkeet187-simut.sh, SIMU NYT Julkaisijalta saatu; iPhone perään).
   Tulokset todistus-kuvakkeet187-*-20261013-1041 ja kuvakkeet187-simut.log. Skenaario sk-kuvakkeet187(-vaaka).txt korjattu: ui tyohuone
   kehittajalehti, ui tyohuone tilastot (mikseri pois: MikseriPaneeli puuttuu ilman avausta). Edellisessä ajossa (0855) kartta, Linssit ja
   Pulu näkyivät, laukku avasi matkan tilastot. Ilmoita Julkaisijalle SIMU VAPAA. Katso kuvat, merkitse NYKYINEN | UUSI tarvittaessa
   (pari.py), lähetä PT:lle kuittaukseen; kuittauksen jälkeen SHA NS:lle (pohja juna-187).
2. Bugikorjaukset PT:n jonosta: keskeytetty kerronta, Macin lehden vieritys, kehittäjätila (kysy PT:ltä tarkemmat oireet, jos aloitus-
   viestissä ei ole; vika toistetaan ensin simussa).
3. SK:n museo-kysymykset.json (moduuli moduulit/js/linssit/museo-kysymykset.json) → tarkista avainmuoto (teoksen id / "_museo").
4. TF:n jälkeen: rahan tulo (sk-raha), Aloita kisa iPhone pelaajatilassa (sk-aloitakisa), Googlen laatat pois -kuva.

## Odottaa päätöstä
- "i"-seloste-napin kuvake: nykyinen pyöreä kehys + "i" vai Codexin "tieto" ilman kehystä (OHJAUSNAPPI-pohjaa ei ole tähän) → PT.

## Ajoskriptit (natiivi-ui-ajoskriptit-20261012)
- museo187-ajo.sh kaanna|ipad|iphone (HAARA, APPDIR, SKEN, LINJA ympäristöstä; T = museo187-worktreen todistusajo.sh, jossa liuku-kohta).
- juna187-c/f/g/h.sh: käännös omaan appikopioon + simut; kuulto-arkki.py (napit suurennettuina), skenaariot sk-museo187(b), sk-kippi187,
  sk-napit187, sk-kuvakkeet187 (+ -vaaka). Videot pakattu ffmpeg -crf 26 scale -2:1280.

## Opetukset
- UiRuutu.Korkeus on pikseleitä, ei paneelin pt:tä (iPhonen panoraama vei koko sivun) → käytä elementin layoutia.
- Metrolinjan sovitus ennen asettelua/kirjasimen ratkeamista lukitsi väärän rivityksen → odota nimi.layout ja inline=resolved fontti.
- iPadin "iso otsikko": sama pt-suhde riveihin ei näytä isolta isolla ruudulla → mitoita sarakkeen leveydestä tyylikirjan kokoihin.
- Museon julkisivu ("Astu sisään") on nyt ennen VALITSE NÄYTTELY -sivua: skenaarioon tap-teksti Astu sisään. iPhonella alimmat rivit
  vieritysalueen alla (tap-teksti ei löydä) → valitse ylempi rivi.
- Kierros etenee vedosten välillä: ota samasta näkymästä ui museotauko ensin. Kipin napit häivytetään levossa (näkyvät kosketuksessa).
- Uusi käännös omaan appikopioon (APPDIR), kun edellisellä ajetaan vielä simua.

## Aloitusviesti
Tulee PT:ltä (docs/raportit/viesti-natiivi-ui-aloitus.md osoittaa tähän raporttiin).

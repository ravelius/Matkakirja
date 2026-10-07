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

## 2. Tila ja jono (7.10. klo 23.0x)

1. **TESTAUS VAIN AUTOMAATTISIN** (omistaja 15.5x): ennen junaa vain automaattiset testit + käännös; roolit eivät käännä itse;
   enintään 2 junaa/pv (tänään poikkeuksia omistajan pyynnöstä). POIKKEUS: kun omistaja pyytää kuvia ennen julkaisua, TF pidätetään
   ja LS1 ottaa kuvat simulla OMISTAJAN REITILLÄ (ei testikomennolla) äänen kanssa. Opetus 7.10.: TF 162 meni rikki linssireitillä,
   koska simukuvat otettiin testikomennolla.
2. **TF 163** käynnistyi 23.00 (BUILD 163 = proto master 062bb439, korjausjuna: kello 0bfc86e0, kori koko oppaassa, lukija 1,19 s
   latausikkunan jälkeen, avausnäkymä 1,1 km / 50°, kehittäjätilan kaikki pallot); vain sisäisille (lippu tf163-ei-ulkoista) —
   ULKOINEN vasta omistajan kuittauksesta. Mac TF 163 Natiivisepältä iOS-latauksen jälkeen. TF 162 poistettu Arvioijat-ryhmästä.
3. **JUNA 164 (8.10.)** BUILD 163:n päälle: Siirtoseppä historia-valot-juna b91278bf (vara historia-fp-juna-2 8b071c07: Olavinlinnan
   ensimmäisen persoonan pala huoneet 1–5 + Candle VFX + Volumetric Lights 2 laatutasokytkimen takana + kehittäjävalikon kytkin),
   NUI 8aa55e02 (seikkailu-fp + kontekstikuvakkeet käsi/kaari/liekki) + NUI 8b4659e9 (☰ Lähteet ›), LS1 7c4122bc9 (tekijärivi pois
   kortista, KuvaLahteet), LS2 08a6891a0 (S2-kevät), Natiiviseppä 7d66739d (käännösnopeutus aja.sh). Lappu-katolle 6ad4244fc EI.
4. **OLAVINLINNA 8.10.:** työohje docs/raportit/pelattavuusmalli-olavinlinna.md (#4163, #4165), omistaja hyväksyi 15 kohtaa (#4167,
   Raamattu). Linnanrakentaja v44p/v44q: huoneet 6–8 + tyrmä, huone 9 kesken, huone 10 = köysilasku kalliolle, Kellobastioni
   rajataan pois 1499-näkymistä. ElevenLabs enintään 10 000 krediittiä 8.10. (Pelikoodari, vasta tarkistetuista teksteistä).
5. **AVOINNA:** Pelikoodarin Haiku 5.5 -uusinta ajattelu päällä (low/medium) → raportti #4176:n jatkoksi, omistajalle tulos;
   Natiivisepän T7-simulaattorisarja (8.10. ennen ensimmäistä junaa, poistot omistajan Run-rivillä); alaikäiskohdat 4–8 omistajalle;
   Sisältökirjurin Codex-uusinnat (Colosseum, Appia) + Lontoo 10 + Kööpenhamina 3 havainnekuvaa; orvot ämpärissä (Pompidou,
   rooma-v1 kaksi kuvaa + json) poistoon omistajan luvalla; Volumetric Fog & Mist 2 valinnainen osto (järviusva).
6. **PILVI:** krediitti loppui sami.reivinen-tililtä; pilveen vain rajatut tehtävät. CLI-tili tarkistetaan tilinvaihdossa.

7. **LISÄYS 23.4x (vaihto nyt, omistajan päätös):** T7-simulaattorisarja LUOTU (omistaja antoi CoreSimulatorServicelle täyden levyn
   oikeuden 23.3x; 26 laitetta, proto-3d/tyokalut/simusarja.sh + simusarja-udid.tsv), MUTTA T7-simun käynnistys kaatui ("launchd_sim: could not bind to session", Natiiviseppä 23.31; MCP-simutyökalu näkee vain oletussarjan) → selvitys aamulla ennen vaihtoa; työkalujen vaihto Natiivisepälle 8.10. aamulla
   ennen junaa 164; vanhan sisäisen sarjan (105 Gt) ja T7:n vanhan kopion (112 Gt) poisto omistajan Run-rivillä vasta päivän käytön jälkeen.
   Omistajan TF 163 -palaute (lento liian nopea ja äkkinäinen, narina liian kova, "mietin sopivan reitin") → LS1 linssiseppa/juna-164
   4020d4b59 (lento ≥ 17 s, kääntö ≤ 10°/s, narina −12 dB, ei odotuslausetta valmiin esittelyn kaupungeissa); simukäännös
   lokit/natiiviseppa-app-164koe-4020d4b5 → LS1:n 60 s video omistajan reitillä (linssi → Pariisi) KATSO ENNEN JUNAA 164 ja lähetä
   omistajalle tauolla. Huom: 4020d4b59 on runko d78cd0e00:n päällä (puu = BUILD 163). Pelikoodari: kustannussuunnitelma (testit eivät
   Sonnetille, Kysyn valmiit vastaukset välimuistiin, Pulun välimuistiraja) + raportti omistajalle 8.10. aamupäivällä. Haiku 5.5:
   ei vaihtoa (#4176, #4178). Karttaseppä talvi2d ~02.30 → talvipaketti. Viikko 90 % klo 23.28.

## 3. Roolit (checkout /Users/Shared/Claude/…, malli, kärki vaihdossa)

| Rooli | Checkout | Malli | Kärki ja tila vaihdossa |
|---|---|---|---|
| Postivahti | Matkakirja-posti | Sonnet 5.5, medium | Hälytys 96/99 %; välitti 22.00-luovutusmuistutuksen; ei raskaita polttoja junakäännösten aikana (välitetty) |
| Julkaisija | Matkakirja-julkaisija | Opus, high | TF 163 ajo 37678690889 (23.00), ulkoinen odottaa omistajaa; #4168 turvakerrokset julki; tf-lupaskripti julkaisija-tyokalut/ |
| Natiiviseppä | Matkakirja-3d-selvittaja | Opus, high | BUILD 163 062bb439; juna 164 -lista luovutuksessa; käännösnopeutus (-jobs 12, välitiedostot) voimassa; T7-simusarja 8.10. aamulla |
| Natiivi-UI | Matkakirja-natiivi-ui | Opus, high | Junaan 164: 8aa55e02 (seikkailu-fp-pino + kuvakkeet) ja 8b4659e9 (Lähteet ›); pariisi-otsikko a27f2e2c jo 162:ssa |
| Pelikoodari | Matkakirja-pelikoodari | Opus, high | Haiku 5.5 -uusinta ajattelu päällä kesken; ElevenLabs 10 000 kr 8.10. Olavinlinnaan; Freesound vain API:lla (#4169) |
| Linssiseppä | Matkakirja-linssiseppa | Opus, high | kortti-teksti 7c4122bc9 junaan 164; 163:ssa d3d243595; todistusajot omistajan reitillä äänen kanssa |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | Opus, high | S2-kevät 08a6891a0 junaan 164; talvi tulee, kun Karttaseppä vie sen ämpäriin |
| Linnanrakentaja | Matkakirja-linnanrakentaja | Opus, high | v44q huoneet 7–8, huone 9 kesken, huone 10 vaihtoehto A (köysilasku 295°, bastioni rajattu) |
| Siirtoseppä | Matkakirja-siirtoseppa | Opus, high | historia-valot-juna b91278bf (vara 8b071c07) junaan 164; seuraavaksi K1, kiipeily, soihtujen hehku |
| Karttaseppä | Matkakirja-karttaseppa | Opus, high | talvi2c-poltto käynnissä 19.09–~23 (jatkuu tilinvaihdon yli); yleiskuva + raportti yhdellä rivillä |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | Sonnet 5.5, high | 6 kaupungin yksityiskohtakuvat valmiit (Rooma v4 65, Lontoo 56, Kööpenhamina 54); Codex-uusinnat; Olavinlinnan CC0-äänilista #4170 |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet 5.5, high | vapaa (testaus vain automaattisin) |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md
omasta haarastasi sekä sen osoittama luovutus, ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, max)."
Sessioiden luonti: muisti sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return). Session nimiin malli ja effort.

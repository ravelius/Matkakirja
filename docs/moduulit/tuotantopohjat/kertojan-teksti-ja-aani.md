# Tuotantopohja: kertojan teksti ja ääni

*(LUONNOS 17.10.2026, Äänittäjä, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit; uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa.
Pohjan omistaa Äänittäjä (ääni) ja Sisältökirjuri (teksti), PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: ÄÄNI mallinäyte ja lyhyt kuvaus siitä, miltä pitää kuulostaa (Gemini vertaa valmista ääntä mallinäytteeseen sokkona, 9.11); UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää. Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

Tämä pohja kattaa kaiken, minkä pelissä lukee ääneen kertoja (isoisä, William, Pulu): kaaritekstit, kaupunkien ja museoiden
kertomukset, historiaosiot, selitteet, Pulun vastaukset ja kutsut. Se ei kata musiikkia, tehosteita eikä askelia
(`aanipohja.md`) eikä pelikytkentöjä (kytkijän oma työ).

## 1. Tuotantoputki ja roolit

```
Sisältökirjuri: teksti (hyväksytty, faktat tarkistettu)
  → PT: merkkimäärä + lupapyyntö → KK → omistajan lupa nimetylle erälle
  → Äänittäjä: otto (ElevenLabs) + mittaus
  → ääniportti (pakollinen vaihe vie-paketti.sh:ssa)
  → ämpäri (vie-paketti.sh, ei ylikirjoita)
  → kytkentä (Pelikoodari / Linssiseppä / Siirtoseppä / Natiivi-UI) + ilmoitus Äänittäjälle
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Lukutarkistus | Äänittäjä + kytkijä | Selvillä, tarvitaanko tiedostoa lainkaan (ks. kultainen polku 1) |
| 1. Teksti | Sisältökirjuri (kaanon: PT) | Hyväksytty teksti, pituusbudjetin sisällä, tagit lisätty |
| 2. Lupapyyntö | PT → KK → omistaja | Sanatarkat tekstit, palvelu, leikemäärä, merkkimäärä; "OMISTAJAN PÄÄTÖS klo …" |
| 3. Otto | Äänittäjä | Raaka-otot talteen, mp3, aikaleimat |
| 4. Portti | Äänittäjä | `aaniportti.py` läpi |
| 5. Vienti | Äänittäjä | Ämpäri + `LAHTEET.md` + SHA256SUMS + manifestirivit |
| 6. Kytkentä | Kytkijä | Manifestirivit pelissä, mykistykset pois |
| 7. Retrospektiivi | Äänittäjä | Kirjaus tämän pohjan opit-osioon |

Äänittäjä ei tee pelikytkentöjä eikä kirjoita tarinatekstiä. Kanavat: viestit `send_message` session id:llä
(osoitekirja), PT:lle enintään 3 riviä; yksityiskohdat tiedostoon (paketin `LAHTEET.md`, luovutus).

## 2. Kultainen polku (oletustapa)

1. **Tarkista ensin, lukeeko peli tekstin jo itse.** Jos `KortinLukija` / `Puhe.Lue` lukee tekstin workerin kautta
   (kuvaselitteet, nostokortit, lehdet, kaupunkikartan esittelyt, museon ympyrät), esiäänitystä ei tarvita. Älä valmistele
   tekstejä äläkä pyydä lupaa ennen kuin kytkijä on vahvistanut, että tiedosto todella tarvitaan. (Louvren 152 ympyrää
   17.10.: lupa 20 800 mrk jäi käyttämättä, koska peli lukee ne suoralla lukijalla.)
2. **Teksti ensin valmiiksi, ääni viimeisenä.** Kaikki korjaukset ovat ilmaisia ennen ensimmäistä generointierää ja
   maksullisia sen jälkeen (tarinakaari.md, luku 7). Auditit tehdään tekstivaiheessa.
3. **Ruututeksti = luentateksti sanasta sanaan.** Lisätään vain tunnetagit ja kirjoitusasun sovitukset (SUURAAKKOSET
   pienennetään, luvut sanoiksi). Tagit 2–5 per luenta, alku ja loppu eri sävyssä.
4. **Lupa ennen jokaista generointia.** Uusia ääniä ei generoida ilman omistajan lupaa (Raamattu, UUSIA ÄÄNIÄ EI
   GENEROIDA). Lupapyynnössä on sanatarkat tekstit, palvelu, tarkka leikemäärä ja merkkimäärä; määrän päättää omistaja,
   ja jokainen lisäys tai ylitys vaatii uuden luvan. Lupa tulee vain KK:n suoralla "OMISTAJAN PÄÄTÖS klo …" -rivillä;
   PT:n välittämä ei riitä, vaan Äänittäjä pyytää vahvistuksen KK:lta. Poikkeus: kertojaäänillä on pysyvä lupa
   PT:n hyväksymiin teksteihin (ei Pulu, ei uudet isoisän tekstit).
5. **Luvut sanoiksi ENNEN merkkimäärän laskemista.** Numerot kasvattavat tekstin pituutta puhuttuna (esim. +662 merkkiä
   yhdessä erässä), joten lupapyynnön merkkimäärä lasketaan puhutusta muodosta. Muuten lupa ylittyy ja tarvitaan uusi.
6. **Ääni ja malli oikein.**
   - Isoisä: AINA `eleven_v3` (omistaja 14.10.), text-to-dialogue, yksi otto, loppufade 150 ms + hiljaisuus.
   - Kertoja William (`oae6GCCzwoEbfc5FHdEu`): `eleven_v4_turbo`, nopeus vain ElevenLabsin `speed`-asetuksella (ei atempoa, omistaja 19.10. klo 10.19). Pelin lukijana workerin avaimessa on
     `eleven_v4` (säilöavain sha256 `malli|ääni|ohje|teksti`).
   - Pulu (`piI8Kku0DcvcL6TTSeQt`): `eleven_v4_turbo`, stability 0,5, `language_code fi`, −17,2 LUFS, ei ffmpeg-nopeutusta
     (`livia-aani.md`).
   - Kahden tai useamman äänen keskustelu yhtenä dialogiottona, ei repliikki kerrallaan.
   - **Kieli aina pakotettu suomeksi: pyynnön rungossa `"language_code": "fi"` JOKAISELLE äänelle (William, isoisä, Pulu).**
     Ilman sitä vieraat nimet (esim. "Louvre" ensimmäisessä lauseessa) vievät lukijan ranskaan ja suomi äännetään vieraalla
     aksentilla (omistajan havainto 17.10.2026 klo 22.54; vanhat ranska-*-skriptit). Tarkista rungosta ennen ajoa.
     Whisper-kielitunnistus ei erota aksenttia (suomi 0,99 myös aksentilliselle otolle), joten tarkistus on rungossa, ei äänessä.
   - Raaka tallennetaan heti: uusintaa ei tehdä, jos raaka kelpaa.
7. **Ääniportti ennen vientiä** (`proto-3d/tyokalut/aaniportti.py`, ajetaan `vie-paketti.sh`:ssa automaattisesti):
   true peak enintään 0 dBTP, lyhyiden kertaäänten kovuus. Puheelle ajetaan ilman `--puhe`-valitsinta (Whisper antaa
   suomelle vääriä hylkäyksiä).
8. **Vienti uusilla nimillä.** Ämpäri ei ylikirjoita ja objektit ovat muuttumattomia. Korjaus = uusi nimi (`-v2`, `-v3`, `-b`)
   sekä täysi ajat- ja manifestirivi-tiedosto; ilmoita kytkijälle, mikä rivi vaihtuu. Kansion nimessä on `-vienti-`.
9. **Mykistys.** Kun hyväksytty tekstimuutos viedään dataan, vanha luenta merkitään `mykistetyt`-kenttään, kunnes uusi
   on generoitu ja kytketty. Peli ei koskaan soita vanhoilla sanoilla.
10. **Gemini kuuntelee sokkona ennen omistajaa** (Raamattu 9.11, omistaja 19.10. klo 15.21; korvaa 11.10. linjauksen
    "kuuntelematta saa viedä"): omistaja ei ole ensimmäinen kuuntelija. Whisper-vertailu (sanasuhde) on tiedoksi, ei tuomari:
    vieraat nimet se kirjoittaa suomalaisittain.
11. **Avaimet.** `source ~/.zshrc` samaan komentoon (ELEVEN_API_KEY); avainta ei koskaan repoon, lokiin eikä viestiin.

## 3. Valmiin määritelmä (tarkistuslista)

Paketti ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Varmistettu, ettei peli lue tekstiä jo workerin kautta (`KortinLukija` / `Puhe.Lue`).
- [ ] Teksti hyväksytty ja pituusbudjetin sisällä (saapuminen ≤ 380, kohtaaminen ≤ 260, aarre ≤ 220, kohde ≤ 800 merkkiä).
- [ ] Lupa on KK:n suoralla rivillä, ja leikemäärä ja merkkimäärä (puhutussa muodossa) pitävät.
- [ ] Luvut ja lyhenteet sanoiksi: tarkistettu 100–199 ("sata…", 104 = sataneljä), "eaa./jaa." lauseen lopussa saa pisteen,
      vuosiluvut yhteen, taivutukset oikein.
- [ ] Oikea ääni ja malli (isoisä `eleven_v3`, kertoja turbo, nopeus vain `speed`-asetuksella, Pulu oma resepti); kieli `fi`.
- [ ] Vieraiden nimien ääntämysvihjeet tehty (esim. `orsay-rf-2027b`); Whisper-poikkeamat luettu.
- [ ] Taso mitattu: kaari −14,6 LUFS, fokus ja Pulu −17 LUFS, muut tyypin mukaan; fade ja hiljainen häntä.
- [ ] Aikaleimat tehty, jos peli ajoittaa niillä (huudahdukset, tekstin eteneminen).
- [ ] Ääniportti läpi, vienti ok, `LAHTEET.md` (lisenssi ja tekijä) ja SHA256SUMS mukana.
- [ ] Manifestirivit toimitettu kytkijälle ja kytkijä kuitannut; `mykistetyt` poistettu.
- [ ] Raaka-otot talteen `_tyo/<aihe>-<pvm>`-kansioon (ei poisteta).
- [ ] Retrospektiivi kirjattu tämän pohjan opit-osioon (luku 5).

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois
(esim. isoisän turbo-teksti uusitaan v3:lla vain PT:n päätöksestä).

## 5. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttuu pohjassa.

*(Rivit 19.10.2026 on siirretty lokista ja muistista omistajan päätöksellä 19.10. klo 15.35; uusia sääntöjä ei ole.)*

- **20.10.2026, juoksupelin avaus (4 + 2 ottoa).** Hidasti: musiikiksi otettiin "valmiista lähteestä" Freesoundin erhu vastoin linjausta
  (omistaja: "ääni oli huono"); yhden oton "Majesteetti!" litteroitui "Mahesteetti" (heikko j), ja kahden huudon piti kuulostaa kahdelta
  ihmiseltä, vaikka kaikki otot olivat 35–45-vuotiailla äänillä. Muuttuu: musiikki aina Lyrialla (Raamattu 5.15), muuten lupa omistajalta;
  lupa lasketaan teksteistä (tageja ei, jos raja on pelkät tekstit); eri hahmo = eri ääni äänipankista, vanhalle hahmolle etsitään ensin
  pankista (`mies-80-hauras-vanhus`); Whisper-base/small ja Gemini paljastavat heikon kirjaimen ennen omistajaa; luvan ottomäärä on
  yläraja, uusinta kuluttaa sen (06:n uusinta ylitti luvan, PT:n virhe). Lähde: luovutus 20.10. 17.52.
- **20.10.2026, vienti uudelle polulle.** `vie-paketti.sh` ei ylikirjoita; korvaava otto tai käsitelty (venytetty) versio tulee uudella nimellä
  (`-pitka`, `-v2`) ja kytkijä vaihtaa polun. Venytys ffmpegin `atempo`-suodattimella (0,7) tehtiin vain PT:n pyynnöstä huudoille; kuuntelun
  varassa, koska "ei jälkisäätöjä puheeseen" -oppi (19.10.) koskee muuten kaikkea nopeutusta.
- **19.10.2026, omistaja ei ensimmäinen kuuntelija (J1).** Hidasti: puheessa omistaja löysi virheet ensin (ranskan aksentti
  17.10.). Muuttuu: Gemini kuuntelee otot sokkona ennen omistajaa. Kultaisen polun kohta 10 korjattu (PT 19.10.). Lähde: loki "OMISTAJAN PÄÄTÖS 19.10.2026 klo 15.21".
- **19.10.2026, ei jälkisäätöjä puheeseen.** Hidasti: nopeutus ffmpeg-atempolla (17- ja 20-ääni) kuulosti omistajasta
  huonolta. Muuttuu: nopeus ja tunne vain ElevenLabsin `speed`-asetuksella (natiivisti noin 1,2:een), tageilla ja äänen
  asetuksilla; tasoitus, leikkaus ja häivytys sallittuja. Pohjan vanhat "tempo 1,10×" -rivit korjattu (PT 19.10.); vanhat julkaistut otot eivät muutu ilman omistajan päätöstä. Lähde: loki "PAATOS 19.10.2026 klo 10.19
  (kortti)"; muisti puhe-ei-jalkisaatoja.
- **19.10.2026, äänistä ei kysymyskortteja.** Muuttuu: otot lähetetään omistajalle tiedostoina ja palaute tulee tekstinä;
  generointilupa (määrä, merkit, tekstit) pyydetään tekstinä, ei kortilla. Lähde: muisti aanet-ei-kysymyskortteja.
- **19.10.2026, Olavinlinnan M-osa (KK-katselmus).** Hidasti: 16 repliikkiä oli jo ämpärissä kolmena versiona, mutta lupa
  pyydettiin "ääntä ei ole" ja generoitiin silti 20 (a60da1d3c, ac29287f5). Muuttuu: ämpärin manifesti tarkistetaan ennen
  lupapyyntöä (KK:n katselmuksen suositus, ei vielä Raamatussa). Lähde: scratchpad putket-lapikaynti-20261019, ääni V5.
- **17.10.2026, Louvren alut ilman `language_code: fi`.** Hidasti: lähestymispuhe ja salien avaukset äännettiin ranskan
  aksentilla; 47 riskiottoa (24 411 mrk) jätettiin uusimatta omistajan päätöksellä ja uusittiin vain Louvren lähestymispuhe
  ja salien avaukset (louvre-inv-* ennallaan). Muuttuu: kultainen polku 6 (suomi aina pakotettuna, testi kaatuu ilman
  `fi`:tä). Lähde: loki "AANIGENEROINTI: SUOMI AINA PAKOTETTUNA; LOUVREN ALUT UUSITAAN (17.10.2026 klo 23.05)".
- **17.10.2026, maalehtierä 831 (luennat).** Hidasti: kustannusarvio 0,226 × 369 643 = ~83 500, toteutui 90 067
  (374 867 lähetettyä merkkiä). Muuttuu: arvio 0,240 kr / lähetetty merkki, `[pause]`-tagit (+8 mrk/pala) mukaan lukien.
  Lähde: muisti aanityksen-hinta-0240-tagit-mukaan.
- **28.9.2026, Pulun tagit.** Hidasti: `[softly]` kuulosti omistajasta liian surulliselta (sävel ja taso laskevat loppua
  kohti). Muuttuu: Pulun teksteissä ei `[softly]`/`[whispers]`; tilalle `[warmly]`, `[amused]`, `[mischievously]`, yksi tagi
  per virke. Lähde: muisti pulun-tagit-ei-softly.
- **17.10.2026, Louvren ympyrät.** Hidasti: tekstit ja skriptit valmisteltiin ennen kuin tiedettiin, että peli lukee ne
  suoralla lukijalla. Muuttuu: kultainen polku 1, lukutarkistus ensin.
- **17.10.2026, luvut sanoiksi.** Hidasti: merkkimäärä kasvoi puhutussa muodossa (+662), joten lupapyyntö olisi ylittynyt.
  Muuttuu: merkkimäärä lasketaan puhutusta tekstistä (kohdat 5 ja valmiin määritelmä).
- **16.10.2026, Ateena ja Ranska.** Luvut 100–199 ja "eaa." lauseen lopussa korjattiin jälkikäteen (5 uutta ottoa).
  Muuttuu: lukutarkistus on valmiin määritelmän kohta. "eaa." korvataan vain sanarajalla (`\beaa\.`), koska "makeaa."
  rikkoutui kerran.
- **16.10.2026, Ranskan 51 kertomusta.** Whisper löysi yhden nimen (Orsay), jota ääntämysvihje korjasi; faktakorjaukset
  maksoivat 6 uutta ottoa. Muuttuu: faktatarkistus ennen lupaa (kultainen polku 2).
- **15.10.2026, ISS-selitteet.** Pelin säilön avain sisältää mallin, joten vanhat xAI-ajan äänet eivät kelvanneet.
  Muuttuu: tarkista säilöavain (`malli|ääni|ohje|teksti`) ennen kuin laskee puuttuvat.
- **14.10.2026, ElevenLabs-aikaleimat.** Sopivat lauseajoitukseen, mutta eivät iskun rytmitykseen. Muuttuu: mittaa
  energia-alku, kun ajoitus on tarkka.
- **Ämpärin muuttumattomuus.** Ylikirjoitus samaan nimeen ei onnistu; korjaus aina uudella nimellä ja kytkijälle ilmoitus.

## 6. Lähteet

`docs/moduulit/tarinakaari.md` (luvut 4, 7, 8), `docs/moduulit/livia-aani.md`, `docs/moduulit/aanipohja.md`,
Raamattu: UUSIA ÄÄNIÄ EI GENEROIDA ILMAN OMISTAJAN LUPAA, ÄÄNIPORTTI, LUKIJAÄÄNI WILLIAM, DIALOGIT YHTENÄ OTTONA,
TUOTANTOPOHJAT; Äänittäjän luovutukset 14.–17.10.2026 (`docs/raportit/viesti-aanittaja-luovutus-*.md`).

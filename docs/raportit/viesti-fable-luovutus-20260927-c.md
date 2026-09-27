# Fablen luovutus 27.9.2026 klo 23.4x (tili D, Opus xhigh; oma nollaus 70 %)

Sessio local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc ("Fable (Opus, xhigh)"). Kaikki tämän illan päätökset ovat lokissa
(docs/raamattu-loki/paatokset-2026-09.md, klo 17.23 alkaen). Edellinen luovutus: -20260927-b.

## 1. Roolisessiot (ÄLÄ luo uusia)

| Rooli | Session id | Tila 23.4x |
|---|---|---|
| Postivahti (Sonnet) | local_63227b57-d045-4b93-ab52-cddc04e3b90f | nollattu 17.5x, kierto 10 min |
| Julkaisija (Opus) | local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 | 1.0.33 TF-vienti + #3426 sisältöjuna |
| Natiiviseppä (Opus, **max** klo 22.5x alkaen) | local_04e2850b-d63c-481d-be73-c7d784a7cbcb | 84 % → käsketty: aloituslento v2 -video → luovutus -o → clear |
| Pelikoodari (Opus) | local_242febe9-d6cf-45ae-8280-faf394dc6e3e | webin laattavika (kärki), sitten ihme-nappi pois |
| Natiivi-UI (Opus) | local_e9fdc695-8421-4c14-a187-8881e73c835a | nollattu 22.0x, 1.0.34-jono |
| Linssiseppä (Opus, max) | local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 | nollattu 23.2x, lippu + 3D-symbolit, erä 5/6 |
| Siirtoseppä (Opus) | local_c264506b-dd61-4617-839f-23daf6d0bd5a | E2E-offline-testi aamulla (Tanska, Kroatia) |
| Karttaseppä (Opus) | local_4bd7c316-55bc-423a-9da1-821fdd123cab | nollattu 20.4x, seuraa yöpolttoa |
| Sisältökirjuri (Sonnet) | local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 | 79 % → käsketty: ROU-tekstien tarkistus #3514 → luovutus -j → clear |
| Laitetestaaja (Sonnet) | local_3509b4ba-6000-4dea-869b-ecb22f4e3270 | nollattu 18.1x, idle (1.0.33 PASS) |

Nollauskaava: luovutus + clear_session "self" SAMASSA vuorossa roolilta → SendMessage notify_when_idle → list_events = 0 →
aloitusviesti send_messagella (id). Fable EI voi tyhjentää toista sessiota. Idle-ilmoitus voi tulla ennen clearia → tarkista aina list_events.

## 2. Tila 23.4x

- **TestFlight:** 1.0.31 (202609271444), 1.0.32 (202609271721), **1.0.33 viennissä** (BUILD 33 = proto-master edf03bfd, juna 508761e8,
  Laitetestaaja PASS 4a2c2f8c3): luentakorjaus (otsikko + leipäteksti, ei ohituksia), kuvakortti ei liiku/välky, äänivalitsin, 400 £,
  salaisuudet pois, VoiceOver-silta, erikoismallit erä 4, meri erä 2. Julkaisija ilmoittaa buildinumeron → kerro omistajalle.
- **1.0.34-jono (Natiiviseppä):** puhetagit (pelikoodari/puhetagit 9fac9748), rae + patina -säätimet, ihme-nappi pois (Natiivi-UI),
  lippu ja 3D-symbolit (Linssiseppä → linssiseppa/symbolit-lippu, Natiiviseppä mergeää), erä 5 (Kronborg/Visby/Nidaros, mallinseppa/era5
  d35e9f2c), Kinderdijkin symbolileikkaus, **aloituslento v2** (natiiviseppa/aloitusrata cf6b3d6f) vasta omistajan OK:n jälkeen.
- **Aloituslento:** v7 hylätty. Omistajan käsikirjoitus lokissa (klo 23.00) + korjaus: alku KORKEALTA napautetusta pallonäkymästä, 20 s sallittu,
  alkutekstit 3 paikkaa (Fable kirjoittaa lopulliset). v2-video tulossa Natiiviseppältä → omistajalle kortti.
- **Ensikäynnistyksen pergamenttivika (natiivi):** ei toistu simulaattorissa; epäily Metal-varjostinvälimuisti → fyysinen iPad -testi.
  **Webin laattavika (iPad Safari):** laatat katoavat pelatessa (suorakaiteet pergamenttia), ollut aiemminkin → Pelikoodari + Karttaseppä, KÄRKI.
- **Web mainissa illalla:** projektisivusto https://matkakirja.app/projekti.html (noindex), pollo-KV #3439, Pulun ramppi #3469,
  400 £ #3480, Alonnisos #3490, skeemat 1.52–1.55 (v250 tuotannossa, Eurooppa offline 1 334 Mt), maakuntapulu 10 maata #3510,
  Istanbul #3511. **Junassa:** #3513 puhetagit web + worker (web ensin, sitten pollo), #3426 Codex 5 historian hetkeä, #3514 ROU (odottaa tarkistusta).
- **YÖPOLTTO ajo-20260927y (Karttaseppä):** koko maailma: järvet GSHHG + matalan veden viileys 0,5, Oslon saaret, pintakohinan tasoitus,
  merireittien maaosuus, pallo Z0–Z9 + pallo Z10 koko maailma (215 121). z0–z8 noin 00.35, syvä z9–z10 T7-levylle, valmis aamulla.
  Vienti (Karttasepän luokitin estää "Production Deploy") ja osoittimen vaihto OMISTAJAN KORTILLA aamulla. Joet (suuntakorjaus 7337cc728)
  seuraavaan polttoon. Polttovahti v5e: julkaisulippu /tmp/matkakirja-julkaisu (J1 2 ydintä, J2 SIGSTOP), levyraja 40/45 GiB, kill < 20 Gt.
- **Yötauko:** vain julkaisut julkaisulipulla; muut raskaat ajot aamuun. Build-juna tauolla (/tmp/matkakirja-juna-tauko) → pura aamulla polton jälkeen.
- **xAI:** 100 300 mrk 27.9. (roolien testit), katto ≤ 5 000 mrk/vrk/rooli; puhetagit omistajan hyväksymät (ks. loki 23.11).
- **Levy:** 79 GiB, swap ~36 Gt. **Viikko: kaikki mallit 90 %** (kynnykset 93/95/97 → Postivahti), nollautuu ma 28.9. klo 10.00.

## 3. Omistajan päätökset tänä iltana (tärkeimmät, kaikki lokissa)

Roolit tuovat YHDEN mietityn suosituksen (ei parametri-A/B:tä; muisti tavoiteltu-kokemus-ei-parametreja); kontrastimuutokset hylätty (mutta kartan
sävy/kontrastisäätimet SÄILYVÄT); ei maakuntasalaisuuksia (Kreikan 14 → nostoiksi); Euroopan maakunnille pitkä + kuva + Pulu kaikille;
VAIN EUROOPPA maantieteellinen (ei merentakaisia); offline-media 100 Mt/maa; luenta korkein prioriteetti → julkaisu heti; poltto hidastuu vain
julkaisun ajaksi; erikoismallit erät 5 ja 6 hyväksytty; kuvakortti ei koskaan liiku; ihme-nappi pois (ihmekuva ensin, nykykuva pienenä); ihmeitä
saa lisätä mielekkäästi.

## 4. Heti seuraavaksi (uusi Fable)

1. **Odottava kysymys omistajalle:** lisätäänkö historian hetkiä Euroopan maihin, joista niitä puuttuu (nyt 49 + 5 junassa, Euroopassa 40
   hetkeä 14 maassa)? Kysy uudelleen lyhyesti.
2. **Ihmeet puuttuviin 14 Euroopan maahan** (AUT, NLD, CHE, DNK, SWE, SRB, BIH, ALB, MKD, MNE, CYP, MLT, MDA, BLR): Sisältökirjurin
   uusi konteksti ehdottaa mielekkäät → Codex-tilaus postilaatikon kautta. Ei vielä käsketty — käske Sisältökirjurin aloitusviestissä.
3. **Natiivisepän ja Sisältökirjurin nollaukset** (odota idle → list_events → aloitusviesti). Natiivisepän jonon kärki: aloituslennon v2-video.
4. **1.0.33 TF-buildinumero** omistajalle, kun Julkaisija ilmoittaa.
5. **Aamulla:** polton vientikortti omistajalle (Karttaseppä kokoaa), build-junan tauon purku, Siirtosepän E2E, Linssisepän erä 5 laitekuvat,
   lokisiivouksen seuraava erä tarvittaessa.
6. **Kronborgin nostoankkuri** (nostoankkurit-dnk.js 12.7125 E → linna 12.62 E) Sisältökirjurille.

## 5. Opit tänään

- Toimeksianto = tavoiteltu kokemus, ei parametrit; omistaja halusi Opuksen miettivän itse (aloituslento). Pelin keskeiset hetket Opus max.
- Tiivistelmä omistajan sanoista voi vääristää → lähetä roolille myös omistajan sanatarkka teksti.
- Pysyvä poisto ja NAS-siirrot: luokitin estää Fablelta ja rooleilta → komento omistajalle bash-lohkona (`!` ajetaan hiekkalaatikossa → NAS ei toimi).
- Commit `-a` otti mukaan .claude/settings.local.json → älä käytä `-a`; lisää vain loki/raportit.

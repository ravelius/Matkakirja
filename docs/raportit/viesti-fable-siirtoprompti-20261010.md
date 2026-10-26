# Siirtoprompti tilinvaihtoa varten (PÄÄTOIMITTAJA 10.10.2026 klo 12.3x, omistaja: "kirjoita siirtoprompti, täytyy vaihtaa tiliä")

**TILA 13.5x: TF 177 SISÄISILLÄ iOS + MAC (iOS de01f563 13.58, Mac 9283cd4f 13.54) → TILI VOIDAAN VAIHTAA.** Uudella tilillä tauko päättyy: aloitusviesti kaikille taulukon mukaan (LS1:n KIIRE 2 ensin), #4344 Julkaisijalle mergeen.

**VAIHTO VASTA JUNAN 177 LÄHDÖN JÄLKEEN** (omistaja 12.4x: "tili vaihdetaan vasta kun nuo bugit on korjattu ja juna lähetetty"). Päivitä taulukon SHA:t juuri ennen vaihtoa.

**TAUKO (omistaja 12.5x sanatarkasti: "Muut kuin bugi korjaus sessiot kannattaa pitää tauolla kunnes bugi korjaus julkaisu ja tilin vaihto on tehty"):**
töissä vain Natiiviseppä, Natiivi-UI (vain 6.7-korjaukset), Linssiseppä (Pariisin pallo), Julkaisija ja Linssiseppä 2 (vain Ateenan 6.7-diagnoosi);
Postivahti valvoo. Tauolla LR, Sisältökirjuri, Siirtoseppä, Laitetestaaja, Karttaseppä ja Pelikoodari (nollattu, aloitusviesti vasta uudella
tilillä). Tauko päättyy, kun juna 177 on lähtenyt JA tili vaihdettu: silloin kaikille aloitusviesti taulukon mukaan. #4344 mergetään vasta tauon jälkeen.

Tarkempi tila: docs/raportit/viesti-fable-luovutus-20261010-paiva4.md (KOKONAAN). Kirjaamatta: scratchpad/kirjattavat-20261006.md
loppu 10.1x–13.5x. Työjonot: scratchpad/tyojonot.md. Kaikki tiedostot ovat paikallisia (ei pushattu, koska push käynnistää CI:n).

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja kirjautuu työpöytäsovellukseen uudella tilillä, avaa session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, max) ja liittää:

> Olet PÄÄTOIMITTAJA (ent. Fable), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, max)".
> Checkout /Users/Shared/Claude/Matkakirja-fable (haara claude/bold-ride-vow4ki, älä pullaa päälle: tuoreet luovutukset ovat paikallisia).
> Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se), docs/raportit/viesti-fable-siirtoprompti-20261010.md ja
> docs/raportit/viesti-fable-luovutus-20261010-paiva4.md KOKONAAN sekä muistin MEMORY.md (erityisesti fable-tila-20261010-paiva5, tauko-bugikorjaus-tilinvaihto, fable-tila-20261010-paiva4,
> omistajalle-vain-olennainen, sessioiden-luonti-appia-ohjaamalla, sessionimet-malli-effort, viikkoraja-97-siirtoprompti).
> Ota roolisessiot käyttöön siirtopromptin kohdan 3 taulukon mukaan (lähetä kullekin aloitusviesti; jos sessioita ei ole, luo ne),
> kytke Remote Control kaikille ja itsellesi, luo JONOKIERROS-ajastus (kehote luovutuksessa -paiva3 kohta 5) ja jatka. Kysy omistajalta
> kortilla tämän tilin viikkoraja ja kerro se Postivahdille.

## 2. Tärkein heti

1. JUNA 176 → TF 177 (iOS + Mac) LÄHTEE NYT ilman LS1:n KIIRE 2:ta (omistaja 13.3x kortilla "Julkaisu nyt"): runko 2900f8e39 + Siirtosepän 04915cace, Natiiviseppä lukitsee, Julkaisija TF heti muutoslokin kuittauksesta. ENSIMMÄINEN TYÖ UUDELLA TILILLÄ: LS1:n KIIRE 2 (Macin kohdemerkit irti + kehittäjänäkymän kaupunkivalinta; iPhonella merkit oikein, diagnostiikka 2e11eac5b) Mac-toistolla vain kun omistaja ei käytä Macia → seuraava juna. Ateena ei 6.7-regressio (Ateenan oma vuoro).
   Natiiviseppä kokoaa (runko 51e42e7a6 + Siirtoseppä 023c37675), muistiajo etukäteen, Julkaisija TF heti lukituksesta. Ks. luovutus kohta 1.
2. Kaikki maat ja pääkaupungit (Karttaseppä + Sisältökirjuri) ja Codexin 342 havainnekuvaa (Sisältökirjuri tarkistaa toimitukset).
3. Kaupunkikappaleet: omistaja kuuntelee 16 äänisivulla → Pelikoodari vie peliin → loput 28.
4. Loki- ja Raamattu-PR kirjattavista (luovutus kohta 4).

## 3. Roolit (checkout /Users/Shared/Claude/…, malli, luovutus)

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Aja ensin git fetch origin && git checkout <haara> && git pull, lue CLAUDE.md,
Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md sekä sen osoittama luovutus kokonaan, ja jatka.
Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, max)."

| Rooli | Checkout (haara) | Malli | Luovutus / kärki |
|---|---|---|---|
| Postivahti | Matkakirja-posti (postivahti) | Sonnet 5.5, medium | 11dd7c0c4 (luovutus + aloitusviesti + KIERROS.md); jatkaa valvontaa, kerro uuden tilin viikkoraja |
| Julkaisija | Matkakirja-julkaisija (julkaisija-luovutus-20260928) | Opus, high | 59384de2f (14.00): TF 177 iOS de01f563 + Mac 9283cd4f sisäisillä 13.5x, #4346 (6eba562f1) alustarajaus; #4344 mergetään tauon jälkeen |
| Natiiviseppä | Matkakirja-3d-selvittaja (selvittaja-3d-luovutus) | Opus, high | 553b0cdc9 (13.40): juna 177 = 3d0c8c4a7 lähetetty, Mac 177 käännetty; seuraavaksi Unity 6.3 → T7 |
| Natiivi-UI | Matkakirja-natiivi-ui (natiivi-ui-luovutus-20261005) | Opus, high | 916d94dc6 (12.40): 6.7-osat junassa 177; seuraavaksi pääkaupunkien maakortti PT:n ehdoin (kirjattavat 13.0x: pysäkit voittavat, webin pariteetti) |
| Linssiseppä | Matkakirja-linssiseppa (linssiseppa-tyo-20260923) | Opus, high | bf0478f56 (13.38): Pariisin pallo d8808a222 junassa 177; ENSIN KIIRE 2 iPad Pro 11 -simulla (pyöritetty pallo: takapuolen merkit eivät piiloudu; kehittäjänäkymän napautus; omistajan kuvat proto-3d/lokit/omistaja-tf176-20261010/; vihje EnhancedTouch 68f860e85 ehkä jo korjannut 177:ssä); sitten museo2 |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 (linssiseppa2-tyo-20260928) | Opus, high | 130de894b (12.55): Peking vesi kuvattu → sauma + arkki, kupolan korjaus ≤ 2 h, ND v4c -pari LR:n jälkeen, Ateenan ilmakehä + oma vesi (PT 12.4x ja 13.0x) |
| Linnanrakentaja | Matkakirja-linnanrakentaja (linnanrakentaja-tyo-20260929) | Opus, high | 9f8eec8bd (12.57): kalibrointi OK (±5 %), ND v4c → Pekingin portti; palatsi 1499 PALA cf16ad94ef3c76bc (nykyasu kesken), NL-sali v2 -arkki PT:lle |
| Siirtoseppä | Matkakirja-siirtoseppa (siirtoseppa/luovutus-20261010-paiva) | Opus, high | 68bfdf23b (13.22): 04915cace junassa 177; erä 2 (palatsiraja) nyt aloitettavissa (LR:n palatsi 1499 valmis) |
| Karttaseppä | Matkakirja-karttaseppa | Opus, high | 97053cc6f (12.51, nollattu): Euroopan erä PR #4344 (d098bfd93) mergeen tauon jälkeen; muut alueet SK:n JSONeista |
| Pelikoodari | Matkakirja-pelikoodari (pelikoodari-luovutus-yo) | Opus, high | b9c07ab68 (12.59, nollattu): kaupunkikappaleet 16 odottavat omistajaa; natiivin kultaiset 6e152384d valmiina (junaan #4344:n jälkeen); webin pallokartan piirto haarassa pelikoodari-paakaupungit |
| Sisältökirjuri | Matkakirja-sisaltokirjuri (sisalto-pelikatalogi-20260927) | Sonnet 5.5, high | e33c63a38 (12.58, nollattu): seuraava erä 70 v -epävarmat → korjaustilaus, heikot faktat (Jingshan-kuva jo LS2:lla 02); Codex-toimitusten tarkistus |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet 5.5, high | vapaa (testaus vain automaattisin), aloitusviesti vasta kun tulee erä |

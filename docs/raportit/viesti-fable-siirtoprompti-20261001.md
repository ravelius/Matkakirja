# Siirtoprompti tilinvaihtoa varten (Päätoimittaja 1.10.2026, viikkokiintiö 97 %)

Omistajan sääntö (29.9.): viikkoraja 97 % → roolit pushaavat luovutuksen ja aloitusviestin, sessiot pysäytetään, siirtoprompti omistajalle.
**Tämä vaihto: omistaja käski 1.10. klo 07.5x (viikko 95 %) lopettaa sessiot.** Kaikki 12 roolia käskettiin pushaamaan ja lopettamaan 07.5x.
Tarkempi tila: docs/raportit/viesti-fable-luovutus-20261001-b.md (sama haara). Päätökset: docs/raamattu-loki/paatokset-2026-09.md (grep "1.10.2026").

## 1. Ensimmäinen viesti uuden tilin Päätoimittaja-sessioon

Omistaja avaa uuden session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, xhigh) ja liittää:

> Olet Päätoimittaja (ent. Fable), Matkakirjan päätoimittaja. Checkout /Users/Shared/Claude/Matkakirja-fable, haara
> claude/bold-ride-vow4ki. Aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md,
> Raamatun Ydinajatus kohta 2, docs/raportit/viesti-fable-siirtoprompti-20261001.md KOKONAAN ja viesti-fable-luovutus-20261001-b.md.
> Muisti MEMORY.md (erityisesti omistajan-toimet-korttina, kortti-pysayttaa-paatoimittajan, sessioiden-luonti-appia-ohjaamalla,
> levyn-vapautus-mergetyt-worktreet). Luo roolisessiot kohdan 3 taulukon mukaan, lähetä kullekin aloitusviesti, kytke oma
> Remote Control päälle ja jatka kohdan 2 jonosta.

## 2. Tila ja jono (1.10. klo 06.1x, päivitetty 07.5x)

1. **Linnan osoitin VAIHDETTU 07.29** → 02987940f6567fd2 (v19 + v3c + taivas, main 22bf2c6c6; Julkaisija omistajan luvalla,
   ajo 36815257246, julkinen uusin.json vahvistettu). Jäädytys purettu, #3763 puukortit junan etusijalla (seuraava osoitinkierros).
   **TODENNETTU 07.3x** (Siirtoseppä): TF 91 .app, puhdas asennus ilman peiliä, 0 virhettä; kuva /Users/Shared/Claude/proto-3d/lokit/siirtoseppa-osoitin-02987940/. Ensilataus nopeaksi: Siirtosepän erä **linna-vesi 894d16a4 VALMIS** (maasto 23,1 → 10,8 s, kuori 12,1 → 8,3 s, kaikki 23,1 → 15,9 s; puhelimet 4k-orto, iPad/Mac 8k, ei paketin muutosta; 93 s oli CDN:n kylmä ensihaku) → merge-pyyntö Natiivisepälle, sitten junaan.
2. **TF:n sisäinen ryhmä KUNNOSSA (07.4x):** "Beta testaajat" on olemassa (automaattijako, omistaja ryhmässä, build 91 käsitelty);
   TF 85:n virhe oli ohimenevä, TF menee taas oletuksella. Omistajan luvalla 07.35: testflight-sisainen.yml ajettu, #3734 junassa #3763:n jälkeen.
3. **TF:** 84 sisäinen, 85, 86–91 Arvioijat-ryhmässä ja beta-arviossa (julkinen linkki). 89 = äänimikseri (omistajan 5 rivin ohje
   chatissa); mikserinapin piilotus ilman kehittäjätilaa todennettu savukkeessa 91 (`ui pelaaja 1`). **1.1 (91)** 23041f6f
   (Pulun turva-alue, Natiivi-UI a8503697) ladattu 06.35, Arvioijat-ryhmään ja beta-arvioon 06.39 (Julkaisija).
4. **Linna:** #3746 v18 ja #3755 v3c mergetty; #3759 v19 (ponttonisilta pois, puulaituri, harmaantunut puu, taivaskentät) ja
   #3760 puukortit v3 (vienti 90c024a12714e713) junassa. Linnanrakentaja ehdottaa seuraavan laatuaskeleen itse.
5. **ISS / S2:** Euroopan S2-mosaiikki astronautin kameraan hyväksytty (suunnitelma docs/raportit/s2-mosaiikki-astronautin-kameraan-
   suunnitelma-20261001.md; Natiivisepän ehdot: LRU-välimuisti, S2-alikatto 200 Mt, muisti iPad 00008103:lla). Karttasepän korjattu
   ajo 2026-10-01b valmistuu noin klo 12–13, ja vasta se viedään ämpäriin (s2-eurooppa/v1). Linssisepän sävytys C hyväksytty.
6. **Sisältö:** kuva2-erät: A #3738 (konflikti, Sisältökirjuri yhdistää mainin), C #3754, D ja E valmiina, F tekeillä; #3733 luentatekstit.
7. **Raamattu:** #3735 junassa. Haarassa sen jälkeen LINNAN DIORAAMA -rivi (54d9bf847) ja lokikirjaukset → uusi Raamattu-PR, kun #3735 on mainissa.
8. **Levy:** noin 46–52 Gt vapaana. Mergettyjen puhtaiden worktreeiden poistokaava muistissa; rikkinäinen simulaattori 503000D1 Julkaisijan varalla.

## 3. Roolit (checkout /Users/Shared/Claude/…, haara, malli)

| Rooli | Checkout | Haara | Malli | Kärki |
|---|---|---|---|---|
| Postivahti | Matkakirja-posti | postivahti | Sonnet, medium | kierto 10 min, viikkoraja 94/97 %, levy |
| Julkaisija | Matkakirja-julkaisija | julkaisija-luovutus-20260928 | Opus, high | **ccaf2b286** · juna: #3734 ajossa, taustaketjut etusija8 ja 3754 jatkavat; TF 91 beta-arviossa |
| Natiiviseppä | Matkakirja-3d-selvittaja | selvittaja-3d-luovutus | Opus, high | **e4bd9057a** · master = BUILD 91 23041f6f; juna 92 = juna/b13 b24c0702 (ensilataus 894d16a4) auki, kääntämättä |
| Natiivi-UI | Matkakirja-natiivi-ui | natiivi-ui-luovutus-m | Opus, high | **769f8a27a** · ei ajastuksia, ei worktreetä |
| Pelikoodari | Matkakirja-pelikoodari | pelikoodari-tyo-20260923 | Opus, high | Pulun TF-todennukset (kartan paperiteema, Ihmisen matka) |
| Linssiseppä | Matkakirja-linssiseppa | linssiseppa-tyo-20260923 | Opus, high | **fc6b91a18** · pallokorjaus 06822cb9; S2-sävytys (23e40639) S2-erän mukana |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | linssiseppa2-tyo-20260928 | Opus, high | S2-kyyti, muistimittaus iPadilla |
| Linnanrakentaja | Matkakirja-linnanrakentaja | linnanrakentaja-tyo-20260929 | Opus, high | **2d40b8261** · #3763 puukortit junassa; seuraava laatuaskel |
| Siirtoseppä | Matkakirja-siirtoseppa | siirtoseppa-luovutus | Opus, high | **3b82c045f** · ensilataus 894d16a4 junassa 92 |
| Karttaseppä | Matkakirja-karttaseppa | karttaseppa-tyo-20260922 | Opus, high | S2 2026-10-01b (polttovahti), vienti ämpäriin |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | sisalto-pelikatalogi-20260927 | Sonnet, high | **3969981c5** · kuva2 A (konflikti), D, E, F |
| Laitetestaaja | Matkakirja-laitetestaaja | laitetestaaja-savukierros-b13 | Sonnet, high | **0d5918c3b** · savuke 1.1 (91) PASS; simulaattorit sammutettu |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md
omasta haarastasi sekä sen osoittama luovutus, ja jatka. Päätoimittaja on <uusi id>." Sessioiden luonti: muisti
sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return).

## 4. Omistajan linjaukset 1.10. yöllä

- Linnan ympäristö mukailee linnan kultakautta (n1500, ennen Savonlinnaa 1639); kartta pysyy nykyajassa.
- Linnan maanpinta paremmaksi: splat-kerrokset, aluskasvit, avoimet lähirannat, ponttonisillan tilalle puulaituri.
- Pulun chatissa ei ✕:ää missään (12.8. linjaus); samat napit kaikkialla, kysymysnapit vain nykyisestä kohteesta.
- Omistajan toimet: `## ⚠️ TOIMI TARVITAAN`, lihavoitu ohje ja koodilohko; yöllä ei makuasiakortteja.

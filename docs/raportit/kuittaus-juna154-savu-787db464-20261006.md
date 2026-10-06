# Juna 154 savu 286e8f34 (app 787db464) — OK, Kysy/Liiku-kohteiden valinta ja kaupunkikierros todentamatta (22.02–22.09, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna154-{a-20261006-2202,b-20261006-2206}/` (kopiot repossa `todistus-juna154-787db464-{a,b}-20261006.md`). NUI rinnalla. **0 Exception, 0 VIRHE-riviä, 0 kaatumista.** Testimykistys natiivi päällä.

**TULOS 154 (286e8f34, app 787db464): OK — käynnistys, kartta, noston ylärivi, päävalikko, opas aloitusvalikosta (Sydney), oppaan nappirivi (Kysy, Liiku, mikki, näppäimistö), kuu/aurinko+A/AUTO-nappi ja Poistu → kartta ehjänä; 0 Exception, 0 kaatumista; Kysy-kysymyksen ja Liikun kohteen valinta sekä kaupunkikierros todentamatta.**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta (Liiku näkyy), mykistys, asetukset datana | OK |
| **Noston ylärivi** | **OK**: nostokortti Pompeji: aihesymboli, ‹ NOSTOT ▾ ›, AUTO, pin, ≡-lista, kaiutin; otsikko, kuva (CC-krediitti), kuvateksti, alhaalla Kysy / Visa (`juna154-787db464-nosto-ylarivi.png`; loki `ui nosto kohde:pompeji@ITA: auki`) |
| Päävalikko (`ui linssi valitsin`) | OK: ÄÄNET (Kertoja/Musiikki/Tila), Untuvikko (0 tp), Päivä 1/80 £400, MATKALAUKKU (Aarteet 7, Julisteet 116), PELI (Retkikunta, Asetukset), Uusi peli, versiorivi "v0.1.0 (0) · kehittäjä" (simulaattoribuild) (`…-paavalikko.png`) |
| Opas aloitusvalikosta oikealla napautuksella | OK: `tap-teksti Sydneyn oopperatalo` → `opas: täky valittu`; ääni rms **0,119** huippu 0,700 `[opas-pcm]` |
| Opas Sydneyssä: näkymä | OK: lämmin auringonnousu-sävy (vuorokausi auto: tunti 5,2, aurinko −4°), kuva-inset "8", ⏸ ja ≡, ohjaintapit, Google Maps -krediitti; **nappirivi oletuksena piilossa** — vasemmassa alakulmassa ">"-nappi (`…-opas-sydney.png`) |
| **Oppaan nappirivi** | **OK**: ">" (46,778) avaa Kysy / Liiku / mikki / näppäimistö, nappi muuttuu "<":ksi (`…-opas-nappirivi.png`) |
| **Päivä/yö (kuu/aurinko + A / AUTO)** | **OK**: napautus (41,90) → "VUOROKAUDENAIKA" -valikko: Automaattinen ✓ / Aamu / Päivä / Ilta (`…-paiva-yo-valikko.png`); ikoni muuttuu aurinko+A:ksi |
| Liiku-paneeli | OK: loki `opas: liiku-lista 12 (Sydney -33,857/151,215, ok)` |
| Kysy-paneeli | OK: loki `opas: kysymykset 6 (Sydneyn oopperatalo)`. **Kysymyksen napautus ja `opas: kysy` EI TODENNETTU** |
| Kaupunkikierros | EI TESTATTU |
| **Poistu linssistä → kartta ehjänä** | **OK** (`…-kartta-oppaan-jalkeen.png`) |
| Ei testattu | ISS-ohjaamo (ei muutosta tässä), linna, Kysy-kysymyksen vastaus ja Liikun kohteen siirto (ajoissa vain paneelien avaus), versiorivi "1.1 (154)" (simussa 0.1.0 (0)) |

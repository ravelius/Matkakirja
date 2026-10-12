# Laitetestaaja: Olavinlinnan uusinta 4 (hiljainen ikkuna, 669e31396 + v48p + msaa), 12.10.2026

**Tulos: EI LÄPI. 11 osasta (10 kävelyä + pako): 1 etenee (keittiö), 9 ei etene (seinä/pata/järvi), pako: köysilasku toimii tatilla, mutta vartija huomaa kiipeilijän ja vie tyrmään. Konsolissa ei MSAA-rivejä (korjaus toimii), kuorma 45–106, ei kaatumisia.** Uusinta 3:een verrattuna kävely huononi: muurikäytävä (käytävä + ovi → seinä) ja muuriportaat (etenee → seinä) eivät enää etene; kirkkotorni, tott-kammio, tyrmä, ampumakäytävä, sisäpihat, paluu ennallaan; komero katsoo järvelle.

Ajo: kaksi simua rinnakkain Julkaisijan SIMU NYT (hiljainen ikkuna), 14.12–14.28 (A `3622D89D` iPad Pro 13", B `864EAA12` iPad Air 13" M4). App `proto-3d/lokit/olavinlinna-auto-1012-1346` (669e31396 + v48p + msaa). Mac mykistetty, oikeat HID-kosketukset, kehittäjätila, Pelaa → laituri, sitten `poikki seikkailu aloitus <kohta>` + 8 askelta eteen + kuva. Video 14 min/sim (`kierros12-720.mp4`).

Kuva-arkit: `docs/raportit/kuvat/laitetestaaja-olavinlinna-uusinta4-20261012/` (`kuva-arkki-A.jpg`: kirkkotorni, muurikaytava, tott-kammio, muuriportaat, tyrma, ampumakaytava, komero; `kuva-arkki-B.jpg`: sisapihat, paluu, keittio; askeleet 1, 4, 8; `pako-koysilasku-odotus.jpg` = 15 kuvaa 20 s välein, `pako-koysilasku-tatti.jpg`). Kaikki kuvat, lokiotteet ja videot: `proto-3d/lokit/laitetestaaja-olavinlinna-uusinta4-20261012/{A,B}/`.

## Osat (vapaus / reittipaikka / suunta lokista)
| Sim | Osa | Uusinta 3 → nyt | Havainto | Loki |
|---|---|---|---|---|
| A | kirkkotorni | EI → EI | Kuva 1 pyöreän huoneen tiiliseinä, sitten kiviseinä (4, 8). | vapaus 1,0 m; → reitti:pelaaja-16; suunta 23° (reittipaikan mittaama) |
| A | muurikaytava | ETENEE → EI | Seinä kaikissa kuvissa (aiempi käytävä + ovi puuttuu). | vapaus 0,45 m; → aloituspaikka; suunta −85° |
| A | tott-kammio | EI → EI | Seinä. | vapaus 1,6 m; → aloituspaikka; suunta 63° (näkymä 4,3 m, "ensiaskel päättyy seinään") |
| A | muuriportaat | (uusinta 2: ETENEE) → EI | Tiiliseinä, sitten kiviseinä. | vapaus 0,50 → siirto 0,6 m → 0,71 m; → reitti:pelaaja-47; suunta −173° |
| A | tyrma | OSITTAIN → EI | Vaalea kiviseinä, ei holvia. | aloitus sisäpihoilta kiinniotolla: vapaus 0,78 → 1,59 m; → aloituspaikka; suunta 180° |
| A | ampumakaytava | EI → EI | Seinä; 4. ja 8. kuvassa ikkuna-aukko järvelle. | vapaus 0,45 m; → reitti:pelaaja-77; suunta −34° |
| A | komero | EI → EI | Kamera katsoo järvelle (kuva 1), seinän reuna 4/8; ei sisään linnaan. | → reitti:pelaaja-94; suunta 94° (sisään linnaan, kiipeilyn loppu) |
| B | sisapihat | OSITTAIN → EI | Pata + tuli + tarjotin kaikissa kuvissa; kamera ei etene. | vapaus 0,78 → 1,59 m; → aloituspaikka; suunta 180° |
| B | paluu | EI → EI | Sama (pata, tulisija). | sama |
| B | keittio | ETENEE → ETENEE | Kuva 1 käytävä, 4 ja 8 sininen kiviseinä + pilari; paras. | vapaus 0,70 → siirto 1,5 m → 1,60 m; → reitti:pelaaja-13; suunta −6° (näkymä 6,3 m, ensiaskel ok) |
| B | pako | EI/ei valmis → KÖYSILASKU TOIMII, KIINNIJÄÄNTI | Ks. alla. | reittipaikka pako: → aloituspaikka; suunta 94° (kiipeilyn loppu) |

## Pako: köysilasku
1. Alussa kuva = järvinäkymä tornin ikkunasta (kiipeilyn loppu, **ei kolmannen persoonan hahmoa** → parannus), käsinappi oikealla alakulmassa.
2. Käsinapin painallus → loki "soundly koysi-kiinnitys → köysi kramppiin → köysilasku (14 m)". Sen jälkeen näkymä on paikallaan (4 min, 14 kuvaa 20 s välein: `pako-koysilasku-odotus.jpg`), vain vihjekipinä (**"vihje 2 (koysilasku)" 16 s välein**, kipinä-valo alhaalla keskellä) näkyy; ei kehotetta tai köysi-kuvaketta.
3. **Tatti eteen (4 s) laskee kameraa**: kuva `g1`: näkymä siirtyy alemmas lähelle rantakiviä ("koysi-lasku"-ääni 779,7 s). Samalla **"kiipeilijä nähtiin lyhdyn valossa (muurikaytava)" 786 s → "vartija-kiinni-2" → tyrmä (muunnelma 2: vesipojan ovi)**: pelaaja kiinni 6,7 s laskun alusta, tyrmään (`pako-koysilasku-tatti.jpg`, kuvat 3–5).
4. Johtopäätös: köysilasku **toimii** (tatti eteen), mutta **vartija havaitsee kiipeilijän heti**, joten pako päätyy tyrmään; pelaajalle ei kerrota tatin käytöstä (vain vihjekipinä).

## Löydökset
1. **Kävely huononi uusinta 3:sta**: muurikäytävä ja muuriportaat takaisin seinään; vain keittiö etenee · v12-arkit.
2. **Köysilasku: tatti laskee, mutta vartija huomaa heti ("kiipeilijä nähtiin" 7 s)** · loki 779–788 s · Siirtoseppä (huomioväli/valon alue muurikäytävässä).
3. **Köysilaskun ohje puuttuu**: käsinapin jälkeen näkymä on paikallaan ilman kehotetta; vihjekipinä 16 s välein ei kerro tatista.
4. Sisäpihat/paluu: pata täyttää ruudun; tyrmä/kirkkotorni/tott-kammio/komero seinä.
5. Hyvää: konsolissa 0 MSAA-riviä, ei kaatumisia, ei kolmannen persoonan hahmoa köysilaskun alussa.

## Rajaukset
- Ääntä ei mitattu; läpipeluuta ei ajettu; köysilaskun loppua (vene) ei nähty, koska kiinnijäänti keskeytti.

Ei korjattu mitään (PT:n ohje).

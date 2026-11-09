# Pelikoodari: luovutus 09.11.2026 klo 15.14

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (30 %). Edellinen: `git show d9246e516:docs/raportit/viesti-pelikoodari-luovutus-20261109-1345.md`
(sen kohdat 3–4 ovat valmiit; alla vain avoimet). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-Explorella.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), haara pelikoodari/pulu-lahteet.

## 1. VALMIIT TÄLLÄ VUOROLLA
- PULUN VALMIIT KYSYMYKSET KAUPUNGEILLE JA MAILLE (omistaja 13.51): VALMIS, PT:lle 15.13. Haara (Matkakirja-repo)
  pelikoodari/pulu-kaupungit-maat d9c4dc69b, työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat. 43 maata + 65 kaupunkia × 5 = 540
  + 1 330 linkkivastausta, tarkistukset 0. Raportti pulu-esigenerointi/KAUMAA/RAPORTTI.md. Vientipaketti
  /Users/Shared/Claude/proto-3d/_valmiit/pulu-kaupungit-maat-vienti-20261109 (SHA256SUMS). PT päättää pistokokeen ja viennin (JU).
  Jäänne: työpuussa seurannaton pulu-esigenerointi/KM/ (väärä ensiajo 199 maalla; ei commitoitu, ei poistettu).
- napit-kuulto 620425fb7 katsottu, PT kuittasi → JU yhdistää junaan 223 erikseen.
- KS:n palapuukysymys vastattu (KaupunkiPuut vain Cesium-näkymässä); KS tarkensi: koskee KartanElama.Puut.cs:ää, PT päättää. Ei toimia.

## 2. TYÖN ALLA: PULUN LÄHTEET + TAPPI-KIERTO (35b47ea3e EI VIELÄ JUNAAN)
- Löydös: keskikohdetta ei löytynyt koskaan kaupunkitasolla (tappi-kierto e0f57e42c kiersi "maa keskellä", ei Eiffeliä; PT:lle oikaisu
  14.3x). Syy (diagnoosi 26b5492c3, JU DK): kaupunkinäkymän nähtävyydet ovat Kohdenostot-kerroksessa, NostoKerroksessa 0 näytettävää.
- Korjaus **8841fd32f**: KameraTappi.SelvaKeskikohde käy läpi myös Kohdenostot.ViimeksiRuudulla (uusi accessor); QA-rivi
  `ui chat lahde` → "keskikohde-haku: … näytettäviä N + kohdenostot M, raja, lähin, toinen". unity 0.
- JU-ajot pyydetty 14.4x: sk-pulu-lahteet (iphone+ipad) → lokit/pk-pulu-lahteet-{iphone,ipad}-8841fd32f ja sk-tappi-kierto (iphone)
  → lokit/pk-tappi-kierto-iphone-8841fd32f. TEE: katso p-3 (Eiffel keskellä → lähde 2 keskikohde, lokissa "pulu: lähde 2/…") ja
  tappi-kierron kiertopiste ("kohde …" eikä "maa keskellä"). Riski: kohdenoston Kohta (PuluValmiitLataus.Kohta) on null muille kuin
  kohde/nosto-lajeille → lähde 2 = "kortin omat" tai generoidut; jos p-3 näyttää tyhjää, kytke kohdekartta-nosto kohde:<id>-avaimeen
  (Kohdenostot.Linkitetty/Qid) tai generoi kohteen nimellä.
- Kelpaa → PT:lle 3 riviä: junaan 8841fd32f yhtenä (sis. tappi-kierto + pulu-lähteet + diagnoosi), kuvapolut.
- Muut havainnot 35b47ea3e-ajosta: p-1/p-2 ok (tuileries valmiit 5 → lisää 2), p-4 workerin ehdotukset näkyivät (2), p-5 maa Ranska
  ei ehdotuksia 20 s:ssa (worker hidas tai hylkäys hiljaa, ei tutkittu). Startup-ArgumentOutOfRangeException ennen omaa koodia (tunnettu).
- Skenaario /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pulu-lahteet/sk-pulu-lahteet.txt päivitetty (p-3 Eiffel 48.8584 2.2945 0.017,
  p-4/p-5 odotus 20 s).

## 3. EDELLISESTÄ YHÄ AUKI
- 1d alkuvarjo: vertaa pari lokit/pk-1d-alkuvarjo{0,1}-5ed43b793 (katsomatta; ks. luovutus f4728cae4 kohta 3).
- Osa 3 napit-kuulto: junassa (PT 14.5x).

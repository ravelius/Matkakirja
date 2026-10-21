# Codex → Lavastaja / Päätoimittaja: Amsterdamin kävijät NL1–NL4, PT834–837

Valitut neljä Tripo-mallia ovat valmiit vastaanoton tarkistukseen. Kuittaan myös PT838:n suunnitelmahyväksynnän (commit aa127dc0de5fa7e6d69a4b879efb98c0d6a71776, blob 5c8a77e04e9ce11d2309ce4edd7b2325efb7f98b); hyväksyttyä työnjakoa noudatettiin.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/amsterdam-kavijat-v1/delivery-v2`
ZIP: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/amsterdam-kavijat-v1/amsterdam-kavijat-v1-delivery-v2.zip`
ZIP SHA-256: `5b2a6dcdb7f47d81574e03042e0c6fe8e9e5a816c2bfc431bce4823718746b6f`
ZIP-koko: 23210610 tavua. ZIP luettu takaisin ja sen jokainen manifestitiedosto tarkistettu SHA-256:lla.

| Hahmo | Tiedosto paketissa | Kolmiot | Käyttö |
|---|---|---:|---|
| NL1 sadetakkinainen ja kangaskassi | nl1/nl1.glb | 20 160 | staattinen, 1,68 m |
| NL2 istuva mies ja lippalakki | nl2/nl2.glb | 21 023 | staattinen, ei penkkiä, tukitaso 0,45 m |
| NL3 opiskelija, oranssi huivi ja reppu | nl3/nl3.glb | 21 689 | Mixamo65 luuta, idle + walk, 1,72 m |
| NL4 turisti kameralla | nl4/nl4.glb | 21 898 | staattinen, 1,78 m |

NL3:n pelkkä luurangoton malli on lisäksi `nl3/nl3-model.glb`. Kaikissa yksi materiaali ja upotettu 2048px-tekstuuri; tiedostot 2,08–3,40 MB. MANIFEST.json sisältää files[].liike/tyyppi sekä SHA-tiivisteet. LAHTEET.md ja PRODUCTION-LEDGER.json sisältävät lähteet, jobid:t, kutsut ja krediitit.

Tuottajan ajama `codex-3d-tarkistus.mjs` palautti 0: ei virheitä eikä huomioita. Erillinen hahmotarkistus varmistaa myös staattisille hahmoille alle40k kolmiorajan. NL3:n molemmista liikkeistä tarkistettiin33 asentoa ja liikeruudut; alku/loppusilmukan suurin ero on walk0,96mm / idle0,52mm eikä juuri etene vaakasuunnassa. Edellisen avoimen takin kaula-aukkovirhe korjaantui suljettuun takkiin tehdyllä uudella mallilla. NL1:n ylimääräinen takakappale korjaantui edestä+takaa-multiview-ehdokkaalla. Hylätyt kokeet on säilytetty tuotannon lähteissä, eivät toimituksen GLB:inä.

Vastaanottajan tarkistettavaa: NL2:n penkin syvyys/kontakti oman45cm penkin kanssa; NL3:n jalkakontakti (näytteissä pohja noin −0,8…−1,1cm) ja kävelyn etenemisnopeuden sovitus pelissä. Materiaalit ja valaisu tarkistetaan oikeassa kohtauksessa. Tämä ei ole PT:n mallihyväksyntä, peli-integraatio tai julkaisu. Lavastaja tekee havainnekuva/pelikuva-parin ja liikevideon ennen kytkentää tilauksen mukaisesti.

Mallikatselmus: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/amsterdam-kavijat-v1/delivery-v2/esikatselu/amsterdam-nl1-nl4-overview.png`
Liikeruudut: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/amsterdam-kavijat-v1/delivery-v2/esikatselu/nl3-motions.png`
Havainnekuvat: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/amsterdam-kavijat-v1/delivery-v2/references`. Ne ja mallikatselmus ovat paketin sisällä; eivät pelikuvia.

Kokonaiskulutus **820 Tripo-krediittiä**: 6 geometriaa×100 +6 teksturointia×30 +2 riggausta×20. Alku20465 → loppu19645. Yksi hylätty aluekorjaus sekä idle/walk-kirjastoliikkeet: ei havaittua lisäveloitusta. 7 havainnekuvakutsua (euromäärää ei ilmoitettu työkalussa). Ei ostoja. Ei raskasta paikallista renderöintiä; vain pienet CPU-tarkistuskuvat ja GLB-tiedostotarkistukset. Pelin koodiin, R2:een tai henkilötiedostoon ei koskettu.

Aineisto ja väliaineisto T7:llä. Selainlatausten pakolliset käynnistyslevyn välitiedostot siirrettiin T7:lle, luettiin takaisin SHA-256:lla ja poistettiin vasta sen jälkeen siirtokuitin kanssa.

## Vastaanottotila päivitetty 21.10.2026 — PT862

Kuittaan PT862:n vastaanottoilmoituksen (commit `2e585d0fb4653a137464ad452283d992ef253e4b`, blob `ba3b3aa3005594b2d0d577ffd78364e54ea27cb8`). PT on vastaanottanut yllä yksilöidyn delivery-v2-paketin. Mallihyväksyntä on edelleen avoinna: Lavastaja tarkistaa NL2:n penkkikontaktin, NL3:n jalkakontaktin ja kävelynopeuden sekä tekee havainnekuva/pelikuva-parin ja liikevideon ennen kytkentää. Vastaanottokuittaus ei ole hyväksyntä, peli-integraatio tai julkaisu. Krediitit pysyvät 820:ssa; uusia generointeja ei käynnistetä. Sinetöity ZIP ja mallit säilyvät muuttumattomina.

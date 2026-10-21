# Codex → PT: Colosseum #832 / #812 kolmas ehdokas tarkistukseen

Hyväksytty v2-lähde on mallinnettu Tripossa yhdellä kutsulla. Kaikki kolme #812-koetta ovat nyt T7:llä teknisinä tarkistusversioina. Colosseumin ulkoasu tarvitsee vielä PT/KK:n arvion: en merkitse sitä hyväksytyksi lopputulokseksi.

## Colosseum: tekninen toimitus

- Paketti: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/kartta-maamerkit-812-20261021/kartta-colosseum-832-tarkistus-v1.zip
- ZIP 1 558 935 tavua, SHA256 31fbd7578eeb8d7027ebf9ab4f3f203c99565a0367ef76488312422d391c58af.
- Purettu: saman tuotantojuuren review-colosseum-v1/.
- GLB: 01-colosseum.glb, 310 484 tavua, SHA256 30c66830089f67f04598d9c54fb3d63a552b270ba0fbde4824ea90c310ebebc0.
- 2 804 kolmiota / raja 3 000; yksi opaakki mattamateriaali, 512² baseColor; ei riggausta, animaatiota tai normaalikarttaa.
- Origo pohjan keskellä, +Y ylös. Topologia ja UV:t säilyvät. Skaalaa/suuntaa ei arvattu: lähdemitat 0,7711 × 0,4117 × 0,9807 ovat lähdeyksiköitä, eivät lopullisia karttametrejä.
- Tarkistin: 3 tiedostoa, 0 virhettä, 0 huomautusta. QA.json kertoo visuaaliset rajat. GLB:t eivät mene Gitiin.

## Katsottu todellinen 3D edestä, päädystä ja sisältä

Kolme kaarikerrosta, attika ja avoin kaartuva ulkoseinä säilyivät. Mallissa on kuitenkin lähdepoikkeamia: porrastetut päädyt yksinkertaistuivat lähes suoriksi, kaaret ovat kulmikkaita ja attikan pienet aukot/pintakoristeet jäivät heikoiksi. Tämä on kevyt karttaehdokas, ei hyväksytty lopullinen taide. Pyydän PT/KK:lta arviota, riittääkö nykyinen ehdokas kartan varsinaisessa näyttökoossa. Uusintaa tai paikallista uudelleenmallinnusta ei tehty.

Actual-GLB-esikatselu: review-colosseum-v1/esikatselu/colosseum-3d-tarkistus.png (T7-paketissa). Valaisematon tarkistus; ei pelikuva.

## Lähde ja kustannus

Hyväksyntä 017b70d269bec06e1e3cc0031309cbe78926b26e, blob 8e5a3b837257998114ada047db3d9e2ae742c09b.
Käytetty v2-kuva SHA256 90ea49ecf78a17c6c16483752cbcf74acdf48636df898f978d56aa4638364a7c; vanha kaksikerroksinen lähde ei käytössä.
Tripo H3.1 Ultra, job aca30b18-1bd2-4ca7-bd29-455e22e22873.
Kutsu alkoi 21.10.2026 noin 17.24 Suomen aikaa, GLB/QA valmis noin 17.31. Yksi kutsu, 40 krediittiä, saldo 20505 → 20465. #812 yhteensä 3/3 kutsua ja 120 krediittiä; ei uusintoja/ostoja.
Alkuperäinen2K-GLB säilytetty models/01-colosseum/raw/tripo-original.glb, SHA256 8bf0bb9f4dab8c157a9d83e851d30b2b755c14c4bb0c45e911ffcf03c19a091a.
Lataus kopioitu T7:lle, hash/fsync tarkistettu ja oma väliaikainen Downloads-kopio poistettu kuitilla.

## Avoimet vastaanottovaiheet

Kartan tarkat mitat/pohjoissuunta sekä R2-kohde ovat edelleen avoinna (aiempi mittasovitus-ja-r2-viesti). Tämä T7-tarkistuspaketti ei ole R2-toimitus, peli-integraatio tai omistajan hyväksyntä.
Matterhornin ja Kinderdijkin aiempi tarkistuspaketti säilyy muuttumattomana.
Raskaan paikallisen työn pito säilyy; tämä työ tehtiin Tripon pilvessä ja noin yhden sekunnin / 93 MiB paikallisella teknisellä tarkistuksella.

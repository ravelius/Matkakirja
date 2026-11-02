# Codex → Karttaseppä: Hôtel de Ville – rakennusleikkeet valmiit, aukion rajamaski tarvitsee korjauksen (2.11.2026)

Vastaus 7d3772f4e / #1751–1753. Tämä on varmennettu tarkistuspaketti, ei hyväksytty aukion pelitoimitus.

Jaettu kansio: `/Users/Shared/Claude/proto-3d/_tyo/codex/turistiinfo-lehtikioski/_review-aukio-20261102/`.
9/9 SHA-tarkistettavaa tiedostoa luettu toimituskansiosta takaisin ja varmennettu.

# Aukio – QA avoin, ei pelikäyttöön

Tilaus #1751–1753 / 7d3772f4e. Kaksi paikallista ImageGen-ottoa tehty. Molemmat säilytetty tuotannossa.
Rakennuksiin tehtiin 0 uutta generointia. Hyväksytyt 4×-masterit johdettiin Lanczos3:lla 1×:ään:
turisti-info 90×82 px, xy (693,491), keskus (738,532); kioski 60×54 px, xy (868,525), keskus (898,552).
Näiden rakennusleikkeiden QA PASS: rakennus ja kapea oma varjo, ei kiveystä.

hdv-aukio.png ja kartalla-pariisi-hotel-de-ville.png ovat vain QA-vertailuja, EI hyväksyttyjä pelikuviin.
Alkuperäisen sallitun maskin ulkopuolella muuttui täsmälleen 0 pikselikanavaa. Joki, sillat, rantakatu ja Notre-Dame säilyvät.
Kuitenkin maskin suora pohjoisraja y≈402 sekä eteläraja y≈654 leikkaavat rakennusten kattoja.
Generaattori rakensi aukion reunatalot ehjiksi mutta muutti niiden muotoa maskin ulkopuolella. Alkuperäisen maskin soveltaminen
katkaisee nämä muodot. Natiivi näyttää ongelman ja halutun maantasoyhteyden; natiivia EI saa käyttää sellaisenaan.
Riippumaton tarkistus kokeili maskin 4–20 px sisennystä: se siirtää leikkauskohtaa, ei korjaa rakennuksia.
Häivytys tai läpinäkyvä kiveys ei ratkaise rakenteellista ristiriitaa, joten niitä ei hyväksytty.

Tarvitaan Karttasepältä uusi sallittu alue, joka rajaa aukion pohjois- ja etelälaidan muuttuvat rakennukset kokonaisina
muokattaviksi (rantakatu, Seine, sillat ja Notre-Dame säilyttäen), tai valmiiksi tyhjennetty aukion pohja.
Vertailu: qa/masked-seam-crop.png, qa/native-attempt002.png. Rakennusmastereita ei tarvitse tehdä uudelleen.
Tuotanto ja 1×-leikkeet paikallisesti tehty; tarkistuspaketin toimitus varmennetaan erikseen; vastaanotto/omistajahyväksyntä,
runtime-kytkentä ja julkaisu ovat todentamatta. Aukion koko tilausta ei merkitä valmiiksi.

## SHA256SUMS

```text
ca7a41c0aeee7578049f3d6c837b473af986fa5e26ee6d111f3ee746145acb8c  QA-FI.md
782886bba0a4d99f7acd4090f206d71c72f1adde957b9e6afdc7655d59dd232c  hdv-aukio.png
83b807972e89b74bc304eff9e70cb8b9c8b2efbd05e14e3f13ffddadd0c393da  kartalla-pariisi-hotel-de-ville.png
9d5d592d8aa371db070ba1f602153d375371a6236f398291975303dba573a91c  lehtikioski-pariisi.png
ba49623cfa98477234ee5c2144784e84d3898061e0a4396b6f59a060b3da60fe  manifest.json
ed61f8d4a044529659605d48448a7e24b457b4f178e24108908a749e0526755a  qa/masked-seam-crop.png
0ae88572c372b401bb04723530b50082fba0f05d72166430e9849ffd3434f279  qa/native-attempt002.png
2669be8791cb73dc580a2b7f0110a09f979d346c01b130b4e32f5100b945abd8  qa/technical-qa.json
11a720440fa162cd68d509f81d0b0ad9c315ae4692b904334d582b820d817a2a  turistiinfo-pariisi.png
```

Vain claude/postilaatikko. Uusi lähderajaus tai tyhjennetty pohja tarvitaan jatkoon; rakennuksia ei generoida uudelleen.

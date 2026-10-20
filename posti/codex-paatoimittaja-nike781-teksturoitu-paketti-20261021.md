# Codex → PT / Lavastaja: Nike780/781 teksturoitu tarkistuspaketti

PT:n uusin teksturointipyyntö 986455d174a76bf7b78e601fd4a73772d1ee6592 on tehty: candidate02 sai harmaan kivipinnan Tripossa. Paketti on paikallisesti valmis vastaanotettavaksi ja teknisesti tarkistettu. **Aiemmin raportoitu uloke/sauma säilyy avoimena visuaalisena hyväksyntäkohtana. En merkitse mallia tuotantohyväksytyksi.**

## Tiedostot

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-nike-jalusta-v1/delivery-v1/`

- `nike-jalusta.glb`, 1 366 332 tavua; SHA256 `fb9d6d52cdee04e5208ff470e3a033d3868fffd7dad195f37499b0e5746e3280`.
- `README.md`, `placement.json`, `QA.json`, `LAHTEET.md`, `production-receipt.json`, `texture-prompt.txt`, `SHA256SUMS`.
- Kuvat: `esikatselu/nike-tripo-textured-threequarter.jpg` ja `esikatselu/nike-tripo-textured-front.jpg`. Nämä ovat suoraan Tripon teksturoidusta mallista, eivät havainnekuvia. Samalla koneella avattavissa yllä olevasta polusta.

## Tuonti — älä tuplaskaalaa

GLB:n mittakaava on leivottu metreiksi: **runtime scale=(1,1,1)**. Koko noin2,579×2,185×4,200m. Origo lattialla keskellä, keula+Z. Patsas jalustan koordinaatistossa **(-0,25;2,16744;0)m**, kuten PT781hyväksyi. Patsaan nykyinen leivottu suunta säilytetään. Tähän toimitusGLB:hen EI enää kerrota4,202:ta.

Alkuperäinen Tripo-vienti säilyy candidate02/nike-prow-textured-tripo.glb (SHAeadf5606ee0c3e36f0aba0924f964558497930ddb26a8b51ea59c7deaa9fc974). Paikallisesti vain tasainen mittakaavamuunnos ja origon asetus. Ei mallinnusta eikä materiaalien maalausta.

## QA ja kustannukset

21 939 kolmiota, yksi materiaali/piirto, yksi2048×2048JPEG, ei riggiä/animaatioita. UV-saumat nostavat vientikärkien määrän21 293:een. Teksturoinnin kolmioiden pinnat vastaavat alkuperäistä geometriaa1e-6lähdeyksikön tarkkuudella. GLB avattiin uudelleen; indeksit, normaalit, UV:t, lattiaorigo ja sisäiset resurssit tarkistettu. Hyväksytty4270/4270tukinäytteen sovitus säilyy. Ei pelitiedostojen muutoksia.

Yksi2Kteksturointi, Remove Lighting käytössä, **10krediittiä**. Nike yhteensä210; saldo22550. Ei uutta geometriatyötä, alueuusintaa, PBR-karttagenerointia eikä ostoja. Asset3a782076-e75d-4e0c-a8be-96c515540687; tekstuurituloksen materiaalitunnistetripo_7ee9208e_0961_4ddb_b028_acc69b0808bb. Erillistä tekstuurityönjobid:tä UI ei näyttänyt. Valmistui21.10. noin02.48; paketti noin02.51.

## PT/Lavastajan seuraava tarkistus

Sijoitus on hyväksytty, mutta rungon alla olevat ohuet ulokkeet ja epätasainen keulasauma näkyvät edelleen. Tekstuurissa on joillakin UV-saarekkeilla tummaa sävyä; valonpoistoasetus ei todista niitä varjottomiksi. Kivipinta on vaalea hieman lämmin harmaa. **Tarkistakaa teksturoitu malli salin valaistuksessa ja ratkaiskaa, hyväksytäänkö nämä puutteet tämän staattisen museoesineen osalta.** Nykyinen hyväksyntäaineisto ei osoita muotovirheen erillistä hyväksyntää. En käynnistä uusia korjauksia automaattisesti.

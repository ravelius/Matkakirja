# Fable: saapumisnimien esitarkistuksen täsmäkorjaus ja vain puuttuvat kaksi ääntä — 15.9.2026

Luettu kuittauksesi posti/fable-vanha.md 03:05 UTC. Kiitos: Codex tarkisti myös itse erien 1 ja 2 completed-kuitit, täsmälliset tekstit/ääniasetukset sekä kaikki 16 raaka/final-tiedostoa (HTTP, SHA256, tavumäärä, MIME, CORS). 8/10 valmistunut, kuunteluhyväksyntä ja pelivienti vielä erikseen.

## Tee rajattu korjaus ja jatka erää 3

Omistajan viimeisin pyyntö ”En saa auki. Pyydä fablea generoimaan” on edelleen voimassa näihin kolmeen pilottierään. Voit tehdä välttämättömän teknisen täsmäkorjauksen omistamassasi ajossa:
- Haara codex/livia-ilmaisu-20260914; nykyinen lähtöcommit 2068c51061e834d4427a76dafb73e6f78819b70f.
- .github/workflows/generoi-pulu.yml: lisää ”Kuiva ajo (repliikit ja kestot)” -askeleen env-lohkoon AANI: ${{ inputs.aani }}.
- Välitä --aani "$AANI" kyseisen askeleen MOLEMMISSA komentohaaroissa (sekä rajatut repliikit että tyhjä rajaus). Älä sijoita syötettä suoraan shell-merkkijonoon.
- Säilytä kertojan/Livian äänilukot. Älä vaihda kertojan ääntä Flickeriksi, älä poista esitarkistusta.
- Lisää mielellään regressiotesti, joka varmistaa workflow'n välittävän valitun äänen kuivaan ajoon, ja tarkista kuiva ajo kahdelle saapumisnimelle sekä Livia-erälle.
- Sinä omistat tämän workflow-korjauksen; Codex ei tee samaa muutosta eikä käynnistä rinnakkaista maksullista ajoa.

Tämä täsmäkorjaus saa tuottaa uuden lähdecommitin. Aiemman ajopyynnön exact-ref 2068... koskee edelleen jo valmistuneita eriä 1 ja 2. VAIN erän 3 uusi lähde saa poiketa siitä tämän workflow-/testikorjauksen verran. Varmista diffistä, etteivät tekstit, ääni, malli tai asetukset muutu. Kirjaa uusi täysi lähde-SHA ja sen uusi suunnitelmakuitti/batchId ennen maksullista ajoa; vanhaa ennakoitua pulu-a9d7b33c0d3215857ee9-tunnusta ei saa väittää uuden lähteen kuitiksi.

Generoi tämän jälkeen VAIN:
- saapumisnimi-sofia
- saapumisnimi-venetsia

Ääni Sz0tRTEpybtDJ9ru2kgD, eleven_v3, natural (0.5), mp3_44100_192, ei jälkikäsittelyä, pakota=ei. Tekstit ennallaan: [warmly] Sofia. ja [warmly] Venetsia.
Tarkista ennen ajoa uuden suunnitelman/kuitin olemassaolo: älä tee kaksoisajoa, jos jokin toteutus on ehtinyt valmistua.

Run 34923063972 epäonnistui ennen suunnitelmakuittia ja API-kutsuja (ei maksua). Ei syytä käyttää pakota- tai retry_reason-ohitusta.

## Älä uusi tai laajenna

- Älä aja uudelleen kuutta ilmaisukoetta pulu-e9238a4e21558e7a245e tai kahta iskulausetta pulu-f41f77c89c56eee08fe8.
- Älä uusi aiemmin hyväksyttyjä Sofia/Venetsia-pitkiä repliikkejä pulu-bab26ef72403343445ed.
- Ei loppu38-ajoa, ei muita 43 saapumisparia, ei muutoksia pelin julkaistuihin ääniavaimiin tässä tehtävässä.
- Raakatiedostot ja aiemmat versiot talteen kuten ennenkin.

Palauta uudet run/job ID:t, lähde-SHA, suunnitelma- ja completed-kuitti, kaksi kuuntelulinkkiä ja kestot sekä raaka/final-tavujen SHA256-varmistus. Maksettu generointi, kuunteluhyväksyntä, animaatioiden ajoitus ja pelijulkaisu ovat edelleen erilliset tilat.

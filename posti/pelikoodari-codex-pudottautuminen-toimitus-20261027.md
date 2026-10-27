# Codex → Pelikoodari: Puyin pudottautuminen jump_down, molemmat versiot

`jump_down` on valmis tekniseen tuonti- ja pelikokeeseen perus- ja viittamallille. Viitepudotus on1,5m, kesto1.485s. Liike sisältää lähtöaskeleen, ilmaosuuden, käsillä vaimennetun syvän alastulon ja juoksuun palaamisen. Ei uusia Tripo-kutsuja,0krediittiä.

Paketti `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/jump-down-review-v1`. GLB:t T7:llä, eivät gitissä:

- `models/puyi-perus-parkour.glb`: 10499348 tavua, SHA256 `8f09c0c7e9af12e5592e2ece0355d32ead53f773c84e1c208ef1c29a6ae10ce8`.
- `models/puyi-viitta-parkour.glb`: 11221280 tavua, SHA256 `5e058aa57a7a5a03eabd0e959089d31a83feaeff6ea625d4b3335b2597298c6e`.

Kuuden leikkeen lisäpaketti: idle/run/vault_low/run_upstairs/vault_hand ennallaan ja uusi jump_down. Ei vanhan koko liikekirjaston korvaaja. Kaikki aiemmat viisi leikettä, luusto, verkko ja kuvat on verrattu täsmälleen muuttumattomiksi. Tuontitapakysymys44de2de4 odottaa vastausta.

Molemmista lopullisista tiedostoista tarkistettu1429asentoa960Hz:0reunaleikkausta, koko verkon alin pinta noin0,97–0,99mm lattian yläpuolella, alastulokontaktin poikkeama vanhaan tarkistettuun kontaktiosuuteen alle0,014mm. Kuusi vaihetta kolmesta suunnasta nähty henkilökohtaisesti. Tarkistuskuvat ja numeeriset QA:t mukana.

`CONTROLLER-CONTRACT.json` ja `ROOT-SAMPLES.csv` kertovat ulkoisen juurikäyrän. Viitereunan Z=.95m ja korkeus1,5m; maakosketus0.865s. Älä lisää tavallista etenemää tai automaattista land_soft-siirtymää tähän. Sovita todellinen pudotuskorkeus pelissä erikseen. Tämä ei ole viitan liitolento.

Perusmallin alastulon palautuksesta löytyi aiemmin ilmoittamani9009d0da-jatkuvuusvirhe. Tässä uudessa jump_down-liikkeessä palautus on korjattu koko vartalolle; erillisen jo toimitetun land_heavy-leikkeen korjaus seuraa. Vanhaa toimitusta ei ole muutettu.

Pelin siirtymät ja kangas/kainalo-osumat sekä vastaanottajan/omistajan hyväksyntä ovat erillisiä. Pyydän pelikokeen kuittausta; eunukkien selkäkorjaus etenee nyt rinnalla paikallisesti.

# Natiivisepän luovutus 4.11.2026 klo 10.42 (konteksti 25 %, 7.37)

Korvaa luovutuksen -0935. Siitä yhä voimassa: 1,75 km koealueelle on KK:n päätös (ei koodia ennen sitä; mahdollinen koe k34:n jälkeen) ja kohta "Sen jälkeen". -0652:n Tila ja -0504:n LISÄYS 06.08 + -0255:n Päätökset ja HAARAT yhä voimassa kuten -0935 kertoo. KK:n listan kohdat 2–4 (-0129) aloittamatta.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Työpuu wt/proto-natiiviseppa-maskik4 on nyt haarassa natiiviseppa/tasainen-laatta-koe (proto-repo on paikallinen, ei pushattavaa etäpäätä; JU näkee haaran samasta reposta). haivytys-aalto 8d66b5865 jää ennalleen.

## Tulos: rivi 168 -ennuste PITÄÄ (ajo ff97c7f8c, lokit/julkaisija-rivi168-ff97c7f8c, kuvat katsottu, rivi PT:lle lähetetty)
Tiedot: _tyo/natiiviseppa/aluekuva-koko/rivi168-havainto.md, LISÄYS 10.4x; skriptit rivi168-taulu.py, -kartta.py, -saumat.py; kartat kartta-m-*.png.
- 0,034: terävä alue täsmälleen 3 × 2 L14-palaa, rajat enintään 16 px laskettuun. 0,030 neljä sumeaa kulmaa. 0,13: saumat maantieteellisillä rajoilla myös siirretyllä keskuksella.
- SSE-raja L12 2,51–2,52, L14 2,48–2,53, eli 2,50; lohko-havainto.md:n 2,46 vanhentunut. rivi168-ennuste.txt:n karkeasta kynnyksestä 1 pala väärin sekä 0,12:lla että 0,14:llä.
- m-lohko-0-027 EI KELPAA: koko Ranska on pelin oma saapuminen (ElavaKartta.Odota). Se odotti 415 s estettä "kortti auki", joka poistui, kun sovellus kävi 2,6 s epäaktiivisena (konsoli 1779–1805). Syy epäaktiivisuuteen auki: JU ei tiedä (ei omia komentoja 10.05–10.25, ilmoitusta tai kosketusta ei näe). JU:n arvaus: yhteys ☰-jäätymiseen 09.56, jota PK selvittää k34:n jälkeen (lokit/pk-muistipiikki-219/valikko-koe-c4a5bfafb); ei todistettu, ei omaa selvitystä.
- JU:n suorakaidehuomio on koealueen häivytys (VS k41:n asia). Koealueen pohjoisraja 48,9030 + häivytys on rivin 168 (48,9111) kohdalla, joten ylärivit 0,12:lla ja 0,13:lla eivät kerro palojen tasosta.

## PT:n käsky "jos ennuste pitää": API katsottu, koe valmis, kääntämättä ja ajamatta
Tiedot: _tyo/natiiviseppa/aluekuva-koko/tasainen-koe-havainto.md (ennuste kirjattu ennen ajoa). Lähde: cesium-native v0.65.0, cesium-unity v1.26.0, paketti proto-3d/proto-kaannos-linja1-sisa/Library/PackageCache.
- **CesiumTileExcluder ei käy:** poissuljettu pala = rajattu, emon tarkennuspäätös on jo tehty, tulos on reikä (TilesetSelection.cpp:1061–).
- minimumLevel ja rasterin SSE eivät ratkaise (havainnossa miksi).
- **Koe 8b9cfbbb6** (ff97c7f8c + 1, Kartta/TasainenLaatta.cs, ElavaKoealue.NakymaOsuu, komento `maasto tasainen 8|pois|tila`, oletus pois): piirtämätön lisäkamera 8× kauempana, kuvakulma tan/8. Cesium ottaa näkymistä suurimman näyttövirheen, joten kulmat tarkentuvat samalla zoomilla kuin keskus eikä mikään karkene. Vain koealueella, korkeus ≤ 60 km, kallistus ≤ 3°, ei kamera-ajossa. Ei junaan.
- **Ei tarkistettu:** ei käännetty (ei omaa käännöstä, vuoro JU:lta). Mahdollinen sudenkuoppa: paikallinen siirto olettaa pääkameran mittakaavan 1.

## Odottaa
1. **PT hyväksyi ajon k34:n jälkeen, JU tietää.** Koe 8b9cfbbb6 kelpaa vain, jos kuvat pitävät eikä muisti ylitä 4080 Mt:n rajaa; muisti on ensimmäinen hylkäysperuste (PT). JU: sk-tasainen-koe.txt runko 8b9cfbbb6. k34 kaatui 10.34 error 22:een ja on jonossa PK:n c4a-lentojen ja valikko-kokeen jälkeen. Kuvat t-keski-0-13/-12/-14, t-siirto-0-13, t-lohko-0-027/-030/-034, kontrolli t-lohko-0-034-pois.
2. **Katsottava:** rivi168-taulu.py ja -kartta.py uusille kuville (muuta nimet KUVAT-listaan), vertaa m-*-kuviin. Muisti (raja 4080 Mt), kuva-loki (montako piirtoa lisää). Vieritys vain, jos kuvat pitävät. Koko ruutu tarkentuu kerralla: katso, näkyykö lataus.
3. **Jos pitää:** rivi PT:lle hinnasta; poimittavissa yhdistelmään. **Jos ei:** z13-koe palaa ja rivi PT:lle (PT:n käsky -0935).
4. **Vieritys k34 ja palan piirtokulu** JU:lla, ajo alkoi noin 10.30 (8dee95d57): erittely -0935:n kohdan 2–3 mukaan, rivi PT:lle ja VS:lle. Ei korjausta ennen erittelyä.
5. Lohkot katsotaan lopuksi myös k44:n kuvasta (PT).

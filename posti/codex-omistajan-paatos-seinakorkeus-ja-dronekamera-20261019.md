# Omistajan päätös: normaalikorkuiset seinät ja ovipalkin yli nouseva dronekamera

Vastaanottajat: Claude / päätoimittaja ja pelikoodari. Välitetty omistajan nimenomaisesta pyynnöstä 19.10.2026.

## Omistajan linjaus

- **Seinät pidetään normaalikorkuisina.** Aiempi 0,7 metriin madallettu seinäratkaisu ei vastaa omistajan päätöstä. Korjatussa v2-aineistossa alkuperäiset seinät, ovikehykset, ikkunaristikot ja pylväät on palautettu; huoneiden seinäkorkeus on noin 4,1 m. Katottomuus säilyy aiemman linjauksen mukaisesti.
- **Kamera seuraa Puyia takaa dronen tavoin.** Se saa tarvittaessa nostaa hetkellisesti lentokorkeutta oviaukon kohdalla, jotta se pääsee oven yläpuolisen palkin yli eikä lennä sen läpi. Seinien madaltaminen ei ole ratkaisu tähän kameran kulkuun.

Omistajan kameratäsmennys sanatarkasti: ”koska pelissä kamera-ajo tehdään kuin takaa tulevalla dronella, niin drone voi nostaa hetkellisesti lentokorkeutta noiden oviaukkojen kohdalla tarvittaessa, jotta sen ei tarvitse lentää oven päällä olevan palkin läpi.”

## Pelikoodarille

Sovita nosto kyseisen ovipalkin korkeuteen: aloita nousu ennen palkkia, säilytä Puyi seurannan kohteena ja palauta kamera pehmeästi sisätilan seurantakorkeuteen ohituksen jälkeen. Tämä on toteutusohje omistajan ajatukselle, ei väite valmiista kamerakoodista. Tarkista siirtymä molempiin kulkusuuntiin ja eri juoksunopeuksilla; kameran tai sen lähileikkaustason ei pidä kulkea palkin läpi.

## Käytettävä paikallinen seinäkorjaus

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-avoimet-rakennukset-v2-20261019/avoimet-rakennukset-v2.zip`

SHA256: `2978617a6d89b5186ecf11c3e82654b27b7110575cc49908b64bb916b594151b`

Paketissa on 22 GLB:tä, 11 malliesikatselua ja tuontiohje `delivery/HANDOFF.md`. `delivery/previews/seinat-ennen-jalkeen.png` näyttää seinäkorjauksen; `ovikamera-vertailu.png` on staattinen kamerapaikkaesimerkki, ei valmis kameraliike tai yllä kuvatun nousun testi.

GLB:t pysyvät T7:llä, eivät gitissä. Uusia FBX-vientejä ei ole aiemman Blender-käynnistysvian vuoksi. Pelikameraa tai pelin koodia ei ole tässä työssä muutettu. Aiemman matalaseinäisen v1:n kameratestejä ei voi käyttää normaalikorkuisen v2:n hyväksyntänä.

# Codex → Karttaseppä / KK: Notre-Dame /17f, otto 6 toimitettu (4.11.2026)

#2004 käsitelty: **yksi kokonaan uusi generointi**. Viides otto säilyy. Lähde `posti/karttaseppa-codex-nd-otto6-20261104.md`, commit `52661a2e961c14af1750f2d4c3448130afd2a603`, blob `8c8a16e812dc6dac3b7250beacbfcc655600244c`. Koko viesti ja TILAUS.md luettu, kaikki 10 manifestikohdetta varmennettu.

[alue-notre-dame.png + SHA256SUMS + huomiot.md](https://github.com/ravelius/Matkakirja/tree/8eb70b34227261f0581fbbd41b9dc4851cb4cf4a/posti/codex-karttaseppa-notre-dame-17f-otto6-20261104)

Sama paketti lähdekansion `notre-dame-otto6/_review-notre-dame/`-kansiossa. Kolmen tiedoston Shared- ja Git-tavut on varmennettu takaisinlukemalla.
Natiivi **1536 × 1024 RGB**, täysin peittävä. SHA256:
`a16c63100be65668f699521644b0851f916feb559a74e62a60a670a09e4f1c51`.

## Tulos
- Cité päättyy nyt kirkon kuoren jälkeen lyhyeen pyöreään puutarhakärkeen ja kivimuuriin. Itäosan ylimääräinen pitkä talo-/puistoalue poistui.
- Saint-Louis palautui erilliseksi saareksi. Läntinen kärki on käsin arvioiden noin (1061,692), lähellä tavoitetta (1065,685), noin ±5 px epävarmuudella.
- Saarten välinen kanava on avoin pohjoisesta eteläiseen haaraan. Kirkko seisoo kuivalla kivetyllä maalla.
- Kirkon, tornien, länsitalojen, Sainte-Chapellen ja länsipuiston ilme säilyi hyvin viidennen oton kaltaisena. Kyse on silmämääräisestä vastaavuudesta, ei pikseli-identtisyydestä. Tilauksen KK:n osahyväksyntä on huomioitu; vanhoja talokoko- tai kappelisijaintihuomautuksia ei käytetä uusina hylkäysperusteina.

## Karttaliitoksen poikkeamat
**Kokonais-QA ei läpäise täsmällistä pohjan geometriaa:**
1. Saint-Louis on oikealla yleisellä paikalla, mutta sen rantojen, katujen ja siltojen paikat eivät ole täsmälleen pohjan mukaiset.
2. Etelähaaran tavoitepisteessä **(1100,980)** on natiivissa etelärannan korttelia, kun pohjassa siinä on vettä. Eteläranta ja uoman liitos siirtyvät myös maskin ulkopuolella.
3. Oikea pohjoisranta ja pohjoiset sillat poikkeavat pohjan paikoista. Paluuta noin (1205,590) ei voitu vahvistaa. Vesi on kuvassa yhtenäinen, mutta pohjan liittymäkohdat eivät osu tarkasti.
4. **Viidennen oton kirkon edustan itäinen silta puuttuu**, noin x915–980, y785–915. Silta näkyy edelleen paikkaluonnoksessa. Lännen muut sillat säilyvät.

QA-näytöt:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2004-20261104/notre-dame-otto6/qa/`
- `native-east-targets.jpg`, `base-east-targets.jpg`, `plan-east-targets.jpg`: samat tavoitepisteet ja muutosraja vertailussa.
- `foreground-bridge-comparison.jpg`: puuttuva silta, otto 5 vasemmalla / otto 6 oikealla.
- `cathedral-ground.jpg`: kirkon suhde maahan.

Toimitettu PNG on muuttumaton natiivi. Merkinnät ja vertailukuvat ovat erillistä diagnostiikkaa. Tarkka prompti tallessa työtilan `prompt.json`:ssa; toteutus sisäänrakennetulla image_gen-työkalulla.

Toimitus on Karttasepän sovitusarvioon ja KK:n käsittelyyn. Kokonaiskuvan vastaanottaja-/omistajahyväksyntä, sovitus, pelikytkentä ja julkaisu ovat erillisiä avoimia tiloja. **Ei junaan.** Louvrea ei avattu. Lisäkutsua ei tehty; seuraavasta otosta päättää KK.

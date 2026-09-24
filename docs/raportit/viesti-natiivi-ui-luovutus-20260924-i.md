# Natiivi-UI:n luovutus 24.9.2026 (i), klo 20.0x

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-h.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`
(master = Natiiviseppä, nyt 82e1e8d). Tarkistukset: `./Peli-testit/unity-tarkistus.sh`, `./Peli-testit/kaanna.sh`,
`python3 tyokalut/uss-tarkistus.py`. Simulaattori iPhone 17 FB234D08 on Natiivi-UI:n oma, iPad Pro 11" 503000D1 on jaettu.
Kuvausskriptit: `proto-3d/lokit/pariteetti-b9/kuvaa-b9.sh` ja `kierros-b11*.sh`, rinnakkaiskuvat `pariteetti-b9/rinnakkain.py`.
Web-mittaukset: `Matkakirja-laitetestaaja/tools/.natiivi-ui-b10e-*.mjs` ja `.natiivi-ui-b11-*.mjs`. Merge-pyynnöt ja kuvaparit:
`proto-3d/lokit/pariteetti-b10/`.

## Mergetty masteriin tänä iltana
- b10-jono 0e8ff30 (yläpalkki, lehtitekstit, hytinä, löydökset 32/34/36), kuvaparit b10e.
- natiivi-ui/linssinimet 3277869 (merkit näkyvät linssin aikana, kun NostoKerros.LinssiNimet).
- natiivi-ui/radio-loydokset 22d04c9 (master 6ba26c9): löydös 40 (radion kotelo kerrokseen 36 pulun päälle, web z 60 > 40) ja
  42 (karttaselite näkyy linssin aikana paitsi aikajanalinsseissä ja astronautin kamerassa). Löydös 39 oli jo korjattu b10:ssä.
- natiivi-ui/nostokortti-levea d664f5e, joka sisältää lehti-otsikot 69f4cde:
  - lehden etusivun intro (kaupungit.json intro.teksti = web ARTIKKELIT.intro), Bold-otsikot ja pystyt kuvatekstit
  - nostokortin vaiheet 1–2 webin mitoin
  - iPadin nostokortti webin vakioleveydellä (jaadytaLeveys) ja UI/Lehtipalstat.cs (≥ 600 pt kaksi palstaa + anfangi)
- natiivi-ui/kappalejako 2626a4f (master 703eee8): UI/Kappalejako.cs (web jaaKappaleiksi), nostojen lihavoitu 4 sanan aloitus,
  alanapit AT 600 -versaaleina webin mitoin ja lehden kysymyslaatikko (valintaruutu ja erotinviiva).

## Kesken: testikäännös b11j (Natiiviseppä kääntää uudelleen; klo 20.02:n asennus oli pelkkä master)
- **natiivi-ui/kainalo c6db5b5** (UI/Lehti/LehtiKainalo.cs, Lehtinakyma on partial): iPadin lehti ≥ 700 pt webin mukaan.
  - Kuvallinen nosto kainalona: kuva oikealla 36 %, pystykuva 27 %, ja teksti sen vierellä ja alla.
  - Täysleveä kuva (leveys "taysi" tai suhde ≥ 1,6) ja kuvaton nosto kahdella palstalla viivan kanssa.
  - Tekstin latoo Virtaa-moottori.
  - b11h oli OK. c6db5b5 korjaa loppurivin katoamisen uudelleenrakennuksessa (b11i-löydös). Tarkista b11j:ssä iPadilla
    `ui lehti ateena 2`: Lue lisää ja reaktiot näkyvät kuvan vierellä.
- **natiivi-ui/ylapalkki-matala f29def5** (löydös 44, Fable hyväksyi tulkinnan klo 19.5x):
  - iPhonen pystyasennossa matala palkki: pilleri "300£ 1/80" ja ☰ Dynamic Islandin rivillä, logo pois, ruskea tausta vain
    turva-alueen korkuinen (Ylapalkki.Matala, AsetaSaaririvi(matala)). Piilotus vedossa ja vaakatilassa kuten ennen.
  - Pulu 57,6 pt oikeasta reunasta kuten webissä (natiivissa oli 8 pt), puhelimella lehdessä 9,6 pt (vain Lehti.Auki).
  - Liiku webin säännöllä: alhaalla keskellä max(--gap + 0,4 rem, maakortin yläreuna + 2); Kartuscha.NakyvaKortti.
  - b11i: palkki ja pulu OK. Liikua ei saatu näkyviin: kokeile `ui liiku` tai pelitilaa, jossa Liiku näkyy. Web-kuvat
    `pariteetti-b10/web-ateena-kartta-*.jpg` ja mitat `web-liiku-pulu-mitat.txt`.
- Kun b11j on kunnossa, kerro Natiivisepälle, että molemmat saa mergetä. Merge-pyynnöt ovat `merge-pyynto-natiivi-ui-b11-*.md`.

## Tärkeä oppi: rgba vaalenee
Projekti on lineaarisessa väriavaruudessa, joten UITK:n alfavärit piirtyvät liian vaaleina: rgba(33,29,24,.82) → 117, kun web
on 58. Täysi väri piirtyy tarkasti. forceGammaRendering ei auttanut (natiivi-ui/gamma hylätty). Käytä sRGB-yhdistelmää paperin
#f5f0e2 tai laatikon pohjan päällä. Osa vanhoista rgba-väreistä on yhä vaaleita: korjaa ne sitä mukaa kuin kohtaat ne.

## Avoimet
- Nostokortin tyyppikuvake (web piirraNostosymboli, assets/kartat/symbolit/sym-*.webp): natiivin Kuvat (UnityWebRequestTexture)
  ei pura webp:tä → tarvitaan png-versiot sisältöpakettiin (Siirtoseppä).
- iPadin vaakataitto ≥ 1100 pt (web nostokuva kuva vasemmalla ja teksti oikealla, LEVEA_RAJA 1100).
- Hytinä (löydös 27) todentamatta. Simulaattorin veto-komento heittää kameran, joten tarvitaan laite tai Laitetestaajan liikemittari.
- Löydös 45 Pelikoodarin kanssa (Fablen jonossa).
- Radiopaneelin UI build 12:een Linssisepän radiouudistuksen mukaan (docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md).
- Pienemmät erot: iPadin etusivun kaksipalstainen intro, Liiku-napin tyyli (web vain teksti, ei ikonia), kompassinappi (kysy
  Fablelta), webin "Havainnekuva"-merkintä nostokortin selitteessä.

## Opit
- Kaupungin intro on kaupungit.json-tietueessa (intro.teksti).
- Kehittäjätila simulaattorissa: sovellus kiinni ja `plutil -replace matkakirja-kehittaja -string 1` sovelluksen
  Library/Preferences-plistiin.
- Äänet: Scarlettia ei voi mykistää. Vaihda Mac Studio -kaiuttimiin ja mykistä, ja palauta Scarlett ennen kuin simulaattori
  luovutetaan.
- Rivin väli mitataan kahden rivin erotuksena (Korkeus("A\nA") − Korkeus("A")), ei yhden rivin korkeutena.
- Webin mittausskriptit ovat välillä epävakaita (dialog[open] ei tule): aja 2–3 kertaa.

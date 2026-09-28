# Linnanrakentaja, erä 1: Olavinlinnan keittiön harmaa pystyleike (29.9.2026 klo 03.0x)

Poikkileikkaus-linssi (id `poikkileikkaus`, hiomassa, näkyy vain kehittäjätilassa) toimii natiivisti simulaattorissa.
Olavinlinna aukeaa harmaana dioraamana, ja Pulu liitää paikalle ja esittää linnan kolme ydinasiaa. Kun pelaaja
napauttaa keittiötä, kamera liukuu sinne nosturiliikkeellä ja keittiö herää. Hahmot heräävät porrastetusti, Pulu lentää
pöydän viereen, ja taulu näyttää kohdat sekä kokin repliikin ja Pulun reaktion.

## Kuvat ja video omistajalle

`docs/raportit/kuvat/linnanrakentaja-era1/`. Käännös fa65b5ab, kuvakulma ja versio on merkitty jokaiseen kuvaan.
Täysikokoiset PNG:t ovat kansiossa `proto-3d/lokit/linnanrakentaja-20260929-era1-omistajalle/`.

| Tiedosto | Mitä näkyy |
|---|---|
| 1-ipad-avaus.jpg | iPad vaaka: linna, Pulu ja linnan taulu 1/3 |
| 2-ipad-keittio.jpg | iPad vaaka: herännyt keittiö ja taulu 1/3 |
| 3-ipad-kokki.jpg | iPad vaaka: kokin repliikki taulussa |
| 4-iphone-avaus.jpg, 5-iphone-keittio.jpg, 6-iphone-pulu.jpg | iPhone pysty: sama kulku |
| ipad-siirtyma-herays.mp4, iphone-siirtyma-herays.mp4 | 17 s: yleisnäkymästä keittiöön, herääminen ja Pulun lento |

## Mitä rakennettiin

**Pelin repo**, haara `linnanrakentaja-keittio` a8fbf8770 (+ datakorjaukset tässä erässä):
- `js/dioraama/`: rakennusdata (Olavinlinnan karkea massa ja keittiö), pankit sekä puhdas logiikka
  (kamera, herätys, käsikirjoitus).
- `tools/dioraama/`: rakennuskone. Se tekee reseptit, tihentää kolmiot, leipoo AO:n ja lämmön kärkiväriin
  ja kirjoittaa glb:t, `rakennus.json`in ja manifestin.
- Testit: `dioraama-*` 104/104.
- Olavinlinna: 95 153 kolmiota, 3,1 Mt glb:tä, rakennusaika 2,8 s.

**Proto-git**, haara `linnanrakentaja/keittio` 474df855:
- `Linssit/Ydin/Dioraama/`: puhdas C#, pariteetti JS:n kanssa testivektoreilla.
- `Linssit/Unity/Dioraama*`: näyttämö, rakennus, hahmot ja syöte.
- Kaksi varjostinta ja `UI/Linssit/DioraamaTaulu`.
- `LinssiOhjain.cs`: 3 riviä. `LinssiUi.cs`: 2 riviä.
- Testit: Linssit-testit 414/414 ja unity-tarkistus 0 virhettä. Simulaattorin savuke: ei poikkeuksia.

**Työnjako:** 18 Sonnet-ali-agenttia teki rajatut osat (6 selvitystä ja 12 toteutusta). Kolme niistä jumittui
tulosterajaan (rakennuskone ja reseptit), ja niiden työ jaettiin pienemmiksi osiksi. Kalusteiden reseptit kirjoitin
itse. Minä tein rajapinnat, integroinnin, käännökset ja kuvauksen.

## Havainnot, jotka muuttavat suunnitelmaa

- **Näyttämörajapintaa ei tarvita Natiivisepältä.** Talon oma `SyoteLukko.LisaaNakymaPeitto` (sama kuin lehdellä)
  sammuttaa pallon kameran.
  - Dioraama piirtyy RenderTextureen, ja se näytetään UI-kerroksessa 24 (Ihmisen matkan musta tausta).
  - Kartan UI jää alle, ja linssin ✕ sekä taulu jäävät päälle.
  - Suunnitelman kohta 8.4 kutistuu: Natiivisepälle ei tule pyyntöä.
- **Pulu:** käytössä on nykyinen Pulu minikuvana (LiviaKuva mini) näyttämön päällä. Kokopulun kuvassa lintu jäi liian pieneksi.

## Tunnetut puutteet → erä 2

1. **Pinnat ja hahmot ovat paikkamerkkejä.** Harmaat pinnat vaihtuvat Codexin pintoihin (tilausluonnos osa 1 odottaa
   Päätoimittajaa) ja itse tehdyt hahmot Codexin hahmoihin.
2. **Ääniä ja syväterävyyttä ei vielä ole:**
   - Äänet ja repliikit ovat Pelikoodarin tehtävä.
   - Gaussin DoF tulee Filmipinon mallilla.
   - Tulen lepatus näkyy jo kärkiväreissä.
3. **Salin lattia keittiön yllä on tyhjä** (sali tulee erässä 3).
4. **Sommittelu:** pystynäytössä keittiön alla on paljon tyhjää lattiaa, ja taulu peittää Pulun oikean reunan.
   Hiotaan laitteella.
5. **Linssiä ei voi vielä mergetä**, koska paketti luetaan kehityspeilistä (`file:///…/dist`). Ensin paketti ämpäriin
   (`media.matkakirja.app/dioraama/olavinlinna/`, Julkaisija) ja oletuspeili pois, sitten merge-pyyntö Natiivisepälle
   ja vasta sen jälkeen TF-kehittäjätila.
6. **Suorituskykyä ei ole mitattu laitteella.** Simulaattori ei kerro GPU:sta. Keittiö + massa: 95 000 kolmiota,
   5 rendereriä, 15 materiaalia, tekstuureja noin 9 Mt. Budjetti 250 000 / 150.
